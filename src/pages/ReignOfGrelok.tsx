import { useState, useRef, useEffect } from 'react'
import { useNavigate } from 'react-router-dom' // Certifique-se de ter o react-router-dom instalado
import { TypewriterText } from '../components/TypewriterText'
import { useLanguage } from '../contexts/LanguageContext.types'
import type { Language } from '../i18n'
import pt from '../i18n/pt'
import en from '../i18n/en'
import type { Dictionary } from '../i18n'

import {
  processCommand,
  makeInitialState,
  type GameState,
  type DialogueIndex
} from '../utils/gameLogic'

const DICTIONARIES: Record<Language, Dictionary> = { pt, en }

interface LogEntry {
  id: number
  text: string
  isCommand?: boolean
  done?: boolean
}

export default function ReignOfGrelok() {
  const { t, language, setLanguage } = useLanguage()
  const r = t.reign
  const navigate = useNavigate() // ADICIONADO: Declarando o hook de navegação

  const [notification, setNotification] = useState<string | null>(null)
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const logContainerRef = useRef<HTMLElement>(null)

  const [isTyping, setIsTyping] = useState(false)
  const [gameState, setGameState] = useState<GameState>(() =>
    makeInitialState(r.inventory.initialItems)
  )
  const [dialogueIndex, setDialogueIndex] = useState<DialogueIndex>({})

  const [log, setLog] = useState<LogEntry[]>(() => [
    { id: Date.now(), text: r.intro, done: false }
  ])

  const [input, setInput] = useState('')
  const [lastKey, setLastKey] = useState(0)

  const [pendingLanguage, setPendingLanguage] = useState<Language | null>(null)
  const [awaitingConfirm, setAwaitingConfirm] = useState(false)
  const prevLanguageRef = useRef(language)

  // MUTATION OBSERVER (Scroll automático)
  useEffect(() => {
    const container = logContainerRef.current
    if (!container) return
    const observer = new MutationObserver(() => {
      container.scrollTop = container.scrollHeight
    })
    observer.observe(container, {
      childList: true,
      subtree: true,
      characterData: true
    })
    return () => observer.disconnect()
  }, [])

  // Foco no input
  useEffect(() => {
    const handleGlobalClick = () => {
      if (window.getSelection()?.toString() === '') {
        inputRef.current?.focus()
      }
    }
    window.addEventListener('click', handleGlobalClick)
    inputRef.current?.focus()
    return () => window.removeEventListener('click', handleGlobalClick)
  }, [])

  // Sons e Notificação
  useEffect(() => {
    const baseUrl = import.meta.env.BASE_URL || '/'
    const audio = new Audio(`${baseUrl}sounds/ui_levelup.wav`)
    audio.preload = 'auto'
    audioRef.current = audio
    return () => {
      audio.pause()
      audioRef.current = null
    }
  }, [])

  useEffect(() => {
    if (notification) {
      audioRef.current?.play().catch(() => {})
      const timer = setTimeout(() => setNotification(null), 3000)
      return () => clearTimeout(timer)
    }
  }, [notification])

  // Interceptor de Idioma
  useEffect(() => {
    if (language === prevLanguageRef.current) return
    const timeoutId = setTimeout(() => {
      setLanguage(prevLanguageRef.current)
      setPendingLanguage(language as Language)
      setAwaitingConfirm(true)
      setLog(prev => [
        ...prev.map(e => ({ ...e, done: true })),
        { id: Date.now(), text: r.commands.langChangePrompt, done: false }
      ])
      setLastKey(k => k + 1)
    }, 0)
    return () => clearTimeout(timeoutId)
  }, [language, setLanguage, r.commands.langChangePrompt])

  const handleTypingDone = () => {
    setLog(prev =>
      prev.map((e, i) => (i === prev.length - 1 ? { ...e, done: true } : e))
    )
    setIsTyping(false)
  }

  const handleSubmit = () => {
    const isLastEntryTyping = log.length > 0 && !log[log.length - 1].done
    if (isTyping || isLastEntryTyping || !input.trim()) return

    const cmd = input.trim()
    const upperCmd = cmd.toUpperCase()

    // --- INTERCEPTOR DE NAVEGAÇÃO ---
    if (upperCmd === 'HOME' || upperCmd === 'SAIR' || upperCmd === 'EXIT') {
      navigate('/')
      return
    }

    setInput('')
    setIsTyping(true)

    if (awaitingConfirm) {
      handleConfirmLanguage(cmd)
      return
    }

    const { response, newState, newDialogueIndex } = processCommand(
      cmd,
      gameState,
      dialogueIndex,
      r
    )

    // Notificação de Inventário
    const added = newState.inventory.filter(item => !gameState.inventory.includes(item))
    const removed = gameState.inventory.filter(item => !newState.inventory.includes(item))

    if (added.length > 0) {
      const name = r.inventory.itemNames[added[added.length - 1]] || added[added.length - 1]
      setNotification(`[ ITEM ADICIONADO: ${name.toUpperCase()} ]`)
    } else if (removed.length > 0) {
      const name = r.inventory.itemNames[removed[0]] || removed[0]
      setNotification(`[ ITEM REMOVIDO: ${name.toUpperCase()} ]`)
    }

    setLog(prev => [
      ...prev.map(e => ({ ...e, done: true })),
      { id: Date.now(), text: `> ${cmd}`, isCommand: true, done: true },
      { id: Date.now() + 1, text: response, done: false }
    ])

    setGameState(newState)
    setDialogueIndex(newDialogueIndex)
    setLastKey(k => k + 1)
  }

  const handleConfirmLanguage = (cmd: string) => {
    const userInput = cmd.toUpperCase()
    const isYes = ['SIM', 'YES', 'Y', 'S'].includes(userInput)

    if (isYes && pendingLanguage) {
      const newDict = DICTIONARIES[pendingLanguage]
      setLanguage(pendingLanguage)
      prevLanguageRef.current = pendingLanguage
      setGameState(makeInitialState(newDict.reign.inventory.initialItems))
      setDialogueIndex({})
      setLog([{ id: Date.now(), text: newDict.reign.intro, done: false }])
    } else {
      setLog(prev => [
        ...prev.map(e => ({ ...e, done: true })),
        { id: Date.now(), text: `> ${cmd}`, isCommand: true, done: true },
        { id: Date.now() + 1, text: r.commands.langChangeCancelled, done: false }
      ])
    }
    setPendingLanguage(null)
    setAwaitingConfirm(false)
    setLastKey(k => k + 1)
  }

  return (
    <main className='max-w-3xl mx-auto flex flex-col gap-4 relative p-4'>
      <div className='border-b border-fallout/30 pb-3 flex items-center justify-between'>
        <p className='text-fallout/50 text-sm'>{r.termlink}</p>
        <div className='flex gap-2 text-xs text-fallout/40'>
          <span className='blink-effect'>●</span>
          <span>{r.active}</span>
        </div>
      </div>

      <section
        ref={logContainerRef}
        className='h-[60vh] overflow-y-scroll flex flex-col gap-3 pr-2 scrollbar-hide focus:outline-none'
      >
        {log.map(entry => (
          <div key={entry.id}>
            {entry.isCommand ? (
              <p className='text-fallout/70 font-terminal text-sm'>{entry.text}</p>
            ) : !entry.done ? (
              <TypewriterText
                key={lastKey}
                text={entry.text}
                delay={12}
                className='whitespace-pre-wrap text-fallout leading-relaxed text-sm md:text-base font-terminal'
                cursor={false}
                onStart={() => setIsTyping(true)}
                onComplete={handleTypingDone}
              />
            ) : (
              <p className='whitespace-pre-wrap text-fallout leading-relaxed text-sm md:text-base font-terminal'>
                {entry.text}
              </p>
            )}
          </div>
        ))}
      </section>

      {notification && (
        <div className='fixed top-8 right-8 z-100 bg-fallout text-black px-6 py-2 font-terminal text-sm border-2 border-black animate-pulse shadow-[0_0_15px_rgba(20,255,20,0.5)]'>
          {notification}
        </div>
      )}

      <div className='border-t border-fallout/30 pt-3 flex items-center gap-2'>
        <span className='text-fallout font-terminal text-lg'>&gt;</span>
        <input
          ref={inputRef}
          type='text'
          value={input}
          readOnly={isTyping}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && handleSubmit()}
          className={`flex-1 bg-transparent border-none outline-none text-fallout font-terminal text-lg uppercase caret-fallout ${
            isTyping ? 'opacity-30' : 'opacity-100'
          }`}
          placeholder={isTyping ? '...' : r.placeholder}
          autoComplete='off'
          spellCheck={false}
        />
      </div>
    </main>
  )
}
import { useState, useRef, useEffect } from 'react'
import { TypewriterText } from '../components/TypewriterText'
import { useLanguage } from '../contexts/LanguageContext'
import type { Language } from '../i18n'
import pt from '../i18n/pt'
import en from '../i18n/en'
import type { Dictionary } from '../i18n'

const DICTIONARIES: Record<Language, Dictionary> = { pt, en }

type Location = 'plains' | 'mountain' | 'swamp' | 'village' | 'chapel'

interface GameState {
  location: Location
  inventory: string[]
}

interface LogEntry {
  id: number 
  text: string
  isCommand?: boolean
  done?: boolean
}

type DialogueIndex = Partial<Record<Location, number>> &
  Record<string, number | undefined>

function processCommand (
  cmd: string,
  state: GameState,
  dialogueIndex: DialogueIndex,
  r: ReturnType<typeof useLanguage>['t']['reign']
): { response: string; newState: GameState; newDialogueIndex: DialogueIndex } {
  const input = cmd.trim().toUpperCase()
  const s = { ...state, inventory: [...state.inventory] }
  const d = { ...dialogueIndex }
  const { events: e, locations: loc, itemDescriptions: ides } = r

  // --- 1. COMANDOS GLOBAIS ---
  if (input === 'HELP' || input === 'AJUDA')
    return { response: e.help, newState: s, newDialogueIndex: d }

  if (input === 'RESET')
    return {
      response: 'REINICIANDO...',
      newState: makeInitialState(r.inventory.initialItems),
      newDialogueIndex: {}
    }

  if (['INVENTORY', 'INVENTÁRIO', 'INVENTARIO', 'INV'].includes(input)) {
    const items =
      s.inventory.length > 0
        ? `${r.inventory.title}\n${s.inventory
            .map(k => ` • ${r.inventory.itemNames[k] || k}`)
            .join('\n')}`
        : r.inventory.empty
    return { response: items, newState: s, newDialogueIndex: d }
  }

  // --- 2. OLHAR ITEM ESPECÍFICO ---
  if (input.startsWith('OLHAR ') || input.startsWith('LOOK ')) {
    const itemName = input.split(' ').slice(1).join('_').toLowerCase()
    if (ides && ides[itemName]) {
      if (s.inventory.includes(itemName)) {
        return { response: ides[itemName], newState: s, newDialogueIndex: d }
      }
      return { response: 'VOCÊ NÃO POSSUI ESSE ITEM.', newState: s, newDialogueIndex: d }
    }
  }

  // --- 3. SISTEMA DE NAVEGAÇÃO ---
  const movementMap: Record<Location, Partial<Record<string, Location>>> = {
    plains: {
      NORTE: 'mountain', NORTH: 'mountain', N: 'mountain',
      SUL: 'village', SOUTH: 'village', S: 'village',
      LESTE: 'chapel', EAST: 'chapel', L: 'chapel',
      OESTE: 'swamp', WEST: 'swamp', W: 'swamp', O: 'swamp'
    },
    mountain: { SUL: 'plains', SOUTH: 'plains', S: 'plains' },
    village: { NORTE: 'plains', NORTH: 'plains', N: 'plains' },
    chapel: { OESTE: 'plains', WEST: 'plains', W: 'plains', O: 'plains' },
    swamp: { LESTE: 'plains', EAST: 'plains', L: 'plains' }
  }

  const currentMap = movementMap[s.location]
  let destination: Location | undefined

  if (currentMap[input]) {
    destination = currentMap[input]
  } else if (input.startsWith('IR ') || input.startsWith('GO ')) {
    const dir = input.split(' ')[1]
    if (currentMap[dir]) destination = currentMap[dir]
  }

  if (destination) {
    s.location = destination
    let locDescription = r.locations[s.location] || ''
    
    if (s.location === 'mountain' && s.inventory.includes('raw_gemstone')) {
      locDescription = r.locations.mountain_clear || r.locations.mountain
    }
    // Correção: Atualiza descrição ao entrar na capela se o zumbi estiver morto
    if (s.location === 'chapel' && d['zombie_dead']) {
      locDescription = r.locations.chapel_clear || r.locations.chapel
    }

    return {
      response: `${r.commands.currentLocation}: ${r.locationNames[s.location]}\n\n${locDescription}`,
      newState: s,
      newDialogueIndex: d
    }
  }

  // --- 4. AÇÕES ESPECÍFICAS POR LOCAL ---

  // MONTANHA
  if (s.location === 'mountain') {
    if (!s.inventory.includes('raw_gemstone')) {
      const gemCmds = ['PEGAR GEMA', 'PEGAR GEMA BRUTA', 'COLETAR GEMA', 'GET GEM', 'GET GEMSTONE', 'PICK UP GEM']
      if (gemCmds.includes(input)) {
        s.inventory.push('raw_gemstone')
        return { response: e.getGemstone, newState: s, newDialogueIndex: d }
      }
    }
    const attackCmds = ['ATACAR GRELOK', 'MATAR GRELOK', 'ATTACK GRELOK', 'KILL GRELOK', 'USAR ESPADA', 'USE SWORD']
    if (attackCmds.some(v => input === v || input.startsWith(v))) {
      if (s.inventory.includes('magic_sword')) return { response: e.grelokDefeated, newState: s, newDialogueIndex: d }
      if (s.inventory.includes('rusty_sword')) return { response: e.grelokAlive, newState: s, newDialogueIndex: d }
    }
  }

  // VILA
  if (s.location === 'village' && (input.includes('FALAR') || input.includes('TALK'))) {
    if (input.includes('PRIEST') || input.includes('PADRE')) {
      if (s.inventory.includes('zombie_head')) {
        s.inventory = s.inventory.filter(i => i !== 'zombie_head')
        s.inventory.push('brass_key')
        return { response: e.priestBrassKey, newState: s, newDialogueIndex: d }
      }
      return { response: r.dialogues.village[1], newState: s, newDialogueIndex: d }
    }
    if (input.includes('BLACKSMITH') || input.includes('FERREIRO')) {
      if (s.inventory.includes('refined_gemstone') && s.inventory.includes('magical_shard')) {
        s.inventory = s.inventory.filter(i => i !== 'refined_gemstone' && i !== 'magical_shard')
        s.inventory.push('magic_sword')
        return { response: e.blacksmithMagicSword, newState: s, newDialogueIndex: d }
      }
      return { response: r.dialogues.village[0], newState: s, newDialogueIndex: d }
    }
    return { response: r.dialogues.village[2], newState: s, newDialogueIndex: d }
  }

  // PÂNTANO
  if (s.location === 'swamp' && (input.includes('FALAR') || input.includes('TALK') || input.includes('WIZARD'))) {
    if (s.inventory.includes('raw_gemstone')) {
      s.inventory = s.inventory.filter(i => i !== 'raw_gemstone')
      s.inventory.push('refined_gemstone', 'magical_shard')
      return { response: e.wizardRefine, newState: s, newDialogueIndex: d }
    }
    return { response: e.wizardLater, newState: s, newDialogueIndex: d }
  }

  // CAPELA
  if (s.location === 'chapel') {
    if ((input === 'OLHAR' || input === 'LOOK') && s.inventory.includes('brass_key') && s.inventory.includes('drinking_flask')) {
      s.inventory = s.inventory.filter(i => i !== 'drinking_flask')
      s.inventory.push('drinking_flask_plus')
      return { response: loc.chapel + '\n\n' + e.flaskUpgrade, newState: s, newDialogueIndex: d }
    }
    
    const zumbiCmds = ['ATACAR', 'MATAR ZUMBI', 'ATTACK', 'KILL ZOMBIE', 'USE SWORD', 'USAR ESPADA']
    if (zumbiCmds.some(v => input === v || input.startsWith(v)) && !d['zombie_dead']) {
      d['zombie_dead'] = 1
      return { response: e.zombieKill, newState: s, newDialogueIndex: d }
    }

    if (['EXAMINAR', 'TUMULO', 'SEPULTURA', 'TOMB', 'GRAVE', 'SEARCH'].some(v => input.includes(v))) {
      if (!d['zombie_dead']) return { response: e.tombEmpty || 'O ZUMBI ESTÁ NO SEU CAMINHO!', newState: s, newDialogueIndex: d }
      if (!s.inventory.includes('zombie_head')) {
        s.inventory.push('zombie_head')
        return { response: e.tombFull, newState: s, newDialogueIndex: d }
      }
      return { response: e.tombEmpty, newState: s, newDialogueIndex: d }
    }
  }

  // --- 5. COMANDOS GENÉRICOS (PRECEDÊNCIA BAIXA) ---
  if (input === 'OLHAR' || input === 'LOOK') {
    let description = r.locations[s.location]
    if (s.location === 'mountain' && s.inventory.includes('raw_gemstone')) {
      description = r.locations.mountain_clear || r.locations.mountain
    }
    // Correção central: Atualiza a descrição no comando OLHAR se o zumbi estiver morto
    if (s.location === 'chapel' && d['zombie_dead']) {
      description = r.locations.chapel_clear || r.locations.chapel
    }
    return { response: description, newState: s, newDialogueIndex: d }
  }

  return { response: r.commands.unknown, newState: s, newDialogueIndex: d }
}

function makeInitialState (initialItems: string[]): GameState {
  return { location: 'plains', inventory: initialItems }
}

export default function ReignOfGrelok () {
  const { t, language, setLanguage } = useLanguage()
  const r = t.reign

  const [gameState, setGameState] = useState<GameState>(() => makeInitialState(r.inventory.initialItems))
  const [dialogueIndex, setDialogueIndex] = useState<DialogueIndex>({})
  const [log, setLog] = useState<LogEntry[]>(() => [{ id: Date.now(), text: r.intro, done: false }])
  const [input, setInput] = useState('')
  const [lastKey, setLastKey] = useState(0)
  const logEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const [pendingLanguage, setPendingLanguage] = useState<Language | null>(null)
  const [awaitingConfirm, setAwaitingConfirm] = useState(false)
  const prevLanguageRef = useRef(language)

  useEffect(() => {
    if (language === prevLanguageRef.current) return
    const incoming = language as Language
    const timeoutId = setTimeout(() => {
      setLanguage(prevLanguageRef.current)
      setPendingLanguage(incoming)
      setAwaitingConfirm(true)
      setLog(prev => [
        ...prev.map(e => ({ ...e, done: true })),
        { id: Date.now(), text: r.commands.langChangePrompt, done: false }
      ])
      setLastKey(k => k + 1)
    }, 0)
    return () => clearTimeout(timeoutId)
  }, [language, setLanguage, r.commands.langChangePrompt])

  useEffect(() => {
    logEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [log.length])

  const handleTypingDone = () => {
    setLog(prev => prev.map((e, i) => (i === prev.length - 1 ? { ...e, done: true } : e)))
  }

  const handleConfirmLanguage = (cmd: string) => {
    const userInput = cmd.trim().toUpperCase()
    const isYes = ['SIM', 'YES', 'Y', 'S'].includes(userInput)
    const isNo = ['NÃO', 'NAO', 'NO', 'N'].includes(userInput)

    if (!isYes && !isNo) {
      setLog(prev => [
        ...prev.map(e => ({ ...e, done: true })),
        { id: Date.now(), text: `> ${cmd}`, isCommand: true, done: true },
        { id: Date.now() + 1, text: r.commands.langChangeRepeat, done: false }
      ])
      setLastKey(k => k + 1)
      return
    }

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

  const handleSubmit = () => {
    if (!input.trim()) return
    const cmd = input.trim()

    if (awaitingConfirm) {
      handleConfirmLanguage(cmd)
      setInput('')
      return
    }

    const { response, newState, newDialogueIndex } = processCommand(cmd, gameState, dialogueIndex, r)
    setLog(prev => [
      ...prev.map(e => ({ ...e, done: true })),
      { id: Date.now(), text: `> ${cmd}`, isCommand: true, done: true },
      { id: Date.now() + 1, text: response, done: false }
    ])
    setGameState(newState)
    setDialogueIndex(newDialogueIndex)
    setInput('')
    setLastKey(k => k + 1)
  }

  return (
    <main className='max-w-3xl mx-auto flex flex-col gap-4'>
      <div className='border-b border-fallout/30 pb-3 flex items-center justify-between'>
        <p className='text-fallout/50 text-sm'>{r.termlink}</p>
        <div className='flex gap-2 text-xs text-fallout/40'>
          <span className='blink-effect'>●</span>
          <span>{r.active}</span>
        </div>
      </div>
      <section className='h-[60vh] overflow-y-scroll flex flex-col gap-3 pr-2' onClick={() => inputRef.current?.focus()}>
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
                onComplete={() => {
                  handleTypingDone()
                  logEndRef.current?.scrollIntoView({ behavior: 'smooth' })
                }}
              />
            ) : (
              <p className='whitespace-pre-wrap text-fallout leading-relaxed text-sm md:text-base font-terminal'>
                {entry.text}
              </p>
            )}
          </div>
        ))}
        <div ref={logEndRef} />
      </section>
      <div className='border-t border-fallout/30 pt-3 flex items-center gap-2'>
        <span className='text-fallout font-terminal text-lg'>&gt;</span>
        <input
          ref={inputRef}
          type='text'
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && handleSubmit()}
          className='flex-1 bg-transparent border-none outline-none text-fallout font-terminal text-lg uppercase placeholder:text-fallout/20 caret-fallout'
          placeholder={r.placeholder}
          autoComplete='off'
          spellCheck={false}
        />
      </div>
    </main>
  )
}
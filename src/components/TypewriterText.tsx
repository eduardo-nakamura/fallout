import { useState, useEffect, useRef, useCallback } from 'react'

interface TypewriterTextProps {
  text: string
  delay?: number
  initialDelay?: number
  onComplete?: () => void
  onStart?: () => void
  className?: string
  cursor?: boolean
  soundEnabled?: boolean
}

export function TypewriterText ({
  text,
  delay = 50,
  initialDelay = 0,
  onComplete,
  className,
  cursor = true,
  soundEnabled = true
}: TypewriterTextProps) {
  const [displayedText, setDisplayedText] = useState('')
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isFinished, setIsFinished] = useState(false)

  const audioRef = useRef<HTMLAudioElement | null>(null)
  const isMounted = useRef(true)

  // 1. Limpeza de montagem (Anti-memory leak)
  useEffect(() => {
    isMounted.current = true
    return () => {
      isMounted.current = false
    }
  }, [])

  // 2. Função de Som
  const playKeySound = useCallback(() => {
    if (!soundEnabled || !audioRef.current || isFinished) return

    const sound = audioRef.current
    sound.currentTime = 0
    sound.volume = 0.005
    sound.play().catch(() => {})
  }, [soundEnabled, isFinished])

  // 3. Carregamento do áudio
  useEffect(() => {
    if (soundEnabled) {
      const audioPath = `${
        import.meta.env.BASE_URL
      }sounds/ui_hacking_charscroll.wav`
      const audio = new Audio(audioPath)
      audioRef.current = audio
    }
    return () => {
      if (audioRef.current) {
        audioRef.current.pause()
        audioRef.current = null
      }
    }
  }, [soundEnabled])

  // 4. Lógica de SKIP (Memoizada com useCallback)
  const skipAnimation = useCallback(() => {
    if (!isFinished && isMounted.current) {
      if (audioRef.current) audioRef.current.pause()
      setDisplayedText(text)
      setCurrentIndex(text.length)
      setIsFinished(true)
      if (onComplete) onComplete()
    }
  }, [isFinished, text, onComplete])

  // 5. ESCUTADOR DE TECLADO GLOBAL (Enter ou Espaço)
  // Dentro do useEffect do handleGlobalKeyDown no TypewriterText.tsx
  useEffect(() => {
    const handleGlobalKeyDown = (event: KeyboardEvent) => {
      if (isFinished) return

      if (event.key === 'Enter' || event.key === ' ') {
        // IMPEDE que o Enter chegue no Input do ReignOfGrelok
        event.stopImmediatePropagation()
        event.preventDefault()

        skipAnimation()
      }
    }

    // Use o modo 'capture' (true) para pegar o evento antes de todo mundo
    window.addEventListener('keydown', handleGlobalKeyDown, true)

    return () => {
      window.removeEventListener('keydown', handleGlobalKeyDown, true)
    }
  }, [skipAnimation, isFinished])

  // 6. LOOP DE DIGITAÇÃO
  useEffect(() => {
    if (isFinished || !isMounted.current) return

    // Delay inicial de entrada
    if (currentIndex === 0) {
      const startTimer = setTimeout(() => {
        if (isMounted.current) setCurrentIndex(1)
      }, initialDelay)
      return () => clearTimeout(startTimer)
    }

    // Processo de "escrever" cada letra
    if (currentIndex <= text.length) {
      const typeTimer = setTimeout(() => {
        if (!isMounted.current) return

        setDisplayedText(text.substring(0, currentIndex))
        playKeySound()

        if (currentIndex < text.length) {
          setCurrentIndex(prev => prev + 1)
        } else {
          setIsFinished(true)
          if (onComplete) onComplete()
        }
      }, delay)

      return () => clearTimeout(typeTimer)
    }
  }, [
    currentIndex,
    text,
    delay,
    initialDelay,
    onComplete,
    playKeySound,
    isFinished
  ])

  return (
    <span
      className={`font-terminal cursor-pointer select-none ${className}`}
      onClick={skipAnimation}
      title='Pressione ENTER ou ESPAÇO para pular'
    >
      {displayedText}
      {!isFinished && (
        <span className='blinking-cursor'>{cursor ? '_' : ''}</span>
      )}
    </span>
  )
}

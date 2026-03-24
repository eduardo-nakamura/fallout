import { useState, useRef, useEffect } from 'react'
import { TypewriterText } from '../components/TypewriterText'

type Location = 'plains' | 'mountain' | 'swamp' | 'village' | 'chapel'

// ALTERADO INÍCIO: GameState agora inclui inventário
interface GameState {
  location: Location
  inventory: string[]
}
// ALTERADO FIM: GameState agora inclui inventário

interface LogEntry {
  text: string
  isCommand?: boolean
  done?: boolean
}

const LOCATIONS: Record<Location, string> = {
  plains: `PLANÍCIE CENTRAL\n────────────────\nVocê está na vasta planície. O céu está cor de chumbo.\nAo NORTE: MONTANHA | Ao SUL: ALDEIA | A LESTE: CAPELA | A OESTE: PÂNTANO`,
  mountain: `MONTANHA SOMBRIA\n────────────────\nRochas negras e íngremes. Uma caverna escancarada cheira a enxofre.\nUm ANÃO FERREIRO bate em bigorna entre as pedras.\nAo SUL: de volta às PLANÍCIES`,
  swamp: `PÂNTANO MALCHEIROSO\n───────────────────\nA lama suga seus pés. Criaturas borbulham sob a superfície.\nUma BRUXA velha remexe um caldeirão fedorento.\nA LESTE: de volta às PLANÍCIES`,
  village: `ALDEIA EM CHAMAS\n────────────────\nCasas fumegam. Aldeões correm em pânico gritando o nome de GRELOK.\nUm ANCIÃO te olha com esperança nos olhos.\nAo NORTE: de volta às PLANÍCIES`,
  chapel: `CAPELA ABANDONADA\n─────────────────\nVitrais quebrados deixam entrar raios de luz dourada.\nUm MAGO de barba longa medita num altar de pedra.\nA OESTE: de volta às PLANÍCIES`,
}

// NOVO INÍCIO: diálogos por personagem com falas rotativas
const DIALOGUES: Partial<Record<Location, string[]>> = {
  mountain: [
    `FERREIRO: "Hmph. Turista.\nSe tiver algo de valor pra forjar, volte. Do contrário, sai da minha luz."`,
    `FERREIRO: "Já forjei lâminas para reis e para mendigos. O resultado depende do material, não do homem.\nVocê tem algum FRAGMENTO DE GEMA? Posso fazer algo... interessante."`,
    `FERREIRO: "A GEM RÚNICA que orbita Grelok só pode ser quebrada por aço impregnado de magia.\nPreciso de três coisas: FRAGMENTO DE GEMA, calor do PÂNTANO, e uma bênção do MAGO.\nTraga-me o fragmento primeiro."`,
  ],
  swamp: [
    `BRUXA: "Ah... um visitante. Ou um idiota. Frequentemente a mesma coisa.\nO que você quer, pequena criatura?"`,
    `BRUXA: "Meu caldeirão precisa de ervas raras. Mas tenho outras moedas de troca...\nSe me trouxer o CANTIL cheio d'água do rio, darei a você algo útil. Talvez."`,
    `BRUXA: "Grelok nasceu desta lama. Eu o vi crescer.\nEle não é imortal — apenas protegido. A GEM em seu peito é o segredo.\nQuebra a gema, quebra o feitiço."`,
  ],
  village: [
    `ANCIÃO: "Herói! Finalmente alguém que não fugiu!\nGrelok ataca toda lua cheia. A próxima é amanhã. Por favor, salve-nos!"`,
    `ANCIÃO: "Meu avô dizia que Grelok teme apenas a ESPADA MÁGICA forjada nas chamas do FERREIRO.\nEle conhecia o segredo da liga. Fale com ele."`,
    `ANCIÃO: "Há um FRAGMENTO DE GEMA escondido na cripta atrás da igreja em chamas.\nNão tenho coragem de buscá-lo. Mas talvez você tenha."`,
  ],
  chapel: [
    `MAGO: "..."\n*O mago abre um olho lentamente.*\n"Você perturba uma meditação de quarenta anos. Isso é ou muito corajoso ou muito tolo."`,
    `MAGO: "Grelok corrompeu a magia deste vale. Para desfazê-la, a lâmina que o ferir deve carregar minha bênção.\nTraga-me a espada forjada pelo FERREIRO e eu a abençoarei."`,
    `MAGO: "Palavras de sabedoria, já que você insiste:\nO poder de Grelok vem da GEM RÚNICA em seu peito.\nSem a ESPADA ABENÇOADA, você mal arranharía a sua superfície.\nPrepare-se bem antes de confrontá-lo."`,
  ],
}
// NOVO FIM: diálogos por personagem com falas rotativas

// NOVO INÍCIO: tipo DialogueIndex
type DialogueIndex = Partial<Record<Location, number>>
// NOVO FIM: tipo DialogueIndex

const INTRO = `REIGN OF GRELOK v1.3
A RobCo Industries(TM) Termlink Production

> Carregando sessão salva... FALHA
> Iniciando nova sessão...

Você acorda numa vasta planície. O vento uiva entre as pedras.
Nos seus bolsos: uma ESPADA ENFERRUJADA e um CANTIL vazio.

Ao NORTE ergue-se uma MONTANHA sombria.
A OESTE borbulha um PÂNTANO malcheiroso.
Ao SUL fumega uma ALDEIA em chamas.
A LESTE reluz uma CAPELA abandonada.

O que você faz?`

// ALTERADO INÍCIO: processCommand recebe e retorna dialogueIndex
function processCommand(
  cmd: string,
  state: GameState,
  dialogueIndex: DialogueIndex
): { response: string; newState: GameState; newDialogueIndex: DialogueIndex } {
  const input = cmd.trim().toUpperCase()
  const s = { ...state, inventory: [...state.inventory] }
  const d = { ...dialogueIndex }

  if (['NORTE', 'N', 'IR NORTE', 'GO NORTH', 'NORTH'].includes(input)) {
    if (s.location === 'plains')  { s.location = 'mountain'; return { response: LOCATIONS.mountain, newState: s, newDialogueIndex: d } }
    if (s.location === 'village') { s.location = 'plains';   return { response: LOCATIONS.plains,   newState: s, newDialogueIndex: d } }
    return { response: 'Não é possível ir ao Norte daqui.', newState: s, newDialogueIndex: d }
  }
  if (['SUL', 'S', 'IR SUL', 'GO SOUTH', 'SOUTH'].includes(input)) {
    if (s.location === 'plains')   { s.location = 'village'; return { response: LOCATIONS.village, newState: s, newDialogueIndex: d } }
    if (s.location === 'mountain') { s.location = 'plains';  return { response: LOCATIONS.plains,  newState: s, newDialogueIndex: d } }
    return { response: 'Não é possível ir ao Sul daqui.', newState: s, newDialogueIndex: d }
  }
  if (['LESTE', 'L', 'IR LESTE', 'GO EAST', 'EAST', 'E'].includes(input)) {
    if (s.location === 'plains') { s.location = 'chapel'; return { response: LOCATIONS.chapel, newState: s, newDialogueIndex: d } }
    if (s.location === 'swamp')  { s.location = 'plains'; return { response: LOCATIONS.plains, newState: s, newDialogueIndex: d } }
    return { response: 'Não é possível ir a Leste daqui.', newState: s, newDialogueIndex: d }
  }
  if (['OESTE', 'O', 'IR OESTE', 'GO WEST', 'WEST', 'W'].includes(input)) {
    if (s.location === 'plains') { s.location = 'swamp';  return { response: LOCATIONS.swamp,  newState: s, newDialogueIndex: d } }
    if (s.location === 'chapel') { s.location = 'plains'; return { response: LOCATIONS.plains, newState: s, newDialogueIndex: d } }
    return { response: 'Não é possível ir a Oeste daqui.', newState: s, newDialogueIndex: d }
  }

  if (['OLHAR', 'LOOK', 'VER', 'EXAMINAR'].includes(input)) {
    return { response: LOCATIONS[s.location], newState: s, newDialogueIndex: d }
  }

  // NOVO INÍCIO: comando inventário
  if (['INVENTÁRIO', 'INVENTARIO', 'INV', 'I'].includes(input)) {
    const items = s.inventory.length > 0
      ? `INVENTÁRIO\n──────────\n${s.inventory.map(item => `  • ${item}`).join('\n')}`
      : `INVENTÁRIO\n──────────\n  (vazio)`
    return { response: items, newState: s, newDialogueIndex: d }
  }
  // NOVO FIM: comando inventário

  // NOVO INÍCIO: comando falar
  if (['FALAR', 'CONVERSAR', 'TALK', 'FALAR COM', 'FALE'].includes(input)) {
    const lines = DIALOGUES[s.location]
    if (!lines) {
      return { response: 'Não há ninguém aqui para conversar.', newState: s, newDialogueIndex: d }
    }
    const current = d[s.location] ?? 0
    const response = lines[current]
    d[s.location] = current < lines.length - 1 ? current + 1 : current
    return { response, newState: s, newDialogueIndex: d }
  }
  // NOVO FIM: comando falar

  return { response: 'Comando não reconhecido. (mais comandos em breve)', newState: s, newDialogueIndex: d }
}
// ALTERADO FIM: processCommand recebe e retorna dialogueIndex

// ALTERADO INÍCIO: inventário inicial com itens da intro
const initialState: GameState = {
  location: 'plains',
  inventory: ['ESPADA ENFERRUJADA', 'CANTIL VAZIO'],
}
// ALTERADO FIM: inventário inicial com itens da intro

export default function ReignOfGrelok() {
  const [gameState, setGameState] = useState<GameState>(initialState)

  // NOVO INÍCIO: estado do índice de diálogo
  const [dialogueIndex, setDialogueIndex] = useState<DialogueIndex>({})
  // NOVO FIM: estado do índice de diálogo

  const [log, setLog] = useState<LogEntry[]>([{ text: INTRO, done: false }])
  const [input, setInput] = useState('')
  const [lastKey, setLastKey] = useState(0)
  const logEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    logEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [log.length])

  useEffect(() => {
    inputRef.current?.focus()
  }, [])

  const handleTypingDone = () => {
    setLog(prev => prev.map((e, i) =>
      i === prev.length - 1 ? { ...e, done: true } : e
    ))
  }

  // ALTERADO INÍCIO: handleSubmit passa e recebe dialogueIndex
  const handleSubmit = () => {
    if (!input.trim()) return
    const cmd = input.trim()
    const { response, newState, newDialogueIndex } = processCommand(cmd, gameState, dialogueIndex)
    setLog(prev => [
      ...prev.map(e => ({ ...e, done: true })),
      { text: `> ${cmd}`, isCommand: true, done: true },
      { text: response, done: false },
    ])
    setGameState(newState)
    setDialogueIndex(newDialogueIndex)
    setInput('')
    setLastKey(k => k + 1)
  }
  // ALTERADO FIM: handleSubmit passa e recebe dialogueIndex

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') handleSubmit()
  }

  return (
    <main className="max-w-3xl mx-auto flex flex-col gap-4">
      <div className="border-b border-fallout/30 pb-3 flex items-center justify-between">
        <p className="text-fallout/50 text-sm">RobCo Industries™ Termlink — Hubris Comics Terminal</p>
        <div className="flex gap-2 text-xs text-fallout/40">
          <span className="blink-effect">●</span>
          <span>ATIVO</span>
        </div>
      </div>
      <section
        className="h-[60vh] overflow-y-scroll flex flex-col gap-3 pr-2"
        onClick={() => inputRef.current?.focus()}
      >
        {log.map((entry, i) => (
          <div key={i}>
            {entry.isCommand ? (
              <p className="text-fallout/70 font-terminal text-sm">{entry.text}</p>
            ) : !entry.done ? (
              <TypewriterText
                key={lastKey}
                text={entry.text}
                delay={12}
                className="whitespace-pre-wrap text-fallout leading-relaxed text-sm md:text-base"
                cursor={false}
                onComplete={() => {
                  handleTypingDone()
                  logEndRef.current?.scrollIntoView({ behavior: 'smooth' })
                }}
              />
            ) : (
              <p className="whitespace-pre-wrap text-fallout leading-relaxed text-sm md:text-base font-terminal">
                {entry.text}
              </p>
            )}
          </div>
        ))}
        <div ref={logEndRef} />
      </section>
      <div className="border-t border-fallout/30 pt-3 flex items-center gap-2">
        <span className="text-fallout font-terminal text-lg">&gt;</span>
        <input
          ref={inputRef}
          type="text"
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          className="flex-1 bg-transparent border-none outline-none text-fallout font-terminal text-lg uppercase placeholder:text-fallout/20 caret-fallout"
          placeholder="INSIRA COMANDO..."
          autoComplete="off"
          spellCheck={false}
        />
      </div>
    </main>
  )
}
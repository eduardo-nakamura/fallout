import type { Dictionary } from '../i18n'

export type Location = 'plains' | 'mountain' | 'swamp' | 'village' | 'chapel'

export interface GameState {
  location: Location
  inventory: string[]
}

export type DialogueIndex = Partial<Record<Location, number>> &
  Record<string, number | undefined>

export function makeInitialState (initialItems: string[]): GameState {
  return { location: 'plains', inventory: initialItems }
}

export function processCommand (
  cmd: string,
  state: GameState,
  dialogueIndex: DialogueIndex,
  r: Dictionary['reign']
): { response: string; newState: GameState; newDialogueIndex: DialogueIndex } {
  const input = cmd.trim().toUpperCase()
  const s: GameState = { ...state, inventory: [...state.inventory] }
  const d: DialogueIndex = { ...dialogueIndex }
  const { events: e } = r

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

  // --- 2. NAVEGAÇÃO ---
  const movementMap: Record<Location, Partial<Record<string, Location>>> = {
    plains: {
      NORTE: 'mountain',
      NORTH: 'mountain',
      N: 'mountain',
      SUL: 'village',
      SOUTH: 'village',
      S: 'village',
      LESTE: 'chapel',
      EAST: 'chapel',
      L: 'chapel',
      OESTE: 'swamp',
      WEST: 'swamp',
      W: 'swamp',
      O: 'swamp'
    },
    mountain: { SUL: 'plains', SOUTH: 'plains', S: 'plains' },
    village: { NORTE: 'plains', NORTH: 'plains', N: 'plains' },
    chapel: { OESTE: 'plains', WEST: 'plains', W: 'plains', O: 'plains' },
    swamp: { LESTE: 'plains', EAST: 'plains', L: 'plains' }
  }

  const currentMap = movementMap[s.location]
  let destination: Location | undefined
  const directions = [
    'NORTE',
    'NORTH',
    'N',
    'SUL',
    'SOUTH',
    'S',
    'LESTE',
    'EAST',
    'L',
    'OESTE',
    'WEST',
    'W',
    'O'
  ]

  if (input.startsWith('IR ') || input.startsWith('GO ')) {
    const dir = input.split(' ').slice(1).join(' ')
    if (currentMap[dir]) destination = currentMap[dir]
    else
      return {
        response: r.commands.noPath || 'NÃO HÁ CAMINHO POR ESTE LADO.',
        newState: s,
        newDialogueIndex: d
      }
  } else if (directions.includes(input)) {
    if (currentMap[input]) destination = currentMap[input]
    else
      return {
        response: r.commands.noPath || 'NÃO HÁ CAMINHO POR ESTE LADO.',
        newState: s,
        newDialogueIndex: d
      }
  }

  if (destination) {
    s.location = destination
    let desc = r.locations[s.location] || ''
    if (s.location === 'mountain' && s.inventory.includes('raw_gemstone'))
      desc = r.locations.mountain_clear || r.locations.mountain
    if (s.location === 'chapel' && d['zombie_dead'])
      desc = r.locations.chapel_clear || r.locations.chapel
    return {
      response: `${r.commands.currentLocation}: ${
        r.locationNames[s.location]
      }\n\n${desc}`,
      newState: s,
      newDialogueIndex: d
    }
  }

  // --- 3. AÇÕES ESPECÍFICAS DE LOCAL (PRIORIDADE SOBRE ITENS) ---

  // CAPELA
  if (s.location === 'chapel') {
    // Saquear Túmulo (Se o input contém palavras de túmulo)
    const isInteractingWithTomb = [
      'TUMULO',
      'GRAVE',
      'SEPULTURA',
      'TÚMULO'
    ].some(v => input.includes(v))

    if (isInteractingWithTomb) {
      if (!d['zombie_dead'])
        return {
          response: 'O ZUMBI ESTÁ NO SEU CAMINHO!',
          newState: s,
          newDialogueIndex: d
        }
      if (!s.inventory.includes('zombie_head')) {
        s.inventory.push('zombie_head')
        return { response: e.tombFull, newState: s, newDialogueIndex: d }
      }
      return { response: e.tombEmpty, newState: s, newDialogueIndex: d }
    }

    // Upgrade do Frasco (Se o input for apenas OLHAR e tiver os itens)
    if (
      ['CHAVE', 'LATÃO', 'BRASS', 'KEY'].some(v => input.includes(v)) &&
      s.inventory.includes('brass_key') &&
      s.inventory.includes('drinking_flask')
    ) {
      s.inventory = s.inventory.filter(i => i !== 'drinking_flask')
      s.inventory.push('drinking_flask_plus')
      return {
        response: r.locations.chapel + '\n\n' + e.flaskUpgrade,
        newState: s,
        newDialogueIndex: d
      }
    }

    // Ataque ao Zumbi
    if (
      ['ATACAR', 'MATAR', 'KILL', 'ATTACK'].some(v => input.includes(v)) &&
      !d['zombie_dead']
    ) {
      d['zombie_dead'] = 1
      return { response: e.zombieKill, newState: s, newDialogueIndex: d }
    }
  }

  // MONTANHA
  if (s.location === 'mountain') {
    if (
      !s.inventory.includes('raw_gemstone') &&
      ['PEGAR GEMA', 'GET GEM', 'COLETAR'].some(v => input.includes(v))
    ) {
      s.inventory.push('raw_gemstone')
      return { response: e.getGemstone, newState: s, newDialogueIndex: d }
    }
    if (
      ['ATACAR', 'KILL', 'GRELOK', 'USAR ESPADA'].some(v => input.includes(v))
    ) {
      const resp = s.inventory.includes('magic_sword')
        ? e.grelokDefeated
        : e.grelokAlive
      return { response: resp, newState: s, newDialogueIndex: d }
    }
  }

  // VILA (Conversas)
  if (
    s.location === 'village' &&
    (input.includes('FALAR') || input.includes('TALK'))
  ) {
    if (input.includes('PADRE') || input.includes('PRIEST')) {
      if (s.inventory.includes('zombie_head')) {
        s.inventory = s.inventory.filter(i => i !== 'zombie_head')
        s.inventory.push('brass_key')
        return { response: e.priestBrassKey, newState: s, newDialogueIndex: d }
      }
      return {
        response: r.dialogues.village[1],
        newState: s,
        newDialogueIndex: d
      }
    }
    if (input.includes('FERREIRO') || input.includes('BLACKSMITH')) {
      if (
        s.inventory.includes('refined_gemstone') &&
        s.inventory.includes('magical_shard')
      ) {
        s.inventory = s.inventory.filter(
          i => i !== 'refined_gemstone' && i !== 'magical_shard'
        )
        s.inventory.push('magic_sword')
        return {
          response: e.blacksmithMagicSword,
          newState: s,
          newDialogueIndex: d
        }
      }
      return {
        response: r.dialogues.village[0],
        newState: s,
        newDialogueIndex: d
      }
    }
    return {
      response: r.dialogues.village[2],
      newState: s,
      newDialogueIndex: d
    }
  }

  // PÂNTANO (Mago)
  if (
    s.location === 'swamp' &&
    (input.includes('FALAR') ||
      input.includes('MAGO') ||
      input.includes('WIZARD'))
  ) {
    if (s.inventory.includes('raw_gemstone')) {
      s.inventory = s.inventory.filter(i => i !== 'raw_gemstone')
      s.inventory.push('refined_gemstone', 'magical_shard')
      d['wizard_state'] = 1
      return {
        response: r.dialogues.swamp[1],
        newState: s,
        newDialogueIndex: d
      }
    }
    if (d['wizard_state'] === 1) {
      d['wizard_state'] = 2
      return {
        response: r.dialogues.swamp[2],
        newState: s,
        newDialogueIndex: d
      }
    }
    if (d['wizard_state'] === 2)
      return {
        response: r.dialogues.swamp[3],
        newState: s,
        newDialogueIndex: d
      }
    return { response: r.dialogues.swamp[0], newState: s, newDialogueIndex: d }
  }

  // --- 4. OLHAR ITEM NO INVENTÁRIO (SÓ SE NÃO FOI AÇÃO DE LOCAL) ---
  if (input.startsWith('OLHAR ') || input.startsWith('LOOK ')) {
    const term = input.split(' ').slice(1).join(' ').toLowerCase()
    const foundItemKey = s.inventory.find(itemKey => {
      const fullName = r.inventory.itemNames[itemKey].toLowerCase()
      return fullName.includes(term)
    })

    if (foundItemKey) {
      return {
        response: r.itemDescriptions[foundItemKey],
        newState: s,
        newDialogueIndex: d
      }
    }
    // Se não achou no inventário, não retorna erro ainda, deixa chegar no final
  }

  // --- 5. OLHAR AMBIENTE (FALLBACK) ---
  if (input === 'OLHAR' || input === 'LOOK') {
    let description = r.locations[s.location]
    if (s.location === 'mountain' && s.inventory.includes('raw_gemstone'))
      description = r.locations.mountain_clear || r.locations.mountain
    if (s.location === 'chapel' && d['zombie_dead'])
      description = r.locations.chapel_clear || r.locations.chapel
    return { response: description, newState: s, newDialogueIndex: d }
  }

  // --- 6. ERROS FINAIS ---
  if (input.startsWith('OLHAR ') || input.startsWith('LOOK ')) {
    return {
      response: `VOCÊ NÃO VÊ NADA CHAMADO '${input
        .split(' ')
        .slice(1)
        .join(' ')}' AQUI.`,
      newState: s,
      newDialogueIndex: d
    }
  }

  if (input === 'HOME' || input === 'SAIR' || input === 'MENU') {
    return {
      response: 'VOLTANDO PARA A TELA INICIAL...', // Esta mensagem mal vai aparecer, pois a troca é rápida
      newState: s,
      newDialogueIndex: d
    }
  }
  if (input === 'BACON')
    return {
      response: 'Bacon ipsum dolor amet...',
      newState: s,
      newDialogueIndex: d
    }

  return { response: r.commands.unknown, newState: s, newDialogueIndex: d }
}

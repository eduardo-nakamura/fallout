// src/i18n/index.ts

export const SUPPORTED_LANGUAGES = ['pt', 'en'] as const
export type Language = typeof SUPPORTED_LANGUAGES[number]

export interface Dictionary {
  loading: string

  header: {
    copyright: string
    server: string
    settingsLabel: string
  }

  footer: {
    text: string
  }

  home: {
    terminal: string
    reignOfGrelok: string
    about: string
    options: string
  }

  about: {
    title: string
    welcome: string
    back: string
  }

  options: {
    title: string
    language: string
    back: string
  }

  terminal: {
    selectDatabase: string
    filter: string
    decrypting: string
    noTerminalSelected: string
    backToList: string
    backToGames: string
    errorNotFound: string
    errorConnection: string
  }

  // — Reign of Grelok —
  reign: {
    termlink: string
    active: string
    placeholder: string
    intro: string
    
    // Nomes curtos para o "Você está em: X"
    locationNames: {
      plains: string
      mountain: string
      swamp: string
      village: string
      chapel: string
    }

    // Descrições longas (Ação OLHAR)
    locations: {
      plains: string
      mountain: string
      mountain_clear: string
      swamp: string
      village: string
      chapel: string
      chapel_clear: string
    }

    dialogues: {
      mountain: string[]
      swamp: string[]
      village: string[]
      chapel: string[]
    }

    inventory: {
      title: string
      empty: string
      initialItems: string[]
      itemNames: Record<string, string>
    }

    // Descrições específicas para quando o jogador usa "OLHAR [ITEM]"
    itemDescriptions: Record<string, string>

    // Mensagens de eventos, lutas e trocas de itens
    events: {
      grelokAlive: string
      grelokDefeated: string
      getGemstone: string
      priestBrassKey: string
      blacksmithMagicSword: string
      wizardRefine: string
      wizardLater: string
      zombieKill: string
      tombEmpty: string
      tombFull: string
      flaskUpgrade: string
      help: string
    }

    commands: {
      currentLocation: string
      noNorth: string
      noSouth: string
      noEast: string
      noWest: string
      noOne: string
      unknown: string
      noPath: string
      langChangePrompt: string
      langChangeRepeat: string
      langChangeCancelled: string
      reset: string
    }
  }
}

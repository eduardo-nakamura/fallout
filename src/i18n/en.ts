import type { Dictionary } from './index'

// NOVO INÍCIO: dicionário inglês
const en: Dictionary = {
  loading: 'Loading...',

  header: {
    copyright: 'copyright 2075-2077 robco industries',
    server: 'Server',
    settingsLabel: 'Settings'
  },

  footer: {
    text: 'RobCo Industries™ — All rights reserved'
  },

  home: {
    terminal: 'Terminal',
    reignOfGrelok: 'Reign of Grelok',
    about: 'About',
    options: 'Options'
  },

  about: {
    title: 'About',
    welcome: 'Welcome, Overseer. Your Vault-Tec systems are online.',
    back: 'Back'
  },

  options: {
    title: 'Options',
    language: 'Language',
    back: 'Back'
  },

  terminal: {
    selectDatabase: 'SYSTEM READY. SELECT DATABASE:',
    filter: 'FILTER > ',
    decrypting: 'DECRYPTING DATA...',
    noTerminalSelected: 'NO TERMINAL SELECTED',
    backToList: '← BACK TO LIST',
    backToGames: '[ List of Games ]',
    errorNotFound: 'DATA CORRUPTED: TERMINAL NOT FOUND',
    errorConnection: 'CONNECTION ERROR: LINK TO MAINFRAME LOST'
  },

  reign: {
    termlink: "ROBCO INDUSTRIES UNIFIED OPERATING SYSTEM",
    active: "ACTIVE USER: GRELOK",
    placeholder: "ENTER COMMAND...",
    intro: `REIGN OF GRELOK v1.3\nA RobCo Termlink Production\n\nYou wake on a vast plain. The sun is hidden by heavy clouds.\nTo the NORTH is the MOUNTAIN, to the SOUTH the VILLAGE, to the WEST the SWAMP, and to the EAST the CHAPEL.\n\nWhat do you do?`,
    
    locationNames: {
      plains: "PLAINS",
      mountain: "MOUNTAINS",
      swamp: "SWAMP",
      village: "VILLAGE",
      chapel: "CHAPEL"
    },

    locations: {
      plains: "You are standing in a wide plain. Foothills stretch to the north, where clouds gather around an ominous peak. A dirt path winds from a lonely chapel to the east, through the plains where you're standing, and south into a bustling town. Wispy mists gather over marshland in the west, where a thin tower stands alone in the bog.\n\nYou examine your surroundings...",
      mountain: "You are on the craggy, windblasted face of a mountain. Stormclouds coil above the summit, pelting you and the sparse vegetation with torrential downpour. Far below, beyond the foothills, a wide plain stretches across the southern horizon.\n\nGrelok is here, spewing heresies.\n\nA glint between the rocks catches your eye. You see a RAW GEMSTONE",
      mountain_clear: "You are on the craggy, windblasted face of a mountain. Stormclouds coil above the summit, pelting you and the sparse vegetation with torrential downpour. Far below, beyond the foothills, a wide plain stretches across the southern horizon.\n\nGrelok is here, spewing heresies.",
      swamp: "The fog is thick. An elderly Wizard studies scrolls among twisted roots.",
      village: "You're standing in the dusty market square of a quiet town. Many of the shops and homes lie abandoned, and the citzens that can be seen speak in hushed voices, casting furtive glances at the darkened skyline in the distant north. The ringing of an anvil breaks the silence regularly, where a mustachioed blacksmith bends over his work in a nearby tent.\n\nThe blacksmith is here, working.\n\nA priest is here, drinking.",
      chapel: "You stand at the end of a dirt path, facing a small chapel. The stucco walls are faded, many roof tiles are missing. The great oaken doors are locked. The congregation is nowhere to be found. A small cemetery of crooked headstones lies in the shadow of the cracked steeple. The dirt path winds westward through a great, featureless plain.\n\nA zombie totters aimlessly nearby.\n\nThere is an open grave nearby.",
      chapel_clear: "You stand at the end of a dirt path, facing a small chapel. The stucco walls are faded, many roof tiles are missing. The great oaken doors are locked. The congregation is nowhere to be found. A small cemetery of crooked headstones lies in the shadow of the cracked steeple. The dirt path winds westward through a great, featureless plain.\n\nA zombie totters aimlessly nearby.\n\nThere is an open grave nearby."
    },

    dialogues: {
      village: [
        `Your eyes water from the smoke and smarmy heat inside the tent. The huge man swipes sweat from his bald head and looks up from his work.\n\n"There's no shortage of work to be done with Grelok scarin' everyone witless. Leave me to filling my orders, stranger." With that, the blacksmith dismisses you from his tent and douses a hot blade in water, hissing with steam.`,
        `The priest notices your approach and looks up from his swilling.\n"Grelok is come, and we are forsaken!", he cries. "Urp!", he continues.\n\nAs you recover from the stench of the priestly belch, you are told that the priest has fled from his nearby chapel. When Grelok arrived on the mountain, the dead in his cemetery began to rise, and his congregation scattered.\n\n"If you could rid the place of the zombies", he tells you, "I'll give you the key, and you can help yourself to the apothecary"`,
        `Talk to who?`
      ],
      swamp: [
        "The Wizard says: 'I do not feel the power of the gemstone with you. Return when you find it.'",
        "The Wizard chants a spell: 'The raw gemstone now glows with purity!'"
      ],
      mountain: ["GRELOK ROARS: 'YOU ARE NO MATCH FOR MY POWER!'"],
      chapel: ["The zombie gnashes its teeth. It will not let you pass."]
    },

    inventory: {
      title: "INVENTORY",
      empty: "  (empty)",
      initialItems: ["rusty_sword", "drinking_flask"],
      itemNames: {
        rusty_sword: "RUSTY SWORD",
        drinking_flask: "DRINKING FLASK",
        drinking_flask_plus: "DRINKING FLASK+",
        zombie_head: "ZOMBIE HEAD",
        refined_gemstone: "REFINED GEMSTONE",
        magical_shard: "MAGICAL SHARD",
        magic_sword: "MAGIC SWORD",
        brass_key: "BRASS KEY",
        raw_gemstone: "RAW GEMSTONE"
      }
    },

    itemDescriptions: {
      rusty_sword: "An old, notched blade. It would barely cut bread.",
      drinking_flask: "A common metal flask for carrying water.",
      drinking_flask_plus: "The flask now glows with a holy aura and purified water.",
      raw_gemstone: "A dull stone, yet it pulses with an internal energy.",
      brass_key: "A heavy key that smells of incense and mold.",
      zombie_head: "The gruesome proof that the chapel's guardian has been defeated.",
      magic_sword: "A perfectly forged blade vibrating with magical power."
    },

    events: {
      grelokAlive: "Your puny weapons are useless on Grelok.",
      grelokDefeated: "The MAGIC SWORD pierces Grelok's chest! Evil has been banished from this land! VICTORY!",
      getGemstone: "You collect the RAW GEMSTONE from the cold mountain rocks.",
      priestBrassKey: "The Priest blesses the dead head and exchanges it for a BRASS KEY.",
      blacksmithMagicSword: "The Blacksmith uses your materials to forge the legendary MAGIC SWORD!",
      wizardRefine: "The Wizard transmutes your Raw Gemstone into a REFINED GEMSTONE and a MAGICAL SHARD!",
      wizardLater: "The Wizard ignores you. He seems interested only in raw gemstones.",
      zombieKill: "Your blow knocks the zombie into a grave.",
      tombEmpty: "There is a deep, empty grave in the cemetery. Several bloated rats floating in a foot of filthy water at the bottom. Don't fall in!",
      tombFull: "There is a deep, empty grave in the cemetery. Several bloated rats floating in a foot of filthy water at the bottom. Don't fall in!\n\nA grotesque zombie head is stuck on a root near the top of the grave. You bag the horrific trophy as proof of your deed.",
      flaskUpgrade: "The Brass Key glows! Your Drinking Flask has been purified into Drinking Flask+.",
      help: "Commands: N, S, E, W, LOOK, TALK [TARGET], GET [ITEM], USE [ITEM] ON [TARGET], INVENTORY, RESET."
    },

    commands: {
      currentLocation: "YOU ARE IN",
      noNorth: "The rocks are too slippery to climb here.",
      noSouth: "A barrier of thorns prevents you from going further south.",
      noEast: "The fog prevents you from seeing the path east.",
      noWest: "The swamp mud is too deep in this direction.",
      noOne: "There is no one here to talk to.",
      unknown: "Invalid command. Type 'HELP' to see your options.",
      langChangePrompt: "> WARNING: Changing language will restart the game. Continue? (Y/N)",
      langChangeRepeat: "Please answer with Y or N.",
      langChangeCancelled: "Language change cancelled."
    }
  }
}

export default en
// NOVO FIM: dicionário inglês

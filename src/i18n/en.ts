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
      swamp: "You are standing on a narrow stone path in a dark marsh. Greasy bubbles float to the top of the bog-waters on either side and pop lazily, spattering your legs with muck and slime. A short, stone tower squats here. No door is visible, and the stones are smooth and polished. A balcony juts out midway up the tower's face. The heady smells of incense mix with the nauseating stench of the swamp. The stone path unfurls eastward, towards a broad plain beyond the marshes.\n\nA wizard is here, gesticulating wildly from his balcony.",
      village: "You're standing in the dusty market square of a quiet town. Many of the shops and homes lie abandoned, and the citzens that can be seen speak in hushed voices, casting furtive glances at the darkened skyline in the distant north. The ringing of an anvil breaks the silence regularly, where a mustachioed blacksmith bends over his work in a nearby tent.\n\nThe blacksmith is here, working.\n\nA priest is here, drinking.",
      chapel: "You stand at the end of a dirt path, facing a small chapel. The stucco walls are faded, many roof tiles are missing. The great oaken doors are locked. The congregation is nowhere to be found. A small cemetery of crooked headstones lies in the shadow of the cracked steeple. The dirt path winds westward through a great, featureless plain.\n\nA zombie totters aimlessly nearby.\n\nThere is an open grave nearby.",
      chapel_clear: "You stand at the end of a dirt path, facing a small chapel. The stucco walls are faded, many roof tiles are missing. The great oaken doors are locked. The congregation is nowhere to be found. A small cemetery of crooked headstones lies in the shadow of the cracked steeple. The dirt path winds westward through a great, featureless plain.\n\nA zombie totters aimlessly nearby.\n\nThere is an open grave nearby."
    },

    dialogues: {
      village: [
        `Your eyes water from the smoke and smarmy heat inside the tent. The huge man swipes sweat from his bald head and looks up from his work.\n\n"There's no shortage of work to be done with Grelok scarin' everyone witless. Leave me to filling my orders, stranger." With that, the blacksmith dismisses you from his tent and douses a hot blade in water, hissing with steam.`,
        `The priest notices your approach and looks up from his swilling.\n"Grelok is come, and we are forsaken!", he cries. "Urp!", he continues.\n\nAs you recover from the stench of the priestly belch, you are told that the priest has fled from his nearby chapel. When Grelok arrived on the mountain, the dead in his cemetery began to rise, and his congregation scattered.\n\n"If you could rid the place of the zombies", he tells you, "I'll give you the key, and you can help yourself to the apothecary"`,
        `Talk to who?`,
        `The priest is drinking water, poring over a thick, leatherbound volume connected by a thick leather thong to his neck. He notices you only when you've come very close.\n\n"Ah, good friend! Have you gone ahead to open the chapel? My body still aches with drink, I'm afraid, but soon I will gather the congregation and return myself."`
      ],
      swamp: [
        `The wizard beckons wildly at you from his balcony. "You're here, you've arrived!", he exclaims. After an awkward silence, he jabs an excited finger into a crystal ball, nearly knocking it into the bog.\n\n"I've seen, you see. You're the one to defeat Grelok. Hoo-hoo!" The little man hops onto the railing, spinning a pirouette. "Now the time's come to play my part. Toss up the gem!"\n\nThe wizard's brow furrows. "Got things a bit out of order, have I? Come back when you've got a powerful gemstone. Soon - I've never got to fulfill a prophecy before!"`,
        `"Hoo-hoo! The slayer of Grelok approaches, raw stone in hand, just as I've seen!" The wizard's pointy hat bobs excitedly as he points a finger at you. Suddenly, a pale orange arc of light extends from the knobby finger and draws the gemstone from your bag before you can react. The gemstone halts and hovers in the air before the wizard's nose.\n\n"Essence be true, powers renew, Fatty-Hoo-Do!" With that, he slaps the hovering stone, smashing it against the smooth stone of the tower. In a burst of light, the stone splits into two, and one lands in each outstretched palm of the hopping little wizard.\n\n"Shard for the sword. Wrap her in iron and she'll find Grelok's black heart for you. Take the chaff, too. You'll need payment for a smith to forge the weapon." He tosses the stones down which you leap forward to catch safely.`,
        `"Get you to a smithy! Forge the shard with sword, and defeat Grelok!"\n\nThe wizard tosses some pebbles down to shoo you away and busies himself conjuring colored puffs of smoke.`,
        `The wizard is shooing you away, his sleeves flopping about.\n\n"Go! Find the gemstone and return, so I can play my part!"`
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
      rusty_sword: "Your weapon. Rusty, but trusty.",
      drinking_flask: "A very small flask to carry water.",
      drinking_flask_plus: "The flask now glows with a holy aura and purified water.",
      raw_gemstone: "This gemstone may be valuable...",
      refined_gemstone: "A brilliant, faceted gemstone",
      magical_shard: "The gem shard pulses with magical light...",
      brass_key: "Key given to you by the priest",
      zombie_head: "The smell may make you unpopular...",
      magic_sword: "An enchanted weapon to defeat Grelok"
    },

    events: {
      grelokAlive: "Your puny weapons are useless on Grelok.",
      grelokDefeated: `When you draw your sword, Grelok lowers his great horned head and bellows laughter in your face. You grit your teeth and swing a mighty two-handed blow, the magical blade ringing clearly, even amid the tumult of throaty cackling.\n\nYou swing the sword so fiercely, it escapes your grip and hurtles into the open maw of the monstrosity, lost from sight in the arid darkness of Grelok's throat. You step back as Grelok jerks his mouth shut and stands upright. He is still for a moment, then starts clawing at his neck. Muffled, a ringing can be heard as if from a great distance.\n\nSuddenly, Grelok's chest bursts in a fount of viscous, green blood. The Ringing can be heard clearly now, and as thick lifeblood oozes around the protruding tip of the magic sword, the stormclouds swirling the peak are already clearing. Grelok is defeated!\n\nTHE END\n(Thanks for playing!)`,
      getGemstone: "You collect the RAW GEMSTONE from the cold mountain rocks.",
      priestBrassKey: `The priest drunkenly curses the undead who have defiled his church. You present him with the decapitated zombie head from your bag.\n\n"Praise you!", he hiccups. "Perhaps Grelok's influence isn't so strong!". With that, he turns his decanter over on the head and tosses into a fireplace, where it bursts into purple flame and burns up almost instantly.\n\n"I must gather the faithful." He presses a brass key into your palm, "Please, help yourself to what little may be of use at my chapel."`,
      blacksmithMagicSword: `The blacksmith regards you gruffly and is about to dismiss you when you produce the polished gemstone from your bag. He sets his hammer aside and twirls his moustache.\n\n"A right fine stone, that is." He says, admiring the faceted stone, "What would you be needin', then?"\n\nFollowing your careful instructions, the smithy re-forges your rusty sword with the magical shard at the center of the blade.`,
      wizardRefine: "The Wizard transmutes your Raw Gemstone into a REFINED GEMSTONE and a MAGICAL SHARD!",
      wizardLater: "The Wizard ignores you. He seems interested only in raw gemstones.",
      zombieKill: "Your blow knocks the zombie into a grave.",
      tombEmpty: "There is a deep, empty grave in the cemetery. Several bloated rats floating in a foot of filthy water at the bottom. Don't fall in!",
      tombFull: "There is a deep, empty grave in the cemetery. Several bloated rats floating in a foot of filthy water at the bottom. Don't fall in!\n\nA grotesque zombie head is stuck on a root near the top of the grave. You bag the horrific trophy as proof of your deed.",
      flaskUpgrade: `Dust motes hang lazily in the shafts of colored light stretching across the chapel from peaked windows. The pews, pulpit, and everything else are covered in a fine mist. There is a very deep stone cistern near the entrance. It is full to the brim with blessed water.\n\nThere is more than enough water here to fill your tiny flask.`,
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
      langChangeCancelled: "Language change cancelled.",
      reset: '........................................\nResetting.\n........................................',
      noPath: 'There is no path in this direction.'
    }
  }
}

export default en
// NOVO FIM: dicionário inglês

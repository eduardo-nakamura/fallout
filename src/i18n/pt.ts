import type { Dictionary } from './index'

// NOVO INÍCIO: dicionário português
const pt: Dictionary = {
  loading: 'Carregando...',

  header: {
    copyright: 'copyright 2075-2077 robco industries',
    server: 'Servidor',
    settingsLabel: 'Configurações'
  },

  footer: {
    text: 'RobCo Industries™ — Todos os direitos reservados'
  },

  home: {
    terminal: 'Terminal',
    reignOfGrelok: 'Reign of Grelok',
    about: 'Sobre',
    options: 'Opções'
  },

  about: {
    title: 'Sobre',
    welcome: 'Bem-vindo, Supervisor. Seus sistemas Vault-Tec estão online.',
    back: 'Voltar'
  },

  options: {
    title: 'Opções',
    language: 'Idioma',
    back: 'Voltar'
  },

  terminal: {
    selectDatabase: 'SISTEMA PRONTO. SELECIONE O BANCO DE DADOS:',
    filter: 'FILTRAR > ',
    decrypting: 'DESCRIPTOGRAFANDO DADOS...',
    noTerminalSelected: 'NENHUM TERMINAL SELECIONADO',
    backToList: '← VOLTAR À LISTA',
    backToGames: '[ Lista de Jogos ]',
    errorNotFound: 'DADOS CORROMPIDOS: TERMINAL NÃO ENCONTRADO',
    errorConnection: 'ERRO DE CONEXÃO: LINK COM O MAINFRAME PERDIDO'
  },

  reign: {
    termlink: "ROBCO INDUSTRIES UNIFIED OPERATING SYSTEM",
    active: "USUÁRIO ATIVO: GRELOK",
    placeholder: "DIGITE UM COMANDO...",
    intro: `REIGN OF GRELOK v1.3\nUma Produção RobCo Termlink\n\nVocê acorda em uma vasta planície. O sol está escondido por nuvens pesadas.\nAo NORTE fica a MONTANHA, ao SUL a VILA, a OESTE o PÂNTANO e a LESTE a CAPELA.\n\nO que você deseja fazer?`,
    
    locationNames: {
      plains: "PLANÍCIE",
      mountain: "MONTANHAS",
      swamp: "PÂNTANO",
      village: "VILA",
      chapel: "CAPELA"
    },

    locations: {
      plains: "Você está em uma vasta planície. Colinas se estendem ao norte, onde nuvens se acumulam em torno de um pico sinistro. Um caminho de terra serpenteia de uma capela solitária a leste, passa pelas planícies onde você está e segue ao sul em direção a uma vila movimentada. Uma névoas tênue paira sobre o pântano a oeste, onde uma torre esguia ergue-se solitária no lamaçal.\n\nVocê examina seus arredores...",
      mountain: "Você está na encosta rochosa e varrida pelo vento de uma montanha. Nuvens de tempestade se enrolam sobre o cume, castigando você e a vegetação esparsa com chuvas torrenciais. Bem abaixo, além das colinas, uma vasta planície se estende no horizonte sul.\n\nGrelok está aqui, proferindo heresias.\n\nUm brilho entre as rochas chama sua atenção. Você ve uma Gema Bruta",
      mountain_clear: "Você está na encosta rochosa e varrida pelo vento de uma montanha. Nuvens de tempestade se enrolam sobre o cume, castigando você e a vegetação esparsa com chuvas torrenciais. Bem abaixo, além das colinas, uma vasta planície se estende no horizonte sul.\n\nGrelok está aqui, proferindo heresias.",
      swamp: "A neblina é espessa. Um Mago idoso estuda pergaminhos entre as raízes retorcidas.",
      village: "Você está parado na praça empoeirada de uma vila silenciosa. Muitas das lojas e casas estão abandonadas, e os poucos moradores que se vêem falam em sussurros, lançando olhares para o horizonte escuro ao norte. O som de uma bigorna quebra o silêncio de vez em quando, enquanto um ferreiro de bigode se debruça sobre seus produtos em uma tenda próxima.\n\nO ferreiro está trabalhando.\n\nO padre está bebendo.",
      chapel: "Você está no final de uma trilha de terra, de frente para uma pequena capela. As paredes de estuque estão desbotadas, muitas telhas faltam. As grandes portas de carvalho estão trancadas. A congregação não está em lugar nenhum. Um pequeno cemitério de lápides tortas fica à sombra da torre rachada. A trilha de terra serpenteia para oeste através de uma grande planície sem características marcantes.\n\nUm zumbi cambaleia sem rumo por perto.\n\nHá uma sepultura aberta nas proximidades.",
      chapel_clear: "Você está no final de uma trilha de terra, de frente para uma pequena capela. As paredes de estuque estão desbotadas, muitas telhas faltam. As grandes portas de carvalho estão trancadas. A congregação não está em lugar nenhum. Um pequeno cemitério de lápides tortas fica à sombra da torre rachada. A trilha de terra serpenteia para oeste através de uma grande planície sem características marcantes.\n\nHá uma sepultura aberta nas proximidades."
    },

    dialogues: {
      village: [
        `Seus olhos lacrimejam por causa da fumaça e do calor abafado dentro da tenda. O homem enorme enxuga o suor da cabeça calva e levanta os olhos.\n\n"Não falta trabalho a fazer com Grelok assustando todo mundo. Deixe-me cumprir minhas encomendas, forasteiro." Com isso, o ferreiro o dispensa da tenda e molha uma lâmina quente em água, que solta vapor.`,
        `O padre percebe sua aproximação e levanta os olhos."Grelok chegou e estamos perdidos!", ele grita. "Burp!", continua.\n\nEnquanto você se recupera do fedor do arroto do padre, ele conta que ele fugiu de sua capela. Quando Grelok chegou à montanha, o morto em seu cemitério começou a se levantar e sua congregação se dispersou.\n\n"Se você pudesse livrar o lugar do zumbi", ele lhe diz, "eu lhe daria a chave e você poderia se servir do apotecário."`,
        `Falar com quem?`
      ],
      swamp: [
        "O Mago diz: 'Não sinto o poder da gema com você. Volte quando a encontrar.'",
        "O Mago entoa um feitiço: 'A gema bruta agora brilha com pureza!'"
      ],
      mountain: ["GRELOK RUGE: 'VOCÊ NÃO É PÁREO PARA O MEU PODER!'"],
      chapel: ["O zumbi range os dentes. Ele não deixará você passar."]
    },

    inventory: {
      title: "INVENTÁRIO",
      empty: "  (vazio)",
      initialItems: ["rusty_sword", "drinking_flask"],
      itemNames: {
        rusty_sword: "ESPADA ENFERRUJADA",
        drinking_flask: "FRASCO DE ÁGUA",
        drinking_flask_plus: "FRASCO DE ÁGUA+",
        zombie_head: "CABEÇA DE ZUMBI",
        refined_gemstone: "GEMA REFINADA",
        magical_shard: "FRAGMENTO MÁGICO",
        magic_sword: "ESPADA MÁGICA",
        brass_key: "CHAVE DE LATÃO",
        raw_gemstone: "GEMA BRUTA"
      }
    },

    itemDescriptions: {
      rusty_sword: "Uma lâmina velha e cheia de dentes. Mal corta pão.",
      drinking_flask: "Um frasco de metal comum para carregar água.",
      drinking_flask_plus: "O frasco agora brilha com uma aura sagrada e água purificada.",
      raw_gemstone: "Uma pedra opaca, mas que pulsa com uma energia interna.",
      brass_key: "Uma chave pesada que cheira a incenso e mofo.",
      zombie_head: "A prova pavorosa de que o guardião da capela foi derrotado.",
      magic_sword: "Uma lâmina perfeitamente forjada que vibra com poder mágico."
    },

    events: {
      grelokAlive: "Sua espada insignificante é inútil contra Grelok.",
      grelokDefeated: "A ESPADA MÁGICA atravessa o peito de Grelok! O mal foi banido desta terra! VITÓRIA!",
      getGemstone: "Você coleta a GEMA BRUTA das rochas frias da montanha.",
      priestBrassKey: "O Padre benze a cabeça do morto e a troca por uma CHAVE DE LATÃO.",
      blacksmithMagicSword: "O Ferreiro usa seus materiais para forjar a lendária ESPADA MÁGICA!",
      wizardRefine: "O Mago transmuta sua Gema Bruta em uma GEMA REFINADA e um FRAGMENTO MÁGICO!",
      wizardLater: "O Mago ignora você. Ele parece interessado apenas em gemas brutas.",
      zombieKill: "Seu golpe derruba o zumbi em uma cova.",
      tombEmpty: "Há uma cova funda e vazia no cemitério. Vários ratos inchados e o cadáver de um zumbi flutuam em trinta centímetros de uma água imunda no fundo. Cuidado!",
      tombFull: "Há uma cova funda e vazia no cemitério. Vários ratos inchados e o cadáver de um zumbi flutuam em trinta centímetros de uma água imunda no fundo. Cuidado!\n\nUma cabeça grotesca de zumbi está presa em uma raiz perto da borda da cova. Você pega o troféu horripilante como prova do seu feito.",
      flaskUpgrade: "A Chave de Latão brilha! Seu Frasco de Água foi purificado para Frasco de Água+.",
      help: "Comandos: N, S, L, O, OLHAR, FALAR [ALVO], PEGAR [ITEM], USAR [ITEM] EM [ALVO], INVENTÁRIO, RESET."
    },

    commands: {
      currentLocation: "VOCÊ ESTÁ EM",
      noNorth: "As rochas são escorregadias demais para subir por aqui.",
      noSouth: "Uma barreira de espinhos impede que você siga mais ao sul.",
      noEast: "A névoa impede que você veja o caminho a leste.",
      noWest: "A lama do pântano é profunda demais nesta direção.",
      noOne: "Não há ninguém aqui para conversar.",
      unknown: "Comando inválido. Tente 'HELP' para ver as opções.",
      langChangePrompt: "> AVISO: Mudar o idioma reiniciará o jogo. Continuar? (S/N)",
      langChangeRepeat: "Responda com S ou N.",
      langChangeCancelled: "Mudança cancelada."
    }
  }
}

export default pt
// NOVO FIM: dicionário português

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
      mountain: "Você está na encosta rochosa e varrida pelo vento de uma montanha. Nuvens de tempestade se enrolam sobre o cume, castigando você e a vegetação esparsa com chuvas torrenciais. Bem abaixo, além das colinas, uma vasta planície se estende no horizonte sul.\n\nGrelok está aqui, proferindo heresias.\n\nUm brilho entre as rochas chama sua atenção. Você ve uma GEMA BRUTA",
      mountain_clear: "Você está na encosta rochosa e varrida pelo vento de uma montanha. Nuvens de tempestade se enrolam sobre o cume, castigando você e a vegetação esparsa com chuvas torrenciais. Bem abaixo, além das colinas, uma vasta planície se estende no horizonte sul.\n\nGrelok está aqui, proferindo heresias.",
      swamp: "Você está em um caminho de pedra estreito em um pântano escuro. Bolhas viscosas flutuam até a superfície da água do brejo de ambos os lados e estouram preguiçosamente, respingando lama e lodo em suas pernas. Uma pequena torre de pedra se ergue ali. Nenhuma porta é visível, e as pedras são lisas e polidas. Uma varanda se projeta a meio caminho da torre. O aroma intenso do incenso se mistura com o fedor nauseante do pântano. O caminho de pedra se estende para o leste, em direção a uma vasta planície além do brejo.\n\nUm mago está ali, gesticulando freneticamente de sua varanda.",
      village: "Você está parado na praça empoeirada de uma vila silenciosa. Muitas das lojas e casas estão abandonadas, e os poucos moradores que se vêem falam em sussurros, lançando olhares para o horizonte escuro ao norte. O som de uma bigorna quebra o silêncio de vez em quando, enquanto um ferreiro de bigode se debruça sobre seus produtos em uma tenda próxima.\n\nO ferreiro está trabalhando.\n\nO padre está bebendo.",
      chapel: "Você está no final de uma trilha de terra, de frente para uma pequena capela. As paredes de estuque estão desbotadas, muitas telhas faltam. As grandes portas de carvalho estão trancadas. A congregação não está em lugar nenhum. Um pequeno cemitério de lápides tortas fica à sombra da torre rachada. A trilha de terra serpenteia para oeste através de uma grande planície sem características marcantes.\n\nUm zumbi cambaleia sem rumo por perto.\n\nHá uma sepultura aberta nas proximidades.",
      chapel_clear: "Você está no final de uma trilha de terra, de frente para uma pequena capela. As paredes de estuque estão desbotadas, muitas telhas faltam. As grandes portas de carvalho estão trancadas. A congregação não está em lugar nenhum. Um pequeno cemitério de lápides tortas fica à sombra da torre rachada. A trilha de terra serpenteia para oeste através de uma grande planície sem características marcantes.\n\nHá uma sepultura aberta nas proximidades."
    },

    dialogues: {
      village: [
        `Seus olhos lacrimejam por causa da fumaça e do calor abafado dentro da tenda. O homem enorme enxuga o suor da cabeça calva e levanta os olhos.\n\n"Não falta trabalho a fazer com Grelok assustando todo mundo. Deixe-me cumprir minhas encomendas, forasteiro." Com isso, o ferreiro o dispensa da tenda e molha uma lâmina quente em água, que solta vapor.`,
        `O padre percebe sua aproximação e levanta os olhos."Grelok chegou e estamos perdidos!", ele grita. "Burp!", continua.\n\nEnquanto você se recupera do fedor do arroto do padre, ele conta que ele fugiu de sua capela. Quando Grelok chegou à montanha, o morto em seu cemitério começou a se levantar e sua congregação se dispersou.\n\n"Se você pudesse livrar o lugar do zumbi", ele lhe diz, "eu lhe daria a chave e você poderia se servir do apotecário."`,
        `Falar com quem?`,
        `O padre está bebendo água, debruçado sobre um grosso volume encadernado em couro, preso ao pescoço por uma grossa tira de couro. Ele só nota sua presença quando você se aproxima bastante.\n\n"Ah, meu bom amigo! Já foi abrir a capela? Meu corpo ainda dói de tanto beber, mas logo reunirei a congregação e voltarei."`
      ],
      swamp: [
        `O mago acena freneticamente para você de sua varanda. "Você está aqui, você chegou!", exclama. Após um silêncio constrangedor, ele animadamente cutuca uma bola de cristal, quase a derrubando no pântano.\n\n"Eu vi, viu? Você é quem vai derrotar Grelok. Uhuu!" O homenzinho pula para o parapeito, girando uma pirueta. "Agora chegou a hora de eu fazer a minha parte. Jogue a gema para mim!"\n\nA testa do mago se franze. "Dei uma bagunçada na ordem das coisas, não é? Volte quando tiver uma gema poderosa. Em breve - eu nunca tive a chance de cumprir uma profecia antes!"`,
        `"Hoo-hoo! O matador de Grelok se aproxima, gema bruta na mão, exatamente como eu vi!" O chapéu pontudo do mago balança animadamente enquanto ele aponta o dedo para você. De repente, um arco de luz laranja pálido se estende do dedo nodoso e puxa a gema da sua bolsa antes que você possa reagir. A gema para e paira no ar diante do nariz do mago.\n\n"Que a essência seja verdadeira, que os poderes se renovem, Gorducho-Hoo-Do!" Com isso, ele golpeia a pedra flutuante, esmagando-a contra a pedra lisa da torre. Em uma explosão de luz, a pedra se divide em duas, e uma cai em cada palma estendida do pequeno mago saltitante.\n\n"Fragmento para a espada. Envolva-a em ferro e ela encontrará o coração negro de Grelok para você. Pegue a palha também. Você precisará pagar o ferreiro para forjar a arma." Ele joga as pedras para baixo, e você salta para frente para pegá-las em segurança.`,
        `"Vá para uma forja! Forje o fragmento com a espada e derrotem Grelok!"\n\nO mago atira algumas pedras para te afastar e ocupa-se em conjurar nuvens de fumaça colorida.`,
        `O mago está te enxotando, com as mangas da camisa balançando.\n\n"Vá! Encontre a pedra preciosa e volte, para que eu possa fazer a minha parte!"`
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
        drinking_flask: "CANTIL DE ÁGUA",
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
      rusty_sword: "Sua arma. Enferrujada, mas confiável.",
      drinking_flask: "Um cantil muito pequeno para transportar água.",
      drinking_flask_plus: "O frasco agora brilha com uma aura sagrada e água purificada.",
      raw_gemstone: "Esta pedra pode ser valiosa...",
      refined_gemstone: "Uma gema brilhante e facetada.",
      magical_shard: "O fragmento de gema pulsa com luz mágica...",
      brass_key: "Chave que lhe foi dada pelo sacerdote",
      zombie_head: "O cheiro pode te tornar impopular...",
      magic_sword: "Uma arma encantada para derrotar Grelok"
    },

    events: {
      grelokAlive: "Sua espada insignificante é inútil contra Grelok.",
      grelokDefeated: `Ao desembainhar sua espada, Grelok abaixa sua grande cabeça com chifres e solta uma gargalhada estrondosa em seu rosto. Você cerra os dentes e desfere um poderoso golpe com as duas mãos, a lâmina mágica ressoando claramente, mesmo em meio ao tumulto de risadas guturais.\n\nVocê brande a espada com tanta ferocidade que ela escapa de sua mão e se lança na boca aberta da monstruosidade, desaparecendo de vista na escuridão árida da garganta de Grelok. Você recua enquanto Grelok fecha a boca bruscamente e se endireita. Ele permanece imóvel por um instante, depois começa a arranhar o próprio pescoço. Um zumbido abafado pode ser ouvido como se viesse de uma grande distância.\n\nDe repente, o peito de Grelok explode em uma fonte de sangue viscoso e verde. O Zumbido pode ser ouvido claramente agora, e enquanto o sangue vital espesso escorre ao redor da ponta protuberante da espada mágica, as nuvens de tempestade que giravam no pico já estão se dissipando. Grelok está derrotado!\n\nFIM\n(Obrigado por jogar!)`,
      getGemstone: "Você coleta a GEMA BRUTA das rochas frias da montanha.",
      priestBrassKey: `O padre, embriagado, amaldiçoa os mortos-vivos que profanaram sua igreja. Você lhe entrega a cabeça decapitada do zumbi que estava na sua bolsa.\n\n"Louvado seja!", ele soluça. "Talvez a influência de Grelok não seja tão forte assim!". Dito isso, ele vira o decantador sobre a cabeça e a atira na lareira, onde ela explode em chamas roxas e se consome quase instantaneamente.\n\n"Preciso reunir os fiéis." Ele coloca uma chave de latão na sua mão. "Por favor, sirva-se do pouco que possa ser útil na minha capela."`,
      blacksmithMagicSword: `O ferreiro olha para você com rispidez e está prestes a enxotá-lo quando você tira o fragmento mágico da sua bolsa. Ele coloca o martelo de lado e gira o bigode.\n\n"Uma pedra muito bonita, aliás", diz ele, admirando a pedra facetada. "Então, do que você precisa?"\n\nSeguindo suas instruções cuidadosas, o ferreiro reforja sua espada enferrujada com o fragmento mágico no centro da lâmina.`,
      wizardRefine: "O Mago transmuta sua Gema Bruta em uma GEMA REFINADA e um FRAGMENTO MÁGICO!",
      wizardLater: `"Hoo-hoo! O matador de Grelok se aproxima, gema bruta na mão, exatamente como eu vi!" O chapéu pontudo do mago balança animadamente enquanto ele aponta o dedo para você. De repente, um arco de luz laranja pálido se estende do dedo nodoso e puxa a gema da sua bolsa antes que você possa reagir. A gema para e paira no ar diante do nariz do mago.\n\n"Que a essência seja verdadeira, que os poderes se renovem, Gorducho-Hoo-Do!" Com isso, ele golpeia a pedra flutuante, esmagando-a contra a pedra lisa da torre. Em uma explosão de luz, a pedra se divide em duas, e uma cai em cada palma estendida do pequeno mago saltitante.\n\n"Fragmento para a espada. Envolva-a em ferro e ela encontrará o coração negro de Grelok para você. Pegue a palha também. Você precisará pagar o ferreiro para forjar a arma." Ele joga as pedras para baixo, e você salta para frente para pegá-las em segurança.`,
      zombieKill: "Seu golpe derruba o zumbi em uma cova.",
      tombEmpty: "Há uma cova funda e vazia no cemitério. Vários ratos inchados e o cadáver de um zumbi flutuam em trinta centímetros de uma água imunda no fundo. Cuidado!",
      tombFull: "Há uma cova funda e vazia no cemitério. Vários ratos inchados e o cadáver de um zumbi flutuam em trinta centímetros de uma água imunda no fundo. Cuidado!\n\nUma cabeça grotesca de zumbi está presa em uma raiz perto da borda da cova. Você pega o troféu horripilante como prova do seu feito.",
      flaskUpgrade: `A poeira paira preguiçosamente nos feixes de luz colorida que se estendem pela capela, vindos das janelas pontiagudas. Os bancos, o púlpito e tudo o mais estão cobertos por uma fina névoa. Há uma cisterna de pedra muito profunda perto da entrada. Ela está cheia até a borda com água benta.\n\nHá água mais do que suficiente aqui para encher seu pequeno frasco.`,
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
      langChangeCancelled: "Mudança cancelada.",
      reset: '........................................\nReiniciando.\n........................................',
      noPath: 'Não tem caminho nesta direção.'
    }
  }
}

export default pt
// NOVO FIM: dicionário português

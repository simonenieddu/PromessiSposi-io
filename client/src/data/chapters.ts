export const chaptersData = [
  {
    id: 1,
    number: 1,
    title: "Quel ramo del lago di Como",
    content: `<span class="glossary-term" data-term="lago-di-como">Quel ramo del lago di Como</span>, che volge a mezzogiorno, tra due catene non interrotte di monti, tutto a seni e a golfi, a seconda dello sporgere e del rientrare de' monti medesimi, vien, quasi a un tratto, a ristringersi, e a prender corso e figura di fiume, tra un <span class="glossary-term" data-term="promontorio">promontorio</span> a destra, e un'ampia costiera dall'altra parte; e il ponte, che ivi congiunge le due rive, par che renda ancor più sensibile all'occhio questa trasformazione, e segni il punto dove il lago cessa, e l'<span class="glossary-term" data-term="adda">Adda</span> rincomincia, per riprendere poi nome di lago dove le rive, allontanandosi di nuovo, lascian l'acqua distendersi e rallentarsi in nuovi golfi e in nuovi seni.

La costiera, formata dal deposito di tre grossi torrenti, scende appoggiata a due monti contigui, l'uno detto di <span class="glossary-term" data-term="san-martino">San Martino</span>, l'altro, con voce lombarda, il <span class="glossary-term" data-term="resegone">Resegone</span>, dai molti suoi cocuzzoli in fila, che in vero lo fanno somigliare a una sega: talché non è chi, al primo vederlo, purché sia di fronte, come per esempio di su le mura di Milano che guardano a settentrione, non lo discerna tosto, a un tal contrassegno, in quella lunga e vasta giogaia, dagli altri monti di nome più oscuro e di forma più comune.

Per una di queste stradicciuole, tornava bel bello dalla passeggiata verso casa, sulla sera del giorno 7 novembre dell'anno 1628, <span class="glossary-term" data-term="don-abbondio">don Abbondio</span>, <span class="glossary-term" data-term="curato">curato</span> di uno di que' paesi; il quale nome, come quello del paese dove accadde il fatto che stiamo per raccontare, si taceranno, per ragioni che ognuno può immaginare.`,
    summary: "Introduzione geografica del territorio lecchese e presentazione di don Abbondio",
    historicalContext: "Il romanzo è ambientato nel 1628, durante la dominazione spagnola in Lombardia, un periodo caratterizzato da instabilità politica, sociale ed economica.",
    difficulty: "easy",
    themes: ["Descrizione paesaggistica", "Ambientazione storica", "Presentazione del protagonista"],
    characters: ["Don Abbondio"],
    keyEvents: ["Introduzione dell'ambientazione", "Prima apparizione di don Abbondio"],
    isUnlocked: true
  },
  {
    id: 2,
    number: 2,
    title: "L'incontro con i bravi",
    content: `<span class="glossary-term" data-term="don-abbondio">Don Abbondio</span> camminava, senza sospetto di male, per quella strada deserta. All'improvviso, dalla strada che conduceva al paese, sbucarono due uomini; e il povero prete, vedendoseli venire incontro, si sentì il cuore stringere, e cominciò a tremare tutto.

"Signor <span class="glossary-term" data-term="curato">curato</span>," disse uno di loro, con voce da spavento, "lei ha intenzione di far domani quelle nozze?"

"Che nozze?" domandò don Abbondio, con un fil di voce, quantunque sapesse benissimo di che nozze si trattasse.

"Quelle," rispose l'altro, in tono ancora più minaccioso, "di <span class="glossary-term" data-term="renzo">Renzo Tramaglino</span> e di <span class="glossary-term" data-term="lucia">Lucia Mondella</span>."

"I vostri signori," riprese don Abbondio, con voce tremula, "hanno giustizia, e sanno bene che un povero curato non può, non deve far altro che quel che gli vien comandato da' suoi superiori."

"Bene, bene," disse il primo <span class="glossary-term" data-term="bravo">bravo</span>, "ma guardi di non far quelle nozze, né domani, né mai, o..." e qui fece un gesto eloquente, passandosi il dito indice sotto la gola.`,
    summary: "Don Abbondio viene minacciato dai bravi per impedire il matrimonio di Renzo e Lucia",
    historicalContext: "I bravi erano mercenari al servizio dei potenti locali, simbolo della violenza e dell'arbitrio del sistema feudale dominato dalla Spagna.",
    difficulty: "medium",
    themes: ["Violenza e sopraffazione", "Paura e vigliaccheria", "Introduzione del conflitto"],
    characters: ["Don Abbondio", "I bravi", "Renzo Tramaglino", "Lucia Mondella"],
    keyEvents: ["Minaccia dei bravi", "Impedimento al matrimonio", "Prima menzione dei protagonisti"],
    isUnlocked: false
  },
  {
    id: 3,
    number: 3,
    title: "Il turbamento di don Abbondio",
    content: `Arrivato <span class="glossary-term" data-term="don-abbondio">don Abbondio</span> a casa sua, bussò con una certa premura; e, spalancata che gli fu la porta da <span class="glossary-term" data-term="perpetua">Perpetua</span>, sua perpetua, entrò subito, di furia, e chiuse ben bene.

"Misericordia!" disse Perpetua, fermandosi, e tenendo alzate tutte e due le mani, con le dieci dita distese; "che cos'ha, signor padrone?"

"Niente, niente," rispose in fretta don Abbondio, lasciandosi andare, tutto ansante, su una vecchia seggiola.

"Come niente? la vuol dare a intendere a me? pare che lei abbia visto il diavolo."

"Lasciami respirare, per amor del cielo."

"Ecco," disse Perpetua, dopo aver guardato ben bene il padrone, "ecco che cosa vuol dire andare a spasso così tardi. L'ho sempre detto io. Ma lei non mi dà mai retta."`,
    summary: "Don Abbondio torna a casa sconvolto e cerca di nascondere l'accaduto a Perpetua",
    historicalContext: "Il rapporto tra il curato e la perpetua riflette la vita quotidiana del clero dell'epoca, spesso dominata dalle domestiche che gestivano la casa parrocchiale.",
    difficulty: "easy",
    themes: ["Paura e dissimulazione", "Vita quotidiana", "Rapporti sociali"],
    characters: ["Don Abbondio", "Perpetua"],
    keyEvents: ["Ritorno turbato di don Abbondio", "Interrogatorio di Perpetua", "Tentativo di dissimulazione"],
    isUnlocked: false
  }
];

export const quizzesData = [
  {
    id: 1,
    chapterId: 1,
    question: "Dove si svolge l'inizio del romanzo?",
    options: ["Sul lago di Garda", "Sul lago di Como", "Sul lago Maggiore", "Sul Po"],
    correctAnswer: 1,
    explanation: "Il romanzo inizia con la famosa descrizione del lago di Como e dei suoi dintorni.",
    points: 10
  },
  {
    id: 2,
    chapterId: 1,
    question: "Quali sono i due monti menzionati nel primo capitolo?",
    options: ["Monte Bianco e Monte Rosa", "San Martino e Resegone", "Grigne e Legnone", "Pizzo dei Tre Signori e Monte Barro"],
    correctAnswer: 1,
    explanation: "I due monti sono San Martino e Resegone, quest'ultimo chiamato così per la sua forma che ricorda una sega.",
    points: 10
  },
  {
    id: 3,
    chapterId: 1,
    question: "Perché il monte Resegone ha questo nome?",
    options: ["Per la sua altezza", "Per i suoi cocuzzoli in fila che lo fanno somigliare a una sega", "Per il colore delle rocce", "Per la presenza di seghe d'acqua"],
    correctAnswer: 1,
    explanation: "Il Resegone deve il suo nome ai molti cocuzzoli in fila che lo fanno somigliare a una sega (resega in dialetto lombardo).",
    points: 15
  }
];

export const glossaryData = [
  {
    id: 1,
    term: "lago di Como",
    definition: "Lago della Lombardia, uno dei più grandi d'Italia, dove è ambientata la storia de I Promessi Sposi.",
    context: "Ambientazione geografica principale del romanzo",
    chapterId: 1
  },
  {
    id: 2,
    term: "promontorio",
    definition: "Sporgenza di terra che si protende nel mare o nel lago.",
    context: "Elemento geografico che caratterizza il paesaggio del lago di Como",
    chapterId: 1
  },
  {
    id: 3,
    term: "Adda",
    definition: "Fiume che attraversa la Lombardia, emissario del lago di Como.",
    context: "Il lago si trasforma in fiume Adda per poi ritornare lago",
    chapterId: 1
  },
  {
    id: 4,
    term: "Resegone",
    definition: "Monte caratteristico della zona lecchese, chiamato così per la sua forma dentellata che ricorda una sega.",
    context: "Uno dei due monti che caratterizzano il paesaggio descritto da Manzoni",
    chapterId: 1
  }
];

export const achievementsData = [
  {
    id: 1,
    name: "Primo Capitolo",
    description: "Hai completato il primo capitolo",
    icon: "fas fa-book",
    requirement: "complete_chapter_1",
    points: 50,
    color: "green"
  },
  {
    id: 2,
    name: "Quiz Master",
    description: "Hai risposto correttamente a 10 quiz consecutivi",
    icon: "fas fa-star",
    requirement: "perfect_quiz_streak_10",
    points: 100,
    color: "gold"
  },
  {
    id: 3,
    name: "Studente Costante",
    description: "Hai studiato per 7 giorni consecutivi",
    icon: "fas fa-fire",
    requirement: "daily_streak_7",
    points: 75,
    color: "purple"
  },
  {
    id: 4,
    name: "Esperto di Glossario",
    description: "Hai consultato 25 termini del glossario",
    icon: "fas fa-book-open",
    requirement: "glossary_terms_25",
    points: 30,
    color: "blue"
  }
];

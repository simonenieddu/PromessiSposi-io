import { db } from "./db";
import { chapters, quizzes, achievements, glossaryTerms } from "@shared/schema";

export async function seedDatabase() {
  console.log("🌱 Seeding database...");

  try {
    // Seed chapters
    const chaptersData = [
      {
        number: 1,
        title: "Quel ramo del lago di Como...",
        content: `Quel ramo del lago di Como, che volge a mezzogiorno, tra due catene non interrotte di monti, tutto a seni e a golfi, a seconda dello sporgere e del rientrare di quelli, vien, quasi a un tratto, a ristringersi, e a prender corso e figura di fiume, tra un promontorio a destra e un'ampia costiera dall'altra parte.

Il ponte, che ivi congiunge le due rive, par che renda ancor più sensibile all'occhio questa trasformazione, e segni il punto dove il lago cessa, e l'Adda rincomincia, per ripigliar poi nome di lago dove le rive, allontanandosi di nuovo, lascian l'acqua distendersi e rallentarsi in nuovi golfi e in nuovi seni.

La costiera, formata dal deposito di tre grossi torrenti, scende appoggiata a due monti contigui, l'uno detto di San Martino, l'altro di Resegone, dai molti suoi cocuzzoli in fila, che in vero lo fanno somigliare a una sega: talché non è chi, al primo vederlo, purché sia di fronte o di fianco, non lo riconosca tosto, a un tal contrassegno, tra le altre montagne di nome più oscuro e di forma più comune.

Per una di quelle vallette, la più erta e la più selvatica, di dove l'occhio dell'esperto può scorgere la più piccola fiumana che serpe per mezzo a' campi, e che dopo due miglia di corso va a gettarsi nell'Adda, scendeva, sulla sera del giorno 7 novembre dell'anno 1628, un uomo di circa cinquant'anni, che camminava in fretta, guardandosi però attorno con certa inquietudine.`,
        summary: "Il celebre incipit del romanzo descrive il paesaggio del lago di Como e introduce l'ambientazione geografica della storia. Don Abbondio fa la sua prima apparizione mentre cammina inquieto lungo una valletta.",
        historicalContext: "Il romanzo è ambientato nella Lombardia del XVII secolo, sotto la dominazione spagnola. La zona del lago di Como era caratterizzata da piccoli borghi agricoli e da una società feudale. L'anno 1628 fu segnato da carestie e instabilità sociale.",
        isUnlocked: true
      },
      {
        number: 2,
        title: "Don Abbondio e i bravi",
        content: `Il povero don Abbondio (il lettore se n'è già avveduto) non era nato con un cuor di leone. Ma, fin da' primi anni del suo prendere i casi come venivano; e, in quelli in cui non si poteva dir propriamente che venissero, aveva sempre fatto in modo che venissero nel modo ch'era possibile di fare. A diciott'anni s'era dedicato al sacerdozio, non tanto per vocazione, quanto perché i suoi parenti vedevano in quella condizione un onorevole collocamento per il giovine.

Non aveva mai molto riflettuto ai doveri e ai fini del suo ministero; di rendersi accetto a tutti e di dar molestia a nessuno, non s'accorgeva che questo era spesso impossibile. Pure, un uomo di questa sorte se la passava molto meglio di coloro che, con tutte le buone intenzioni, si dibattevano nel volere il bene, e di frequente si trovavano a dover contrastare l'uno o l'altro partito.

Passava così, nell'abitudine di cedere e di piegarsi, i primi anni del suo sacerdozio; e, andando avanti, aveva sempre più perfezionata quella facoltà. Don Abbondio era divenuto, per usare un modo di dire nostro, uno di quegli uomini che non risolvono mai niente da soli, e che, nell'atto stesso di cedere e di ubbidire, si contentano di fare le loro riserve mentali.`,
        summary: "Don Abbondio viene caratterizzato come un prete pauroso e remissivo che evita sempre i conflitti. Il capitolo rivela la sua natura debole e la sua strategia di sopravvivenza basata sull'evitamento delle difficoltà.",
        historicalContext: "Il clero nel XVII secolo era spesso diviso tra chi serviva i potenti e chi difendeva i poveri. Don Abbondio rappresenta il tipo di ecclesiastico che cerca di evitare ogni problema con l'autorità civile.",
        isUnlocked: false
      },
      {
        number: 3,
        title: "Renzo e Lucia",
        content: `Il matrimonio doveva farsi di nascosto. Don Abbondio aveva detto e ridetto a Renzo che bisognava star zitti, non dir niente a nessuno; e Renzo aveva promesso, per sé e per Lucia. Ma far le cose di nascosto, in un paese, non è sempre facilissimo; e poi, in quella circostanza, c'era una difficoltà particolare.

Lucia aveva una madre, la quale si chiamava Agnese; e questa madre doveva saper tutto. Anche se non avesse dovuto saper tutto per natura, l'avrebbe saputo per forza; perché la casa dove abitava Lucia era quella stessa dove abitava anche lei; e in una casa dove sta per farsi un matrimonio, è difficile che chi ci abita non se n'accorga.

Ma il gran pensiero di Renzo era di trovar modo che don Abbondio, senza comprometter se stesso, come diceva lui, celebrasse il matrimonio. Pure, da tutte le parole del curato, da tutto il suo contegno, traspariva più che mai la risoluzione di non fare il matrimonio, costi quello che costi.`,
        summary: "Renzo e Lucia tentano di organizzare un matrimonio segreto con l'aiuto riluttante di Don Abbondio. Il capitolo introduce Agnese, la madre di Lucia, e mostra le difficoltà di mantenere il segreto in un piccolo paese.",
        historicalContext: "Nel XVII secolo i matrimoni erano eventi sociali importanti e spesso coinvolgevano accordi economici tra famiglie. La segretezza era necessaria per evitare interferenze esterne.",
        isUnlocked: false
      }
    ];

    console.log("📚 Seeding chapters...");
    for (const chapterData of chaptersData) {
      await db.insert(chapters).values(chapterData).onConflictDoNothing();
    }

    // Seed quizzes
    const quizzesData = [
      {
        chapterId: 1,
        question: "Dove si svolge l'inizio del romanzo?",
        options: ["Sul lago di Garda", "Sul lago di Como", "Sul lago Maggiore", "Sul Po"],
        correctAnswer: 1,
        explanation: "Il romanzo inizia con la famosa descrizione del lago di Como e dei suoi dintorni, in particolare della zona dove il lago si trasforma nel fiume Adda.",
        points: 10
      },
      {
        chapterId: 1,
        question: "Quali sono i due monti menzionati nel primo capitolo?",
        options: ["Monte Bianco e Monte Rosa", "San Martino e Resegone", "Grigne e Legnone", "Pizzo dei Tre Signori e Monte Barro"],
        correctAnswer: 1,
        explanation: "I due monti sono San Martino e Resegone, quest'ultimo chiamato così per la sua forma che ricorda una sega (resega in dialetto lombardo).",
        points: 10
      },
      {
        chapterId: 1,
        question: "Perché il monte Resegone ha questo nome?",
        options: ["Per la sua altezza", "Per i suoi cocuzzoli in fila che lo fanno somigliare a una sega", "Per il colore delle rocce", "Per la presenza di seghe d'acqua"],
        correctAnswer: 1,
        explanation: "Il Resegone deve il suo nome ai molti cocuzzoli in fila che lo fanno somigliare a una sega (resega in dialetto lombardo).",
        points: 15
      },
      {
        chapterId: 1,
        question: "In che anno è ambientata la storia?",
        options: ["1625", "1628", "1630", "1635"],
        correctAnswer: 1,
        explanation: "La storia inizia il 7 novembre 1628, come specificato nel primo capitolo quando Don Abbondio incontra i bravi.",
        points: 10
      },
      {
        chapterId: 2,
        question: "Qual è la caratteristica principale di Don Abbondio?",
        options: ["Il coraggio", "La paura e la tendenza a evitare i conflitti", "L'autorevolezza", "La saggezza"],
        correctAnswer: 1,
        explanation: "Don Abbondio è caratterizzato dalla sua natura paurosa e dalla tendenza a evitare qualsiasi conflitto, preferendo cedere piuttosto che affrontare le difficoltà.",
        points: 10
      },
      {
        chapterId: 2,
        question: "Perché Don Abbondio era diventato prete?",
        options: ["Per vocazione religiosa", "Perché i parenti vedevano nel sacerdozio un onorevole collocamento", "Per aiutare i poveri", "Per studiare"],
        correctAnswer: 1,
        explanation: "Don Abbondio si era dedicato al sacerdozio non tanto per vocazione, quanto perché i suoi parenti vedevano in quella condizione un onorevole collocamento per il giovane.",
        points: 15
      }
    ];

    console.log("❓ Seeding quizzes...");
    for (const quizData of quizzesData) {
      await db.insert(quizzes).values(quizData).onConflictDoNothing();
    }

    // Seed achievements
    const achievementsData = [
      {
        name: "Primo Capitolo",
        description: "Hai completato il primo capitolo de I Promessi Sposi",
        icon: "fas fa-book",
        requirement: "complete_chapter_1",
        points: 50,
        color: "green"
      },
      {
        name: "Quiz Master",
        description: "Hai risposto correttamente a 10 quiz consecutivi",
        icon: "fas fa-star",
        requirement: "perfect_quiz_streak_10",
        points: 100,
        color: "gold"
      },
      {
        name: "Studente Costante",
        description: "Hai studiato per 7 giorni consecutivi",
        icon: "fas fa-fire",
        requirement: "daily_streak_7",
        points: 75,
        color: "purple"
      },
      {
        name: "Esperto di Glossario",
        description: "Hai consultato 25 termini del glossario",
        icon: "fas fa-book-open",
        requirement: "glossary_terms_25",
        points: 30,
        color: "blue"
      },
      {
        name: "Secondo Capitolo",
        description: "Hai completato il secondo capitolo",
        icon: "fas fa-bookmark",
        requirement: "complete_chapter_2",
        points: 50,
        color: "green"
      },
      {
        name: "Terzo Capitolo",
        description: "Hai completato il terzo capitolo",
        icon: "fas fa-medal",
        requirement: "complete_chapter_3",
        points: 50,
        color: "green"
      },
      {
        name: "Studioso",
        description: "Hai raggiunto 1000 Punti Edo",
        icon: "fas fa-graduation-cap",
        requirement: "reach_1000_points",
        points: 100,
        color: "gold"
      }
    ];

    console.log("🏆 Seeding achievements...");
    for (const achievementData of achievementsData) {
      await db.insert(achievements).values(achievementData).onConflictDoNothing();
    }

    // Seed glossary terms
    const glossaryData = [
      {
        term: "lago di Como",
        definition: "Lago della Lombardia, uno dei più grandi d'Italia, dove è ambientata la storia de I Promessi Sposi. Il lago ha una caratteristica forma a Y rovesciata.",
        context: "Ambientazione geografica principale del romanzo, che si svolge tra i borghi lungo le sue rive",
        chapterId: 1
      },
      {
        term: "promontorio",
        definition: "Sporgenza di terra che si protende nel mare o nel lago. Nel contesto del romanzo, si riferisce alle formazioni rocciose lungo il lago di Como.",
        context: "Elemento geografico che caratterizza il paesaggio del lago di Como descritto nel primo capitolo",
        chapterId: 1
      },
      {
        term: "Adda",
        definition: "Fiume che attraversa la Lombardia, emissario del lago di Como. Nasce dalle Alpi Retiche e sfocia nel Po.",
        context: "Il lago si trasforma in fiume Adda per poi ritornare lago, come descritto nel celebre incipit",
        chapterId: 1
      },
      {
        term: "Resegone",
        definition: "Monte caratteristico della zona lecchese, alto 1875 metri, chiamato così per la sua forma dentellata che ricorda una sega (resega in dialetto lombardo).",
        context: "Uno dei due monti che caratterizzano il paesaggio descritto da Manzoni nel primo capitolo",
        chapterId: 1
      },
      {
        term: "San Martino",
        definition: "Monte che si trova nella zona del lago di Como, menzionato insieme al Resegone nella descrizione geografica del primo capitolo.",
        context: "Punto di riferimento geografico nella descrizione manzoniana del paesaggio lombardo",
        chapterId: 1
      },
      {
        term: "bravi",
        definition: "Soldati mercenari al servizio di nobili e signori locali, spesso utilizzati per intimidazioni e soprusi. Figure tipiche della società lombarda del XVII secolo.",
        context: "I bravi di Don Rodrigo che intimidiscono Don Abbondio impedendogli di celebrare il matrimonio",
        chapterId: 2
      },
      {
        term: "Don Abbondio",
        definition: "Curato del paese, personaggio caratterizzato dalla paura e dalla tendenza a evitare i conflitti. Rappresenta il clero più debole e remissivo.",
        context: "Protagonista che si trova al centro del conflitto tra il dovere religioso e la paura delle conseguenze",
        chapterId: 2
      },
      {
        term: "curato",
        definition: "Sacerdote responsabile della cura delle anime in una parrocchia. Nel XVII secolo aveva anche funzioni civili importanti come la registrazione di matrimoni.",
        context: "Don Abbondio è il curato del paese e dovrebbe celebrare il matrimonio tra Renzo e Lucia",
        chapterId: 2
      }
    ];

    console.log("📖 Seeding glossary terms...");
    for (const termData of glossaryData) {
      await db.insert(glossaryTerms).values(termData).onConflictDoNothing();
    }

    console.log("✅ Database seeded successfully!");
  } catch (error) {
    console.error("❌ Error seeding database:", error);
    throw error;
  }
}

// Run seed if this file is executed directly
if (import.meta.url === `file://${process.argv[1]}`) {
  seedDatabase()
    .then(() => {
      console.log("🎉 Seeding completed!");
      process.exit(0);
    })
    .catch((error) => {
      console.error("💥 Seeding failed:", error);
      process.exit(1);
    });
}

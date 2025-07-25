// Mock literary insights for demonstration when API is not available
export interface MockLiteraryInsight {
  passage: string;
  historicalContext: string;
  literaryAnalysis: string;
  themes: string[];
  characterAnalysis?: string;
  languageStyle: string;
  culturalSignificance: string;
  modernRelevance: string;
}

export interface MockContextualQuestion {
  question: string;
  answer: string;
  difficulty: 'basic' | 'intermediate' | 'advanced';
  category: 'historical' | 'literary' | 'thematic' | 'linguistic';
}

export const mockInsights: { [key: string]: MockLiteraryInsight } = {
  "quel_ramo_del_lago": {
    passage: "Quel ramo del lago di Como, che volge a mezzogiorno, tra due catene non interrotte di monti...",
    historicalContext: "Il romanzo è ambientato nella Lombardia del XVII secolo (1628-1630), periodo di dominazione spagnola caratterizzato da guerre, carestie e pestilenze. Il lago di Como rappresenta il confine tra diversi domini feudali, dove piccoli tiranni locali esercitavano il loro potere arbitrario. La descrizione geografica non è casuale: Manzoni sceglie una zona di confine per rappresentare l'instabilità politica e sociale dell'epoca.",
    literaryAnalysis: "L'incipit del romanzo è un capolavoro di tecnica narrativa. Manzoni utilizza la descrizione paesaggistica come metafora della condizione umana: il lago che 'si restringe' anticipa le difficoltà che i protagonisti dovranno affrontare. La prosa è caratterizzata dal periodo ampio e articolato, tipico dello stile manzoniano, che alterna momenti descrittivi a riflessioni morali. L'uso del presente storico conferisce immediatezza alla narrazione.",
    themes: ["Paesaggio e condizione umana", "Confini e marginalità", "Natura e società", "Descrizione realistica", "Ambientazione storica"],
    characterAnalysis: "Benché in questo brano non compaiano personaggi, la descrizione del paesaggio anticipa le caratteristiche dei protagonisti: come il lago si restringe tra i monti, così Renzo e Lucia si troveranno 'stretti' dalle circostanze avverse.",
    languageStyle: "Manzoni adopera un linguaggio solenne ma accessibile, frutto della sua ricerca di una lingua italiana unitaria. Il periodo è costruito con grande equilibrio sintattico, ricco di subordinate che creano un ritmo narrativo pacato. L'uso di termini geografici precisi (promontorio, costiera, poggi) dimostra la volontà di aderire al vero.",
    culturalSignificance: "Questo incipit rappresenta il manifesto del realismo manzoniano. La scelta di ambientare il romanzo in Lombardia riflette l'orgoglio regionale dell'autore e il suo impegno nel Risorgimento. La descrizione geografica diventa strumento di identità nazionale, contribuendo alla costruzione dell'immaginario collettivo italiano.",
    modernRelevance: "La descrizione del territorio come elemento identitario risuona anche oggi, in un'epoca di globalizzazione dove il rapporto con il paesaggio locale assume nuovo significato. Il tema dei confini, centrale nel brano, è di straordinaria attualità in un mondo sempre più interconnesso ma anche diviso da nuove barriere."
  },
  
  "don_abbondio": {
    passage: "Don Abbondio (il lettore se n'è già avveduto dal nome) era un curato di villa...",
    historicalContext: "Il personaggio di don Abbondio riflette la condizione del clero lombardo del Seicento, spesso costretto a compromessi con il potere temporale. I parroci di campagna erano figure ambigue: da una parte rappresentanti della Chiesa, dall'altra sudditi di feudatari locali che non esitavano a usare la violenza per i propri scopi.",
    literaryAnalysis: "Manzoni costruisce don Abbondio come personaggio complesso, né completamente negativo né positivo. È l'incarnazione della vigliaccheria umana, ma anche vittima di un sistema oppressivo. La caratterizzazione psicologica è moderna: il narratore penetra nei pensieri del personaggio, rivelando le sue contraddizioni interiori.",
    themes: ["Vigliaccheria e paura", "Compromesso morale", "Critica al clero", "Condizione dell'intellettuale", "Ironia narrativa"],
    characterAnalysis: "Don Abbondio rappresenta l'intellettuale pavido che preferisce la quiete al coraggio. È un personaggio 'medio', senza grandezza eroica ma profondamente umano nelle sue debolezze. Manzoni ne fa il simbolo di una società che ha rinunciato ai propri ideali.",
    languageStyle: "Il linguaggio utilizzato per descrivere don Abbondio alterna toni comici e drammatici. L'ironia manzoniana si manifesta attraverso understatement e litoti, creando un effetto di distacco che non esclude la compassione per il personaggio.",
    culturalSignificance: "Don Abbondio diventa nell'immaginario collettivo italiano il simbolo dell'opportunismo e della mancanza di coraggio civile. Il personaggio contribuisce alla critica manzoniana delle istituzioni ecclesiastiche dell'epoca.",
    modernRelevance: "Il tipo umano rappresentato da don Abbondio è universale e attuale: l'individuo che per quieto vivere evita di prendere posizione, fenomeno sempre presente nelle società complesse contemporanee."
  }
};

export const mockQuestions: { [key: string]: MockContextualQuestion[] } = {
  "quel_ramo_del_lago": [
    {
      question: "Perché Manzoni inizia il romanzo con una descrizione geografica così dettagliata?",
      answer: "La descrizione geografica del lago di Como non è puramente ornamentale. Manzoni la utilizza per creare un'ambientazione realistica e simbolica insieme. Il paesaggio riflette la condizione dei protagonisti: come il lago si restringe tra i monti, così Renzo e Lucia si troveranno 'stretti' dalle difficoltà. Inoltre, la precisione geografica serve all'autore per radicare la narrazione nella realtà storica lombarda.",
      difficulty: "intermediate",
      category: "literary"
    },
    {
      question: "Qual era la situazione politica della Lombardia nel XVII secolo?",
      answer: "Nel XVII secolo la Lombardia era sotto il dominio spagnolo, divisa in numerosi feudi governati da signori locali. Era un periodo di grande instabilità caratterizzato da guerre, carestie e epidemie. Il potere centrale spagnolo era debole e i feudatari locali esercitavano spesso un controllo arbitrario sui loro territori, come viene rappresentato nel romanzo attraverso personaggi come don Rodrigo.",
      difficulty: "basic",
      category: "historical"
    },
    {
      question: "Come si manifesta il realismo manzoniano in questo incipit?",
      answer: "Il realismo manzoniano si manifesta attraverso la precisione della descrizione geografica, l'uso di toponimi reali e la volontà di ambientare la vicenda in un contesto storico documentato. Manzoni non si limita a una descrizione fantastica, ma cerca di ricostruire fedelmente l'ambiente lombardo del Seicento, basandosi su ricerche storiche approfondite.",
      difficulty: "advanced",
      category: "literary"
    },
    {
      question: "Che funzione ha la metafora del lago che si restringe?",
      answer: "La metafora del lago che si restringe anticipa simbolicamente le vicende dei protagonisti. Come il lago perde la sua ampiezza, così Renzo e Lucia vedranno ridursi progressivamente i loro spazi di libertà e le loro possibilità di realizzare i propri progetti, fino a essere costretti alla fuga dal loro paese natale.",
      difficulty: "intermediate",
      category: "thematic"
    }
  ],
  
  "don_abbondio": [
    {
      question: "Che tipo di personaggio è don Abbondio nella struttura narrativa del romanzo?",
      answer: "Don Abbondio è un personaggio 'medio', né eroe né antieroe, che rappresenta l'uomo comune alle prese con situazioni più grandi di lui. Non è completamente negativo, ma nemmeno positivo: è vittima e complice insieme del sistema oppressivo in cui vive. Questa complessità psicologica lo rende uno dei personaggi più moderni e realistici del romanzo.",
      difficulty: "advanced",
      category: "literary"
    },
    {
      question: "Come si manifesta l'ironia manzoniana nella caratterizzazione di don Abbondio?",
      answer: "L'ironia manzoniana emerge attraverso la tecnica dell'understatement e del contrasto tra le aspirazioni del personaggio e la realtà. Il narratore presenta don Abbondio con bonaria comprensione, ma ne sottolinea implicitamente le contraddizioni, creando un effetto comico che non esclude la pietà umana.",
      difficulty: "intermediate",
      category: "linguistic"
    }
  ]
};

export function getMockInsight(passage: string): MockLiteraryInsight {
  // Find the best matching mock insight based on passage content
  const passageLower = passage.toLowerCase();
  
  if (passageLower.includes("quel ramo del lago") || passageLower.includes("lago di como")) {
    return mockInsights["quel_ramo_del_lago"];
  }
  
  if (passageLower.includes("don abbondio") || passageLower.includes("curato")) {
    return mockInsights["don_abbondio"];
  }
  
  // Default insight for any passage from "I Promessi Sposi"
  return {
    passage: passage.substring(0, 100) + "...",
    historicalContext: "Il romanzo di Manzoni è ambientato nella Lombardia del XVII secolo, periodo di dominazione spagnola caratterizzato da instabilità politica, guerre e pestilenze. L'autore ha accuratamente ricostruito l'ambiente storico basandosi su fonti documentarie dell'epoca.",
    literaryAnalysis: "Questo brano manifesta le caratteristiche dello stile manzoniano: l'equilibrio tra realismo e idealità, l'uso di un linguaggio accessibile ma elevato, la capacità di intrecciare vicende private e quadro storico sociale. La narrazione rivela la maturità tecnica dell'autore.",
    themes: ["Realismo storico", "Condizione umana", "Società e potere", "Morale cristiana", "Linguaggio narrativo"],
    languageStyle: "Il linguaggio è caratterizzato dalla ricerca di una prosa italiana unitaria, frutto degli studi linguistici di Manzoni. Il periodo è ampio e articolato, con un ritmo narrativo che alterna momenti descrittivi e riflessivi.",
    culturalSignificance: "Il brano si inserisce nel progetto manzoniano di creazione di una letteratura nazionale italiana, capace di unire intrattenimento e educazione morale. L'opera contribuisce alla formazione dell'identità culturale italiana post-unitaria.",
    modernRelevance: "I temi affrontati mantengono attualità: il rapporto tra individuo e potere, la questione della giustizia sociale, il valore della solidarietà umana sono questioni sempre attuali nella società contemporanea."
  };
}

export function getMockQuestions(passage: string, difficulty: 'basic' | 'intermediate' | 'advanced' = 'intermediate'): MockContextualQuestion[] {
  const passageLower = passage.toLowerCase();
  
  let questions: MockContextualQuestion[] = [];
  
  if (passageLower.includes("quel ramo del lago") || passageLower.includes("lago di como")) {
    questions = mockQuestions["quel_ramo_del_lago"];
  } else if (passageLower.includes("don abbondio") || passageLower.includes("curato")) {
    questions = mockQuestions["don_abbondio"];
  } else {
    // Default questions for any passage
    questions = [
      {
        question: "Qual è il contesto storico del brano?",
        answer: "Il brano è ambientato nella Lombardia del XVII secolo, durante la dominazione spagnola, periodo caratterizzato da instabilità politica e sociale.",
        difficulty: "basic",
        category: "historical"
      },
      {
        question: "Quali caratteristiche dello stile manzoniano emergono nel brano?",
        answer: "Il brano manifesta l'equilibrio tra realismo e idealità tipico di Manzoni, l'uso di un linguaggio accessibile ma elevato, e la capacità di intrecciare vicende private e quadro storico.",
        difficulty: "intermediate",
        category: "literary"
      },
      {
        question: "Come si manifesta la modernità narrativa di Manzoni?",
        answer: "La modernità emerge dalla capacità di Manzoni di creare personaggi psicologicamente complessi e di utilizzare tecniche narrative come il discorso indiretto libero.",
        difficulty: "advanced",
        category: "literary"
      },
      {
        question: "Quale funzione ha il linguaggio nel progetto culturale manzoniano?",
        answer: "Il linguaggio è strumento di unificazione nazionale: Manzoni cerca di creare una prosa italiana accessibile a tutti, contribuendo alla formazione dell'identità culturale italiana.",
        difficulty: "intermediate",
        category: "linguistic"
      }
    ];
  }
  
  // Filter by difficulty if specified
  return questions.filter(q => q.difficulty === difficulty || difficulty === 'intermediate');
}
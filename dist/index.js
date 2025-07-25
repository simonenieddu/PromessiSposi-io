var __defProp = Object.defineProperty;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __esm = (fn, res) => function __init() {
  return fn && (res = (0, fn[__getOwnPropNames(fn)[0]])(fn = 0)), res;
};
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};

// server/ai-insights.ts
var ai_insights_exports = {};
__export(ai_insights_exports, {
  AILiteraryInsights: () => AILiteraryInsights,
  aiInsights: () => aiInsights
});
import Anthropic from "@anthropic-ai/sdk";
var anthropic, AILiteraryInsights, aiInsights;
var init_ai_insights = __esm({
  "server/ai-insights.ts"() {
    "use strict";
    anthropic = new Anthropic({
      apiKey: process.env.ANTHROPIC_API_KEY
    });
    AILiteraryInsights = class {
      async analyzePassage(passage, chapterTitle) {
        try {
          const prompt = `Analizza questo brano de "I Promessi Sposi" di Alessandro Manzoni fornendo un'analisi letteraria approfondita:

BRANO:
"${passage}"

${chapterTitle ? `CAPITOLO: ${chapterTitle}` : ""}

Fornisci un'analisi strutturata in formato JSON con le seguenti chiavi:
- historicalContext: Contesto storico del XVII secolo lombardo
- literaryAnalysis: Analisi dello stile letterario, tecniche narrative e significato
- themes: Array di temi principali (massimo 5)
- characterAnalysis: Analisi dei personaggi se presenti nel brano
- languageStyle: Analisi dello stile linguistico manzoniano
- culturalSignificance: Significato culturale e sociale
- modernRelevance: Rilevanza per i lettori contemporanei

Rispondi solo con JSON valido, senza markdown o altro testo.`;
          const response = await anthropic.messages.create({
            model: "claude-sonnet-4-20250514",
            system: `Sei un esperto di letteratura italiana del XIX secolo, specializzato nell'opera di Alessandro Manzoni. Fornisci analisi approfondite e accurate de "I Promessi Sposi".`,
            max_tokens: 2e3,
            messages: [
              { role: "user", content: prompt }
            ]
          });
          const content = response.content[0];
          if (content.type !== "text") {
            throw new Error("Unexpected response format from AI");
          }
          const analysis = JSON.parse(content.text);
          return {
            passage,
            historicalContext: analysis.historicalContext || "",
            literaryAnalysis: analysis.literaryAnalysis || "",
            themes: analysis.themes || [],
            characterAnalysis: analysis.characterAnalysis,
            languageStyle: analysis.languageStyle || "",
            culturalSignificance: analysis.culturalSignificance || "",
            modernRelevance: analysis.modernRelevance || ""
          };
        } catch (error) {
          console.error("Error analyzing passage:", error);
          throw new Error("Errore nell'analisi del brano. Riprova pi\xF9 tardi.");
        }
      }
      async generateContextualQuestions(passage, difficulty = "intermediate") {
        try {
          const difficultyMap = {
            basic: "domande semplici per studenti delle medie",
            intermediate: "domande di livello intermedio per studenti delle superiori",
            advanced: "domande approfondite per studenti universitari"
          };
          const prompt = `Genera 4 domande di comprensione contestuale per questo brano de "I Promessi Sposi":

BRANO:
"${passage}"

LIVELLO: ${difficultyMap[difficulty]}

Genera domande che coprano:
1. Contesto storico
2. Analisi letteraria
3. Temi principali
4. Aspetti linguistici

Formato JSON con array di oggetti con:
- question: La domanda
- answer: Risposta completa e dettagliata
- difficulty: "${difficulty}"
- category: "historical" | "literary" | "thematic" | "linguistic"

Rispondi solo con JSON valido.`;
          const response = await anthropic.messages.create({
            model: "claude-sonnet-4-20250514",
            system: 'Sei un insegnante esperto di letteratura italiana. Crea domande educative stimolanti su "I Promessi Sposi".',
            max_tokens: 1500,
            messages: [
              { role: "user", content: prompt }
            ]
          });
          const content = response.content[0];
          if (content.type !== "text") {
            throw new Error("Unexpected response format from AI");
          }
          return JSON.parse(content.text);
        } catch (error) {
          console.error("Error generating questions:", error);
          throw new Error("Errore nella generazione delle domande. Riprova pi\xF9 tardi.");
        }
      }
      async explainConcept(concept, context) {
        try {
          const prompt = `Spiega questo concetto relativo a "I Promessi Sposi" in modo chiaro e comprensibile:

CONCETTO: ${concept}
${context ? `CONTESTO: ${context}` : ""}

Fornisci una spiegazione di 2-3 paragrafi che sia educativa e accessibile a studenti delle superiori.`;
          const response = await anthropic.messages.create({
            model: "claude-sonnet-4-20250514",
            system: "Sei un tutor letterario che spiega concetti complessi in modo semplice e coinvolgente.",
            max_tokens: 800,
            messages: [
              { role: "user", content: prompt }
            ]
          });
          const content = response.content[0];
          if (content.type !== "text") {
            throw new Error("Unexpected response format from AI");
          }
          return content.text;
        } catch (error) {
          console.error("Error explaining concept:", error);
          throw new Error("Errore nella spiegazione del concetto. Riprova pi\xF9 tardi.");
        }
      }
      async comparePassages(passage1, passage2) {
        try {
          const prompt = `Confronta questi due brani de "I Promessi Sposi" evidenziando:
- Differenze stilistiche
- Temi comuni e divergenti
- Evoluzione dei personaggi
- Tecniche narrative

BRANO 1:
"${passage1}"

BRANO 2:
"${passage2}"

Fornisci un'analisi comparativa di 3-4 paragrafi.`;
          const response = await anthropic.messages.create({
            model: "claude-sonnet-4-20250514",
            system: "Sei un critico letterario specializzato nell'analisi comparativa di testi manzoniani.",
            max_tokens: 1200,
            messages: [
              { role: "user", content: prompt }
            ]
          });
          const content = response.content[0];
          if (content.type !== "text") {
            throw new Error("Unexpected response format from AI");
          }
          return content.text;
        } catch (error) {
          console.error("Error comparing passages:", error);
          throw new Error("Errore nel confronto dei brani. Riprova pi\xF9 tardi.");
        }
      }
    };
    aiInsights = new AILiteraryInsights();
  }
});

// server/mock-insights.ts
var mock_insights_exports = {};
__export(mock_insights_exports, {
  getMockInsight: () => getMockInsight,
  getMockQuestions: () => getMockQuestions,
  mockInsights: () => mockInsights,
  mockQuestions: () => mockQuestions
});
function getMockInsight(passage) {
  const passageLower = passage.toLowerCase();
  if (passageLower.includes("quel ramo del lago") || passageLower.includes("lago di como")) {
    return mockInsights["quel_ramo_del_lago"];
  }
  if (passageLower.includes("don abbondio") || passageLower.includes("curato")) {
    return mockInsights["don_abbondio"];
  }
  return {
    passage: passage.substring(0, 100) + "...",
    historicalContext: "Il romanzo di Manzoni \xE8 ambientato nella Lombardia del XVII secolo, periodo di dominazione spagnola caratterizzato da instabilit\xE0 politica, guerre e pestilenze. L'autore ha accuratamente ricostruito l'ambiente storico basandosi su fonti documentarie dell'epoca.",
    literaryAnalysis: "Questo brano manifesta le caratteristiche dello stile manzoniano: l'equilibrio tra realismo e idealit\xE0, l'uso di un linguaggio accessibile ma elevato, la capacit\xE0 di intrecciare vicende private e quadro storico sociale. La narrazione rivela la maturit\xE0 tecnica dell'autore.",
    themes: ["Realismo storico", "Condizione umana", "Societ\xE0 e potere", "Morale cristiana", "Linguaggio narrativo"],
    languageStyle: "Il linguaggio \xE8 caratterizzato dalla ricerca di una prosa italiana unitaria, frutto degli studi linguistici di Manzoni. Il periodo \xE8 ampio e articolato, con un ritmo narrativo che alterna momenti descrittivi e riflessivi.",
    culturalSignificance: "Il brano si inserisce nel progetto manzoniano di creazione di una letteratura nazionale italiana, capace di unire intrattenimento e educazione morale. L'opera contribuisce alla formazione dell'identit\xE0 culturale italiana post-unitaria.",
    modernRelevance: "I temi affrontati mantengono attualit\xE0: il rapporto tra individuo e potere, la questione della giustizia sociale, il valore della solidariet\xE0 umana sono questioni sempre attuali nella societ\xE0 contemporanea."
  };
}
function getMockQuestions(passage, difficulty = "intermediate") {
  const passageLower = passage.toLowerCase();
  let questions = [];
  if (passageLower.includes("quel ramo del lago") || passageLower.includes("lago di como")) {
    questions = mockQuestions["quel_ramo_del_lago"];
  } else if (passageLower.includes("don abbondio") || passageLower.includes("curato")) {
    questions = mockQuestions["don_abbondio"];
  } else {
    questions = [
      {
        question: "Qual \xE8 il contesto storico del brano?",
        answer: "Il brano \xE8 ambientato nella Lombardia del XVII secolo, durante la dominazione spagnola, periodo caratterizzato da instabilit\xE0 politica e sociale.",
        difficulty: "basic",
        category: "historical"
      },
      {
        question: "Quali caratteristiche dello stile manzoniano emergono nel brano?",
        answer: "Il brano manifesta l'equilibrio tra realismo e idealit\xE0 tipico di Manzoni, l'uso di un linguaggio accessibile ma elevato, e la capacit\xE0 di intrecciare vicende private e quadro storico.",
        difficulty: "intermediate",
        category: "literary"
      },
      {
        question: "Come si manifesta la modernit\xE0 narrativa di Manzoni?",
        answer: "La modernit\xE0 emerge dalla capacit\xE0 di Manzoni di creare personaggi psicologicamente complessi e di utilizzare tecniche narrative come il discorso indiretto libero.",
        difficulty: "advanced",
        category: "literary"
      },
      {
        question: "Quale funzione ha il linguaggio nel progetto culturale manzoniano?",
        answer: "Il linguaggio \xE8 strumento di unificazione nazionale: Manzoni cerca di creare una prosa italiana accessibile a tutti, contribuendo alla formazione dell'identit\xE0 culturale italiana.",
        difficulty: "intermediate",
        category: "linguistic"
      }
    ];
  }
  return questions.filter((q) => q.difficulty === difficulty || difficulty === "intermediate");
}
var mockInsights, mockQuestions;
var init_mock_insights = __esm({
  "server/mock-insights.ts"() {
    "use strict";
    mockInsights = {
      "quel_ramo_del_lago": {
        passage: "Quel ramo del lago di Como, che volge a mezzogiorno, tra due catene non interrotte di monti...",
        historicalContext: "Il romanzo \xE8 ambientato nella Lombardia del XVII secolo (1628-1630), periodo di dominazione spagnola caratterizzato da guerre, carestie e pestilenze. Il lago di Como rappresenta il confine tra diversi domini feudali, dove piccoli tiranni locali esercitavano il loro potere arbitrario. La descrizione geografica non \xE8 casuale: Manzoni sceglie una zona di confine per rappresentare l'instabilit\xE0 politica e sociale dell'epoca.",
        literaryAnalysis: "L'incipit del romanzo \xE8 un capolavoro di tecnica narrativa. Manzoni utilizza la descrizione paesaggistica come metafora della condizione umana: il lago che 'si restringe' anticipa le difficolt\xE0 che i protagonisti dovranno affrontare. La prosa \xE8 caratterizzata dal periodo ampio e articolato, tipico dello stile manzoniano, che alterna momenti descrittivi a riflessioni morali. L'uso del presente storico conferisce immediatezza alla narrazione.",
        themes: ["Paesaggio e condizione umana", "Confini e marginalit\xE0", "Natura e societ\xE0", "Descrizione realistica", "Ambientazione storica"],
        characterAnalysis: "Bench\xE9 in questo brano non compaiano personaggi, la descrizione del paesaggio anticipa le caratteristiche dei protagonisti: come il lago si restringe tra i monti, cos\xEC Renzo e Lucia si troveranno 'stretti' dalle circostanze avverse.",
        languageStyle: "Manzoni adopera un linguaggio solenne ma accessibile, frutto della sua ricerca di una lingua italiana unitaria. Il periodo \xE8 costruito con grande equilibrio sintattico, ricco di subordinate che creano un ritmo narrativo pacato. L'uso di termini geografici precisi (promontorio, costiera, poggi) dimostra la volont\xE0 di aderire al vero.",
        culturalSignificance: "Questo incipit rappresenta il manifesto del realismo manzoniano. La scelta di ambientare il romanzo in Lombardia riflette l'orgoglio regionale dell'autore e il suo impegno nel Risorgimento. La descrizione geografica diventa strumento di identit\xE0 nazionale, contribuendo alla costruzione dell'immaginario collettivo italiano.",
        modernRelevance: "La descrizione del territorio come elemento identitario risuona anche oggi, in un'epoca di globalizzazione dove il rapporto con il paesaggio locale assume nuovo significato. Il tema dei confini, centrale nel brano, \xE8 di straordinaria attualit\xE0 in un mondo sempre pi\xF9 interconnesso ma anche diviso da nuove barriere."
      },
      "don_abbondio": {
        passage: "Don Abbondio (il lettore se n'\xE8 gi\xE0 avveduto dal nome) era un curato di villa...",
        historicalContext: "Il personaggio di don Abbondio riflette la condizione del clero lombardo del Seicento, spesso costretto a compromessi con il potere temporale. I parroci di campagna erano figure ambigue: da una parte rappresentanti della Chiesa, dall'altra sudditi di feudatari locali che non esitavano a usare la violenza per i propri scopi.",
        literaryAnalysis: "Manzoni costruisce don Abbondio come personaggio complesso, n\xE9 completamente negativo n\xE9 positivo. \xC8 l'incarnazione della vigliaccheria umana, ma anche vittima di un sistema oppressivo. La caratterizzazione psicologica \xE8 moderna: il narratore penetra nei pensieri del personaggio, rivelando le sue contraddizioni interiori.",
        themes: ["Vigliaccheria e paura", "Compromesso morale", "Critica al clero", "Condizione dell'intellettuale", "Ironia narrativa"],
        characterAnalysis: "Don Abbondio rappresenta l'intellettuale pavido che preferisce la quiete al coraggio. \xC8 un personaggio 'medio', senza grandezza eroica ma profondamente umano nelle sue debolezze. Manzoni ne fa il simbolo di una societ\xE0 che ha rinunciato ai propri ideali.",
        languageStyle: "Il linguaggio utilizzato per descrivere don Abbondio alterna toni comici e drammatici. L'ironia manzoniana si manifesta attraverso understatement e litoti, creando un effetto di distacco che non esclude la compassione per il personaggio.",
        culturalSignificance: "Don Abbondio diventa nell'immaginario collettivo italiano il simbolo dell'opportunismo e della mancanza di coraggio civile. Il personaggio contribuisce alla critica manzoniana delle istituzioni ecclesiastiche dell'epoca.",
        modernRelevance: "Il tipo umano rappresentato da don Abbondio \xE8 universale e attuale: l'individuo che per quieto vivere evita di prendere posizione, fenomeno sempre presente nelle societ\xE0 complesse contemporanee."
      }
    };
    mockQuestions = {
      "quel_ramo_del_lago": [
        {
          question: "Perch\xE9 Manzoni inizia il romanzo con una descrizione geografica cos\xEC dettagliata?",
          answer: "La descrizione geografica del lago di Como non \xE8 puramente ornamentale. Manzoni la utilizza per creare un'ambientazione realistica e simbolica insieme. Il paesaggio riflette la condizione dei protagonisti: come il lago si restringe tra i monti, cos\xEC Renzo e Lucia si troveranno 'stretti' dalle difficolt\xE0. Inoltre, la precisione geografica serve all'autore per radicare la narrazione nella realt\xE0 storica lombarda.",
          difficulty: "intermediate",
          category: "literary"
        },
        {
          question: "Qual era la situazione politica della Lombardia nel XVII secolo?",
          answer: "Nel XVII secolo la Lombardia era sotto il dominio spagnolo, divisa in numerosi feudi governati da signori locali. Era un periodo di grande instabilit\xE0 caratterizzato da guerre, carestie e epidemie. Il potere centrale spagnolo era debole e i feudatari locali esercitavano spesso un controllo arbitrario sui loro territori, come viene rappresentato nel romanzo attraverso personaggi come don Rodrigo.",
          difficulty: "basic",
          category: "historical"
        },
        {
          question: "Come si manifesta il realismo manzoniano in questo incipit?",
          answer: "Il realismo manzoniano si manifesta attraverso la precisione della descrizione geografica, l'uso di toponimi reali e la volont\xE0 di ambientare la vicenda in un contesto storico documentato. Manzoni non si limita a una descrizione fantastica, ma cerca di ricostruire fedelmente l'ambiente lombardo del Seicento, basandosi su ricerche storiche approfondite.",
          difficulty: "advanced",
          category: "literary"
        },
        {
          question: "Che funzione ha la metafora del lago che si restringe?",
          answer: "La metafora del lago che si restringe anticipa simbolicamente le vicende dei protagonisti. Come il lago perde la sua ampiezza, cos\xEC Renzo e Lucia vedranno ridursi progressivamente i loro spazi di libert\xE0 e le loro possibilit\xE0 di realizzare i propri progetti, fino a essere costretti alla fuga dal loro paese natale.",
          difficulty: "intermediate",
          category: "thematic"
        }
      ],
      "don_abbondio": [
        {
          question: "Che tipo di personaggio \xE8 don Abbondio nella struttura narrativa del romanzo?",
          answer: "Don Abbondio \xE8 un personaggio 'medio', n\xE9 eroe n\xE9 antieroe, che rappresenta l'uomo comune alle prese con situazioni pi\xF9 grandi di lui. Non \xE8 completamente negativo, ma nemmeno positivo: \xE8 vittima e complice insieme del sistema oppressivo in cui vive. Questa complessit\xE0 psicologica lo rende uno dei personaggi pi\xF9 moderni e realistici del romanzo.",
          difficulty: "advanced",
          category: "literary"
        },
        {
          question: "Come si manifesta l'ironia manzoniana nella caratterizzazione di don Abbondio?",
          answer: "L'ironia manzoniana emerge attraverso la tecnica dell'understatement e del contrasto tra le aspirazioni del personaggio e la realt\xE0. Il narratore presenta don Abbondio con bonaria comprensione, ma ne sottolinea implicitamente le contraddizioni, creando un effetto comico che non esclude la piet\xE0 umana.",
          difficulty: "intermediate",
          category: "linguistic"
        }
      ]
    };
  }
});

// server/index.ts
import express2 from "express";

// server/routes.ts
import { createServer } from "http";

// shared/schema.ts
var schema_exports = {};
__export(schema_exports, {
  achievements: () => achievements,
  adminLoginSchema: () => adminLoginSchema,
  adminUsers: () => adminUsers,
  challenges: () => challenges,
  chapters: () => chapters,
  classStudents: () => classStudents,
  contextualQuestions: () => contextualQuestions,
  glossaryTerms: () => glossaryTerms,
  insertAchievementSchema: () => insertAchievementSchema,
  insertAdminUserSchema: () => insertAdminUserSchema,
  insertChallengeSchema: () => insertChallengeSchema,
  insertChapterSchema: () => insertChapterSchema,
  insertClassStudentSchema: () => insertClassStudentSchema,
  insertContextualQuestionSchema: () => insertContextualQuestionSchema,
  insertGlossaryTermSchema: () => insertGlossaryTermSchema,
  insertLiteraryInsightSchema: () => insertLiteraryInsightSchema,
  insertQuizSchema: () => insertQuizSchema,
  insertTeacherAssignmentSchema: () => insertTeacherAssignmentSchema,
  insertTeacherClassSchema: () => insertTeacherClassSchema,
  insertUserAchievementSchema: () => insertUserAchievementSchema,
  insertUserChallengeSchema: () => insertUserChallengeSchema,
  insertUserInsightInteractionSchema: () => insertUserInsightInteractionSchema,
  insertUserLevelSchema: () => insertUserLevelSchema,
  insertUserNoteSchema: () => insertUserNoteSchema,
  insertUserProgressSchema: () => insertUserProgressSchema,
  insertUserQuizResultSchema: () => insertUserQuizResultSchema,
  insertUserSchema: () => insertUserSchema,
  literaryInsights: () => literaryInsights,
  loginSchema: () => loginSchema,
  quizzes: () => quizzes,
  registerSchema: () => registerSchema,
  teacherAssignments: () => teacherAssignments,
  teacherClasses: () => teacherClasses,
  userAchievements: () => userAchievements,
  userChallenges: () => userChallenges,
  userInsightInteractions: () => userInsightInteractions,
  userLevels: () => userLevels,
  userNotes: () => userNotes,
  userProgress: () => userProgress,
  userQuizResults: () => userQuizResults,
  users: () => users
});
import { pgTable, text, serial, integer, boolean, timestamp, jsonb, varchar } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";
var users = pgTable("users", {
  id: serial("id").primaryKey(),
  email: varchar("email", { length: 255 }).notNull().unique(),
  password: text("password").notNull(),
  firstName: text("first_name"),
  lastName: text("last_name"),
  points: integer("points").default(0),
  level: text("level").default("Novizio"),
  studyReason: text("study_reason"),
  isEmailVerified: boolean("is_email_verified").default(false),
  createdAt: timestamp("created_at").defaultNow(),
  lastActiveAt: timestamp("last_active_at").defaultNow(),
  role: varchar("role", { length: 20 }).default("student")
});
var chapters = pgTable("chapters", {
  id: serial("id").primaryKey(),
  number: integer("number").notNull().unique(),
  title: text("title").notNull(),
  content: text("content").notNull(),
  summary: text("summary"),
  historicalContext: text("historical_context"),
  isUnlocked: boolean("is_unlocked").default(false)
});
var userProgress = pgTable("user_progress", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull().references(() => users.id),
  chapterId: integer("chapter_id").notNull().references(() => chapters.id),
  isCompleted: boolean("is_completed").default(false),
  readingProgress: integer("reading_progress").default(0),
  // percentage 0-100
  timeSpent: integer("time_spent").default(0),
  // in minutes
  lastReadAt: timestamp("last_read_at").defaultNow()
});
var quizzes = pgTable("quizzes", {
  id: serial("id").primaryKey(),
  chapterId: integer("chapter_id").notNull().references(() => chapters.id),
  question: text("question").notNull(),
  options: jsonb("options").notNull(),
  // array of strings
  correctAnswer: integer("correct_answer").notNull(),
  // index of correct option
  explanation: text("explanation"),
  points: integer("points").default(10)
});
var userQuizResults = pgTable("user_quiz_results", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull().references(() => users.id),
  quizId: integer("quiz_id").notNull().references(() => quizzes.id),
  selectedAnswer: integer("selected_answer").notNull(),
  isCorrect: boolean("is_correct").notNull(),
  pointsEarned: integer("points_earned").default(0),
  completedAt: timestamp("completed_at").defaultNow()
});
var achievements = pgTable("achievements", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  description: text("description").notNull(),
  icon: text("icon").notNull(),
  requirement: text("requirement").notNull(),
  points: integer("points").default(0),
  color: text("color").default("blue")
});
var userAchievements = pgTable("user_achievements", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull().references(() => users.id),
  achievementId: integer("achievement_id").notNull().references(() => achievements.id),
  earnedAt: timestamp("earned_at").defaultNow()
});
var glossaryTerms = pgTable("glossary_terms", {
  id: serial("id").primaryKey(),
  term: text("term").notNull(),
  definition: text("definition").notNull(),
  context: text("context"),
  chapterId: integer("chapter_id").references(() => chapters.id)
});
var userNotes = pgTable("user_notes", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => users.id).notNull(),
  chapterId: integer("chapter_id").references(() => chapters.id).notNull(),
  content: text("content").notNull(),
  position: integer("position"),
  // Position in text where note was created
  isPrivate: boolean("is_private").default(true).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull()
});
var userLevels = pgTable("user_levels", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => users.id).notNull(),
  level: integer("level").default(1).notNull(),
  experience: integer("experience").default(0).notNull(),
  title: varchar("title", { length: 100 }).default("Novizio").notNull(),
  unlockedFeatures: text("unlocked_features").array(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull()
});
var challenges = pgTable("challenges", {
  id: serial("id").primaryKey(),
  title: varchar("title", { length: 255 }).notNull(),
  description: text("description").notNull(),
  type: varchar("type", { length: 50 }).notNull(),
  // 'weekly', 'monthly', 'special'
  requirements: text("requirements").notNull(),
  // JSON string
  rewards: text("rewards").notNull(),
  // JSON string
  startDate: timestamp("start_date").notNull(),
  endDate: timestamp("end_date").notNull(),
  isActive: boolean("is_active").default(true).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull()
});
var userChallenges = pgTable("user_challenges", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => users.id).notNull(),
  challengeId: integer("challenge_id").references(() => challenges.id).notNull(),
  progress: integer("progress").default(0).notNull(),
  isCompleted: boolean("is_completed").default(false).notNull(),
  completedAt: timestamp("completed_at"),
  createdAt: timestamp("created_at").defaultNow().notNull()
});
var teacherClasses = pgTable("teacher_classes", {
  id: serial("id").primaryKey(),
  teacherId: integer("teacher_id").references(() => users.id).notNull(),
  name: varchar("name", { length: 255 }).notNull(),
  description: text("description"),
  classCode: varchar("class_code", { length: 20 }).unique().notNull(),
  isActive: boolean("is_active").default(true).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull()
});
var classStudents = pgTable("class_students", {
  id: serial("id").primaryKey(),
  classId: integer("class_id").references(() => teacherClasses.id).notNull(),
  studentId: integer("student_id").references(() => users.id).notNull(),
  joinedAt: timestamp("joined_at").defaultNow().notNull()
});
var teacherAssignments = pgTable("teacher_assignments", {
  id: serial("id").primaryKey(),
  teacherId: integer("teacher_id").references(() => users.id).notNull(),
  classId: integer("class_id").references(() => teacherClasses.id).notNull(),
  chapterIds: integer("chapter_ids").array().notNull(),
  title: varchar("title", { length: 255 }).notNull(),
  description: text("description"),
  dueDate: timestamp("due_date"),
  isActive: boolean("is_active").default(true).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull()
});
var insertUserSchema = createInsertSchema(users).omit({
  id: true,
  createdAt: true,
  lastActiveAt: true
});
var insertChapterSchema = createInsertSchema(chapters).omit({
  id: true
});
var insertUserProgressSchema = createInsertSchema(userProgress).omit({
  id: true,
  lastReadAt: true
});
var insertQuizSchema = createInsertSchema(quizzes).omit({
  id: true
});
var insertUserQuizResultSchema = createInsertSchema(userQuizResults).omit({
  id: true,
  completedAt: true
});
var insertAchievementSchema = createInsertSchema(achievements).omit({
  id: true
});
var insertUserAchievementSchema = createInsertSchema(userAchievements).omit({
  id: true,
  earnedAt: true
});
var insertGlossaryTermSchema = createInsertSchema(glossaryTerms).omit({
  id: true
});
var insertUserNoteSchema = createInsertSchema(userNotes).omit({
  id: true,
  createdAt: true,
  updatedAt: true
});
var insertUserLevelSchema = createInsertSchema(userLevels).omit({
  id: true,
  createdAt: true,
  updatedAt: true
});
var insertChallengeSchema = createInsertSchema(challenges).omit({
  id: true,
  createdAt: true
});
var insertUserChallengeSchema = createInsertSchema(userChallenges).omit({
  id: true,
  createdAt: true
});
var insertTeacherClassSchema = createInsertSchema(teacherClasses).omit({
  id: true,
  createdAt: true
});
var insertClassStudentSchema = createInsertSchema(classStudents).omit({
  id: true,
  joinedAt: true
});
var insertTeacherAssignmentSchema = createInsertSchema(teacherAssignments).omit({
  id: true,
  createdAt: true
});
var loginSchema = z.object({
  email: z.string().email("Email non valida"),
  password: z.string().min(6, "La password deve essere di almeno 6 caratteri")
});
var registerSchema = insertUserSchema.extend({
  email: z.string().email("Email non valida"),
  password: z.string().min(6, "La password deve essere di almeno 6 caratteri"),
  firstName: z.string().min(1, "Nome richiesto"),
  lastName: z.string().min(1, "Cognome richiesto"),
  studyReason: z.string().min(1, "Motivo di studio richiesto")
});
var adminUsers = pgTable("admin_users", {
  id: serial("id").primaryKey(),
  username: varchar("username").notNull().unique(),
  password: varchar("password").notNull(),
  email: varchar("email"),
  createdAt: timestamp("created_at").defaultNow(),
  lastLoginAt: timestamp("last_login_at")
});
var insertAdminUserSchema = createInsertSchema(adminUsers).omit({
  id: true,
  createdAt: true,
  lastLoginAt: true
});
var adminLoginSchema = z.object({
  username: z.string().min(1, "Username richiesto"),
  password: z.string().min(1, "Password richiesta")
});
var literaryInsights = pgTable("literary_insights", {
  id: serial("id").primaryKey(),
  chapterId: integer("chapter_id").references(() => chapters.id),
  passage: text("passage").notNull(),
  historicalContext: text("historical_context"),
  literaryAnalysis: text("literary_analysis"),
  themes: text("themes").array(),
  characterAnalysis: text("character_analysis"),
  languageStyle: text("language_style"),
  culturalSignificance: text("cultural_significance"),
  modernRelevance: text("modern_relevance"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow()
});
var contextualQuestions = pgTable("contextual_questions", {
  id: serial("id").primaryKey(),
  insightId: integer("insight_id").references(() => literaryInsights.id),
  question: text("question").notNull(),
  answer: text("answer").notNull(),
  difficulty: varchar("difficulty", { length: 20 }).notNull(),
  // 'basic' | 'intermediate' | 'advanced'
  category: varchar("category", { length: 20 }).notNull(),
  // 'historical' | 'literary' | 'thematic' | 'linguistic'
  createdAt: timestamp("created_at").defaultNow()
});
var userInsightInteractions = pgTable("user_insight_interactions", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => users.id),
  insightId: integer("insight_id").references(() => literaryInsights.id),
  interactionType: varchar("interaction_type", { length: 50 }).notNull(),
  // 'viewed', 'asked_question', 'bookmarked'
  customQuery: text("custom_query"),
  // For user-generated questions
  aiResponse: text("ai_response"),
  // AI response to custom queries
  createdAt: timestamp("created_at").defaultNow()
});
var insertLiteraryInsightSchema = createInsertSchema(literaryInsights).omit({
  id: true,
  createdAt: true,
  updatedAt: true
});
var insertContextualQuestionSchema = createInsertSchema(contextualQuestions).omit({
  id: true,
  createdAt: true
});
var insertUserInsightInteractionSchema = createInsertSchema(userInsightInteractions).omit({
  id: true,
  createdAt: true
});

// server/db.ts
import { Pool, neonConfig } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-serverless";
import ws from "ws";
neonConfig.webSocketConstructor = ws;
if (!process.env.DATABASE_URL) {
  throw new Error(
    "DATABASE_URL must be set. Did you forget to provision a database?"
  );
}
var pool = new Pool({ connectionString: process.env.DATABASE_URL });
var db = drizzle({ client: pool, schema: schema_exports });

// server/storage-simple.ts
import { eq } from "drizzle-orm";
var DatabaseStorage = class {
  // User operations
  async getUser(id) {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user;
  }
  async getUserByEmail(email) {
    const [user] = await db.select().from(users).where(eq(users.email, email));
    return user;
  }
  async createUser(insertUser) {
    const [user] = await db.insert(users).values(insertUser).returning();
    return user;
  }
  async updateUserLastActive(userId) {
    await db.update(users).set({ lastActiveAt: /* @__PURE__ */ new Date() }).where(eq(users.id, userId));
  }
  async addPointsToUser(userId, points) {
    const [user] = await db.select({ points: users.points }).from(users).where(eq(users.id, userId));
    const newPoints = (user?.points || 0) + points;
    await db.update(users).set({ points: newPoints }).where(eq(users.id, userId));
  }
  // Chapter operations
  async getAllChapters() {
    return await db.select().from(chapters).orderBy(chapters.number);
  }
  async getChapter(id) {
    const [chapter] = await db.select().from(chapters).where(eq(chapters.id, id));
    return chapter;
  }
  async createChapter(insertChapter) {
    const [chapter] = await db.insert(chapters).values(insertChapter).returning();
    return chapter;
  }
  // User progress operations
  async getUserProgress(userId) {
    return await db.select().from(userProgress).where(eq(userProgress.userId, userId));
  }
  async updateUserProgress(progress) {
    const [result] = await db.insert(userProgress).values(progress).onConflictDoUpdate({
      target: [userProgress.userId, userProgress.chapterId],
      set: {
        isCompleted: progress.isCompleted,
        readingProgress: progress.readingProgress,
        timeSpent: progress.timeSpent
      }
    }).returning();
    return result;
  }
  // Quiz operations
  async getQuizzesByChapter(chapterId) {
    return await db.select().from(quizzes).where(eq(quizzes.chapterId, chapterId));
  }
  async saveQuizResult(result) {
    const [quizResult] = await db.insert(userQuizResults).values(result).returning();
    return quizResult;
  }
  // Achievement operations
  async getUserAchievements(userId) {
    return await db.select().from(userAchievements).where(eq(userAchievements.userId, userId));
  }
  async createUserAchievement(achievement) {
    const [result] = await db.insert(userAchievements).values(achievement).returning();
    return result;
  }
  // Glossary operations
  async getAllGlossaryTerms() {
    return await db.select().from(glossaryTerms).orderBy(glossaryTerms.term);
  }
  async getGlossaryTerm(term) {
    const [glossaryTerm] = await db.select().from(glossaryTerms).where(eq(glossaryTerms.term, term));
    return glossaryTerm;
  }
  // Admin operations
  async updateChapter(id, data) {
    const [chapter] = await db.update(chapters).set(data).where(eq(chapters.id, id)).returning();
    return chapter;
  }
  async deleteChapter(id) {
    await db.delete(chapters).where(eq(chapters.id, id));
  }
  async createQuiz(quiz) {
    const [newQuiz] = await db.insert(quizzes).values(quiz).returning();
    return newQuiz;
  }
  async updateQuiz(id, data) {
    const [quiz] = await db.update(quizzes).set(data).where(eq(quizzes.id, id)).returning();
    return quiz;
  }
  async deleteQuiz(id) {
    await db.delete(quizzes).where(eq(quizzes.id, id));
  }
  async getAllQuizzes() {
    return await db.select().from(quizzes).orderBy(quizzes.chapterId);
  }
  async createGlossaryTerm(term) {
    const [newTerm] = await db.insert(glossaryTerms).values(term).returning();
    return newTerm;
  }
  async updateGlossaryTerm(term, data) {
    const [glossaryTerm] = await db.update(glossaryTerms).set(data).where(eq(glossaryTerms.term, term)).returning();
    return glossaryTerm;
  }
  async deleteGlossaryTerm(term) {
    await db.delete(glossaryTerms).where(eq(glossaryTerms.term, term));
  }
  // Admin user operations
  async getAdminByUsername(username) {
    const [admin] = await db.select().from(adminUsers).where(eq(adminUsers.username, username));
    return admin || void 0;
  }
  async createAdminUser(admin) {
    const [newAdmin] = await db.insert(adminUsers).values(admin).returning();
    return newAdmin;
  }
  async updateAdminLastLogin(id) {
    await db.update(adminUsers).set({ lastLoginAt: /* @__PURE__ */ new Date() }).where(eq(adminUsers.id, id));
  }
  // AI Literary Insights methods
  async createLiteraryInsight(insertInsight) {
    const [insight] = await db.insert(literaryInsights).values(insertInsight).returning();
    return insight;
  }
  async getLiteraryInsightsByChapter(chapterId) {
    return await db.select().from(literaryInsights).where(eq(literaryInsights.chapterId, chapterId));
  }
  async getLiteraryInsight(id) {
    const [insight] = await db.select().from(literaryInsights).where(eq(literaryInsights.id, id));
    return insight;
  }
  async createContextualQuestions(questions) {
    return await db.insert(contextualQuestions).values(questions).returning();
  }
  async getContextualQuestionsByInsight(insightId) {
    return await db.select().from(contextualQuestions).where(eq(contextualQuestions.insightId, insightId));
  }
  async createUserInsightInteraction(insertInteraction) {
    const [interaction] = await db.insert(userInsightInteractions).values(insertInteraction).returning();
    return interaction;
  }
  async getUserInsightInteractions(userId) {
    return await db.select().from(userInsightInteractions).where(eq(userInsightInteractions.userId, userId));
  }
};
var storage = new DatabaseStorage();

// server/routes.ts
import bcrypt from "bcrypt";
import { z as z2 } from "zod";
import session from "express-session";
function requireAdminAuth(req, res, next) {
  if (!req.session.adminUser) {
    return res.status(401).json({ message: "Accesso admin richiesto" });
  }
  next();
}
async function registerRoutes(app2) {
  app2.use(session({
    secret: process.env.SESSION_SECRET || "admin-secret-key",
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false, maxAge: 24 * 60 * 60 * 1e3 }
    // 24 hours
  }));
  app2.post("/api/admin/login", async (req, res) => {
    try {
      const { username, password } = adminLoginSchema.parse(req.body);
      const admin = await storage.getAdminByUsername(username);
      if (!admin) {
        return res.status(401).json({ message: "Credenziali non valide" });
      }
      const isValid = await bcrypt.compare(password, admin.password);
      if (!isValid) {
        return res.status(401).json({ message: "Credenziali non valide" });
      }
      await storage.updateAdminLastLogin(admin.id);
      req.session.adminUser = { id: admin.id, username: admin.username };
      res.json({
        message: "Login admin effettuato con successo",
        admin: { id: admin.id, username: admin.username }
      });
    } catch (error) {
      if (error instanceof z2.ZodError) {
        return res.status(400).json({ message: "Dati non validi", errors: error.errors });
      }
      res.status(500).json({ message: "Errore del server" });
    }
  });
  app2.post("/api/admin/logout", (req, res) => {
    req.session.destroy((err) => {
      if (err) {
        return res.status(500).json({ message: "Errore durante il logout" });
      }
      res.json({ message: "Logout effettuato con successo" });
    });
  });
  app2.get("/api/admin/me", (req, res) => {
    if (!req.session.adminUser) {
      return res.status(401).json({ message: "Non autenticato" });
    }
    res.json(req.session.adminUser);
  });
  app2.post("/api/auth/register", async (req, res) => {
    try {
      const userData = registerSchema.parse(req.body);
      const existingUser = await storage.getUserByEmail(userData.email);
      if (existingUser) {
        return res.status(400).json({ message: "Email gi\xE0 registrata" });
      }
      const hashedPassword = await bcrypt.hash(userData.password, 10);
      const user = await storage.createUser({
        ...userData,
        password: hashedPassword
      });
      req.session.user = { id: user.id, email: user.email };
      res.json({
        message: "Registrazione completata con successo",
        user: {
          id: user.id,
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName,
          points: user.points || 0,
          level: user.level || "Novizio",
          role: user.role
        }
      });
    } catch (error) {
      if (error instanceof z2.ZodError) {
        return res.status(400).json({ message: "Dati non validi", errors: error.errors });
      }
      res.status(500).json({ message: "Errore del server" });
    }
  });
  app2.post("/api/auth/login", async (req, res) => {
    try {
      const { email, password } = loginSchema.parse(req.body);
      const user = await storage.getUserByEmail(email);
      if (!user) {
        return res.status(401).json({ message: "Credenziali non valide" });
      }
      const isValid = await bcrypt.compare(password, user.password);
      if (!isValid) {
        return res.status(401).json({ message: "Credenziali non valide" });
      }
      await storage.updateUserLastActive(user.id);
      req.session.user = { id: user.id, email: user.email };
      res.json({
        message: "Login effettuato con successo",
        user: {
          id: user.id,
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName,
          points: user.points,
          level: user.level,
          role: user.role
        }
      });
    } catch (error) {
      if (error instanceof z2.ZodError) {
        return res.status(400).json({ message: "Dati non validi", errors: error.errors });
      }
      res.status(500).json({ message: "Errore del server" });
    }
  });
  app2.get("/api/chapters", async (req, res) => {
    try {
      const chapters2 = await storage.getAllChapters();
      res.json(chapters2);
    } catch (error) {
      res.status(500).json({ message: "Errore nel recupero dei capitoli" });
    }
  });
  app2.get("/api/chapters/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const chapter = await storage.getChapter(id);
      if (!chapter) {
        return res.status(404).json({ message: "Capitolo non trovato" });
      }
      res.json(chapter);
    } catch (error) {
      res.status(500).json({ message: "Errore nel recupero del capitolo" });
    }
  });
  app2.get("/api/users/:userId/progress", async (req, res) => {
    try {
      const userId = parseInt(req.params.userId);
      const progress = await storage.getUserProgress(userId);
      res.json(progress);
    } catch (error) {
      res.status(500).json({ message: "Errore nel recupero dei progressi" });
    }
  });
  app2.post("/api/users/:userId/progress", async (req, res) => {
    try {
      const userId = parseInt(req.params.userId);
      const progressData = { ...req.body, userId };
      const progress = await storage.updateUserProgress(progressData);
      res.json(progress);
    } catch (error) {
      res.status(500).json({ message: "Errore nell'aggiornamento dei progressi" });
    }
  });
  app2.get("/api/users/:userId/stats", async (req, res) => {
    try {
      const userId = parseInt(req.params.userId);
      const user = await storage.getUser(userId);
      const progress = await storage.getUserProgress(userId);
      const achievements3 = await storage.getUserAchievements(userId);
      const stats = {
        total_points: user?.points || 0,
        level: user?.level || "Novizio",
        completed_chapters: progress.filter((p) => p.isCompleted).length,
        total_time_spent: progress.reduce((sum, p) => sum + (p.timeSpent || 0), 0),
        achievement_count: achievements3.length,
        days_since_joined: user?.createdAt ? Math.floor((Date.now() - new Date(user.createdAt).getTime()) / (1e3 * 60 * 60 * 24)) : 0,
        completed_quizzes: 0
        // Will be calculated based on quiz results
      };
      res.json(stats);
    } catch (error) {
      res.status(500).json({ message: "Errore nel recupero delle statistiche" });
    }
  });
  app2.get("/api/users/:userId/profile", async (req, res) => {
    try {
      const userId = parseInt(req.params.userId);
      const user = await storage.getUser(userId);
      if (!user) {
        return res.status(404).json({ message: "Utente non trovato" });
      }
      const { password, ...userData } = user;
      res.json(userData);
    } catch (error) {
      res.status(500).json({ message: "Errore nel recupero del profilo" });
    }
  });
  app2.post("/api/auth/logout", (req, res) => {
    req.session.destroy((err) => {
      if (err) {
        return res.status(500).json({ message: "Errore durante il logout" });
      }
      res.json({ message: "Logout effettuato con successo" });
    });
  });
  app2.get("/api/chapters/:chapterId/quizzes", async (req, res) => {
    try {
      const chapterId = parseInt(req.params.chapterId);
      const quizzes2 = await storage.getQuizzesByChapter(chapterId);
      res.json(quizzes2);
    } catch (error) {
      res.status(500).json({ message: "Errore nel recupero dei quiz" });
    }
  });
  app2.post("/api/quiz-results", async (req, res) => {
    try {
      const resultData = insertUserQuizResultSchema.parse(req.body);
      const result = await storage.saveQuizResult(resultData);
      if (result.isCorrect) {
        await storage.addPointsToUser(result.userId, result.pointsEarned || 10);
      }
      res.json(result);
    } catch (error) {
      if (error instanceof z2.ZodError) {
        return res.status(400).json({ message: "Dati non validi", errors: error.errors });
      }
      res.status(500).json({ message: "Errore nel salvataggio del risultato" });
    }
  });
  app2.get("/api/users/:userId/achievements", async (req, res) => {
    try {
      const userId = parseInt(req.params.userId);
      const achievements3 = await storage.getUserAchievements(userId);
      res.json(achievements3);
    } catch (error) {
      res.status(500).json({ message: "Errore nel recupero dei traguardi" });
    }
  });
  app2.get("/api/glossary", async (req, res) => {
    try {
      const terms = await storage.getAllGlossaryTerms();
      res.json(terms);
    } catch (error) {
      res.status(500).json({ message: "Errore nel recupero del glossario" });
    }
  });
  app2.get("/api/glossary/:term", async (req, res) => {
    try {
      const term = req.params.term;
      const glossaryTerm = await storage.getGlossaryTerm(term);
      if (!glossaryTerm) {
        return res.status(404).json({ message: "Termine non trovato" });
      }
      res.json(glossaryTerm);
    } catch (error) {
      res.status(500).json({ message: "Errore nel recupero del termine" });
    }
  });
  app2.post("/api/admin/chapters", requireAdminAuth, async (req, res) => {
    try {
      const chapterData = req.body;
      const chapter = await storage.createChapter(chapterData);
      res.json(chapter);
    } catch (error) {
      res.status(500).json({ message: "Errore nella creazione del capitolo" });
    }
  });
  app2.put("/api/admin/chapters/:id", requireAdminAuth, async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const chapterData = req.body;
      const chapter = await storage.updateChapter(id, chapterData);
      res.json(chapter);
    } catch (error) {
      res.status(500).json({ message: "Errore nell'aggiornamento del capitolo" });
    }
  });
  app2.delete("/api/admin/chapters/:id", requireAdminAuth, async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      await storage.deleteChapter(id);
      res.json({ message: "Capitolo eliminato con successo" });
    } catch (error) {
      res.status(500).json({ message: "Errore nell'eliminazione del capitolo" });
    }
  });
  app2.post("/api/admin/quizzes", requireAdminAuth, async (req, res) => {
    try {
      const quizData = req.body;
      const quiz = await storage.createQuiz(quizData);
      res.json(quiz);
    } catch (error) {
      res.status(500).json({ message: "Errore nella creazione del quiz" });
    }
  });
  app2.put("/api/admin/quizzes/:id", requireAdminAuth, async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const quizData = req.body;
      const quiz = await storage.updateQuiz(id, quizData);
      res.json(quiz);
    } catch (error) {
      res.status(500).json({ message: "Errore nell'aggiornamento del quiz" });
    }
  });
  app2.delete("/api/admin/quizzes/:id", requireAdminAuth, async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      await storage.deleteQuiz(id);
      res.json({ message: "Quiz eliminato con successo" });
    } catch (error) {
      res.status(500).json({ message: "Errore nell'eliminazione del quiz" });
    }
  });
  app2.post("/api/admin/glossary", requireAdminAuth, async (req, res) => {
    try {
      const termData = req.body;
      const term = await storage.createGlossaryTerm(termData);
      res.json(term);
    } catch (error) {
      res.status(500).json({ message: "Errore nella creazione del termine" });
    }
  });
  app2.put("/api/admin/glossary/:term", requireAdminAuth, async (req, res) => {
    try {
      const term = req.params.term;
      const termData = req.body;
      const updatedTerm = await storage.updateGlossaryTerm(term, termData);
      res.json(updatedTerm);
    } catch (error) {
      res.status(500).json({ message: "Errore nell'aggiornamento del termine" });
    }
  });
  app2.delete("/api/admin/glossary/:term", requireAdminAuth, async (req, res) => {
    try {
      const term = req.params.term;
      await storage.deleteGlossaryTerm(term);
      res.json({ message: "Termine eliminato con successo" });
    } catch (error) {
      res.status(500).json({ message: "Errore nell'eliminazione del termine" });
    }
  });
  app2.get("/api/admin/quizzes", requireAdminAuth, async (req, res) => {
    try {
      const quizzes2 = await storage.getAllQuizzes();
      res.json(quizzes2);
    } catch (error) {
      res.status(500).json({ message: "Errore nel recupero dei quiz" });
    }
  });
  app2.post("/api/insights/analyze", async (req, res) => {
    try {
      const { passage, chapterId } = req.body;
      if (!passage || !passage.trim()) {
        return res.status(400).json({ message: "Brano richiesto per l'analisi" });
      }
      try {
        const { aiInsights: aiInsights2 } = await Promise.resolve().then(() => (init_ai_insights(), ai_insights_exports));
        const analysis = await aiInsights2.analyzePassage(passage);
        res.json(analysis);
      } catch (aiError) {
        console.log("Using fallback analysis due to API limitations");
        const { getMockInsight: getMockInsight2 } = await Promise.resolve().then(() => (init_mock_insights(), mock_insights_exports));
        const analysis = getMockInsight2(passage);
        res.json(analysis);
      }
    } catch (error) {
      console.error("Error analyzing passage:", error);
      res.status(500).json({ message: "Errore nell'analisi del brano" });
    }
  });
  app2.post("/api/insights/questions", async (req, res) => {
    try {
      const { passage, difficulty = "intermediate" } = req.body;
      if (!passage || !passage.trim()) {
        return res.status(400).json({ message: "Brano richiesto per generare domande" });
      }
      const { aiInsights: aiInsights2 } = await Promise.resolve().then(() => (init_ai_insights(), ai_insights_exports));
      const questions = await aiInsights2.generateContextualQuestions(passage, difficulty);
      res.json(questions);
    } catch (error) {
      console.error("Error generating questions:", error);
      res.status(500).json({ message: "Errore nella generazione delle domande" });
    }
  });
  app2.post("/api/insights/ask", async (req, res) => {
    try {
      const { concept, context } = req.body;
      if (!concept || !concept.trim()) {
        return res.status(400).json({ message: "Domanda richiesta" });
      }
      const { aiInsights: aiInsights2 } = await Promise.resolve().then(() => (init_ai_insights(), ai_insights_exports));
      const explanation = await aiInsights2.explainConcept(concept, context);
      res.json({ explanation });
    } catch (error) {
      console.error("Error explaining concept:", error);
      res.status(500).json({ message: "Errore nella spiegazione del concetto" });
    }
  });
  const httpServer = createServer(app2);
  return httpServer;
}

// server/vite.ts
import express from "express";
import fs from "fs";
import path2 from "path";
import { createServer as createViteServer, createLogger } from "vite";

// vite.config.ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import runtimeErrorOverlay from "@replit/vite-plugin-runtime-error-modal";
var vite_config_default = defineConfig({
  plugins: [
    react(),
    runtimeErrorOverlay(),
    ...process.env.NODE_ENV !== "production" && process.env.REPL_ID !== void 0 ? [
      await import("@replit/vite-plugin-cartographer").then(
        (m) => m.cartographer()
      )
    ] : []
  ],
  resolve: {
    alias: {
      "@": path.resolve(import.meta.dirname, "client", "src"),
      "@shared": path.resolve(import.meta.dirname, "shared"),
      "@assets": path.resolve(import.meta.dirname, "attached_assets")
    }
  },
  root: path.resolve(import.meta.dirname, "client"),
  build: {
    outDir: path.resolve(import.meta.dirname, "dist/public"),
    emptyOutDir: true
  },
  server: {
    fs: {
      strict: true,
      deny: ["**/.*"]
    }
  }
});

// server/vite.ts
import { nanoid } from "nanoid";
var viteLogger = createLogger();
function log(message, source = "express") {
  const formattedTime = (/* @__PURE__ */ new Date()).toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    second: "2-digit",
    hour12: true
  });
  console.log(`${formattedTime} [${source}] ${message}`);
}
async function setupVite(app2, server) {
  const serverOptions = {
    middlewareMode: true,
    hmr: { server },
    allowedHosts: true
  };
  const vite = await createViteServer({
    ...vite_config_default,
    configFile: false,
    customLogger: {
      ...viteLogger,
      error: (msg, options) => {
        viteLogger.error(msg, options);
        process.exit(1);
      }
    },
    server: serverOptions,
    appType: "custom"
  });
  app2.use(vite.middlewares);
  app2.use("*", async (req, res, next) => {
    const url = req.originalUrl;
    try {
      const clientTemplate = path2.resolve(
        import.meta.dirname,
        "..",
        "client",
        "index.html"
      );
      let template = await fs.promises.readFile(clientTemplate, "utf-8");
      template = template.replace(
        `src="/src/main.tsx"`,
        `src="/src/main.tsx?v=${nanoid()}"`
      );
      const page = await vite.transformIndexHtml(url, template);
      res.status(200).set({ "Content-Type": "text/html" }).end(page);
    } catch (e) {
      vite.ssrFixStacktrace(e);
      next(e);
    }
  });
}
function serveStatic(app2) {
  const distPath = path2.resolve(import.meta.dirname, "public");
  if (!fs.existsSync(distPath)) {
    throw new Error(
      `Could not find the build directory: ${distPath}, make sure to build the client first`
    );
  }
  app2.use(express.static(distPath));
  app2.use("*", (_req, res) => {
    res.sendFile(path2.resolve(distPath, "index.html"));
  });
}

// server/index.ts
var app = express2();
app.use(express2.json());
app.use(express2.urlencoded({ extended: false }));
app.use((req, res, next) => {
  const start = Date.now();
  const path3 = req.path;
  let capturedJsonResponse = void 0;
  const originalResJson = res.json;
  res.json = function(bodyJson, ...args) {
    capturedJsonResponse = bodyJson;
    return originalResJson.apply(res, [bodyJson, ...args]);
  };
  res.on("finish", () => {
    const duration = Date.now() - start;
    if (path3.startsWith("/api")) {
      let logLine = `${req.method} ${path3} ${res.statusCode} in ${duration}ms`;
      if (capturedJsonResponse) {
        logLine += ` :: ${JSON.stringify(capturedJsonResponse)}`;
      }
      if (logLine.length > 80) {
        logLine = logLine.slice(0, 79) + "\u2026";
      }
      log(logLine);
    }
  });
  next();
});
(async () => {
  const server = await registerRoutes(app);
  app.use((err, _req, res, _next) => {
    const status = err.status || err.statusCode || 500;
    const message = err.message || "Internal Server Error";
    res.status(status).json({ message });
    throw err;
  });
  if (app.get("env") === "development") {
    await setupVite(app, server);
  } else {
    serveStatic(app);
  }
  const port = 5e3;
  server.listen({
    port,
    host: "0.0.0.0",
    reusePort: true
  }, () => {
    log(`serving on port ${port}`);
  });
})();

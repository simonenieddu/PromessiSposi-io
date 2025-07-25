import Anthropic from '@anthropic-ai/sdk';

// the newest Anthropic model is "claude-sonnet-4-20250514" which was released May 14, 2025. Use this by default unless user has already selected claude-3-7-sonnet-20250219
const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

export interface LiteraryInsight {
  passage: string;
  historicalContext: string;
  literaryAnalysis: string;
  themes: string[];
  characterAnalysis?: string;
  languageStyle: string;
  culturalSignificance: string;
  modernRelevance: string;
}

export interface ContextualQuestion {
  question: string;
  answer: string;
  difficulty: 'basic' | 'intermediate' | 'advanced';
  category: 'historical' | 'literary' | 'thematic' | 'linguistic';
}

export class AILiteraryInsights {
  async analyzePassage(passage: string, chapterTitle?: string): Promise<LiteraryInsight> {
    try {
      const prompt = `Analizza questo brano de "I Promessi Sposi" di Alessandro Manzoni fornendo un'analisi letteraria approfondita:

BRANO:
"${passage}"

${chapterTitle ? `CAPITOLO: ${chapterTitle}` : ''}

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
        model: 'claude-sonnet-4-20250514',
        system: 'Sei un esperto di letteratura italiana del XIX secolo, specializzato nell\'opera di Alessandro Manzoni. Fornisci analisi approfondite e accurate de "I Promessi Sposi".',
        max_tokens: 2000,
        messages: [
          { role: 'user', content: prompt }
        ],
      });

      const content = response.content[0];
      if (content.type !== 'text') {
        throw new Error('Unexpected response format from AI');
      }
      const analysis = JSON.parse(content.text);
      
      return {
        passage,
        historicalContext: analysis.historicalContext || '',
        literaryAnalysis: analysis.literaryAnalysis || '',
        themes: analysis.themes || [],
        characterAnalysis: analysis.characterAnalysis,
        languageStyle: analysis.languageStyle || '',
        culturalSignificance: analysis.culturalSignificance || '',
        modernRelevance: analysis.modernRelevance || ''
      };
    } catch (error) {
      console.error('Error analyzing passage:', error);
      throw new Error('Errore nell\'analisi del brano. Riprova più tardi.');
    }
  }

  async generateContextualQuestions(passage: string, difficulty: 'basic' | 'intermediate' | 'advanced' = 'intermediate'): Promise<ContextualQuestion[]> {
    try {
      const difficultyMap = {
        basic: 'domande semplici per studenti delle medie',
        intermediate: 'domande di livello intermedio per studenti delle superiori',
        advanced: 'domande approfondite per studenti universitari'
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
        model: 'claude-sonnet-4-20250514',
        system: 'Sei un insegnante esperto di letteratura italiana. Crea domande educative stimolanti su "I Promessi Sposi".',
        max_tokens: 1500,
        messages: [
          { role: 'user', content: prompt }
        ],
      });

      const content = response.content[0];
      if (content.type !== 'text') {
        throw new Error('Unexpected response format from AI');
      }
      return JSON.parse(content.text);
    } catch (error) {
      console.error('Error generating questions:', error);
      throw new Error('Errore nella generazione delle domande. Riprova più tardi.');
    }
  }

  async explainConcept(concept: string, context?: string): Promise<string> {
    try {
      const prompt = `Spiega questo concetto relativo a "I Promessi Sposi" in modo chiaro e comprensibile:

CONCETTO: ${concept}
${context ? `CONTESTO: ${context}` : ''}

Fornisci una spiegazione di 2-3 paragrafi che sia educativa e accessibile a studenti delle superiori.`;

      const response = await anthropic.messages.create({
        model: 'claude-sonnet-4-20250514',
        system: 'Sei un tutor letterario che spiega concetti complessi in modo semplice e coinvolgente.',
        max_tokens: 800,
        messages: [
          { role: 'user', content: prompt }
        ],
      });

      const content = response.content[0];
      if (content.type !== 'text') {
        throw new Error('Unexpected response format from AI');
      }
      return content.text;
    } catch (error) {
      console.error('Error explaining concept:', error);
      throw new Error('Errore nella spiegazione del concetto. Riprova più tardi.');
    }
  }

  async comparePassages(passage1: string, passage2: string): Promise<string> {
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
        model: 'claude-sonnet-4-20250514',
        system: 'Sei un critico letterario specializzato nell\'analisi comparativa di testi manzoniani.',
        max_tokens: 1200,
        messages: [
          { role: 'user', content: prompt }
        ],
      });

      const content = response.content[0];
      if (content.type !== 'text') {
        throw new Error('Unexpected response format from AI');
      }
      return content.text;
    } catch (error) {
      console.error('Error comparing passages:', error);
      throw new Error('Errore nel confronto dei brani. Riprova più tardi.');
    }
  }
}

export const aiInsights = new AILiteraryInsights();
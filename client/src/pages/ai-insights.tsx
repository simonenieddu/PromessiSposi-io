import { LiteraryInsights } from "@/components/literary-insights";

export default function AIInsightsPage() {
  const sampleText = `Quel ramo del lago di Como, che volge a mezzogiorno, tra due catene non interrotte di monti, tutto a seni e a golfi, a seconda dello sporgere e del rientrare de' promontori, vien, quasi a un tratto, a ristringersi, e a prender la forma e l'andamento d'un fiume, tra un promontorio a destra, e un'ampia costiera a sinistra, che si va poco a poco sollevando, e divergendo in più poggi, e in più vallate, segnate da terre, e da ville, delle quali alcune spiccano biancheggianti tra il verde de' boschi.`;

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto py-8">
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold mb-4">Analisi Letteraria AI</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Scopri il potere dell'intelligenza artificiale per comprendere "I Promessi Sposi" di Alessandro Manzoni. 
            Ottieni analisi approfondite, contesto storico e interpretazioni letterarie in tempo reale.
          </p>
        </div>
        
        <LiteraryInsights selectedText={sampleText} />
      </div>
    </div>
  );
}
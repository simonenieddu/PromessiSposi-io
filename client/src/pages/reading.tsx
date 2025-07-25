import { useState, useEffect } from "react";
import { useParams, useLocation } from "wouter";
import { useAuth } from "@/lib/auth";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import Header from "@/components/header";
import TooltipModal from "@/components/tooltip-modal";
import QuizSection from "@/components/quiz-section";
import ProgressWidget from "@/components/progress-widget";
import HistoricalContext from "@/components/historical-context";
import AchievementsWidget from "@/components/achievements-widget";
import NotesPanel from "@/components/notes-panel";
import ChallengesPanel from "@/components/challenges-panel";
import { chaptersData, quizzesData, glossaryData } from "@/data/chapters";

export default function Reading() {
  const { chapterId } = useParams();
  const [, navigate] = useLocation();
  const { user } = useAuth();
  
  const [selectedTerm, setSelectedTerm] = useState<string>("");
  const [isTooltipOpen, setIsTooltipOpen] = useState(false);
  const [readingProgress, setReadingProgress] = useState(85);

  const currentChapterId = chapterId ? parseInt(chapterId) : 1;
  const currentChapter = chaptersData.find(c => c.id === currentChapterId);
  const currentQuizzes = quizzesData.filter(q => q.chapterId === currentChapterId);

  useEffect(() => {
    if (!user) {
      navigate("/auth");
      return;
    }
  }, [user, navigate]);

  const handleTooltipClick = (term: string) => {
    setSelectedTerm(term);
    setIsTooltipOpen(true);
  };

  const renderInteractiveText = (text: string) => {
    const glossaryTerms = glossaryData.map(g => g.term);
    let processedText = text;
    
    glossaryTerms.forEach(term => {
      const regex = new RegExp(`\\b${term}\\b`, 'gi');
      processedText = processedText.replace(regex, (match) => {
        const color = Math.random() > 0.5 ? 'literary-blue' : 'parchment';
        return `<span class="tooltip-trigger ${color}" data-term="${match}">${match}</span>`;
      });
    });
    
    return processedText;
  };

  useEffect(() => {
    // Add click listeners to tooltip triggers
    const tooltipTriggers = document.querySelectorAll('[data-term]');
    tooltipTriggers.forEach(trigger => {
      trigger.addEventListener('click', (e) => {
        const term = (e.target as HTMLElement).getAttribute('data-term');
        if (term) handleTooltipClick(term);
      });
    });

    return () => {
      tooltipTriggers.forEach(trigger => {
        trigger.removeEventListener('click', () => {});
      });
    };
  }, [currentChapter]);

  if (!user) {
    return (
      <div className="min-h-screen bg-warm-cream flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-literary-blue"></div>
      </div>
    );
  }

  if (!currentChapter) {
    return (
      <div className="min-h-screen bg-warm-cream">
        <Header />
        <div className="max-w-7xl mx-auto px-4 py-8">
          <Card>
            <CardContent className="p-6 text-center">
              <p className="text-gray-600">Capitolo non trovato.</p>
              <Button onClick={() => navigate("/reading/1")} className="mt-4">
                Vai al primo capitolo
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <Header />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          
          {/* Main Reading Area */}
          <div className="lg:col-span-3">
            {/* Chapter Header */}
            <Card className="modern-card mb-8 overflow-hidden">
              <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-6 text-white">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <h2 className="text-4xl font-playfair font-bold mb-2">
                      Capitolo {currentChapter.number}
                    </h2>
                    <p className="text-blue-100 text-lg">{currentChapter.title}</p>
                  </div>
                  <div className="mt-4 sm:mt-0">
                    <div className="flex items-center bg-white/20 backdrop-blur-sm px-4 py-3 rounded-full border border-white/30">
                      <i className="fas fa-check-circle text-green-300 mr-2"></i>
                      <span className="text-sm font-medium text-white">
                        {readingProgress === 100 ? "Completato" : "In corso"}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              
              <CardContent className="p-6">
                {/* Progress Bar */}
                <div className="mb-4">
                  <div className="flex justify-between text-sm text-gray-600 mb-3">
                    <span className="font-medium">Progresso lettura</span>
                    <span className="font-bold text-blue-600">{readingProgress}%</span>
                  </div>
                  <Progress value={readingProgress} className="h-3 bg-gray-200" />
                </div>
              </CardContent>
            </Card>

            {/* Interactive Reading */}
            <Card className="modern-card mb-8">
              <CardContent className="p-10">
                <div className="font-crimson text-lg leading-relaxed space-y-8 text-gray-800">
                  {currentChapter.content.split('\n\n').map((paragraph, index) => (
                    <p 
                      key={index}
                      className="first-letter:text-6xl first-letter:font-playfair first-letter:text-blue-600 first-letter:float-left first-letter:mr-2 first-letter:mt-2"
                      dangerouslySetInnerHTML={{ 
                        __html: renderInteractiveText(paragraph) 
                      }}
                    />
                  ))}
                </div>

                {/* Reading Actions */}
                <div className="flex justify-between items-center mt-12 pt-8 border-t border-gray-200">
                  <Button variant="ghost" className="text-gray-600 hover:text-blue-600 hover:bg-blue-50 px-6 py-3 rounded-full font-medium">
                    <i className="fas fa-bookmark mr-2"></i>
                    Salva posizione
                  </Button>
                  <Button 
                    className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-3 rounded-full font-semibold shadow-lg hover:shadow-xl transition-all duration-200"
                    onClick={() => {
                      const nextChapter = currentChapterId + 1;
                      if (nextChapter <= chaptersData.length) {
                        navigate(`/reading/${nextChapter}`);
                      }
                    }}
                  >
                    <span className="mr-2">📖</span>
                    Continua lettura
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Quiz Section */}
            <QuizSection quizzes={currentQuizzes} chapterId={currentChapterId} />
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            <ProgressWidget />
            <HistoricalContext context={currentChapter.historicalContext} />
            <AchievementsWidget />
          </div>
        </div>
      </div>

      {/* Tooltip Modal */}
      <TooltipModal 
        isOpen={isTooltipOpen}
        onClose={() => setIsTooltipOpen(false)}
        term={selectedTerm}
      />

      {/* Mobile Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 md:hidden">
        <div className="flex justify-around py-2">
          <button className="flex flex-col items-center py-2 px-4 text-literary-blue">
            <i className="fas fa-book text-lg"></i>
            <span className="text-xs mt-1">Leggi</span>
          </button>
          <button 
            className="flex flex-col items-center py-2 px-4 text-gray-500"
            onClick={() => navigate("/dashboard")}
          >
            <i className="fas fa-chart-line text-lg"></i>
            <span className="text-xs mt-1">Progressi</span>
          </button>
          <button className="flex flex-col items-center py-2 px-4 text-gray-500">
            <i className="fas fa-trophy text-lg"></i>
            <span className="text-xs mt-1">Traguardi</span>
          </button>
          <button className="flex flex-col items-center py-2 px-4 text-gray-500">
            <i className="fas fa-user text-lg"></i>
            <span className="text-xs mt-1">Profilo</span>
          </button>
        </div>
      </div>
    </div>
  );
}

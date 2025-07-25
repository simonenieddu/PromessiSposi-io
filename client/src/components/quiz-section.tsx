import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/lib/auth";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";

interface Quiz {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  points: number;
}

interface QuizSectionProps {
  quizzes: Quiz[];
  chapterId: number;
}

export default function QuizSection({ quizzes, chapterId }: QuizSectionProps) {
  const [currentQuizIndex, setCurrentQuizIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [results, setResults] = useState<{ [key: number]: boolean }>({});
  
  const { user } = useAuth();
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const submitAnswerMutation = useMutation({
    mutationFn: async (data: any) => {
      return await apiRequest("POST", "/api/quiz-results", data);
    },
    onSuccess: (result) => {
      queryClient.invalidateQueries({ queryKey: ['/api/users', user?.id, 'progress'] });
      if (result.ok) {
        toast({
          title: result.isCorrect ? "Risposta corretta!" : "Risposta sbagliata",
          description: result.isCorrect 
            ? `Hai guadagnato ${result.pointsEarned} Punti Edo!`
            : "Non preoccuparti, continua a studiare!",
        });
      }
    },
  });

  if (!quizzes || quizzes.length === 0) {
    return (
      <Card>
        <CardContent className="p-6 text-center">
          <p className="text-gray-600">Nessun quiz disponibile per questo capitolo.</p>
        </CardContent>
      </Card>
    );
  }

  const currentQuiz = quizzes[currentQuizIndex];

  const handleSubmitAnswer = async () => {
    if (selectedAnswer === null || !user) return;

    const isCorrect = selectedAnswer === currentQuiz.correctAnswer;
    
    const resultData = {
      userId: user.id,
      quizId: currentQuiz.id,
      selectedAnswer,
      isCorrect,
      pointsEarned: isCorrect ? currentQuiz.points : 0,
    };

    await submitAnswerMutation.mutateAsync(resultData);
    
    setResults(prev => ({ ...prev, [currentQuiz.id]: isCorrect }));
    setShowResult(true);
  };

  const handleNextQuestion = () => {
    if (currentQuizIndex < quizzes.length - 1) {
      setCurrentQuizIndex(prev => prev + 1);
      setSelectedAnswer(null);
      setShowResult(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center">
          <div className="bg-edo-gold/10 p-3 rounded-full mr-4">
            <i className="fas fa-question-circle text-edo-gold text-xl"></i>
          </div>
          <div>
            <CardTitle className="font-playfair text-literary-blue">
              Quiz di Comprensione
            </CardTitle>
            <p className="text-gray-600">Verifica la tua comprensione del capitolo</p>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-6">
        <div className="border border-gray-200 rounded-lg p-4">
          <h4 className="font-semibold mb-3">
            {currentQuizIndex + 1}. {currentQuiz.question}
          </h4>
          
          <RadioGroup 
            value={selectedAnswer?.toString()} 
            onValueChange={(value) => setSelectedAnswer(parseInt(value))}
            disabled={showResult}
          >
            {currentQuiz.options.map((option, index) => (
              <div key={index} className="flex items-center space-x-2">
                <RadioGroupItem value={index.toString()} id={`option-${index}`} />
                <Label 
                  htmlFor={`option-${index}`}
                  className={`flex-1 p-3 rounded-lg border cursor-pointer transition-colors ${
                    showResult && index === currentQuiz.correctAnswer
                      ? 'bg-green-50 border-green-200'
                      : showResult && selectedAnswer === index && index !== currentQuiz.correctAnswer
                      ? 'bg-red-50 border-red-200'
                      : 'hover:bg-gray-50'
                  }`}
                >
                  {option}
                  {showResult && index === currentQuiz.correctAnswer && (
                    <i className="fas fa-check-circle text-green-500 ml-auto"></i>
                  )}
                </Label>
              </div>
            ))}
          </RadioGroup>

          {showResult && (
            <div className="mt-4 p-3 bg-blue-50 rounded-lg">
              <p className="text-sm text-blue-800">
                <strong>Spiegazione:</strong> {currentQuiz.explanation}
              </p>
            </div>
          )}
        </div>

        <div className="flex justify-between items-center pt-4 border-t border-gray-200">
          <div className="text-sm text-gray-500">
            Domanda {currentQuizIndex + 1} di {quizzes.length}
          </div>
          
          {!showResult ? (
            <Button 
              onClick={handleSubmitAnswer}
              disabled={selectedAnswer === null || submitAnswerMutation.isPending}
              className="bg-literary-blue hover:bg-literary-blue/90"
            >
              {submitAnswerMutation.isPending ? "Verifica..." : "Verifica risposta"}
            </Button>
          ) : currentQuizIndex < quizzes.length - 1 ? (
            <Button 
              onClick={handleNextQuestion}
              className="bg-literary-blue hover:bg-literary-blue/90"
            >
              Prossima domanda
            </Button>
          ) : (
            <div className="text-sm font-semibold text-green-600">
              Quiz completato!
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

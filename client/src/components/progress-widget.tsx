import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { useAuth } from "@/lib/auth";
import { useQuery } from "@tanstack/react-query";

export default function ProgressWidget() {
  const { user } = useAuth();
  
  const { data: progress, isLoading } = useQuery({
    queryKey: ['/api/users', user?.id, 'progress'],
    enabled: !!user,
  });

  if (isLoading) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="animate-pulse space-y-4">
            <div className="h-4 bg-gray-200 rounded w-3/4"></div>
            <div className="h-2 bg-gray-200 rounded"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2"></div>
            <div className="h-2 bg-gray-200 rounded"></div>
          </div>
        </CardContent>
      </Card>
    );
  }

  const completedChapters = progress?.filter((p: any) => p.isCompleted).length || 0;
  const totalChapters = 38; // I Promessi Sposi has 38 chapters
  const completedQuizzes = 12; // This would come from actual data
  const totalQuizzes = 15;

  const chaptersProgress = (completedChapters / totalChapters) * 100;
  const quizzesProgress = (completedQuizzes / totalQuizzes) * 100;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-playfair text-literary-blue">
          I tuoi progressi
        </CardTitle>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <div>
          <div className="flex justify-between text-sm mb-2">
            <span className="text-gray-600">Capitoli completati</span>
            <span className="font-semibold">{completedChapters}/{totalChapters}</span>
          </div>
          <Progress value={chaptersProgress} className="h-2" />
        </div>
        
        <div>
          <div className="flex justify-between text-sm mb-2">
            <span className="text-gray-600">Quiz completati</span>
            <span className="font-semibold">{completedQuizzes}/{totalQuizzes}</span>
          </div>
          <Progress value={quizzesProgress} className="h-2" />
        </div>

        <div className="pt-4 border-t border-gray-200">
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600">Livello attuale</span>
            <span className="bg-edo-gold text-white px-3 py-1 rounded-full text-sm font-semibold">
              {user?.level || "Novizio"}
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

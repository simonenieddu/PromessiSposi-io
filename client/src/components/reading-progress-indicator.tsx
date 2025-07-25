import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/hooks/use-toast";

interface ReadingProgressIndicatorProps {
  progress: number;
  timeSpent: number;
  isAutoSaving: boolean;
  chapterTitle: string;
}

export default function ReadingProgressIndicator({ 
  progress, 
  timeSpent, 
  isAutoSaving, 
  chapterTitle 
}: ReadingProgressIndicatorProps) {
  const { toast } = useToast();
  const [lastSaveTime, setLastSaveTime] = useState<Date | null>(null);

  useEffect(() => {
    if (isAutoSaving) {
      setLastSaveTime(new Date());
      toast({
        title: "Progresso salvato",
        description: `${Math.floor(progress)}% di ${chapterTitle} completato`,
        duration: 2000,
      });
    }
  }, [isAutoSaving, progress, chapterTitle, toast]);

  const formatTime = (minutes: number) => {
    if (minutes < 60) {
      return `${minutes} min`;
    }
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}h ${mins}m`;
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <Card className="bg-white/95 backdrop-blur-sm shadow-lg border border-blue-200/50 max-w-xs">
        <CardContent className="p-4">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="font-semibold text-sm text-gray-800">Progresso Lettura</h4>
              <div className="flex items-center space-x-2">
                {isAutoSaving && (
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                )}
                <span className="text-xs text-gray-500">
                  {isAutoSaving ? "Salvando..." : "Salvato"}
                </span>
              </div>
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between text-xs text-gray-600">
                <span>Completamento</span>
                <span className="font-bold text-blue-600">{Math.floor(progress)}%</span>
              </div>
              <Progress value={progress} className="h-2 bg-gray-100" />
            </div>
            
            <div className="flex justify-between text-xs text-gray-500">
              <span>Tempo: {formatTime(timeSpent)}</span>
              {lastSaveTime && (
                <span>
                  Ultimo salvataggio: {lastSaveTime.toLocaleTimeString("it-IT", { 
                    hour: "2-digit", 
                    minute: "2-digit" 
                  })}
                </span>
              )}
            </div>
            
            {progress >= 90 && (
              <div className="bg-gradient-to-r from-green-500 to-blue-500 text-white p-2 rounded-lg text-xs text-center font-medium">
                🎉 Capitolo completato!
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
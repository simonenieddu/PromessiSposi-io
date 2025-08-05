import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { useQuery } from "@tanstack/react-query";
import { useAuth } from "@/lib/auth";

interface UserLevel {
  id: number;
  level: number;
  experience: number;
  title: string;
  unlockedFeatures: string[];
}

const LEVEL_THRESHOLDS = [
  { level: 1, exp: 0, title: "Novizio", features: ["basic_reading"] },
  { level: 2, exp: 100, title: "Lettore", features: ["notes", "basic_quiz"] },
  { level: 3, exp: 300, title: "Studioso", features: ["advanced_quiz", "historical_context"] },
  { level: 4, exp: 600, title: "Esperto", features: ["challenges", "achievements"] },
  { level: 5, exp: 1000, title: "Maestro", features: ["teaching_tools", "advanced_analytics"] },
  { level: 6, exp: 1500, title: "Erudito", features: ["content_creation", "mentoring"] },
  { level: 7, exp: 2200, title: "Accademico", features: ["research_tools", "collaboration"] },
  { level: 8, exp: 3000, title: "Professore", features: ["course_creation", "student_management"] },
  { level: 9, exp: 4000, title: "Luminare", features: ["advanced_teaching", "curriculum_design"] },
  { level: 10, exp: 5500, title: "Gran Maestro", features: ["all_features", "exclusive_content"] }
];

export default function EnhancedLevelSystem() {
  const { user } = useAuth();

  const { data: userLevel, isLoading } = useQuery({
    queryKey: ['/api/user/level', user?.id],
    queryFn: async () => {
      const response = await fetch('/api/user/level');
      return response.json();
    },
    enabled: !!user?.id
  });

  if (isLoading || !userLevel) {
    return (
      <Card className="modern-card">
        <CardHeader>
          <CardTitle className="text-lg">⭐ Livello</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center text-gray-500">Caricamento livello...</div>
        </CardContent>
      </Card>
    );
  }

  const currentLevel = LEVEL_THRESHOLDS.find(l => l.level === userLevel.level) || LEVEL_THRESHOLDS[0];
  const nextLevel = LEVEL_THRESHOLDS.find(l => l.level === userLevel.level + 1);
  
  const progressToNext = nextLevel 
    ? ((userLevel.experience - currentLevel.exp) / (nextLevel.exp - currentLevel.exp)) * 100
    : 100;

  const expNeededForNext = nextLevel ? nextLevel.exp - userLevel.experience : 0;

  const getLevelColor = (level: number) => {
    if (level <= 2) return "from-gray-400 to-gray-600";
    if (level <= 4) return "from-green-400 to-green-600";
    if (level <= 6) return "from-blue-400 to-blue-600";
    if (level <= 8) return "from-purple-400 to-purple-600";
    return "from-yellow-400 to-orange-500";
  };

  const getFeatureIcon = (feature: string) => {
    const icons: { [key: string]: string } = {
      basic_reading: "📖",
      notes: "📝",
      basic_quiz: "❓",
      advanced_quiz: "🧠",
      historical_context: "🏛️",
      challenges: "🎯",
      achievements: "🏆",
      teaching_tools: "👩‍🏫",
      advanced_analytics: "📊",
      content_creation: "✍️",
      mentoring: "🤝",
      research_tools: "🔬",
      collaboration: "👥",
      course_creation: "📚",
      student_management: "👨‍🎓",
      advanced_teaching: "🎓",
      curriculum_design: "📋",
      all_features: "🌟",
      exclusive_content: "💎"
    };
    return icons[feature] || "⭐";
  };

  return (
    <Card className="modern-card overflow-hidden">
      <div className={`bg-gradient-to-br ${getLevelColor(userLevel.level)} p-6 text-white`}>
        <div className="flex items-center justify-between">
          <div>
            <div className="text-sm opacity-90">Livello {userLevel.level}</div>
            <div className="text-2xl font-bold">{userLevel.title}</div>
          </div>
          <div className="text-4xl">
            {userLevel.level >= 10 ? "👑" : "⭐"}
          </div>
        </div>
        
        {nextLevel && (
          <div className="mt-4">
            <div className="flex justify-between text-sm opacity-90 mb-2">
              <span>Progresso verso {nextLevel.title}</span>
              <span>{Math.round(progressToNext)}%</span>
            </div>
            <Progress value={progressToNext} className="h-2 bg-white/20" />
          </div>
        )}
      </div>

      <CardContent className="p-6 space-y-6">
        <div>
          <h4 className="font-semibold mb-3 text-gray-800">Esperienza</h4>
          <div className="flex justify-between items-center">
            <span className="text-2xl font-bold text-blue-600">{userLevel.experience}</span>
            {nextLevel && (
              <span className="text-sm text-gray-600">
                {expNeededForNext} exp per il prossimo livello
              </span>
            )}
          </div>
        </div>

        <div>
          <h4 className="font-semibold mb-3 text-gray-800">Funzionalità Sbloccate</h4>
          <div className="grid grid-cols-2 gap-2">
            {currentLevel.features.map((feature, index) => (
              <Badge 
                key={index} 
                variant="secondary" 
                className="justify-start p-2 text-xs"
              >
                <span className="mr-1">{getFeatureIcon(feature)}</span>
                {feature.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
              </Badge>
            ))}
          </div>
        </div>

        {nextLevel && (
          <div>
            <h4 className="font-semibold mb-3 text-gray-800">Prossime Funzionalità</h4>
            <div className="grid grid-cols-2 gap-2">
              {nextLevel.features.filter(f => !currentLevel.features.includes(f)).slice(0, 4).map((feature, index) => (
                <Badge 
                  key={index} 
                  variant="outline" 
                  className="justify-start p-2 text-xs opacity-60"
                >
                  <span className="mr-1">{getFeatureIcon(feature)}</span>
                  {feature.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
                </Badge>
              ))}
            </div>
          </div>
        )}

        <div className="bg-blue-50 p-4 rounded-lg">
          <h5 className="font-semibold text-blue-800 mb-2">Come guadagnare esperienza:</h5>
          <ul className="text-sm text-blue-700 space-y-1">
            <li>• Completa capitoli (+50 exp)</li>
            <li>• Supera quiz (+25-50 exp)</li>
            <li>• Scrivi note dettagliate (+10 exp)</li>
            <li>• Completa sfide (+100-500 exp)</li>
            <li>• Aiuta altri studenti (+75 exp)</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
}
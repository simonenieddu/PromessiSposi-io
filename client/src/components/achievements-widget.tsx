import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from "@/lib/auth";
import { useQuery } from "@tanstack/react-query";

export default function AchievementsWidget() {
  const { user } = useAuth();
  
  const { data: achievements, isLoading } = useQuery({
    queryKey: ['/api/users', user?.id, 'achievements'],
    enabled: !!user,
  });

  if (isLoading) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="animate-pulse space-y-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex items-center p-3 bg-gray-100 rounded-lg">
                <div className="w-10 h-10 bg-gray-200 rounded-full mr-3"></div>
                <div className="space-y-1 flex-1">
                  <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                  <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  // Sample achievements data - in real app this would come from the API
  const recentAchievements = [
    {
      name: "Primo Capitolo",
      description: "Completato oggi",
      icon: "fas fa-book",
      color: "green"
    },
    {
      name: "Quiz Master",
      description: "10 quiz perfetti",
      icon: "fas fa-star",
      color: "edo-gold"
    },
    {
      name: "Studente Costante",
      description: "7 giorni di fila",
      icon: "fas fa-fire",
      color: "purple"
    }
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-playfair text-literary-blue">
          Ultimi Traguardi
        </CardTitle>
      </CardHeader>
      
      <CardContent className="space-y-3">
        {recentAchievements.map((achievement, index) => (
          <div key={index} className={`flex items-center p-3 bg-${achievement.color}-50 rounded-lg`}>
            <div className={`bg-${achievement.color === 'edo-gold' ? 'edo-gold' : achievement.color === 'green' ? 'green-500' : 'purple-500'} text-white p-2 rounded-full mr-3`}>
              <i className={`${achievement.icon} text-sm`}></i>
            </div>
            <div>
              <div className={`font-semibold ${achievement.color === 'edo-gold' ? 'text-edo-gold' : achievement.color === 'green' ? 'text-green-800' : 'text-purple-800'}`}>
                {achievement.name}
              </div>
              <div className={`text-xs ${achievement.color === 'edo-gold' ? 'text-gray-600' : achievement.color === 'green' ? 'text-green-600' : 'text-purple-600'}`}>
                {achievement.description}
              </div>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}

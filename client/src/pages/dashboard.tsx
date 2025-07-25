import { useAuth } from "@/lib/auth";
import { useLocation } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import Header from "@/components/header";
import { chaptersData, achievementsData } from "@/data/chapters";

export default function Dashboard() {
  const { user } = useAuth();
  const [, navigate] = useLocation();

  const { data: userProgress, isLoading: progressLoading } = useQuery({
    queryKey: ['/api/users', user?.id, 'progress'],
    enabled: !!user,
  });

  const { data: userAchievements, isLoading: achievementsLoading } = useQuery({
    queryKey: ['/api/users', user?.id, 'achievements'],
    enabled: !!user,
  });

  if (!user) {
    navigate("/auth");
    return null;
  }

  const completedChapters = Array.isArray(userProgress) ? userProgress.filter((p: any) => p.isCompleted).length : 1;
  const totalChapters = 38;
  const chaptersProgress = (completedChapters / totalChapters) * 100;

  const recentActivity = [
    { type: "chapter", title: "Capitolo 1 completato", date: "Oggi", icon: "fas fa-book", color: "green" },
    { type: "quiz", title: "Quiz Capitolo 1 - 100%", date: "Oggi", icon: "fas fa-star", color: "edo-gold" },
    { type: "achievement", title: "Primo Capitolo sbloccato", date: "Oggi", icon: "fas fa-trophy", color: "purple" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <Header />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-12">
          <div className="modern-card p-8 bg-gradient-to-r from-blue-600 to-purple-600 text-white overflow-hidden relative">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
            <div className="relative">
              <h1 className="text-4xl font-avenir font-bold mb-3">
                Ciao, {user.firstName}! 👋
              </h1>
              <p className="text-blue-100 text-lg">
                Ecco un riepilogo dei tuoi progressi nello studio de I Promessi Sposi
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Stats */}
          <div className="lg:col-span-2 space-y-6">
            {/* Overall Progress */}
            <Card className="modern-card">
              <CardHeader>
                <CardTitle className="font-avenir text-2xl bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Progresso Generale
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-8">
                <div>
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-xl font-semibold text-gray-800">Capitoli completati</span>
                    <span className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                      {completedChapters}/{totalChapters}
                    </span>
                  </div>
                  <Progress value={chaptersProgress} className="h-4 bg-gray-200" />
                  <p className="text-sm text-gray-600 mt-3 font-medium">
                    Hai completato il {Math.round(chaptersProgress)}% del romanzo
                  </p>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                  <div className="bg-gradient-to-br from-blue-500 to-blue-600 p-6 rounded-2xl text-center text-white shadow-lg floating-card">
                    <div className="text-3xl font-bold">{user.points || 420}</div>
                    <div className="text-sm text-blue-100 font-medium">Punti Edo</div>
                  </div>
                  <div className="bg-gradient-to-br from-green-500 to-green-600 p-6 rounded-2xl text-center text-white shadow-lg floating-card">
                    <div className="text-3xl font-bold">12</div>
                    <div className="text-sm text-green-100 font-medium">Quiz completati</div>
                  </div>
                  <div className="bg-gradient-to-br from-purple-500 to-purple-600 p-6 rounded-2xl text-center text-white shadow-lg floating-card">
                    <div className="text-3xl font-bold">7</div>
                    <div className="text-sm text-purple-100 font-medium">Giorni consecutivi</div>
                  </div>
                  <div className="bg-gradient-to-br from-yellow-400 to-orange-500 p-6 rounded-2xl text-center text-white shadow-lg floating-card">
                    <div className="text-3xl font-bold">3</div>
                    <div className="text-sm text-yellow-100 font-medium">Traguardi</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Chapter Progress */}
            <Card className="modern-card">
              <CardHeader>
                <CardTitle className="font-avenir text-2xl bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Progressi per Capitolo
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {chaptersData.slice(0, 5).map((chapter) => (
                    <div key={chapter.id} className="flex items-center justify-between p-5 bg-gray-50 rounded-2xl hover:bg-gray-100 transition-colors">
                      <div className="flex items-center space-x-4">
                        <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-white text-sm font-bold shadow-lg ${
                          chapter.id <= completedChapters 
                            ? 'bg-gradient-to-br from-green-500 to-green-600' 
                            : 'bg-gradient-to-br from-gray-400 to-gray-500'
                        }`}>
                          {chapter.id <= completedChapters ? (
                            <i className="fas fa-check"></i>
                          ) : (
                            chapter.number
                          )}
                        </div>
                        <div>
                          <div className="font-bold text-lg text-gray-800">Capitolo {chapter.number}</div>
                          <div className="text-sm text-gray-600 max-w-xs truncate">{chapter.title}</div>
                        </div>
                      </div>
                      <Button 
                        size="sm" 
                        variant={chapter.id <= completedChapters ? "outline" : "default"}
                        className={chapter.id <= completedChapters 
                          ? "border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white rounded-full px-6 font-semibold" 
                          : "bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-full px-6 font-semibold shadow-lg"
                        }
                        onClick={() => navigate(`/reading/${chapter.id}`)}
                      >
                        {chapter.id <= completedChapters ? "Rivedi" : "Inizia"}
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Recent Activity */}
            <Card>
              <CardHeader>
                <CardTitle className="font-avenir text-literary-blue">
                  Attività Recente
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {recentActivity.map((activity, index) => (
                    <div key={index} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white ${
                        activity.color === 'green' ? 'bg-green-500' :
                        activity.color === 'edo-gold' ? 'bg-edo-gold' : 'bg-purple-500'
                      }`}>
                        <i className={`${activity.icon} text-sm`}></i>
                      </div>
                      <div className="flex-1">
                        <div className="font-semibold">{activity.title}</div>
                        <div className="text-sm text-gray-600">{activity.date}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            {/* Level Progress */}
            <Card className="modern-card overflow-hidden">
              <div className="bg-gradient-to-br from-yellow-400 to-orange-500 p-6 text-white">
                <CardTitle className="font-avenir text-xl text-white mb-4">
                  🏆 Livello Attuale
                </CardTitle>
                <div className="text-center">
                  <div className="text-4xl font-bold mb-2">
                    {user.level || "Novizio"}
                  </div>
                  <div className="text-sm text-yellow-100">
                    {user.points || 420} / 500 punti per il prossimo livello
                  </div>
                </div>
              </div>
              <CardContent className="p-6">
                <Progress value={((user.points || 420) / 500) * 100} className="h-4 bg-gray-200" />
                <p className="text-xs text-gray-600 mt-3 text-center font-medium">
                  {500 - (user.points || 420)} punti al prossimo livello
                </p>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card className="modern-card">
              <CardHeader>
                <CardTitle className="font-playfair text-xl bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  ⚡ Azioni Rapide
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button 
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-200"
                  onClick={() => navigate("/reading")}
                >
                  <i className="fas fa-book mr-2"></i>
                  Continua lettura
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full border-green-600 text-green-600 hover:bg-green-600 hover:text-white font-semibold py-3 rounded-full transition-all duration-200"
                >
                  <i className="fas fa-question-circle mr-2"></i>
                  Ripassa quiz
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-white font-semibold py-3 rounded-full transition-all duration-200"
                >
                  <i className="fas fa-search mr-2"></i>
                  Esplora glossario
                </Button>
              </CardContent>
            </Card>

            {/* Achievements Preview */}
            <Card>
              <CardHeader>
                <CardTitle className="font-playfair text-literary-blue">
                  Prossimi Traguardi
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3 p-2 bg-gray-50 rounded-lg opacity-60">
                    <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
                      <i className="fas fa-book-open text-gray-500 text-sm"></i>
                    </div>
                    <div>
                      <div className="font-semibold text-sm">Secondo Capitolo</div>
                      <div className="text-xs text-gray-500">Completa il capitolo 2</div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3 p-2 bg-gray-50 rounded-lg opacity-60">
                    <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
                      <i className="fas fa-medal text-gray-500 text-sm"></i>
                    </div>
                    <div>
                      <div className="font-semibold text-sm">Studioso</div>
                      <div className="text-xs text-gray-500">Guadagna 1000 punti</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

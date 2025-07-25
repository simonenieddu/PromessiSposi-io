import { useEffect } from "react";
import { useLocation } from "wouter";
import { useAuth } from "@/lib/auth";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function Home() {
  const { user, isLoading } = useAuth();
  const [, navigate] = useLocation();

  useEffect(() => {
    if (!isLoading && user) {
      navigate("/dashboard");
    }
  }, [user, isLoading, navigate]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-warm-cream flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-literary-blue"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 gradient-bg opacity-95"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20"></div>
        
        {/* Decorative Elements */}
        <div className="absolute top-20 left-10 w-72 h-72 bg-white/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-yellow-300/10 rounded-full blur-3xl"></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32">
          <div className="text-center">
            <div className="mb-8">
              <span className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium bg-white/20 text-white backdrop-blur-sm border border-white/20">
                <span className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse"></span>
                Piattaforma Beta
              </span>
            </div>
            
            <h1 className="text-6xl md:text-7xl font-avenir font-bold mb-8 text-white">
              <span className="bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent">
                PromessiSposi
              </span>
              <span className="text-yellow-300">.io</span>
            </h1>
            
            <p className="text-xl md:text-2xl mb-12 text-white/90 max-w-3xl mx-auto leading-relaxed">
              Un'esperienza didattica rivoluzionaria per esplorare il capolavoro di Manzoni 
              attraverso tecnologie moderne e gamification coinvolgente
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <Button 
                size="lg" 
                onClick={() => navigate("/auth")}
                className="w-64 bg-white hover:bg-gray-100 text-blue-600 font-bold text-lg py-4 floating-card shadow-xl border-2 border-white/20"
              >
                <span className="mr-2">🚀</span>
                Inizia il tuo viaggio
              </Button>
              <Button 
                size="lg" 
                variant="outline"
                className="w-64 bg-white/10 backdrop-blur-sm border-2 border-white text-white hover:bg-white/20 font-bold text-lg py-4 floating-card"
              >
                <span className="mr-2">📖</span>
                Scopri di più
              </Button>
            </div>
            
            <div className="mt-16 flex justify-center space-x-8 text-white/60">
              <div className="text-center">
                <div className="text-2xl font-bold text-white">1000+</div>
                <div className="text-sm">Studenti attivi</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-white">38</div>
                <div className="text-sm">Capitoli interattivi</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-white">100+</div>
                <div className="text-sm">Quiz coinvolgenti</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-avenir font-bold text-literary-blue mb-4">
            Perché scegliere PromessiSposi.io?
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Una piattaforma innovativa che combina letteratura classica e tecnologia moderna
            per rendere lo studio coinvolgente e efficace.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Card className="modern-card text-center p-8 floating-card group">
            <CardContent className="pt-6">
              <div className="bg-gradient-to-br from-blue-500 to-blue-600 p-6 rounded-2xl w-20 h-20 mx-auto mb-6 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                <i className="fas fa-book-open text-white text-3xl"></i>
              </div>
              <h3 className="text-2xl font-avenir font-bold mb-4 text-gray-800">Lettura Interattiva</h3>
              <p className="text-gray-600 leading-relaxed">
                Testo annotato con glossario integrato e note contestuali per una comprensione profonda e coinvolgente.
              </p>
            </CardContent>
          </Card>

          <Card className="modern-card text-center p-8 floating-card group">
            <CardContent className="pt-6">
              <div className="bg-gradient-to-br from-yellow-400 to-orange-500 p-6 rounded-2xl w-20 h-20 mx-auto mb-6 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                <i className="fas fa-trophy text-white text-3xl"></i>
              </div>
              <h3 className="text-2xl font-avenir font-bold mb-4 text-gray-800">Gamification</h3>
              <p className="text-gray-600 leading-relaxed">
                Sistema di punti, livelli e traguardi per rendere lo studio motivante e divertente.
              </p>
            </CardContent>
          </Card>

          <Card className="modern-card text-center p-8 floating-card group">
            <CardContent className="pt-6">
              <div className="bg-gradient-to-br from-purple-500 to-pink-500 p-6 rounded-2xl w-20 h-20 mx-auto mb-6 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                <i className="fas fa-chart-line text-white text-3xl"></i>
              </div>
              <h3 className="text-2xl font-avenir font-bold mb-4 text-gray-800">Progresso Personalizzato</h3>
              <p className="text-gray-600 leading-relaxed">
                Monitora i tuoi progressi con statistiche dettagliate e raccomandazioni personalizzate.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gray-50 py-16">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-avenir font-bold text-literary-blue mb-4">
            Pronto a iniziare?
          </h2>
          <p className="text-gray-600 mb-8 text-lg">
            Unisciti a migliaia di studenti che stanno già esplorando I Promessi Sposi 
            in modo nuovo e coinvolgente.
          </p>
          <Button 
            size="lg"
            onClick={() => navigate("/auth")}
            className="bg-literary-blue hover:bg-literary-blue/90 text-lg px-8 py-3"
          >
            Registrati gratuitamente
          </Button>
        </div>
      </div>
    </div>
  );
}

import { Link, useLocation } from "wouter";
import { useAuth } from "@/lib/auth";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function Header() {
  const { user, logout } = useAuth();
  const [location, navigate] = useLocation();

  return (
    <header className="bg-white/80 backdrop-blur-md border-b border-gray-200/50 sticky top-0 z-50 modern-shadow">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-18">
          <div className="flex items-center">
            <Link href="/">
              <h1 className="text-3xl font-avenir font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent cursor-pointer hover:scale-105 transition-transform duration-200">
                PromessiSposi.io
              </h1>
            </Link>
            <span className="ml-3 text-xs bg-gradient-to-r from-green-400 to-blue-500 text-white px-3 py-1.5 rounded-full font-medium shadow-sm">
              Beta
            </span>
          </div>
          
          {user && (
            <nav className="hidden md:flex space-x-8">
              <Link href="/reading">
                <a className={`transition-colors ${
                  location.startsWith('/reading') 
                    ? 'text-literary-blue' 
                    : 'text-gray-700 hover:text-literary-blue'
                }`}>
                  Capitoli
                </a>
              </Link>
              <Link href="/dashboard">
                <a className={`transition-colors ${
                  location === '/dashboard' 
                    ? 'text-literary-blue' 
                    : 'text-gray-700 hover:text-literary-blue'
                }`}>
                  Progressi
                </a>
              </Link>
              <a href="#" className="text-gray-700 hover:text-literary-blue transition-colors">
                Glossario
              </a>
            </nav>
          )}

          <div className="flex items-center space-x-6">
            {user ? (
              <>
                <div className="flex items-center bg-gradient-to-r from-yellow-400/20 to-orange-500/20 backdrop-blur-sm px-4 py-2.5 rounded-full border border-yellow-300/30 shadow-sm">
                  <i className="fas fa-coins text-yellow-600 mr-2"></i>
                  <span className="text-sm font-bold text-gray-700">
                    {user.points || 0} Punti Edo
                  </span>
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="p-2 rounded-full hover:bg-gray-100/50">
                      <Avatar className="h-10 w-10 shadow-md">
                        <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-600 text-white font-bold text-sm">
                          {user.firstName?.[0]}{user.lastName?.[0]}
                        </AvatarFallback>
                      </Avatar>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="modern-card min-w-[200px]">
                    <DropdownMenuItem onClick={() => navigate("/dashboard")} className="p-3 hover:bg-blue-50 rounded-lg">
                      <i className="fas fa-chart-line mr-3 text-blue-500"></i>
                      Dashboard
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => navigate("/teacher")} className="p-3 hover:bg-green-50 rounded-lg">
                      <i className="fas fa-chalkboard-teacher mr-3 text-green-500"></i>
                      Insegnante
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => navigate("/admin")} className="p-3 hover:bg-purple-50 rounded-lg">
                      <i className="fas fa-cog mr-3 text-purple-500"></i>
                      Admin
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={logout} className="p-3 hover:bg-red-50 rounded-lg text-red-600">
                      <i className="fas fa-sign-out-alt mr-3"></i>
                      Logout
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </>
            ) : (
              <Link href="/auth">
                <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold px-6 py-2.5 rounded-full shadow-lg hover:shadow-xl transition-all duration-200">
                  Accedi
                </Button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}

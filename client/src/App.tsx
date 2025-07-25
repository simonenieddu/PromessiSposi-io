import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AuthProvider } from "./lib/auth";
import { useAuth } from "./lib/auth";
import Home from "@/pages/home";
import Auth from "@/pages/auth";
import Reading from "@/pages/reading";
import Dashboard from "@/pages/dashboard";
import TeacherDashboard from "@/pages/teacher-dashboard";
import Admin from "@/pages/admin";
import AdminLogin from "@/pages/admin-login";
import AIInsightsPage from "@/pages/ai-insights";
import NotFound from "@/pages/not-found";

function Router() {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-warm-cream flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-literary-blue"></div>
      </div>
    );
  }

  return (
    <Switch>
      <Route path="/" component={user ? Dashboard : Home} />
      <Route path="/auth" component={Auth} />
      <Route path="/reading/:chapterId?" component={Reading} />
      <Route path="/dashboard" component={Dashboard} />
      <Route path="/teacher" component={TeacherDashboard} />
      <Route path="/admin" component={Admin} />
      <Route path="/admin/login" component={AdminLogin} />
      <Route path="/ai-insights" component={AIInsightsPage} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;

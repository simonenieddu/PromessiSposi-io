import { useState } from "react";
import { useLocation } from "wouter";
import { useAuth } from "@/lib/auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";

export default function Auth() {
  const [, navigate] = useLocation();
  const { login, register } = useAuth();
  const { toast } = useToast();
  
  const [loginData, setLoginData] = useState({
    email: "",
    password: ""
  });
  
  const [registerData, setRegisterData] = useState({
    email: "",
    password: "",
    firstName: "",
    lastName: "",
    studyReason: ""
  });

  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      await login(loginData.email, loginData.password);
      navigate("/reading");
      toast({
        title: "Accesso effettuato!",
        description: "Benvenuto su PromessiSposi.io",
      });
    } catch (error) {
      toast({
        title: "Errore di accesso",
        description: error instanceof Error ? error.message : "Credenziali non valide",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      await register(registerData);
      navigate("/reading");
      toast({
        title: "Registrazione completata!",
        description: "Benvenuto su PromessiSposi.io",
      });
    } catch (error) {
      toast({
        title: "Errore di registrazione",
        description: error instanceof Error ? error.message : "Errore durante la registrazione",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-warm-cream flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-playfair font-bold text-literary-blue">
            PromessiSposi.io
          </CardTitle>
          <p className="text-gray-600">Inizia il tuo viaggio nella letteratura italiana</p>
        </CardHeader>
        
        <CardContent>
          <Tabs defaultValue="login" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="login">Accedi</TabsTrigger>
              <TabsTrigger value="register">Registrati</TabsTrigger>
            </TabsList>
            
            <TabsContent value="login" className="space-y-4">
              <form onSubmit={handleLogin} className="space-y-4">
                <div>
                  <Label htmlFor="login-email">Email</Label>
                  <Input
                    id="login-email"
                    type="email"
                    placeholder="La tua email"
                    value={loginData.email}
                    onChange={(e) => setLoginData(prev => ({ ...prev, email: e.target.value }))}
                    required
                  />
                </div>
                
                <div>
                  <Label htmlFor="login-password">Password</Label>
                  <Input
                    id="login-password"
                    type="password"
                    placeholder="La tua password"
                    value={loginData.password}
                    onChange={(e) => setLoginData(prev => ({ ...prev, password: e.target.value }))}
                    required
                  />
                </div>
                
                <Button 
                  type="submit" 
                  className="w-full bg-literary-blue hover:bg-literary-blue/90"
                  disabled={isLoading}
                >
                  {isLoading ? "Accesso in corso..." : "Accedi"}
                </Button>
              </form>
            </TabsContent>
            
            <TabsContent value="register" className="space-y-4">
              <form onSubmit={handleRegister} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="firstName">Nome</Label>
                    <Input
                      id="firstName"
                      placeholder="Nome"
                      value={registerData.firstName}
                      onChange={(e) => setRegisterData(prev => ({ ...prev, firstName: e.target.value }))}
                      required
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="lastName">Cognome</Label>
                    <Input
                      id="lastName"
                      placeholder="Cognome"
                      value={registerData.lastName}
                      onChange={(e) => setRegisterData(prev => ({ ...prev, lastName: e.target.value }))}
                      required
                    />
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="register-email">Email</Label>
                  <Input
                    id="register-email"
                    type="email"
                    placeholder="La tua email"
                    value={registerData.email}
                    onChange={(e) => setRegisterData(prev => ({ ...prev, email: e.target.value }))}
                    required
                  />
                </div>
                
                <div>
                  <Label htmlFor="register-password">Password</Label>
                  <Input
                    id="register-password"
                    type="password"
                    placeholder="Crea una password"
                    value={registerData.password}
                    onChange={(e) => setRegisterData(prev => ({ ...prev, password: e.target.value }))}
                    required
                  />
                </div>
                
                <div>
                  <Label htmlFor="studyReason">Perché vuoi studiare I Promessi Sposi?</Label>
                  <Select value={registerData.studyReason} onValueChange={(value) => setRegisterData(prev => ({ ...prev, studyReason: value }))}>
                    <SelectTrigger>
                      <SelectValue placeholder="Seleziona il motivo" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="exam">Ripasso per esami scolastici</SelectItem>
                      <SelectItem value="personal">Interesse personale</SelectItem>
                      <SelectItem value="university">Approfondimento universitario</SelectItem>
                      <SelectItem value="literature">Passione per la letteratura</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <Button 
                  type="submit" 
                  className="w-full bg-literary-blue hover:bg-literary-blue/90"
                  disabled={isLoading}
                >
                  {isLoading ? "Registrazione..." : "Inizia il tuo viaggio"}
                </Button>
              </form>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}

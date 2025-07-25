import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Brain, BookOpen, History, Users, MessageSquare, ChevronDown, ChevronUp, Sparkles } from "lucide-react";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";

interface LiteraryInsight {
  id?: number;
  passage: string;
  historicalContext: string;
  literaryAnalysis: string;
  themes: string[];
  characterAnalysis?: string;
  languageStyle: string;
  culturalSignificance: string;
  modernRelevance: string;
}

interface ContextualQuestion {
  id?: number;
  question: string;
  answer: string;
  difficulty: 'basic' | 'intermediate' | 'advanced';
  category: 'historical' | 'literary' | 'thematic' | 'linguistic';
}

interface LiteraryInsightsProps {
  chapterId?: number;
  selectedText?: string;
  onClose?: () => void;
}

export function LiteraryInsights({ chapterId, selectedText, onClose }: LiteraryInsightsProps) {
  const [passage, setPassage] = useState(selectedText || "");
  const [activeTab, setActiveTab] = useState("analysis");
  const [expandedSections, setExpandedSections] = useState<Set<string>>(new Set(["themes", "historical"]));
  const [customQuestion, setCustomQuestion] = useState("");
  const { toast } = useToast();
  const queryClient = useQueryClient();

  // Get existing insights for chapter
  const { data: existingInsights = [] } = useQuery<LiteraryInsight[]>({
    queryKey: ["/api/insights/chapter", chapterId],
    enabled: !!chapterId,
  });

  // Generate new analysis
  const analyzePassageMutation = useMutation({
    mutationFn: (text: string) => 
      apiRequest("POST", "/api/insights/analyze", { 
        passage: text, 
        chapterId 
      }),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["/api/insights/chapter", chapterId] });
      toast({
        title: "Analisi completata",
        description: "Il brano è stato analizzato con successo dall'AI",
      });
    },
    onError: () => {
      toast({
        title: "Errore nell'analisi",
        description: "Non è stato possibile analizzare il brano. Riprova più tardi.",
        variant: "destructive",
      });
    },
  });

  // Generate contextual questions
  const generateQuestionsMutation = useMutation({
    mutationFn: ({ passage, difficulty }: { passage: string; difficulty: 'basic' | 'intermediate' | 'advanced' }) =>
      apiRequest("POST", "/api/insights/questions", { passage, difficulty }),
    onSuccess: () => {
      toast({
        title: "Domande generate",
        description: "Le domande di comprensione sono state create",
      });
    },
  });

  // Ask custom question
  const askQuestionMutation = useMutation({
    mutationFn: (question: string) =>
      apiRequest("POST", "/api/insights/ask", { 
        concept: question, 
        context: passage 
      }),
    onSuccess: () => {
      setCustomQuestion("");
      toast({
        title: "Risposta ricevuta",
        description: "L'AI ha risposto alla tua domanda",
      });
    },
  });

  const { data: currentInsight } = useQuery<LiteraryInsight>({
    queryKey: ["/api/insights/current"],
    enabled: analyzePassageMutation.isSuccess,
  });

  const { data: contextualQuestions = [] } = useQuery<ContextualQuestion[]>({
    queryKey: ["/api/insights/questions/current"],
    enabled: generateQuestionsMutation.isSuccess,
  });

  const { data: customAnswer } = useQuery<string>({
    queryKey: ["/api/insights/answer/current"],
    enabled: askQuestionMutation.isSuccess,
  });

  const toggleSection = (section: string) => {
    const newExpanded = new Set(expandedSections);
    if (newExpanded.has(section)) {
      newExpanded.delete(section);
    } else {
      newExpanded.add(section);
    }
    setExpandedSections(newExpanded);
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'basic': return 'bg-green-100 text-green-800';
      case 'intermediate': return 'bg-yellow-100 text-yellow-800';
      case 'advanced': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'historical': return <History className="w-4 h-4" />;
      case 'literary': return <BookOpen className="w-4 h-4" />;
      case 'thematic': return <Brain className="w-4 h-4" />;
      case 'linguistic': return <MessageSquare className="w-4 h-4" />;
      default: return <BookOpen className="w-4 h-4" />;
    }
  };

  const insight = currentInsight || existingInsights[0];

  return (
    <div className="w-full max-w-4xl mx-auto p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Sparkles className="w-6 h-6 text-blue-600" />
          <h2 className="text-2xl font-bold">Analisi Letteraria AI</h2>
        </div>
        {onClose && (
          <Button variant="outline" onClick={onClose}>
            Chiudi
          </Button>
        )}
      </div>

      {/* Text Input Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BookOpen className="w-5 h-5" />
            Seleziona Brano da Analizzare
          </CardTitle>
          <CardDescription>
            Incolla o seleziona un brano de "I Promessi Sposi" per ricevere un'analisi letteraria approfondita
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Textarea
            placeholder="Incolla qui il brano che vuoi analizzare..."
            value={passage}
            onChange={(e) => setPassage(e.target.value)}
            className="min-h-[120px]"
          />
          <div className="flex gap-2">
            <Button 
              onClick={() => analyzePassageMutation.mutate(passage)}
              disabled={!passage.trim() || analyzePassageMutation.isPending}
              className="flex items-center gap-2"
            >
              <Brain className="w-4 h-4" />
              {analyzePassageMutation.isPending ? "Analizzando..." : "Analizza Brano"}
            </Button>
            <Button 
              variant="outline"
              onClick={() => generateQuestionsMutation.mutate({ passage, difficulty: 'intermediate' })}
              disabled={!passage.trim() || generateQuestionsMutation.isPending}
            >
              Genera Domande
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Analysis Results */}
      {insight && (
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="analysis">Analisi Letteraria</TabsTrigger>
            <TabsTrigger value="questions">Domande di Comprensione</TabsTrigger>
            <TabsTrigger value="discussion">Discussione AI</TabsTrigger>
          </TabsList>

          <TabsContent value="analysis" className="space-y-4">
            {/* Themes */}
            <Card>
              <Collapsible 
                open={expandedSections.has("themes")} 
                onOpenChange={() => toggleSection("themes")}
              >
                <CollapsibleTrigger asChild>
                  <CardHeader className="cursor-pointer hover:bg-muted/50 transition-colors">
                    <div className="flex items-center justify-between">
                      <CardTitle className="flex items-center gap-2">
                        <Users className="w-5 h-5 text-purple-600" />
                        Temi Principali
                      </CardTitle>
                      {expandedSections.has("themes") ? 
                        <ChevronUp className="w-4 h-4" /> : 
                        <ChevronDown className="w-4 h-4" />
                      }
                    </div>
                  </CardHeader>
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <CardContent>
                    <div className="flex flex-wrap gap-2">
                      {insight.themes.map((theme, index) => (
                        <Badge key={index} variant="secondary" className="text-sm">
                          {theme}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </CollapsibleContent>
              </Collapsible>
            </Card>

            {/* Historical Context */}
            <Card>
              <Collapsible 
                open={expandedSections.has("historical")} 
                onOpenChange={() => toggleSection("historical")}
              >
                <CollapsibleTrigger asChild>
                  <CardHeader className="cursor-pointer hover:bg-muted/50 transition-colors">
                    <div className="flex items-center justify-between">
                      <CardTitle className="flex items-center gap-2">
                        <History className="w-5 h-5 text-amber-600" />
                        Contesto Storico
                      </CardTitle>
                      {expandedSections.has("historical") ? 
                        <ChevronUp className="w-4 h-4" /> : 
                        <ChevronDown className="w-4 h-4" />
                      }
                    </div>
                  </CardHeader>
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <CardContent>
                    <p className="text-sm leading-relaxed">{insight.historicalContext}</p>
                  </CardContent>
                </CollapsibleContent>
              </Collapsible>
            </Card>

            {/* Literary Analysis */}
            <Card>
              <Collapsible 
                open={expandedSections.has("literary")} 
                onOpenChange={() => toggleSection("literary")}
              >
                <CollapsibleTrigger asChild>
                  <CardHeader className="cursor-pointer hover:bg-muted/50 transition-colors">
                    <div className="flex items-center justify-between">
                      <CardTitle className="flex items-center gap-2">
                        <BookOpen className="w-5 h-5 text-blue-600" />
                        Analisi Letteraria
                      </CardTitle>
                      {expandedSections.has("literary") ? 
                        <ChevronUp className="w-4 h-4" /> : 
                        <ChevronDown className="w-4 h-4" />
                      }
                    </div>
                  </CardHeader>
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <CardContent>
                    <p className="text-sm leading-relaxed">{insight.literaryAnalysis}</p>
                  </CardContent>
                </CollapsibleContent>
              </Collapsible>
            </Card>

            {/* Character Analysis */}
            {insight.characterAnalysis && (
              <Card>
                <Collapsible 
                  open={expandedSections.has("characters")} 
                  onOpenChange={() => toggleSection("characters")}
                >
                  <CollapsibleTrigger asChild>
                    <CardHeader className="cursor-pointer hover:bg-muted/50 transition-colors">
                      <div className="flex items-center justify-between">
                        <CardTitle className="flex items-center gap-2">
                          <Users className="w-5 h-5 text-green-600" />
                          Analisi dei Personaggi
                        </CardTitle>
                        {expandedSections.has("characters") ? 
                          <ChevronUp className="w-4 h-4" /> : 
                          <ChevronDown className="w-4 h-4" />
                        }
                      </div>
                    </CardHeader>
                  </CollapsibleTrigger>
                  <CollapsibleContent>
                    <CardContent>
                      <p className="text-sm leading-relaxed">{insight.characterAnalysis}</p>
                    </CardContent>
                  </CollapsibleContent>
                </Collapsible>
              </Card>
            )}

            {/* Language Style */}
            <Card>
              <Collapsible 
                open={expandedSections.has("language")} 
                onOpenChange={() => toggleSection("language")}
              >
                <CollapsibleTrigger asChild>
                  <CardHeader className="cursor-pointer hover:bg-muted/50 transition-colors">
                    <div className="flex items-center justify-between">
                      <CardTitle className="flex items-center gap-2">
                        <MessageSquare className="w-5 h-5 text-indigo-600" />
                        Stile Linguistico
                      </CardTitle>
                      {expandedSections.has("language") ? 
                        <ChevronUp className="w-4 h-4" /> : 
                        <ChevronDown className="w-4 h-4" />
                      }
                    </div>
                  </CardHeader>
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <CardContent>
                    <p className="text-sm leading-relaxed">{insight.languageStyle}</p>
                  </CardContent>
                </CollapsibleContent>
              </Collapsible>
            </Card>

            {/* Cultural Significance */}
            <Card>
              <Collapsible 
                open={expandedSections.has("cultural")} 
                onOpenChange={() => toggleSection("cultural")}
              >
                <CollapsibleTrigger asChild>
                  <CardHeader className="cursor-pointer hover:bg-muted/50 transition-colors">
                    <div className="flex items-center justify-between">
                      <CardTitle className="flex items-center gap-2">
                        <Brain className="w-5 h-5 text-rose-600" />
                        Significato Culturale
                      </CardTitle>
                      {expandedSections.has("cultural") ? 
                        <ChevronUp className="w-4 h-4" /> : 
                        <ChevronDown className="w-4 h-4" />
                      }
                    </div>
                  </CardHeader>
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <CardContent>
                    <p className="text-sm leading-relaxed">{insight.culturalSignificance}</p>
                  </CardContent>
                </CollapsibleContent>
              </Collapsible>
            </Card>

            {/* Modern Relevance */}
            <Card>
              <Collapsible 
                open={expandedSections.has("modern")} 
                onOpenChange={() => toggleSection("modern")}
              >
                <CollapsibleTrigger asChild>
                  <CardHeader className="cursor-pointer hover:bg-muted/50 transition-colors">
                    <div className="flex items-center justify-between">
                      <CardTitle className="flex items-center gap-2">
                        <Sparkles className="w-5 h-5 text-cyan-600" />
                        Rilevanza Moderna
                      </CardTitle>
                      {expandedSections.has("modern") ? 
                        <ChevronUp className="w-4 h-4" /> : 
                        <ChevronDown className="w-4 h-4" />
                      }
                    </div>
                  </CardHeader>
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <CardContent>
                    <p className="text-sm leading-relaxed">{insight.modernRelevance}</p>
                  </CardContent>
                </CollapsibleContent>
              </Collapsible>
            </Card>
          </TabsContent>

          <TabsContent value="questions" className="space-y-4">
            <div className="grid gap-4">
              {contextualQuestions.map((question, index) => (
                <Card key={index}>
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <CardTitle className="flex items-center gap-2 text-base">
                        {getCategoryIcon(question.category)}
                        {question.question}
                      </CardTitle>
                      <div className="flex gap-2">
                        <Badge className={getDifficultyColor(question.difficulty)}>
                          {question.difficulty}
                        </Badge>
                        <Badge variant="outline">
                          {question.category}
                        </Badge>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm leading-relaxed text-muted-foreground">
                      {question.answer}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>

            {contextualQuestions.length === 0 && (
              <Card>
                <CardContent className="text-center py-8">
                  <p className="text-muted-foreground">
                    Genera domande di comprensione per iniziare l'analisi
                  </p>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="discussion" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MessageSquare className="w-5 h-5" />
                  Fai una Domanda all'AI
                </CardTitle>
                <CardDescription>
                  Chiedi all'AI di spiegare concetti specifici o approfondire aspetti del brano
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Textarea
                  placeholder="Esempio: Cosa significa la metafora del 'ramo del lago di Como'?"
                  value={customQuestion}
                  onChange={(e) => setCustomQuestion(e.target.value)}
                  className="min-h-[80px]"
                />
                <Button 
                  onClick={() => askQuestionMutation.mutate(customQuestion)}
                  disabled={!customQuestion.trim() || askQuestionMutation.isPending}
                  className="w-full"
                >
                  {askQuestionMutation.isPending ? "Elaborando risposta..." : "Chiedi all'AI"}
                </Button>
              </CardContent>
            </Card>

            {customAnswer && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Risposta AI</CardTitle>
                </CardHeader>
                <CardContent>
                  <ScrollArea className="h-[200px]">
                    <p className="text-sm leading-relaxed">{customAnswer}</p>
                  </ScrollArea>
                </CardContent>
              </Card>
            )}
          </TabsContent>
        </Tabs>
      )}
    </div>
  );
}
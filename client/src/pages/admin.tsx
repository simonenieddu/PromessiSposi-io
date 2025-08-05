import { useState, useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Trash2, Edit, Plus, LogOut, User } from "lucide-react";
import { useAdminAuth } from "@/hooks/useAdminAuth";
import { useLocation } from "wouter";

interface Chapter {
  id: number;
  title: string;
  author: string;
  content: string;
  description: string;
  number: number;
  estimatedReadingTime: number;
  difficultyLevel: string;
  themes: string[];
  historicalContext: string;
  createdAt: Date;
  updatedAt: Date;
}

interface Quiz {
  id: number;
  chapterId: number;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  points: number;
  createdAt: Date;
  updatedAt: Date;
}

interface GlossaryTerm {
  id: number;
  term: string;
  definition: string;
  context: string;
  category: string;
  createdAt: Date;
  updatedAt: Date;
}

export default function Admin() {
  const [, navigate] = useLocation();
  const { adminUser, isLoading, isAuthenticated } = useAdminAuth();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      navigate("/admin/login");
    }
  }, [isLoading, isAuthenticated, navigate]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-lg">Caricamento...</div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null; // Will redirect via useEffect
  }

  return <AdminPanel adminUser={adminUser} />
}

function AdminPanel({ adminUser }: { adminUser: any }) {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [activeTab, setActiveTab] = useState("chapters");
  const [, navigate] = useLocation();

  // Fetch data - now inside authenticated component
  const { data: chapters = [], isLoading: chaptersLoading } = useQuery<Chapter[]>({
    queryKey: ["/api/chapters"],
  });

  const { data: quizzes = [], isLoading: quizzesLoading } = useQuery<Quiz[]>({
    queryKey: ["/api/admin/quizzes"],
  });

  const { data: glossaryTerms = [], isLoading: glossaryLoading } = useQuery<GlossaryTerm[]>({
    queryKey: ["/api/glossary"],
  });

  const logoutMutation = useMutation({
    mutationFn: () => apiRequest("POST", "/api/admin/logout"),
    onSuccess: () => {
      toast({
        title: "Logout effettuato",
        description: "Arrivederci!",
      });
      queryClient.invalidateQueries({ queryKey: ["/api/admin/me"] });
      navigate("/admin/login");
    },
  });

  // Chapter management
  const ChapterManager = () => {
    const [editingChapter, setEditingChapter] = useState<Chapter | null>(null);
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    const createChapterMutation = useMutation({
      mutationFn: (data: any) => apiRequest("POST", "/api/admin/chapters", data),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["/api/chapters"] });
        setIsDialogOpen(false);
        toast({ title: "Capitolo creato con successo" });
      },
      onError: () => {
        toast({ title: "Errore nella creazione del capitolo", variant: "destructive" });
      },
    });

    const updateChapterMutation = useMutation({
      mutationFn: ({ id, data }: { id: number; data: any }) => 
        apiRequest("PUT", `/api/admin/chapters/${id}`, data),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["/api/chapters"] });
        setEditingChapter(null);
        setIsDialogOpen(false);
        toast({ title: "Capitolo aggiornato con successo" });
      },
      onError: () => {
        toast({ title: "Errore nell'aggiornamento del capitolo", variant: "destructive" });
      },
    });

    const deleteChapterMutation = useMutation({
      mutationFn: (id: number) => apiRequest("DELETE", `/api/admin/chapters/${id}`),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["/api/chapters"] });
        toast({ title: "Capitolo eliminato con successo" });
      },
      onError: () => {
        toast({ title: "Errore nell'eliminazione del capitolo", variant: "destructive" });
      },
    });

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      const formData = new FormData(event.currentTarget);
      const data = {
        title: formData.get("title"),
        author: formData.get("author"),
        content: formData.get("content"),
        description: formData.get("description"),
        number: parseInt(formData.get("number") as string),
        estimatedReadingTime: parseInt(formData.get("estimatedReadingTime") as string),
        difficultyLevel: formData.get("difficultyLevel"),
        themes: (formData.get("themes") as string).split(",").map(t => t.trim()),
        historicalContext: formData.get("historicalContext"),
      };

      if (editingChapter) {
        updateChapterMutation.mutate({ id: editingChapter.id, data });
      } else {
        createChapterMutation.mutate(data);
      }
    };

    return (
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-semibold">Gestione Capitoli</h3>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button onClick={() => setEditingChapter(null)}>
                <Plus className="w-4 h-4 mr-2" />
                Nuovo Capitolo
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>
                  {editingChapter ? "Modifica Capitolo" : "Nuovo Capitolo"}
                </DialogTitle>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="title">Titolo</Label>
                    <Input
                      id="title"
                      name="title"
                      defaultValue={editingChapter?.title || ""}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="author">Autore</Label>
                    <Input
                      id="author"
                      name="author"
                      defaultValue={editingChapter?.author || ""}
                      required
                    />
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="number">Numero</Label>
                    <Input
                      id="number"
                      name="number"
                      type="number"
                      defaultValue={editingChapter?.number || ""}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="estimatedReadingTime">Tempo Lettura (min)</Label>
                    <Input
                      id="estimatedReadingTime"
                      name="estimatedReadingTime"
                      type="number"
                      defaultValue={editingChapter?.estimatedReadingTime || ""}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="difficultyLevel">Difficoltà</Label>
                    <Select name="difficultyLevel" defaultValue={editingChapter?.difficultyLevel || ""}>
                      <SelectTrigger>
                        <SelectValue placeholder="Seleziona difficoltà" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="beginner">Principiante</SelectItem>
                        <SelectItem value="intermediate">Intermedio</SelectItem>
                        <SelectItem value="advanced">Avanzato</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div>
                  <Label htmlFor="description">Descrizione</Label>
                  <Textarea
                    id="description"
                    name="description"
                    defaultValue={editingChapter?.description || ""}
                    rows={3}
                  />
                </div>
                <div>
                  <Label htmlFor="themes">Temi (separati da virgola)</Label>
                  <Input
                    id="themes"
                    name="themes"
                    defaultValue={editingChapter?.themes?.join(", ") || ""}
                  />
                </div>
                <div>
                  <Label htmlFor="historicalContext">Contesto Storico</Label>
                  <Textarea
                    id="historicalContext"
                    name="historicalContext"
                    defaultValue={editingChapter?.historicalContext || ""}
                    rows={3}
                  />
                </div>
                <div>
                  <Label htmlFor="content">Contenuto</Label>
                  <Textarea
                    id="content"
                    name="content"
                    defaultValue={editingChapter?.content || ""}
                    rows={10}
                    required
                  />
                </div>
                <DialogFooter>
                  <Button type="submit" disabled={createChapterMutation.isPending || updateChapterMutation.isPending}>
                    {editingChapter ? "Aggiorna" : "Crea"}
                  </Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        <div className="grid gap-4">
          {chaptersLoading ? (
            <div>Caricamento...</div>
          ) : (
            chapters.map((chapter: Chapter) => (
              <Card key={chapter.id}>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle>{chapter.title}</CardTitle>
                      <CardDescription>di {chapter.author} • Capitolo {chapter.number}</CardDescription>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          setEditingChapter(chapter);
                          setIsDialogOpen(true);
                        }}
                      >
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => deleteChapterMutation.mutate(chapter.id)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600 mb-2">{chapter.description}</p>
                  <div className="text-xs text-gray-500">
                    Difficoltà: {chapter.difficultyLevel} • {chapter.estimatedReadingTime} min
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </div>
    );
  };

  // Quiz management
  const QuizManager = () => {
    const [editingQuiz, setEditingQuiz] = useState<Quiz | null>(null);
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    const createQuizMutation = useMutation({
      mutationFn: (data: any) => apiRequest("POST", "/api/admin/quizzes", data),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["/api/admin/quizzes"] });
        setIsDialogOpen(false);
        toast({ title: "Quiz creato con successo" });
      },
      onError: () => {
        toast({ title: "Errore nella creazione del quiz", variant: "destructive" });
      },
    });

    const updateQuizMutation = useMutation({
      mutationFn: ({ id, data }: { id: number; data: any }) => 
        apiRequest("PUT", `/api/admin/quizzes/${id}`, data),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["/api/admin/quizzes"] });
        setEditingQuiz(null);
        setIsDialogOpen(false);
        toast({ title: "Quiz aggiornato con successo" });
      },
      onError: () => {
        toast({ title: "Errore nell'aggiornamento del quiz", variant: "destructive" });
      },
    });

    const deleteQuizMutation = useMutation({
      mutationFn: (id: number) => apiRequest("DELETE", `/api/admin/quizzes/${id}`),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["/api/admin/quizzes"] });
        toast({ title: "Quiz eliminato con successo" });
      },
      onError: () => {
        toast({ title: "Errore nell'eliminazione del quiz", variant: "destructive" });
      },
    });

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      const formData = new FormData(event.currentTarget);
      const data = {
        chapterId: parseInt(formData.get("chapterId") as string),
        question: formData.get("question"),
        options: [
          formData.get("option1"),
          formData.get("option2"),
          formData.get("option3"),
          formData.get("option4"),
        ].filter(Boolean),
        correctAnswer: parseInt(formData.get("correctAnswer") as string),
        explanation: formData.get("explanation"),
        points: parseInt(formData.get("points") as string) || 10,
      };

      if (editingQuiz) {
        updateQuizMutation.mutate({ id: editingQuiz.id, data });
      } else {
        createQuizMutation.mutate(data);
      }
    };

    return (
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-semibold">Gestione Quiz</h3>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button onClick={() => setEditingQuiz(null)}>
                <Plus className="w-4 h-4 mr-2" />
                Nuovo Quiz
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>
                  {editingQuiz ? "Modifica Quiz" : "Nuovo Quiz"}
                </DialogTitle>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="chapterId">Capitolo</Label>
                    <Select name="chapterId" defaultValue={editingQuiz?.chapterId?.toString() || ""}>
                      <SelectTrigger>
                        <SelectValue placeholder="Seleziona capitolo" />
                      </SelectTrigger>
                      <SelectContent>
                        {chapters.map((chapter: Chapter) => (
                          <SelectItem key={chapter.id} value={chapter.id.toString()}>
                            {chapter.title}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="points">Punti</Label>
                    <Input
                      id="points"
                      name="points"
                      type="number"
                      defaultValue={editingQuiz?.points || 10}
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="question">Domanda</Label>
                  <Textarea
                    id="question"
                    name="question"
                    defaultValue={editingQuiz?.question || ""}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label>Opzioni di Risposta</Label>
                  {[1, 2, 3, 4].map((num) => (
                    <Input
                      key={num}
                      name={`option${num}`}
                      placeholder={`Opzione ${num}`}
                      defaultValue={editingQuiz?.options?.[num - 1] || ""}
                    />
                  ))}
                </div>
                <div>
                  <Label htmlFor="correctAnswer">Risposta Corretta (numero 1-4)</Label>
                  <Input
                    id="correctAnswer"
                    name="correctAnswer"
                    type="number"
                    min="1"
                    max="4"
                    defaultValue={editingQuiz?.correctAnswer || ""}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="explanation">Spiegazione</Label>
                  <Textarea
                    id="explanation"
                    name="explanation"
                    defaultValue={editingQuiz?.explanation || ""}
                    rows={3}
                  />
                </div>
                <DialogFooter>
                  <Button type="submit" disabled={createQuizMutation.isPending || updateQuizMutation.isPending}>
                    {editingQuiz ? "Aggiorna" : "Crea"}
                  </Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        <div className="grid gap-4">
          {quizzesLoading ? (
            <div>Caricamento...</div>
          ) : (
            quizzes.map((quiz: Quiz) => (
              <Card key={quiz.id}>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-base">{quiz.question}</CardTitle>
                      <CardDescription>
                        Capitolo {quiz.chapterId} • {quiz.points} punti
                      </CardDescription>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          setEditingQuiz(quiz);
                          setIsDialogOpen(true);
                        }}
                      >
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => deleteQuizMutation.mutate(quiz.id)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-1">
                    {quiz.options?.map((option, index) => (
                      <div key={index} className={`text-sm ${index === quiz.correctAnswer - 1 ? 'font-bold text-green-600' : ''}`}>
                        {index + 1}. {option}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </div>
    );
  };

  // Glossary management
  const GlossaryManager = () => {
    const [editingTerm, setEditingTerm] = useState<GlossaryTerm | null>(null);
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    const createTermMutation = useMutation({
      mutationFn: (data: any) => apiRequest("POST", "/api/admin/glossary", data),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["/api/glossary"] });
        setIsDialogOpen(false);
        toast({ title: "Termine creato con successo" });
      },
      onError: () => {
        toast({ title: "Errore nella creazione del termine", variant: "destructive" });
      },
    });

    const updateTermMutation = useMutation({
      mutationFn: ({ term, data }: { term: string; data: any }) => 
        apiRequest("PUT", `/api/admin/glossary/${term}`, data),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["/api/glossary"] });
        setEditingTerm(null);
        setIsDialogOpen(false);
        toast({ title: "Termine aggiornato con successo" });
      },
      onError: () => {
        toast({ title: "Errore nell'aggiornamento del termine", variant: "destructive" });
      },
    });

    const deleteTermMutation = useMutation({
      mutationFn: (term: string) => apiRequest("DELETE", `/api/admin/glossary/${term}`),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["/api/glossary"] });
        toast({ title: "Termine eliminato con successo" });
      },
      onError: () => {
        toast({ title: "Errore nell'eliminazione del termine", variant: "destructive" });
      },
    });

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      const formData = new FormData(event.currentTarget);
      const data = {
        term: formData.get("term"),
        definition: formData.get("definition"),
        context: formData.get("context"),
        category: formData.get("category"),
      };

      if (editingTerm) {
        updateTermMutation.mutate({ term: editingTerm.term, data });
      } else {
        createTermMutation.mutate(data);
      }
    };

    return (
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-semibold">Gestione Glossario</h3>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button onClick={() => setEditingTerm(null)}>
                <Plus className="w-4 h-4 mr-2" />
                Nuovo Termine
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>
                  {editingTerm ? "Modifica Termine" : "Nuovo Termine"}
                </DialogTitle>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="term">Termine</Label>
                    <Input
                      id="term"
                      name="term"
                      defaultValue={editingTerm?.term || ""}
                      required
                      disabled={!!editingTerm}
                    />
                  </div>
                  <div>
                    <Label htmlFor="category">Categoria</Label>
                    <Input
                      id="category"
                      name="category"
                      defaultValue={editingTerm?.category || ""}
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="definition">Definizione</Label>
                  <Textarea
                    id="definition"
                    name="definition"
                    defaultValue={editingTerm?.definition || ""}
                    required
                    rows={3}
                  />
                </div>
                <div>
                  <Label htmlFor="context">Contesto</Label>
                  <Textarea
                    id="context"
                    name="context"
                    defaultValue={editingTerm?.context || ""}
                    rows={2}
                  />
                </div>
                <DialogFooter>
                  <Button type="submit" disabled={createTermMutation.isPending || updateTermMutation.isPending}>
                    {editingTerm ? "Aggiorna" : "Crea"}
                  </Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        <div className="grid gap-4">
          {glossaryLoading ? (
            <div>Caricamento...</div>
          ) : (
            glossaryTerms.map((term: GlossaryTerm) => (
              <Card key={term.id}>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-base">{term.term}</CardTitle>
                      <CardDescription>{term.category}</CardDescription>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          setEditingTerm(term);
                          setIsDialogOpen(true);
                        }}
                      >
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => deleteTermMutation.mutate(term.term)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm mb-2">{term.definition}</p>
                  {term.context && (
                    <p className="text-xs text-gray-500">{term.context}</p>
                  )}
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="container mx-auto p-6">
      <div className="mb-6 flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Pannello Amministratore</h1>
          <p className="text-gray-600">Gestisci i contenuti della piattaforma educativa</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <User className="w-4 h-4" />
            <span>Benvenuto, {adminUser?.username}</span>
          </div>
          <Button
            variant="outline"
            onClick={() => logoutMutation.mutate()}
            disabled={logoutMutation.isPending}
          >
            <LogOut className="w-4 h-4 mr-2" />
            {logoutMutation.isPending ? "Disconnessione..." : "Logout"}
          </Button>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="chapters">Capitoli</TabsTrigger>
          <TabsTrigger value="quizzes">Quiz</TabsTrigger>
          <TabsTrigger value="glossary">Glossario</TabsTrigger>
        </TabsList>
        
        <TabsContent value="chapters">
          <ChapterManager />
        </TabsContent>
        
        <TabsContent value="quizzes">
          <QuizManager />
        </TabsContent>
        
        <TabsContent value="glossary">
          <GlossaryManager />
        </TabsContent>
      </Tabs>
    </div>
  );
}
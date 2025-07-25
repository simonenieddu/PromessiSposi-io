import { useState } from "react";
import { useAuth } from "@/lib/auth";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import Header from "@/components/header";

interface TeacherClass {
  id: number;
  name: string;
  description: string;
  classCode: string;
  studentCount: number;
  createdAt: string;
}

interface Student {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  points: number;
  chaptersCompleted: number;
  quizzesCompleted: number;
  lastActive: string;
}

interface Assignment {
  id: number;
  title: string;
  description: string;
  chapterIds: number[];
  dueDate: string;
  completionRate: number;
}

export default function TeacherDashboard() {
  const { user } = useAuth();
  const [selectedClass, setSelectedClass] = useState<number | null>(null);
  const [newClassName, setNewClassName] = useState("");
  const [newClassDescription, setNewClassDescription] = useState("");
  const [assignmentTitle, setAssignmentTitle] = useState("");
  const [assignmentDescription, setAssignmentDescription] = useState("");
  const [selectedChapters, setSelectedChapters] = useState<number[]>([]);
  const [dueDate, setDueDate] = useState("");
  const queryClient = useQueryClient();

  // Check if user is a teacher
  if (user?.role !== 'teacher') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
        <Header />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Card className="modern-card text-center">
            <CardContent className="p-12">
              <div className="text-6xl mb-4">🚫</div>
              <h2 className="text-2xl font-bold text-gray-800 mb-2">Accesso Limitato</h2>
              <p className="text-gray-600">Questa sezione è riservata agli insegnanti.</p>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  const { data: classes = [], isLoading: classesLoading } = useQuery({
    queryKey: ['/api/teacher/classes', user?.id],
    queryFn: async () => {
      const response = await fetch('/api/teacher/classes');
      return response.json();
    },
    enabled: !!user?.id
  });

  const { data: students = [], isLoading: studentsLoading } = useQuery({
    queryKey: ['/api/teacher/students', selectedClass],
    queryFn: async () => {
      const response = await fetch(`/api/teacher/classes/${selectedClass}/students`);
      return response.json();
    },
    enabled: !!selectedClass
  });

  const { data: assignments = [], isLoading: assignmentsLoading } = useQuery({
    queryKey: ['/api/teacher/assignments', user?.id],
    queryFn: async () => {
      const response = await fetch('/api/teacher/assignments');
      return response.json();
    },
    enabled: !!user?.id
  });

  const createClassMutation = useMutation({
    mutationFn: async (classData: { name: string; description: string }) => {
      return await apiRequest('/api/teacher/classes', {
        method: 'POST',
        body: JSON.stringify(classData)
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/teacher/classes'] });
      setNewClassName("");
      setNewClassDescription("");
    }
  });

  const createAssignmentMutation = useMutation({
    mutationFn: async (assignmentData: any) => {
      return await apiRequest('/api/teacher/assignments', {
        method: 'POST',
        body: JSON.stringify(assignmentData)
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/teacher/assignments'] });
      setAssignmentTitle("");
      setAssignmentDescription("");
      setSelectedChapters([]);
      setDueDate("");
    }
  });

  const handleCreateClass = () => {
    if (newClassName.trim()) {
      createClassMutation.mutate({
        name: newClassName.trim(),
        description: newClassDescription.trim()
      });
    }
  };

  const handleCreateAssignment = () => {
    if (assignmentTitle.trim() && selectedClass && selectedChapters.length > 0) {
      createAssignmentMutation.mutate({
        classId: selectedClass,
        title: assignmentTitle.trim(),
        description: assignmentDescription.trim(),
        chapterIds: selectedChapters,
        dueDate: dueDate || null
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <Header />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <div className="modern-card p-8 bg-gradient-to-r from-purple-600 to-blue-600 text-white overflow-hidden relative">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
            <div className="relative">
              <h1 className="text-4xl font-playfair font-bold mb-3">
                Dashboard Insegnante 👩‍🏫
              </h1>
              <p className="text-purple-100 text-lg">
                Monitora i progressi degli studenti e gestisci le tue classi
              </p>
            </div>
          </div>
        </div>

        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="grid w-full grid-cols-4 mb-8">
            <TabsTrigger value="overview">Panoramica</TabsTrigger>
            <TabsTrigger value="classes">Classi</TabsTrigger>
            <TabsTrigger value="assignments">Compiti</TabsTrigger>
            <TabsTrigger value="students">Studenti</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="modern-card">
                <CardContent className="p-6 text-center">
                  <div className="text-3xl mb-2">🏫</div>
                  <div className="text-2xl font-bold text-blue-600">{classes.length}</div>
                  <div className="text-sm text-gray-600">Classi Attive</div>
                </CardContent>
              </Card>
              
              <Card className="modern-card">
                <CardContent className="p-6 text-center">
                  <div className="text-3xl mb-2">👥</div>
                  <div className="text-2xl font-bold text-green-600">
                    {classes.reduce((sum: number, cls: TeacherClass) => sum + cls.studentCount, 0)}
                  </div>
                  <div className="text-sm text-gray-600">Studenti Totali</div>
                </CardContent>
              </Card>
              
              <Card className="modern-card">
                <CardContent className="p-6 text-center">
                  <div className="text-3xl mb-2">📝</div>
                  <div className="text-2xl font-bold text-purple-600">{assignments.length}</div>
                  <div className="text-sm text-gray-600">Compiti Assegnati</div>
                </CardContent>
              </Card>
            </div>

            {/* Recent Activity */}
            <Card className="modern-card">
              <CardHeader>
                <CardTitle>Attività Recente</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {assignments.slice(0, 5).map((assignment: Assignment) => (
                    <div key={assignment.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div>
                        <h4 className="font-semibold">{assignment.title}</h4>
                        <p className="text-sm text-gray-600">
                          Scadenza: {new Date(assignment.dueDate).toLocaleDateString('it-IT')}
                        </p>
                      </div>
                      <div className="text-right">
                        <div className="text-sm font-semibold">{assignment.completionRate}%</div>
                        <Progress value={assignment.completionRate} className="w-20 h-2" />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Classes Tab */}
          <TabsContent value="classes" className="space-y-6">
            {/* Create New Class */}
            <Card className="modern-card">
              <CardHeader>
                <CardTitle>Crea Nuova Classe</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Input
                    placeholder="Nome della classe"
                    value={newClassName}
                    onChange={(e) => setNewClassName(e.target.value)}
                  />
                  <Textarea
                    placeholder="Descrizione (opzionale)"
                    value={newClassDescription}
                    onChange={(e) => setNewClassDescription(e.target.value)}
                    className="resize-none"
                  />
                </div>
                <Button 
                  onClick={handleCreateClass}
                  disabled={!newClassName.trim() || createClassMutation.isPending}
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                >
                  {createClassMutation.isPending ? "Creazione..." : "Crea Classe"}
                </Button>
              </CardContent>
            </Card>

            {/* Classes List */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {classes.map((cls: TeacherClass) => (
                <Card key={cls.id} className="modern-card">
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start mb-4">
                      <h3 className="font-bold text-lg">{cls.name}</h3>
                      <Badge variant="secondary">{cls.studentCount} studenti</Badge>
                    </div>
                    {cls.description && (
                      <p className="text-gray-600 text-sm mb-4">{cls.description}</p>
                    )}
                    <div className="space-y-2">
                      <div className="text-sm">
                        <span className="font-semibold">Codice:</span> {cls.classCode}
                      </div>
                      <div className="text-sm text-gray-500">
                        Creata: {new Date(cls.createdAt).toLocaleDateString('it-IT')}
                      </div>
                    </div>
                    <Button 
                      variant="outline" 
                      className="w-full mt-4"
                      onClick={() => setSelectedClass(cls.id)}
                    >
                      Gestisci Classe
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Assignments Tab */}
          <TabsContent value="assignments" className="space-y-6">
            {/* Create Assignment */}
            <Card className="modern-card">
              <CardHeader>
                <CardTitle>Crea Nuovo Compito</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Select onValueChange={(value) => setSelectedClass(Number(value))}>
                    <SelectTrigger>
                      <SelectValue placeholder="Seleziona classe" />
                    </SelectTrigger>
                    <SelectContent>
                      {classes.map((cls: TeacherClass) => (
                        <SelectItem key={cls.id} value={cls.id.toString()}>
                          {cls.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  
                  <Input
                    type="date"
                    value={dueDate}
                    onChange={(e) => setDueDate(e.target.value)}
                  />
                </div>
                
                <Input
                  placeholder="Titolo del compito"
                  value={assignmentTitle}
                  onChange={(e) => setAssignmentTitle(e.target.value)}
                />
                
                <Textarea
                  placeholder="Descrizione del compito"
                  value={assignmentDescription}
                  onChange={(e) => setAssignmentDescription(e.target.value)}
                  className="resize-none"
                />
                
                <div>
                  <label className="text-sm font-semibold mb-2 block">Capitoli da assegnare:</label>
                  <div className="grid grid-cols-4 gap-2">
                    {Array.from({length: 10}, (_, i) => i + 1).map(num => (
                      <Button
                        key={num}
                        variant={selectedChapters.includes(num) ? "default" : "outline"}
                        size="sm"
                        onClick={() => {
                          setSelectedChapters(prev => 
                            prev.includes(num) 
                              ? prev.filter(n => n !== num)
                              : [...prev, num]
                          );
                        }}
                      >
                        Cap. {num}
                      </Button>
                    ))}
                  </div>
                </div>
                
                <Button 
                  onClick={handleCreateAssignment}
                  disabled={!assignmentTitle.trim() || !selectedClass || selectedChapters.length === 0 || createAssignmentMutation.isPending}
                  className="bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700"
                >
                  {createAssignmentMutation.isPending ? "Creazione..." : "Crea Compito"}
                </Button>
              </CardContent>
            </Card>

            {/* Assignments List */}
            <div className="space-y-4">
              {assignments.map((assignment: Assignment) => (
                <Card key={assignment.id} className="modern-card">
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <h3 className="font-bold text-lg mb-2">{assignment.title}</h3>
                        <p className="text-gray-600 mb-3">{assignment.description}</p>
                        <div className="flex gap-4 text-sm text-gray-500">
                          <span>Capitoli: {assignment.chapterIds.join(', ')}</span>
                          <span>Scadenza: {new Date(assignment.dueDate).toLocaleDateString('it-IT')}</span>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-lg font-bold text-blue-600">{assignment.completionRate}%</div>
                        <div className="text-sm text-gray-500">Completamento</div>
                        <Progress value={assignment.completionRate} className="w-24 h-2 mt-2" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Students Tab */}
          <TabsContent value="students" className="space-y-6">
            {selectedClass ? (
              <Card className="modern-card">
                <CardHeader>
                  <CardTitle>Studenti della Classe</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {students.map((student: Student) => (
                      <div key={student.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                        <div className="flex items-center space-x-4">
                          <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold">
                            {student.firstName[0]}{student.lastName[0]}
                          </div>
                          <div>
                            <h4 className="font-semibold">{student.firstName} {student.lastName}</h4>
                            <p className="text-sm text-gray-600">{student.email}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="flex gap-4 text-sm">
                            <span className="font-semibold">{student.points} punti</span>
                            <span>{student.chaptersCompleted} capitoli</span>
                            <span>{student.quizzesCompleted} quiz</span>
                          </div>
                          <div className="text-xs text-gray-500 mt-1">
                            Ultimo accesso: {new Date(student.lastActive).toLocaleDateString('it-IT')}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ) : (
              <Card className="modern-card">
                <CardContent className="text-center p-12">
                  <div className="text-4xl mb-4">👥</div>
                  <h3 className="text-xl font-semibold mb-2">Seleziona una Classe</h3>
                  <p className="text-gray-600">Scegli una classe per visualizzare gli studenti</p>
                </CardContent>
              </Card>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
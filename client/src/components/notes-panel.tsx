import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useAuth } from "@/lib/auth";

interface Note {
  id: number;
  content: string;
  position?: number;
  createdAt: string;
  updatedAt: string;
}

interface NotesPanelProps {
  chapterId: number;
}

export default function NotesPanel({ chapterId }: NotesPanelProps) {
  const { user } = useAuth();
  const [newNote, setNewNote] = useState("");
  const [editingNote, setEditingNote] = useState<number | null>(null);
  const [editContent, setEditContent] = useState("");
  const queryClient = useQueryClient();

  const { data: notes = [], isLoading } = useQuery({
    queryKey: ['/api/notes', user?.id, chapterId],
    queryFn: async () => {
      const response = await fetch(`/api/notes?chapterId=${chapterId}`);
      return response.json();
    },
    enabled: !!user?.id
  });

  const createNoteMutation = useMutation({
    mutationFn: async (content: string) => {
      return await apiRequest(`/api/notes`, {
        method: 'POST',
        body: JSON.stringify({
          chapterId,
          content,
          isPrivate: true
        })
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/notes'] });
      setNewNote("");
    }
  });

  const updateNoteMutation = useMutation({
    mutationFn: async ({ noteId, content }: { noteId: number, content: string }) => {
      return await apiRequest(`/api/notes/${noteId}`, {
        method: 'PUT',
        body: JSON.stringify({ content })
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/notes'] });
      setEditingNote(null);
      setEditContent("");
    }
  });

  const deleteNoteMutation = useMutation({
    mutationFn: async (noteId: number) => {
      return await apiRequest(`/api/notes/${noteId}`, {
        method: 'DELETE'
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/notes'] });
    }
  });

  const handleCreateNote = () => {
    if (newNote.trim()) {
      createNoteMutation.mutate(newNote.trim());
    }
  };

  const handleUpdateNote = (noteId: number) => {
    if (editContent.trim()) {
      updateNoteMutation.mutate({ noteId, content: editContent.trim() });
    }
  };

  const startEditing = (note: Note) => {
    setEditingNote(note.id);
    setEditContent(note.content);
  };

  const cancelEditing = () => {
    setEditingNote(null);
    setEditContent("");
  };

  if (isLoading) {
    return (
      <Card className="modern-card">
        <CardHeader>
          <CardTitle className="text-lg">📝 Le tue note</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center text-gray-500">Caricamento note...</div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="modern-card">
      <CardHeader>
        <CardTitle className="text-lg bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          📝 Le tue note
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Create new note */}
        <div className="space-y-3">
          <Textarea
            placeholder="Aggiungi una nota su questo capitolo..."
            value={newNote}
            onChange={(e) => setNewNote(e.target.value)}
            className="min-h-[80px] resize-none"
          />
          <Button 
            onClick={handleCreateNote}
            disabled={!newNote.trim() || createNoteMutation.isPending}
            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
          >
            {createNoteMutation.isPending ? "Salvataggio..." : "Salva nota"}
          </Button>
        </div>

        {/* Notes list */}
        <div className="space-y-3 max-h-96 overflow-y-auto">
          {notes.length === 0 ? (
            <div className="text-center text-gray-500 py-8">
              <div className="text-4xl mb-2">📔</div>
              <p>Nessuna nota ancora.</p>
              <p className="text-sm">Scrivi la tua prima nota!</p>
            </div>
          ) : (
            notes.map((note: Note) => (
              <div key={note.id} className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                {editingNote === note.id ? (
                  <div className="space-y-3">
                    <Textarea
                      value={editContent}
                      onChange={(e) => setEditContent(e.target.value)}
                      className="min-h-[60px] resize-none bg-white"
                    />
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        onClick={() => handleUpdateNote(note.id)}
                        disabled={!editContent.trim() || updateNoteMutation.isPending}
                        className="bg-green-600 hover:bg-green-700 text-white"
                      >
                        Salva
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={cancelEditing}
                      >
                        Annulla
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div>
                    <p className="text-gray-800 whitespace-pre-wrap mb-3">{note.content}</p>
                    <div className="flex justify-between items-center">
                      <Badge variant="secondary" className="text-xs">
                        {new Date(note.updatedAt).toLocaleDateString('it-IT')}
                      </Badge>
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => startEditing(note)}
                          className="text-blue-600 hover:text-blue-700 hover:bg-blue-50"
                        >
                          Modifica
                        </Button>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => deleteNoteMutation.mutate(note.id)}
                          disabled={deleteNoteMutation.isPending}
                          className="text-red-600 hover:text-red-700 hover:bg-red-50"
                        >
                          Elimina
                        </Button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  );
}
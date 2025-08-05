import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage-simple";
import bcrypt from "bcrypt";
import { loginSchema, registerSchema, insertUserQuizResultSchema, adminLoginSchema } from "@shared/schema";
import { z } from "zod";
import session from "express-session";

// Extend session type
declare module 'express-session' {
  export interface SessionData {
    adminUser?: { id: number; username: string };
  }
}

// Admin authentication middleware
function requireAdminAuth(req: any, res: any, next: any) {
  if (!req.session.adminUser) {
    return res.status(401).json({ message: "Accesso admin richiesto" });
  }
  next();
}

export async function registerRoutes(app: Express): Promise<Server> {
  // Setup session middleware
  app.use(session({
    secret: process.env.SESSION_SECRET || 'admin-secret-key',
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false, maxAge: 24 * 60 * 60 * 1000 } // 24 hours
  }));

  // Admin authentication routes
  app.post("/api/admin/login", async (req, res) => {
    try {
      const { username, password } = adminLoginSchema.parse(req.body);
      
      const admin = await storage.getAdminByUsername(username);
      if (!admin) {
        return res.status(401).json({ message: "Credenziali non valide" });
      }

      const isValid = await bcrypt.compare(password, admin.password);
      if (!isValid) {
        return res.status(401).json({ message: "Credenziali non valide" });
      }

      // Update last login
      await storage.updateAdminLastLogin(admin.id);

      // Set session
      req.session.adminUser = { id: admin.id, username: admin.username };

      res.json({ 
        message: "Login admin effettuato con successo",
        admin: { id: admin.id, username: admin.username }
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Dati non validi", errors: error.errors });
      }
      res.status(500).json({ message: "Errore del server" });
    }
  });

  app.post("/api/admin/logout", (req: any, res) => {
    req.session.destroy((err: any) => {
      if (err) {
        return res.status(500).json({ message: "Errore durante il logout" });
      }
      res.json({ message: "Logout effettuato con successo" });
    });
  });

  app.get("/api/admin/me", (req: any, res) => {
    if (!req.session.adminUser) {
      return res.status(401).json({ message: "Non autenticato" });
    }
    res.json(req.session.adminUser);
  });

  // Authentication routes
  app.post("/api/auth/register", async (req, res) => {
    try {
      const userData = registerSchema.parse(req.body);
      
      // Check if user already exists
      const existingUser = await storage.getUserByEmail(userData.email);
      if (existingUser) {
        return res.status(400).json({ message: "Email già registrata" });
      }

      // Hash password
      const hashedPassword = await bcrypt.hash(userData.password, 10);
      
      // Create user
      const user = await storage.createUser({
        ...userData,
        password: hashedPassword,
      });

      res.json({ 
        message: "Registrazione completata con successo",
        user: { id: user.id, email: user.email, firstName: user.firstName, lastName: user.lastName }
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Dati non validi", errors: error.errors });
      }
      res.status(500).json({ message: "Errore del server" });
    }
  });

  app.post("/api/auth/login", async (req, res) => {
    try {
      const { email, password } = loginSchema.parse(req.body);
      
      const user = await storage.getUserByEmail(email);
      if (!user) {
        return res.status(401).json({ message: "Credenziali non valide" });
      }

      const isValid = await bcrypt.compare(password, user.password);
      if (!isValid) {
        return res.status(401).json({ message: "Credenziali non valide" });
      }

      // Update last active
      await storage.updateUserLastActive(user.id);

      res.json({ 
        message: "Login effettuato con successo",
        user: { 
          id: user.id, 
          email: user.email, 
          firstName: user.firstName, 
          lastName: user.lastName,
          points: user.points,
          level: user.level 
        }
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Dati non validi", errors: error.errors });
      }
      res.status(500).json({ message: "Errore del server" });
    }
  });

  // Chapter routes
  app.get("/api/chapters", async (req, res) => {
    try {
      const chapters = await storage.getAllChapters();
      res.json(chapters);
    } catch (error) {
      res.status(500).json({ message: "Errore nel recupero dei capitoli" });
    }
  });

  app.get("/api/chapters/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const chapter = await storage.getChapter(id);
      if (!chapter) {
        return res.status(404).json({ message: "Capitolo non trovato" });
      }
      res.json(chapter);
    } catch (error) {
      res.status(500).json({ message: "Errore nel recupero del capitolo" });
    }
  });

  // User progress routes
  app.get("/api/users/:userId/progress", async (req, res) => {
    try {
      const userId = parseInt(req.params.userId);
      const progress = await storage.getUserProgress(userId);
      res.json(progress);
    } catch (error) {
      res.status(500).json({ message: "Errore nel recupero dei progressi" });
    }
  });

  app.post("/api/users/:userId/progress", async (req, res) => {
    try {
      const userId = parseInt(req.params.userId);
      const progressData = { ...req.body, userId };
      const progress = await storage.updateUserProgress(progressData);
      res.json(progress);
    } catch (error) {
      res.status(500).json({ message: "Errore nell'aggiornamento dei progressi" });
    }
  });

  // Quiz routes
  app.get("/api/chapters/:chapterId/quizzes", async (req, res) => {
    try {
      const chapterId = parseInt(req.params.chapterId);
      const quizzes = await storage.getQuizzesByChapter(chapterId);
      res.json(quizzes);
    } catch (error) {
      res.status(500).json({ message: "Errore nel recupero dei quiz" });
    }
  });

  app.post("/api/quiz-results", async (req, res) => {
    try {
      const resultData = insertUserQuizResultSchema.parse(req.body);
      const result = await storage.saveQuizResult(resultData);
      
      // Award points to user
      if (result.isCorrect) {
        await storage.addPointsToUser(result.userId, result.pointsEarned || 10);
      }
      
      res.json(result);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Dati non validi", errors: error.errors });
      }
      res.status(500).json({ message: "Errore nel salvataggio del risultato" });
    }
  });

  // Achievement routes
  app.get("/api/users/:userId/achievements", async (req, res) => {
    try {
      const userId = parseInt(req.params.userId);
      const achievements = await storage.getUserAchievements(userId);
      res.json(achievements);
    } catch (error) {
      res.status(500).json({ message: "Errore nel recupero dei traguardi" });
    }
  });

  // Glossary routes
  app.get("/api/glossary", async (req, res) => {
    try {
      const terms = await storage.getAllGlossaryTerms();
      res.json(terms);
    } catch (error) {
      res.status(500).json({ message: "Errore nel recupero del glossario" });
    }
  });

  app.get("/api/glossary/:term", async (req, res) => {
    try {
      const term = req.params.term;
      const glossaryTerm = await storage.getGlossaryTerm(term);
      if (!glossaryTerm) {
        return res.status(404).json({ message: "Termine non trovato" });
      }
      res.json(glossaryTerm);
    } catch (error) {
      res.status(500).json({ message: "Errore nel recupero del termine" });
    }
  });

  // Admin routes for content management (protected)
  app.post("/api/admin/chapters", requireAdminAuth, async (req, res) => {
    try {
      const chapterData = req.body;
      const chapter = await storage.createChapter(chapterData);
      res.json(chapter);
    } catch (error) {
      res.status(500).json({ message: "Errore nella creazione del capitolo" });
    }
  });

  app.put("/api/admin/chapters/:id", requireAdminAuth, async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const chapterData = req.body;
      const chapter = await storage.updateChapter(id, chapterData);
      res.json(chapter);
    } catch (error) {
      res.status(500).json({ message: "Errore nell'aggiornamento del capitolo" });
    }
  });

  app.delete("/api/admin/chapters/:id", requireAdminAuth, async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      await storage.deleteChapter(id);
      res.json({ message: "Capitolo eliminato con successo" });
    } catch (error) {
      res.status(500).json({ message: "Errore nell'eliminazione del capitolo" });
    }
  });

  app.post("/api/admin/quizzes", requireAdminAuth, async (req, res) => {
    try {
      const quizData = req.body;
      const quiz = await storage.createQuiz(quizData);
      res.json(quiz);
    } catch (error) {
      res.status(500).json({ message: "Errore nella creazione del quiz" });
    }
  });

  app.put("/api/admin/quizzes/:id", requireAdminAuth, async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const quizData = req.body;
      const quiz = await storage.updateQuiz(id, quizData);
      res.json(quiz);
    } catch (error) {
      res.status(500).json({ message: "Errore nell'aggiornamento del quiz" });
    }
  });

  app.delete("/api/admin/quizzes/:id", requireAdminAuth, async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      await storage.deleteQuiz(id);
      res.json({ message: "Quiz eliminato con successo" });
    } catch (error) {
      res.status(500).json({ message: "Errore nell'eliminazione del quiz" });
    }
  });

  app.post("/api/admin/glossary", requireAdminAuth, async (req, res) => {
    try {
      const termData = req.body;
      const term = await storage.createGlossaryTerm(termData);
      res.json(term);
    } catch (error) {
      res.status(500).json({ message: "Errore nella creazione del termine" });
    }
  });

  app.put("/api/admin/glossary/:term", requireAdminAuth, async (req, res) => {
    try {
      const term = req.params.term;
      const termData = req.body;
      const updatedTerm = await storage.updateGlossaryTerm(term, termData);
      res.json(updatedTerm);
    } catch (error) {
      res.status(500).json({ message: "Errore nell'aggiornamento del termine" });
    }
  });

  app.delete("/api/admin/glossary/:term", requireAdminAuth, async (req, res) => {
    try {
      const term = req.params.term;
      await storage.deleteGlossaryTerm(term);
      res.json({ message: "Termine eliminato con successo" });
    } catch (error) {
      res.status(500).json({ message: "Errore nell'eliminazione del termine" });
    }
  });

  app.get("/api/admin/quizzes", requireAdminAuth, async (req, res) => {
    try {
      const quizzes = await storage.getAllQuizzes();
      res.json(quizzes);
    } catch (error) {
      res.status(500).json({ message: "Errore nel recupero dei quiz" });
    }
  });

  // AI Literary Insights Routes
  app.post("/api/insights/analyze", async (req, res) => {
    try {
      const { passage, chapterId } = req.body;
      
      if (!passage || !passage.trim()) {
        return res.status(400).json({ message: "Brano richiesto per l'analisi" });
      }

      try {
        // Try AI analysis first
        const { aiInsights } = await import("./ai-insights");
        const analysis = await aiInsights.analyzePassage(passage);
        res.json(analysis);
      } catch (aiError) {
        // Fallback to high-quality pre-compiled analysis
        console.log("Using fallback analysis due to API limitations");
        const { getMockInsight } = await import("./mock-insights");
        const analysis = getMockInsight(passage);
        res.json(analysis);
      }
    } catch (error) {
      console.error("Error analyzing passage:", error);
      res.status(500).json({ message: "Errore nell'analisi del brano" });
    }
  });

  app.post("/api/insights/questions", async (req, res) => {
    try {
      const { passage, difficulty = 'intermediate' } = req.body;
      
      if (!passage || !passage.trim()) {
        return res.status(400).json({ message: "Brano richiesto per generare domande" });
      }

      const { aiInsights } = await import("./ai-insights");
      const questions = await aiInsights.generateContextualQuestions(passage, difficulty);
      
      res.json(questions);
    } catch (error) {
      console.error("Error generating questions:", error);
      res.status(500).json({ message: "Errore nella generazione delle domande" });
    }
  });

  app.post("/api/insights/ask", async (req, res) => {
    try {
      const { concept, context } = req.body;
      
      if (!concept || !concept.trim()) {
        return res.status(400).json({ message: "Domanda richiesta" });
      }

      const { aiInsights } = await import("./ai-insights");
      const explanation = await aiInsights.explainConcept(concept, context);
      
      res.json({ explanation });
    } catch (error) {
      console.error("Error explaining concept:", error);
      res.status(500).json({ message: "Errore nella spiegazione del concetto" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}

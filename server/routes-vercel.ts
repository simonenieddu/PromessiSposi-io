import type { Express } from "express";
import express from "express";
import { storage } from "./storage-simple";
import bcrypt from "bcrypt";
import { loginSchema, registerSchema, insertUserQuizResultSchema, adminLoginSchema } from "@shared/schema";
import { z } from "zod";
import session from "express-session";

// Extend session type
declare module 'express-session' {
  export interface SessionData {
    adminUser?: { id: number; username: string };
    user?: { id: number; email: string };
  }
}

// Admin authentication middleware
function requireAdminAuth(req: any, res: any, next: any) {
  if (!req.session.adminUser) {
    return res.status(401).json({ message: "Accesso admin richiesto" });
  }
  next();
}

export async function registerRoutes(app: Express): Promise<void> {
  // Setup JSON parsing
  app.use(express.json());
  
  // Setup session middleware for Vercel
  app.use(session({
    secret: process.env.SESSION_SECRET || 'admin-secret-key',
    resave: false,
    saveUninitialized: false,
    cookie: { 
      secure: process.env.NODE_ENV === 'production',
      maxAge: 24 * 60 * 60 * 1000,
      sameSite: 'lax'
    }
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

      await storage.updateAdminLastLogin(admin.id);
      req.session.adminUser = { id: admin.id, username: admin.username };

      res.json({ 
        message: "Login admin effettuato con successo",
        admin: { id: admin.id, username: admin.username }
      });
    } catch (error) {
      console.error("Errore login admin:", error);
      res.status(500).json({ message: "Errore interno del server" });
    }
  });

  app.post("/api/admin/logout", (req, res) => {
    req.session.destroy((err) => {
      if (err) {
        return res.status(500).json({ message: "Errore durante il logout" });
      }
      res.json({ message: "Logout effettuato con successo" });
    });
  });

  app.get("/api/admin/check", requireAdminAuth, (req, res) => {
    res.json({ admin: req.session.adminUser });
  });

  // User authentication routes
  app.post("/api/auth/register", async (req, res) => {
    try {
      const userData = registerSchema.parse(req.body);
      const hashedPassword = await bcrypt.hash(userData.password, 10);
      
      const user = await storage.createUser({
        ...userData,
        password: hashedPassword,
      });

      req.session.user = { id: user.id, email: user.email };
      res.json({ 
        message: "Registrazione effettuata con successo",
        user: { id: user.id, email: user.email, firstName: user.firstName }
      });
    } catch (error: any) {
      if (error.message.includes('unique constraint')) {
        res.status(400).json({ message: "Email già registrata" });
      } else {
        console.error("Errore registrazione:", error);
        res.status(500).json({ message: "Errore interno del server" });
      }
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

      await storage.updateUserLastActive(user.id);
      req.session.user = { id: user.id, email: user.email };

      res.json({ 
        message: "Login effettuato con successo",
        user: { 
          id: user.id, 
          email: user.email, 
          firstName: user.firstName,
          points: user.points,
          level: user.level
        }
      });
    } catch (error) {
      console.error("Errore login:", error);
      res.status(500).json({ message: "Errore interno del server" });
    }
  });

  // Basic API routes (simplified for Vercel)
  app.get("/api/test", async (req, res) => {
    res.json({ message: "API funzionante", timestamp: new Date().toISOString() });
  });

  app.get("/api/chapters", async (req, res) => {
    try {
      const chapters = await storage.getAllChapters();
      res.json(chapters);
    } catch (error) {
      console.error("Errore recupero capitoli:", error);
      res.status(500).json({ message: "Errore interno del server" });
    }
  });

  app.get("/api/glossary", async (req, res) => {
    try {
      const terms = await storage.getAllGlossaryTerms();
      res.json(terms);
    } catch (error) {
      console.error("Errore recupero glossario:", error);
      res.status(500).json({ message: "Errore interno del server" });
    }
  });
}
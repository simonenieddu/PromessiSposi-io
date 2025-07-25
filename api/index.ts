import { VercelRequest, VercelResponse } from '@vercel/node';
import { storage } from '../server/storage-simple';
import bcrypt from 'bcrypt';
import { loginSchema, registerSchema } from '../shared/schema';

// CORS helper
function setCORS(res: VercelResponse) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  setCORS(res);
  
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  const { url, method } = req;
  
  try {
    if (url === '/api/test' && method === 'GET') {
      return res.json({ message: "API funzionante", timestamp: new Date().toISOString() });
    }
    
    if (url === '/api/auth/register' && method === 'POST') {
      const userData = registerSchema.parse(req.body);
      const hashedPassword = await bcrypt.hash(userData.password, 10);
      
      const user = await storage.createUser({
        ...userData,
        password: hashedPassword,
      });

      return res.json({ 
        message: "Registrazione effettuata con successo",
        user: { id: user.id, email: user.email, firstName: user.firstName }
      });
    }
    
    if (url === '/api/auth/login' && method === 'POST') {
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

      return res.json({ 
        message: "Login effettuato con successo",
        user: { 
          id: user.id, 
          email: user.email, 
          firstName: user.firstName,
          points: user.points,
          level: user.level
        }
      });
    }
    
    if (url === '/api/chapters' && method === 'GET') {
      const chapters = await storage.getAllChapters();
      return res.json(chapters);
    }
    
    return res.status(404).json({ message: "Endpoint non trovato" });
    
  } catch (error: any) {
    console.error("Errore API:", error);
    if (error.message?.includes('unique constraint')) {
      return res.status(400).json({ message: "Email già registrata" });
    }
    return res.status(500).json({ 
      message: "Errore interno del server",
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
}
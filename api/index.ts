import { VercelRequest, VercelResponse } from '@vercel/node';
import { neon } from '@neondatabase/serverless';
import { createHash } from 'crypto';

const sql = neon(process.env.DATABASE_URL!);

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
  
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  try {
    if (req.url === '/api/test') {
      return res.json({ 
        message: "API funzionante", 
        timestamp: new Date().toISOString(),
        method: req.method,
        url: req.url,
        env: {
          NODE_ENV: process.env.NODE_ENV,
          DATABASE_URL: process.env.DATABASE_URL ? 'presente' : 'mancante'
        }
      });
    }

    if (req.url === '/api/auth/register' && req.method === 'POST') {
      const { email, password, firstName, lastName, studyReason } = req.body || {};
      
      // Validation
      if (!email || !password || !firstName || !lastName || !studyReason) {
        return res.status(400).json({ 
          message: "Tutti i campi sono richiesti",
          required: ["email", "password", "firstName", "lastName", "studyReason"]
        });
      }

      // Email validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        return res.status(400).json({ message: "Email non valida" });
      }

      // Password validation
      if (password.length < 6) {
        return res.status(400).json({ message: "La password deve essere di almeno 6 caratteri" });
      }

      try {
        // Check if user exists
        const existingUser = await sql`SELECT id FROM users WHERE email = ${email}`;
        if (existingUser.length > 0) {
          return res.status(400).json({ message: "Email già registrata" });
        }

        // Hash password with crypto (native Node.js)
        const hashedPassword = createHash('sha256').update(password + 'salt').digest('hex');
        
        // Create user
        const newUser = await sql`
          INSERT INTO users (email, password, first_name, last_name, study_reason, points, level, role)
          VALUES (${email}, ${hashedPassword}, ${firstName}, ${lastName}, ${studyReason}, 0, 'Novizio', 'student')
          RETURNING id, email, first_name, last_name, points, level
        `;

        return res.json({ 
          message: "Registrazione effettuata con successo",
          user: {
            id: newUser[0].id,
            email: newUser[0].email,
            firstName: newUser[0].first_name,
            lastName: newUser[0].last_name,
            points: newUser[0].points,
            level: newUser[0].level
          }
        });

      } catch (dbError: any) {
        console.error("Database error:", dbError);
        if (dbError.message?.includes('unique')) {
          return res.status(400).json({ message: "Email già registrata" });
        }
        return res.status(500).json({ message: "Errore durante la registrazione" });
      }
    }

    if (req.url === '/api/auth/login' && req.method === 'POST') {
      const { email, password } = req.body || {};
      
      if (!email || !password) {
        return res.status(400).json({ message: "Email e password richieste" });
      }

      try {
        // Get user
        const users = await sql`SELECT * FROM users WHERE email = ${email}`;
        if (users.length === 0) {
          return res.status(401).json({ message: "Credenziali non valide" });
        }

        const user = users[0];

        // Check password
        const hashedInputPassword = createHash('sha256').update(password + 'salt').digest('hex');
        const isValid = hashedInputPassword === user.password;
        if (!isValid) {
          return res.status(401).json({ message: "Credenziali non valide" });
        }

        // Update last active
        await sql`UPDATE users SET last_active_at = NOW() WHERE id = ${user.id}`;

        return res.json({ 
          message: "Login effettuato con successo",
          user: {
            id: user.id,
            email: user.email,
            firstName: user.first_name,
            lastName: user.last_name,
            points: user.points,
            level: user.level
          }
        });

      } catch (dbError: any) {
        console.error("Database error:", dbError);
        return res.status(500).json({ message: "Errore durante il login" });
      }
    }

    if (req.url === '/api/chapters' && req.method === 'GET') {
      try {
        const chapters = await sql`SELECT * FROM chapters ORDER BY number`;
        return res.json(chapters);
      } catch (dbError: any) {
        console.error("Database error:", dbError);
        return res.status(500).json({ message: "Errore recupero capitoli" });
      }
    }

    // Get user progress
    if (req.url?.startsWith('/api/users/') && req.url.includes('/progress') && req.method === 'GET') {
      const urlParts = req.url.split('/');
      const userId = urlParts[3];
      
      try {
        const progress = await sql`
          SELECT chapter_id, is_completed, completed_at, quiz_score
          FROM user_progress 
          WHERE user_id = ${userId}
          ORDER BY chapter_id
        `;
        return res.json(progress);
      } catch (dbError: any) {
        console.error("Database error:", dbError);
        return res.status(500).json({ message: "Errore recupero progressi" });
      }
    }

    // Get user achievements
    if (req.url?.startsWith('/api/users/') && req.url.includes('/achievements') && req.method === 'GET') {
      const urlParts = req.url.split('/');
      const userId = urlParts[3];
      
      try {
        const achievements = await sql`
          SELECT achievement_id, unlocked_at
          FROM user_achievements 
          WHERE user_id = ${userId}
          ORDER BY unlocked_at DESC
        `;
        return res.json(achievements);
      } catch (dbError: any) {
        console.error("Database error:", dbError);
        return res.status(500).json({ message: "Errore recupero traguardi" });
      }
    }

    // Get user stats
    if (req.url?.startsWith('/api/users/') && req.url.includes('/stats') && req.method === 'GET') {
      const urlParts = req.url.split('/');
      const userId = urlParts[3];
      
      try {
        const stats = await sql`
          SELECT 
            (SELECT COUNT(*) FROM user_progress WHERE user_id = ${userId} AND is_completed = true) as completed_chapters,
            (SELECT COUNT(*) FROM user_progress WHERE user_id = ${userId} AND quiz_score IS NOT NULL) as completed_quizzes,
            (SELECT points FROM users WHERE id = ${userId}) as total_points,
            (SELECT level FROM users WHERE id = ${userId}) as current_level,
            (SELECT EXTRACT(days FROM (NOW() - created_at)) FROM users WHERE id = ${userId}) as days_since_joined
        `;
        return res.json(stats[0]);
      } catch (dbError: any) {
        console.error("Database error:", dbError);
        return res.status(500).json({ message: "Errore recupero statistiche" });
      }
    }
    
    return res.status(404).json({ 
      message: "Endpoint non trovato",
      url: req.url,
      method: req.method
    });
    
  } catch (error: any) {
    console.error("Errore API:", error);
    return res.status(500).json({ 
      message: "Errore interno del server",
      error: error.message
    });
  }
}
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

    // Get all chapters
    if (req.url === '/api/chapters' && req.method === 'GET') {
      try {
        const chapters = await sql`SELECT * FROM chapters ORDER BY number`;
        return res.json(chapters);
      } catch (dbError: any) {
        console.error("Database error:", dbError);
        return res.status(500).json({ message: "Errore recupero capitoli" });
      }
    }

    // Get single chapter
    if (req.url?.startsWith('/api/chapters/') && !req.url.includes('quizzes') && req.method === 'GET') {
      const chapterId = req.url.split('/')[3];
      
      try {
        const chapter = await sql`SELECT * FROM chapters WHERE id = ${chapterId}`;
        if (chapter.length === 0) {
          return res.status(404).json({ message: "Capitolo non trovato" });
        }
        return res.json(chapter[0]);
      } catch (dbError: any) {
        console.error("Database error:", dbError);
        return res.status(500).json({ message: "Errore recupero capitolo" });
      }
    }

    // Get chapter quizzes
    if (req.url?.includes('/quizzes') && req.method === 'GET') {
      const chapterId = req.url.split('/')[3];
      
      try {
        const quizzes = await sql`SELECT * FROM quizzes WHERE chapter_id = ${chapterId} ORDER BY id`;
        return res.json(quizzes);
      } catch (dbError: any) {
        console.error("Database error:", dbError);
        return res.status(500).json({ message: "Errore recupero quiz" });
      }
    }

    // Get user progress
    if (req.url?.startsWith('/api/users/') && req.url.includes('/progress') && req.method === 'GET') {
      const urlParts = req.url.split('/');
      const userId = urlParts[3];
      
      try {
        const progress = await sql`
          SELECT chapter_id, is_completed, last_read_at as completed_at, reading_progress
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
          SELECT achievement_id, earned_at as unlocked_at
          FROM user_achievements 
          WHERE user_id = ${userId}
          ORDER BY earned_at DESC
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
        // Get user basic info
        const user = await sql`SELECT points, level, created_at FROM users WHERE id = ${userId}`;
        if (user.length === 0) {
          return res.status(404).json({ message: "Utente non trovato" });
        }
        
        // Get progress stats
        const progressStats = await sql`
          SELECT 
            COUNT(CASE WHEN is_completed = true THEN 1 END) as completed_chapters,
            COUNT(CASE WHEN reading_progress = 100 THEN 1 END) as completed_quizzes
          FROM user_progress 
          WHERE user_id = ${userId}
        `;
        
        const stats = {
          total_points: user[0].points || 0,
          current_level: user[0].level || 'Novizio',
          completed_chapters: parseInt(progressStats[0].completed_chapters) || 0,
          completed_quizzes: parseInt(progressStats[0].completed_quizzes) || 0,
          days_since_joined: Math.floor((Date.now() - new Date(user[0].created_at).getTime()) / (1000 * 60 * 60 * 24))
        };
        
        return res.json(stats);
      } catch (dbError: any) {
        console.error("Database error:", dbError);
        return res.status(500).json({ message: "Errore recupero statistiche", error: dbError.message });
      }
    }

    // Update reading progress
    if (req.url?.includes('/progress') && req.method === 'POST') {
      const { userId, chapterId, isCompleted, readingTime, quizScore } = req.body || {};
      
      try {
        await sql`
          INSERT INTO user_progress (user_id, chapter_id, is_completed, reading_time, quiz_score, updated_at)
          VALUES (${userId}, ${chapterId}, ${isCompleted}, ${readingTime}, ${quizScore}, NOW())
          ON CONFLICT (user_id, chapter_id) 
          DO UPDATE SET 
            is_completed = ${isCompleted},
            reading_time = COALESCE(${readingTime}, user_progress.reading_time),
            quiz_score = COALESCE(${quizScore}, user_progress.quiz_score),
            updated_at = NOW()
        `;
        
        return res.json({ message: "Progresso aggiornato" });
      } catch (dbError: any) {
        console.error("Database error:", dbError);
        return res.status(500).json({ message: "Errore aggiornamento progresso" });
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
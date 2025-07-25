import { VercelRequest, VercelResponse } from '@vercel/node';
import { neon } from '@neondatabase/serverless';
import { createHash } from 'crypto';

// Neon Database Configuration for Vercel Node.js 20.x
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
            level: newUser[0].level,
            role: 'student'
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
            level: user.level,
            role: user.role || 'student'
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

        // Get progress data
        const progress = await sql`
          SELECT * FROM user_progress WHERE user_id = ${userId}
        `;

        // Get achievements count
        const achievements = await sql`
          SELECT COUNT(*) as count FROM user_achievements WHERE user_id = ${userId}
        `;

        // Calculate stats
        const completedChapters = progress.filter((p: any) => p.is_completed).length;
        const totalTimeSpent = progress.reduce((sum: number, p: any) => sum + (p.time_spent || 0), 0);
        const daysSinceJoined = user[0].created_at ? 
          Math.floor((Date.now() - new Date(user[0].created_at).getTime()) / (1000 * 60 * 60 * 24)) : 0;

        return res.json({
          total_points: user[0].points || 0,
          level: user[0].level || "Novizio",
          completed_chapters: completedChapters,
          total_time_spent: totalTimeSpent,
          achievement_count: achievements[0].count || 0,
          days_since_joined: daysSinceJoined,
          completed_quizzes: 0 // Will be enhanced later
        });

      } catch (dbError: any) {
        console.error("Database error:", dbError);
        return res.status(500).json({ message: "Errore recupero statistiche" });
      }
    }

    // Save user progress
    if (req.url?.startsWith('/api/users/') && req.url.includes('/progress') && req.method === 'POST') {
      const urlParts = req.url.split('/');
      const userId = urlParts[3];
      const { chapterId, readingProgress, timeSpent, isCompleted } = req.body || {};
      
      if (!chapterId) {
        return res.status(400).json({ message: "Chapter ID richiesto" });
      }

      try {
        // Check if progress record exists
        const existingProgress = await sql`
          SELECT id FROM user_progress 
          WHERE user_id = ${userId} AND chapter_id = ${chapterId}
        `;

        if (existingProgress.length > 0) {
          // Update existing progress
          await sql`
            UPDATE user_progress 
            SET 
              reading_progress = ${readingProgress || 0},
              time_spent = COALESCE(time_spent, 0) + ${timeSpent || 0},
              is_completed = ${isCompleted || false},
              last_read_at = NOW()
            WHERE user_id = ${userId} AND chapter_id = ${chapterId}
          `;
        } else {
          // Create new progress record
          await sql`
            INSERT INTO user_progress (user_id, chapter_id, reading_progress, time_spent, is_completed, last_read_at)
            VALUES (${userId}, ${chapterId}, ${readingProgress || 0}, ${timeSpent || 0}, ${isCompleted || false}, NOW())
          `;
        }

        return res.json({ 
          message: "Progresso salvato con successo",
          progress: {
            userId: parseInt(userId),
            chapterId: parseInt(chapterId),
            readingProgress: readingProgress || 0,
            timeSpent: timeSpent || 0,
            isCompleted: isCompleted || false
          }
        });

      } catch (dbError: any) {
        console.error("Database error:", dbError);
        return res.status(500).json({ message: "Errore salvataggio progresso" });
      }
    }

    // Get glossary terms
    if (req.url === '/api/glossary' && req.method === 'GET') {
      try {
        const terms = await sql`SELECT * FROM glossary_terms ORDER BY term`;
        return res.json(terms);
      } catch (dbError: any) {
        console.error("Database error:", dbError);
        return res.status(500).json({ message: "Errore recupero glossario" });
      }
    }

    // Default 404 response
    return res.status(404).json({ 
      message: "Endpoint non trovato",
      url: req.url,
      method: req.method
    });

  } catch (error: any) {
    console.error("Server error:", error);
    return res.status(500).json({ 
      message: "Errore interno del server",
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
}
    return res.status(500).json({ 
      message: "Errore interno del server",
      error: error.message
    });
  }
}
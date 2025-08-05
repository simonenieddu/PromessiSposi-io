import { VercelRequest, VercelResponse } from '@vercel/node';
import { neon } from '@neondatabase/serverless';

const sql = neon(process.env.DATABASE_URL!);

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
  
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  const { id } = req.query;

  if (req.method === 'GET') {
    try {
      const progress = await sql`
        SELECT chapter_id, is_completed, completed_at, quiz_score
        FROM user_progress 
        WHERE user_id = ${id}
        ORDER BY chapter_id
      `;
      return res.json(progress);
    } catch (dbError: any) {
      console.error("Database error:", dbError);
      return res.status(500).json({ message: "Errore recupero progressi" });
    }
  }

  if (req.method === 'POST') {
    const { chapterId, isCompleted, readingTime, quizScore } = req.body || {};
    
    try {
      await sql`
        INSERT INTO user_progress (user_id, chapter_id, is_completed, reading_time, quiz_score, updated_at)
        VALUES (${id}, ${chapterId}, ${isCompleted}, ${readingTime}, ${quizScore}, NOW())
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

  return res.status(405).json({ message: "Metodo non consentito" });
}
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
      const stats = await sql`
        SELECT 
          (SELECT COUNT(*) FROM user_progress WHERE user_id = ${id} AND is_completed = true) as completed_chapters,
          (SELECT COUNT(*) FROM user_progress WHERE user_id = ${id} AND quiz_score IS NOT NULL) as completed_quizzes,
          (SELECT points FROM users WHERE id = ${id}) as total_points,
          (SELECT level FROM users WHERE id = ${id}) as current_level,
          (SELECT EXTRACT(days FROM (NOW() - created_at)) FROM users WHERE id = ${id}) as days_since_joined
      `;
      return res.json(stats[0]);
    } catch (dbError: any) {
      console.error("Database error:", dbError);
      return res.status(500).json({ message: "Errore recupero statistiche" });
    }
  }

  return res.status(405).json({ message: "Metodo non consentito" });
}
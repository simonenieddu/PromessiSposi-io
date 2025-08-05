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
      const quizzes = await sql`SELECT * FROM quizzes WHERE chapter_id = ${id} ORDER BY id`;
      return res.json(quizzes);
    } catch (dbError: any) {
      console.error("Database error:", dbError);
      return res.status(500).json({ message: "Errore recupero quiz" });
    }
  }

  return res.status(405).json({ message: "Metodo non consentito" });
}
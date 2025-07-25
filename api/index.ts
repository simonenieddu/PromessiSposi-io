import { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Basic CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
  
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  try {
    // Test basic functionality first
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

    // Simple auth endpoints without heavy dependencies
    if (req.url === '/api/auth/register' && req.method === 'POST') {
      // Basic validation
      const { email, password, firstName, lastName } = req.body || {};
      
      if (!email || !password || !firstName || !lastName) {
        return res.status(400).json({ 
          message: "Campi richiesti mancanti",
          required: ["email", "password", "firstName", "lastName"]
        });
      }

      // For now, just return success without database
      return res.json({ 
        message: "Registrazione simulata con successo",
        user: { email, firstName, lastName }
      });
    }

    if (req.url === '/api/auth/login' && req.method === 'POST') {
      const { email, password } = req.body || {};
      
      if (!email || !password) {
        return res.status(400).json({ message: "Email e password richieste" });
      }

      return res.json({ 
        message: "Login simulato con successo",
        user: { email, firstName: "Test" }
      });
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
      error: error.message,
      stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
    });
  }
}
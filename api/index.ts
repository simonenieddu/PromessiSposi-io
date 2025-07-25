import { VercelRequest, VercelResponse } from '@vercel/node';
import express from 'express';
import { registerRoutes } from '../server/routes-vercel';

// Create Express app for Vercel
const app = express();

// CORS middleware
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
  
  if (req.method === 'OPTIONS') {
    res.sendStatus(200);
  } else {
    next();
  }
});

// Initialize routes once
let initialized = false;
const initialize = async () => {
  if (!initialized) {
    await registerRoutes(app);
    initialized = true;
  }
};

// Vercel handler
export default async function handler(req: VercelRequest, res: VercelResponse) {
  await initialize();
  return app(req as any, res as any);
}
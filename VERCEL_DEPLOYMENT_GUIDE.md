# Guida Deployment Vercel - PromessiSposi.io

## Files da Caricare/Importare

### 1. File di Configurazione
- `vercel.json` - Configurazione runtime Node 18
- `package.json.vercel` → rinomina in `package.json`
- `.vercelignore` - Esclusioni build

### 2. API Backend
- `api/index.ts` - Funzione serverless principale

### 3. Frontend
- Tutta la cartella `client/` (Vercel la builderà automaticamente)

### 4. Schema Database
- `shared/schema.ts` - Schema Drizzle per reference

## Variabili Ambiente da Configurare

Nel dashboard Vercel, aggiungi:
- `DATABASE_URL` = [la tua stringa connessione Neon PostgreSQL]
- `NODE_ENV` = `production`

## Struttura Deploy

```
tu-progetto-vercel/
├── vercel.json
├── package.json (rinominato da package.json.vercel)
├── .vercelignore
├── api/
│   └── index.ts
├── client/
│   ├── src/
│   ├── index.html
│   └── [tutti i file frontend]
└── shared/
    └── schema.ts
```

## Comando Build

Vercel userà automaticamente: `vite build`

## Endpoint API

Dopo deployment, le API saranno disponibili a:
- `https://tuo-dominio.vercel.app/api/test`
- `https://tuo-dominio.vercel.app/api/auth/login`
- `https://tuo-dominio.vercel.app/api/auth/register`
- `https://tuo-dominio.vercel.app/api/chapters`
- E tutti gli altri endpoint per progressi e statistiche utente

## Note Importanti

1. **Node 18**: Configurazione runtime corretta in vercel.json
2. **Database**: Neon PostgreSQL già configurato nell'API
3. **CORS**: Già configurato per production
4. **Autenticazione**: Sistema crypto nativo Node.js compatibile Vercel
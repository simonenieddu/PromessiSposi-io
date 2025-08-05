# PromessiSposi.io - Educational Web Application

## Overview

PromessiSposi.io is an educational web application designed to provide an immersive and engaging experience for students learning about Alessandro Manzoni's "I Promessi Sposi" (The Betrothed). The platform combines interactive reading features, AI-powered literary analysis, gamification elements, and educational tools to make classic Italian literature accessible and engaging for modern learners.

## System Architecture

The application follows a modern full-stack architecture with clear separation between frontend and backend concerns:

### Frontend Architecture
- **Framework**: React with TypeScript for type safety
- **Styling**: Tailwind CSS with custom design system components
- **UI Components**: Radix UI component library for consistent, accessible interface
- **State Management**: React Query for server state and React hooks for local state
- **Routing**: Wouter for client-side routing
- **Build Tool**: Vite for fast development and optimized builds

### Backend Architecture
- **Runtime**: Node.js with Express.js web framework
- **Language**: TypeScript for full-stack type safety
- **API Design**: RESTful API endpoints with session-based authentication
- **Session Management**: Express-session with secure cookie handling

### Database Layer
- **ORM**: Drizzle ORM for type-safe database operations
- **Database**: PostgreSQL (configured for Neon serverless)
- **Migration**: Drizzle Kit for schema migrations
- **Connection**: Neon serverless with WebSocket support

## Key Components

### Authentication System
- User registration and login with bcrypt password hashing
- Session-based authentication with secure cookies
- Admin authentication with separate admin user management
- Role-based access control for different user types

### Educational Content Management
- Chapter-based content delivery with interactive text elements
- Glossary terms with contextual tooltips and definitions
- Historical context integration for deeper understanding
- Progress tracking with reading completion metrics

### Interactive Learning Features
- Quiz system with multiple-choice questions and explanations
- Achievement system with gamification elements
- Note-taking functionality for personal annotations
- Challenge system for structured learning goals

### AI-Powered Analysis
- Literary insights generation using Anthropic's Claude AI
- Contextual question generation for deeper comprehension
- Historical context analysis and cultural significance explanations
- Modern relevance connections for contemporary understanding

### Admin Panel
- Content management system for chapters, quizzes, and glossary
- User analytics and progress monitoring
- System administration tools for platform management

## Data Flow

1. **User Authentication**: Users register/login → Session established → JWT stored in secure cookie
2. **Content Delivery**: User requests chapter → Server validates session → Content served with interactive elements
3. **Progress Tracking**: User actions (reading, quiz completion) → Progress updates → Database storage
4. **AI Analysis**: User selects text → Request to AI service → Literary insights generated and cached
5. **Real-time Features**: User interactions → State updates → UI re-renders with new data

## External Dependencies

### Core Dependencies
- **@anthropic-ai/sdk**: AI-powered literary analysis and contextual question generation
- **@neondatabase/serverless**: PostgreSQL database connectivity for serverless environments
- **bcrypt**: Secure password hashing for user authentication
- **express-session**: Session management for user state persistence

### UI and Styling
- **@radix-ui/***: Comprehensive component library for accessible UI elements
- **tailwindcss**: Utility-first CSS framework with custom design tokens
- **class-variance-authority**: Type-safe component variant management
- **lucide-react**: Modern icon library for consistent iconography

### Development Tools
- **drizzle-orm**: Type-safe ORM with excellent TypeScript integration
- **vite**: Fast build tool optimized for modern web development
- **@tanstack/react-query**: Powerful data fetching and caching library

## Deployment Strategy

### Development Environment
- Vite development server for hot module replacement
- Express server running in development mode with TypeScript compilation
- Environment variables managed through .env files
- Replit integration for cloud-based development

### Production Build
- Frontend: Vite builds optimized static assets with code splitting
- Backend: esbuild compiles TypeScript server code for Node.js runtime
- Database migrations run automatically during deployment
- Static assets served through CDN-optimized delivery

### Vercel Deployment
- Serverless functions for API endpoints
- Static asset hosting with global CDN
- Environment variable management through Vercel dashboard
- Automatic deployments from git repository changes

The application is designed to scale horizontally with serverless architecture while maintaining excellent performance and user experience through modern web development practices.

## Deployment Status

✅ **Production Ready**: Successfully deployed to Vercel with full functionality
- **Frontend**: React app hosted on Vercel CDN
- **API**: Serverless functions handling authentication and data
- **Database**: Neon PostgreSQL with real user data
- **URL**: https://promessisposi-io.vercel.app

## Recent Changes

### July 25, 2025 - Successful Vercel Deployment
- ✅ Frontend deployment working with React interface
- ✅ API serverless functions operational (registration, login, chapters)
- ✅ Neon PostgreSQL database connected and functional
- ✅ User authentication with secure password hashing (crypto module)
- ✅ Form validation and error handling working
- ✅ CORS configuration for cross-origin requests
- 🔧 Replaced bcrypt with native crypto module for Vercel compatibility

### Architecture Updates
- **API Structure**: Moved from Express routes to single serverless function
- **Database**: Migrated from Replit PostgreSQL to Neon serverless
- **Security**: Implemented SHA-256 password hashing with salt
- **Validation**: Direct request validation without external schemas

## Changelog
```
Changelog:
- July 01, 2025. Initial setup
- July 25, 2025. Successfully deployed to Vercel production
```

## User Preferences
```
Preferred communication style: Simple, everyday language.
```
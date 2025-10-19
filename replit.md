# MindfulPages - Mental Health Journal App

## Overview

MindfulPages is a mental health and wellness journaling application designed to provide users with a safe, calming space for daily reflection and mood tracking. The application features journal entry management, mood analytics, and a supportive user interface inspired by mental wellness apps like Calm, Headspace, and Reflectly. Built as a full-stack web application, it emphasizes emotional safety through gentle design, clarity in user experience, and empowering data insights.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

**Framework & Build System**
- React 18 with TypeScript for type-safe component development
- Vite as the build tool and development server for fast HMR and optimized production builds
- Wouter for lightweight client-side routing
- Single Page Application (SPA) architecture with component-based design

**State Management & Data Fetching**
- TanStack Query (React Query) for server state management, caching, and data synchronization
- Custom query client configured with infinite stale time and disabled refetching to minimize unnecessary API calls
- Form state managed via React Hook Form with Zod validation for type-safe form handling

**UI Component System**
- shadcn/ui component library (Radix UI primitives) for accessible, customizable components
- Tailwind CSS for utility-first styling with custom design tokens
- Custom theme system supporting light/dark modes via Context API
- Design approach inspired by mental wellness apps (Calm, Headspace, Reflectly) focusing on calming aesthetics and emotional safety

**Design Principles**
- Calming color palette with sage green and soft lavender accents
- Typography: DM Sans (primary), Crimson Pro (journal entries)
- Generous spacing and gentle borders to reduce visual anxiety
- Hover and active elevation effects for tactile feedback
- Mobile-first responsive design with dedicated mobile navigation

### Backend Architecture

**Server Framework**
- Express.js running on Node.js for the API server
- RESTful API design pattern for journal entry CRUD operations
- Middleware for JSON parsing, URL encoding, and request/response logging
- Custom error handling middleware for consistent error responses

**API Structure**
- `/api/entries` - GET all journal entries
- `/api/entries/:id` - GET single entry
- `/api/entries` - POST create new entry
- `/api/entries/:id` - PATCH update entry
- `/api/entries/:id` - DELETE remove entry
- Input validation using Zod schemas before database operations

**Development & Production Separation**
- Development mode uses Vite middleware for HMR and development features
- Production mode serves pre-built static assets
- Environment-based configuration via NODE_ENV
- Conditional loading of Replit development plugins (cartographer, dev-banner, runtime-error-modal)

### Data Storage Solutions

**Database & ORM**
- PostgreSQL as the production database (via Neon serverless driver)
- Drizzle ORM for type-safe database queries and schema management
- Schema-first approach with automatic TypeScript types generation
- Migrations stored in `/migrations` directory

**Schema Design**
- `journal_entries` table with fields:
  - `id`: Auto-generated UUID primary key
  - `date`: Text field for entry date
  - `content`: Text field for journal content
  - `mood`: Integer (1-5) representing emotional state
  - `tags`: Text array for categorization
  - `createdAt`: Timestamp with automatic defaulting

**Development Storage**
- In-memory storage implementation (`MemStorage`) for development/testing
- Seeded with sample data for immediate functionality
- Interface-based storage abstraction (`IStorage`) allowing easy swapping between implementations

### Authentication and Authorization

**Current State**
- No authentication system currently implemented
- Application operates in open access mode
- Session infrastructure prepared via `connect-pg-simple` (imported but not actively used)

**Future Considerations**
- Session management dependencies already installed
- Ready for user authentication implementation when required

## External Dependencies

### Third-Party UI Libraries
- **Radix UI**: Comprehensive suite of accessible component primitives (@radix-ui/react-*)
- **shadcn/ui**: Pre-styled component system built on Radix UI
- **Lucide React**: Icon library for consistent iconography
- **class-variance-authority**: Utility for managing component variants
- **tailwind-merge & clsx**: CSS class composition utilities

### Database & ORM
- **@neondatabase/serverless**: PostgreSQL driver optimized for serverless environments
- **drizzle-orm**: Type-safe ORM with schema definition and query builder
- **drizzle-kit**: CLI tool for migrations and schema management
- **drizzle-zod**: Automatic Zod schema generation from Drizzle schemas

### Form Handling & Validation
- **react-hook-form**: Performant form state management
- **@hookform/resolvers**: Integration between react-hook-form and validation libraries
- **zod**: Schema validation with TypeScript type inference

### Development Tools
- **@replit/vite-plugin-***: Replit-specific development enhancements
- **tsx**: TypeScript execution for Node.js
- **esbuild**: Fast JavaScript bundler for production builds

### Utilities
- **date-fns**: Date manipulation and formatting
- **nanoid**: Compact unique ID generation
- **embla-carousel-react**: Carousel component implementation

### Fonts
- **Google Fonts**: DM Sans and Crimson Pro loaded via CDN for consistent typography
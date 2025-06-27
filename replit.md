# PhotoRestore AI - Replit Architecture Guide

## Overview

PhotoRestore AI is a full-stack web application that uses artificial intelligence to restore and enhance old or damaged photos. The application allows users to upload images and automatically process them using OpenAI's vision models to colorize black and white photos, repair damage, and enhance image quality.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Routing**: Wouter for client-side routing
- **UI Framework**: shadcn/ui component library built on Radix UI primitives
- **Styling**: Tailwind CSS with custom CSS variables for theming
- **State Management**: TanStack Query (React Query) for server state management
- **Form Handling**: React Hook Form with Zod validation
- **Build Tool**: Vite for development and production builds

### Backend Architecture
- **Runtime**: Node.js with Express.js server
- **Language**: TypeScript with ES modules
- **File Uploads**: Multer middleware for handling multipart/form-data
- **Image Processing**: Sharp library for image manipulation
- **AI Integration**: OpenAI API for photo enhancement using GPT-4o vision model

### Database Architecture
- **ORM**: Drizzle ORM with PostgreSQL dialect
- **Schema Management**: Drizzle Kit for migrations and schema management
- **Development Storage**: In-memory storage class for development/testing
- **Production Storage**: PostgreSQL with Neon serverless connector

## Key Components

### Data Models
1. **Photos Table**
   - `id`: Primary key (serial)
   - `originalUrl`: Path to uploaded file
   - `enhancedUrl`: Path to processed file (nullable)
   - `status`: Processing status (processing, completed, failed)
   - `createdAt`: Timestamp

2. **Contacts Table**
   - `id`: Primary key (serial)
   - `name`, `email`, `subject`, `message`: Contact form fields
   - `createdAt`: Timestamp

### Core Features
1. **Photo Upload & Processing**
   - Drag-and-drop file upload interface
   - Real-time processing status updates
   - Before/after comparison slider
   - Support for JPG, PNG, TIFF formats (10MB limit)

2. **Professional AI Enhancement Pipeline**
   - Real-ESRGAN for super-resolution upscaling (up to 8x)
   - CodeFormer for advanced face restoration and repair
   - GFPGAN for lightweight face enhancement
   - DeOldify for professional photo colorization
   - Automatic damage detection and intelligent repair
   - Processing status tracking with real-time polling

3. **User Interface Components**
   - Responsive design with mobile optimization
   - Hero section with call-to-action
   - Features showcase section
   - Pricing tiers display
   - FAQ accordion
   - Contact form
   - Gallery with before/after examples

## Data Flow

1. **Upload Process**
   - User selects/drops image file
   - Frontend validates file type and size
   - File uploaded via FormData to `/api/photos/upload`
   - Server stores file and creates database record
   - Background processing initiated

2. **Processing Pipeline**
   - Image resized and optimized using Sharp
   - Base64 encoded for OpenAI API
   - AI model analyzes and enhances image
   - Enhanced image saved to filesystem
   - Database updated with results and status

3. **Status Updates**
   - Frontend polls `/api/photos/:id` endpoint
   - Real-time progress updates displayed
   - Completion triggers before/after display

## External Dependencies

### AI Services
- **Replicate API**: Professional AI models including Real-ESRGAN, CodeFormer, GFPGAN, and DeOldify
- **API Key**: Environment variable `REPLICATE_API_TOKEN`
- **OpenAI API**: GPT-4o vision model for image analysis (fallback)
- **API Key**: Environment variable `OPENAI_API_KEY`

### Database
- **Neon PostgreSQL**: Serverless PostgreSQL database
- **Connection**: Environment variable `DATABASE_URL`

### Development Tools
- **Replit Integration**: Cartographer plugin for development
- **Error Handling**: Runtime error overlay for debugging

## Deployment Strategy

### Development
- **Command**: `npm run dev`
- **Port**: 5000 (mapped to external port 80)
- **Hot Reload**: Vite HMR with Express middleware mode
- **Database**: Uses memory storage by default

### Production Build
- **Frontend**: Vite builds to `dist/public`
- **Backend**: esbuild bundles server to `dist/index.js`
- **Start Command**: `npm run start`
- **Database**: Requires PostgreSQL connection

### Environment Variables
- `DATABASE_URL`: PostgreSQL connection string
- `REPLICATE_API_TOKEN`: Replicate API for professional AI models
- `OPENAI_API_KEY`: OpenAI API authentication (fallback)
- `NODE_ENV`: Environment mode (development/production)

## User Preferences

Preferred communication style: Simple, everyday language.

## Changelog

- June 27, 2025 (6:20 AM): Upgraded to professional AI restoration system
  - Integrated Replicate API with Real-ESRGAN, CodeFormer, GFPGAN, and DeOldify models
  - Replaced basic OpenAI image processing with state-of-the-art restoration algorithms
  - Enhanced UI to reflect professional AI capabilities
  - Updated features section to highlight specific AI models used
  - Improved processing feedback with professional terminology
  - Made service completely free with no account requirements
- June 27, 2025: Initial setup
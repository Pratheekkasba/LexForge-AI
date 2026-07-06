# LexForge AI Platform

Enterprise Legal Intelligence Platform providing secure AI infrastructure for modern law firms.

## Tech Stack
- Frontend: React (Vite), TypeScript, Tailwind CSS, Framer Motion
- Backend: Node.js, Express, Firebase Cloud Functions
- Database: Firestore
- Authentication: Firebase Auth

## Getting Started

### 1. Prerequisites
- Node.js v18+
- Firebase CLI (`npm install -g firebase-tools`)

### 2. Environment Setup
Create a `.env` file in the root directory and populate it with your Firebase config:
```bash
cp .env.example .env
```

### 3. Install Dependencies
```bash
# Install frontend dependencies
npm install

# Install backend dependencies
cd functions && npm install
```

### 4. Running Locally
Run the frontend:
```bash
npm run dev
```

Run the backend emulators (optional, requires Firebase CLI):
```bash
firebase emulators:start
```

## Project Structure
- `/src`: Frontend React application.
- `/functions`: Backend Express API and Cloud Functions.
- `/src/pages/admin`: Super-admin dashboard.
- `/src/pages/dashboard`: User and Organization dashboards.

## Production Deployment
To deploy the full platform to Firebase:
```bash
firebase deploy
```

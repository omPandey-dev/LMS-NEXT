# LMS Next - Learning Management System

A modern Learning Management System built with React, TypeScript, and Vite, featuring a fresh, modern UI design.

## Features

- 🔐 Authentication (Login/Register)
- 👤 User Dashboard with user information
- 🎨 Modern, responsive UI design
- 🔒 Protected routes based on authentication
- 📱 Mobile-friendly interface
- ⚡ Fast and optimized with Vite

## Tech Stack

- **React 19** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool
- **Tailwind CSS** - Styling
- **React Router** - Routing
- **React Hook Form** - Form handling
- **Zod** - Schema validation
- **Axios** - HTTP client
- **Sonner** - Toast notifications
- **Lucide React** - Icons

## Getting Started

### Prerequisites

- Node.js 18+ and npm

### Installation

1. Install dependencies:
```bash
npm install
```

2. Create a `.env` file in the root directory:
```env
VITE_API_BASE_URL=http://localhost:5000
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

## Available APIs

This project integrates with the LMS Backend APIs. Currently implemented:

- **Authentication**
  - `POST /login` - User login
  - `POST /register` - User registration
  - `GET /test/user-info` - Get authenticated user info
  - `GET /test/public` - Public endpoint

## Project Structure

```
src/
├── api/
│   ├── routes/      # API route definitions
│   └── services/    # API service configuration
├── components/
│   ├── layout/      # Layout components
│   └── ui/          # Reusable UI components
├── contexts/        # React contexts
├── pages/
│   ├── auth/        # Authentication pages
│   └── dashboard/   # Dashboard pages
├── types/           # TypeScript type definitions
└── utils/           # Utility functions
```

## Build

```bash
npm run build
```

## Preview Production Build

```bash
npm run preview
```

## Notes

This project only implements features for which backend APIs are available. As more APIs are developed in the backend, additional features will be added to this frontend.

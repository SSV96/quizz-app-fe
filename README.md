# Quizzz APP - Create and Play your Own Quizzes.

## Overview

TThis project is a Next.js-based full-stack application designed for creating, editing, and playing quizzes. It features a modern, reactive frontend with Zustand for editor state management and React Query as the source of truth for syncing quiz data. The app leverages Material UI for a polished interface and Tailwind CSS for rapid, utility-first styling. It demonstrates a scalable and maintainable architecture for interactive content creation, real-time state updates, and responsive user experience.

## Features

- **📝 Quiz Creation**: Create and edit quizzes with multiple question types (single choice, multiple choice, etc.).
- **🎮 Play Quizzes**: Interactive quiz playing experience with real-time feedback and scoring.
- **⚡ State Management**: **Zustand** for editor state and **React Query** as the source of truth for syncing quiz data with the backend.
- **🎨 UI & Styling**: Built with **Material UI** components and styled with **Tailwind CSS** for responsive design.
- **🌐 API Integration**: Seamless communication with the backend for quiz data CRUD operations.
- **📊 Scalability**: Designed to handle large numbers of quizzes and users efficiently.
- **🚀 Deployment**: Ready for production deployment on **Vercel** or other hosting platforms.

## Tech Stack

- **⚡ Framework**: Next.js (React + Node.js)
- **🔤 Language**: TypeScript
- **🗄️ State Management**: Zustand
- **💾 Data Fetching**: React Query (server state management)
- **🎨 UI Library**: Material UI
- **🎨 Styling**: Tailwind CSS
- **🌐 API Client**: Axios
- **🧪 Testing**: Jest + React Testing Library
- **🐳 Containerization**: Docker
- **🚀 Deployment**: Vercel (Frontend), Node.js hosting (Backend)

## Project Structure

```
app/
├── quiz/
│ ├── [id]/page.tsx # View individual quiz
│ └── edit/[id]/page.tsx # Edit quiz page

src/
├── components/ # Reusable React components (buttons, cards, forms, etc.)
├── hooks/ # Custom hooks (e.g., React Query hooks for quizzes)
├── lib/ # API client and utility functions
├── provider/ # Context providers (e.g., Reac Query Provider)
├── store/ # Zustand stores for quiz/editor state management
├── ui/ # UI components specific to the app (e.g., Toast)
└── types/ # TypeScript types and interfaces
```

## Prerequisites

- Node.js v20+
- Git

---

## Setup for Development

1. **Clone the Repository**

```bash
git clone https://github.com/SSV96/quizz-app-fe
cd quiz-app-fe
```

2. **Install Dependencies**

```bash
npm install
```

3. **Configure Environment Variables**
   Create a .env file in the root directory:

```bash
NEXT_PUBLIC_API_URL=http://localhost:3002
```

4. **Run your backend before starting your app**

5. **Run App in Development Mode**

```bash
npm run dev
```

# Quick Start Guide

Get the frontend running in 5 minutes!

## Prerequisites

- Node.js 18+ installed
- Backend API running at `http://localhost:8000`

## Setup

```bash
# 1. Install dependencies
pnpm install

# 2. Create environment file
cp .env.example .env

# 3. Start development server
pnpm dev
```

Open <http://localhost:5173> in your browser.

## Common Commands

```bash
pnpm dev      # Start dev server
pnpm build    # Build for production
pnpm lint     # Check code quality
```

## Need Help?

- Read [README.md](./README.md) for detailed setup
- Check [CONTRIBUTING.md](./CONTRIBUTING.md) for development guidelines
- Ensure backend is running first!

## Project Structure

```
src/
├── components/    # Reusable UI components
├── pages/         # Page components
├── services/      # API calls
└── types/         # TypeScript types
```

Happy coding! 🌱

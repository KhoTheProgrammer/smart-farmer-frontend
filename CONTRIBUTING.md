# Contributing to Mlimi Wanzeru Frontend

Thank you for your interest in contributing to the Mlimi Wanzeru platform!

## Getting Started

1. Fork the repository
2. Clone your fork: `git clone <your-fork-url>`
3. Create a feature branch: `git checkout -b feature/your-feature-name`
4. Make your changes
5. Test thoroughly
6. Commit with clear messages
7. Push to your fork
8. Create a Pull Request

## Development Setup

See [README.md](./README.md) for detailed setup instructions.

## Code Style

### TypeScript/React

- Use TypeScript for all new code
- Use functional components with hooks
- Follow React best practices
- Keep components small and focused (< 200 lines)
- Use meaningful variable and function names
- Add comments for complex logic

### Naming Conventions

- Components: PascalCase (e.g., `CropCard.tsx`)
- Functions: camelCase (e.g., `fetchCrops()`)
- Constants: UPPER_SNAKE_CASE (e.g., `API_BASE_URL`)
- Files: PascalCase for components, camelCase for utilities

### File Organization

```
src/
├── components/     # Reusable UI components
├── pages/          # Full page components
├── services/       # API and external services
├── types/          # TypeScript type definitions
└── utils/          # Helper functions
```

## Commit Messages

Use clear, descriptive commit messages:

```
feat: Add crop filtering by season
fix: Resolve location selector bug
docs: Update API integration guide
style: Format code with Prettier
refactor: Simplify calendar date logic
test: Add tests for CropCard component
```

## Testing

Before submitting a PR:

1. Test all functionality manually
2. Run linter: `pnpm lint`
3. Build successfully: `pnpm build`
4. Test on different screen sizes
5. Check browser console for errors

## Pull Request Process

1. Update README.md if needed
2. Ensure all tests pass
3. Update documentation for new features
4. Request review from maintainers
5. Address review feedback
6. Wait for approval and merge

## Questions?

Open an issue or reach out to the development team.

Thank you for contributing! 🌱

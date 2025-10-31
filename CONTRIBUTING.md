# Contributing to PushFire Subscribers Sync

Thank you for your interest in contributing to PushFire Subscribers Sync! This document provides guidelines and instructions for contributing to the project.

## Code of Conduct

By participating in this project, you agree to maintain a respectful and inclusive environment for all contributors.

## How Can You Contribute?

### Reporting Bugs

If you find a bug, please create an issue on GitHub with:
- A clear, descriptive title
- Steps to reproduce the issue
- Expected behavior vs actual behavior
- Your environment (Firebase project, Node.js version, etc.)
- Relevant logs or error messages

### Suggesting Features

We welcome feature suggestions! Please create an issue describing:
- The problem you're trying to solve
- Your proposed solution
- Any alternative solutions you've considered
- Additional context or examples

### Improving Documentation

Documentation improvements are always welcome:
- Fix typos or clarify confusing sections
- Add examples or use cases
- Improve code comments
- Translate documentation

### Submitting Code

1. **Fork the repository**
2. **Create a feature branch**: `git checkout -b feature/your-feature-name`
3. **Make your changes** following our coding standards
4. **Test your changes** thoroughly
5. **Commit your changes** using Conventional Commits
6. **Push to your fork**: `git push origin feature/your-feature-name`
7. **Create a Pull Request** with a clear description

## Development Setup

### Prerequisites

- Node.js 22 or higher
- pnpm 10.15.1 or higher
- Firebase CLI
- Git

### Local Development

1. **Clone the repository**:
```bash
git clone https://github.com/FlywheelStudio/pushfire-libs-firebase-extension.git
cd pushfire-libs-firebase-extension
```

2. **Install dependencies**:
```bash
cd functions
pnpm install
```

3. **Build the project**:
```bash
pnpm run build
```

4. **Run tests**:
```bash
pnpm run test
```

5. **Run linter**:
```bash
pnpm run lint
```

### Testing Your Changes

Before submitting a PR:

1. **Run all tests**: Ensure all existing tests pass
2. **Add new tests**: Cover your new functionality
3. **Test with Firebase Emulator**: Test the extension locally
4. **Manual testing**: Test in a real Firebase project (recommended)

## Coding Standards

### TypeScript

- Use TypeScript for all code
- Enable strict mode
- Add JSDoc comments for public APIs
- Use meaningful variable and function names

### Code Style

We follow the Google TypeScript Style Guide:
- Use 2 spaces for indentation
- Use single quotes for strings
- Add trailing commas in multi-line objects/arrays
- Run `pnpm run lint:fix` before committing

### Commit Messages

We use [Conventional Commits](https://www.conventionalcommits.org/):

```
<type>(<scope>): <subject>

<body>

<footer>
```

**Types**:
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting, etc.)
- `refactor`: Code refactoring
- `test`: Adding or updating tests
- `chore`: Maintenance tasks

**Examples**:
```
feat(mapper): add support for array field types

fix(client): handle timeout errors correctly

docs(readme): update installation instructions
```

**Important**: Commit messages must not exceed 120 characters.

## Project Structure

```
pushfire-libs-firebase-extension/
├── functions/
│   ├── src/
│   │   ├── services/
│   │   │   ├── firestore/
│   │   │   │   ├── mapper.ts      # Field mapping logic
│   │   │   │   └── parser.ts      # Firestore document parser
│   │   │   └── pushfire/
│   │   │       └── client.ts      # PushFire API client
│   │   ├── types/
│   │   │   ├── firestore.types.ts # Firestore type definitions
│   │   │   └── pushfire.types.ts  # PushFire type definitions
│   │   ├── utils/
│   │   │   └── log/
│   │   │       └── logger.ts      # Logging utilities
│   │   └── index.ts               # Extension entry point
│   ├── integration-tests/         # Integration tests
│   ├── package.json
│   └── tsconfig.json
├── extension.yaml                  # Extension configuration
├── README.md
├── PREINSTALL.md
├── POSTINSTALL.md
├── CHANGELOG.md
└── CONTRIBUTING.md
```

## Key Components

### FirestoreParser
Converts raw Firestore documents to JavaScript objects.

### FirestoreMapper
Maps Firestore documents to PushFire subscriber format using configuration.

### PushfireClient
Handles API communication with PushFire.

## Testing Guidelines

### Unit Tests

- Test individual functions in isolation
- Mock external dependencies
- Cover edge cases and error conditions
- Aim for >80% code coverage

### Integration Tests

- Test with Firebase Emulator
- Test end-to-end flows
- Test error scenarios
- Test with various document structures

### Example Test Structure

```typescript
describe('FirestoreMapper', () => {
  describe('mapSubscriberData', () => {
    it('should map basic fields correctly', () => {
      // Test implementation
    });

    it('should handle missing fields with fallbacks', () => {
      // Test implementation
    });

    it('should handle nested fields with dot notation', () => {
      // Test implementation
    });
  });
});
```

## Pull Request Process

1. **Update documentation** if you're changing functionality
2. **Add tests** for new features or bug fixes
3. **Update CHANGELOG.md** following Keep a Changelog format
4. **Ensure all tests pass** and linting is clean
5. **Request review** from maintainers
6. **Address feedback** promptly and professionally

### PR Description Template

```markdown
## Description
[Clear description of what this PR does]

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Breaking change
- [ ] Documentation update

## Testing
[Describe how you tested your changes]

## Checklist
- [ ] Code follows project style guidelines
- [ ] Self-review completed
- [ ] Comments added for complex code
- [ ] Documentation updated
- [ ] Tests added/updated
- [ ] All tests passing
- [ ] CHANGELOG.md updated
```

## Release Process

Releases are managed by project maintainers:

1. Update version in `extension.yaml` and `package.json`
2. Update CHANGELOG.md with release notes
3. Create a git tag: `git tag -a v0.0.2 -m "Release version 0.0.2"`
4. Push tags: `git push --tags`
5. Create GitHub release with changelog
6. Publish to Firebase Extensions (maintainers only)

## Need Help?

- **Questions**: Create a GitHub issue with the "question" label
- **Discussions**: Use GitHub Discussions for general topics
- **Support**: Contact [hello@pushfire.app](mailto:hello@pushfire.app) for assistance

## License

By contributing, you agree that your contributions will be licensed under the Apache License 2.0.

## Recognition

Contributors will be:
- Listed in the project README
- Mentioned in release notes
- Added to the contributors list in `extension.yaml`

---

Thank you for contributing to PushFire Subscribers Sync! Your efforts help make this extension better for everyone. 🚀


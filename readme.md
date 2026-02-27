# Portfolio Backend

A modern Express backend template with TypeScript, Mongoose, and Zod.

## Features
- **TypeScript**: Type-safe development.
- **Express**: Fast, unopinionated, minimalist web framework.
- **Mongoose**: Elegant mongodb object modeling.
- **Zod**: TypeScript-first schema declaration and validation.
- **ESLint & Prettier**: High code quality and consistent formatting.
- **Global Error Handling**: Centralized error management for Zod, Mongoose, and AppErrors.

## Prerequisites
- Node.js (v20+)
- MongoDB

## Setup Instructions

1. **Install Dependencies**:
   ```bash
   npm install
   ```

2. **Environment Variables**:
   Create a `.env` file based on `.env.example`:
   ```bash
   cp .env.example .env
   ```

3. **Development**:
   ```bash
   npm run dev
   ```

4. **Build for Production**:
   ```bash
   npm run build
   ```

5. **Linting & Formatting**:
   ```bash
   npm run lint
   npm run format
   ```

## Project Structure
- `src/app`: Core logic, middlewares, routes, and utilities.
- `src/modules`: Domain-driven modules (e.g., Auth, User).
- `src/server.ts`: Entry point for the server.

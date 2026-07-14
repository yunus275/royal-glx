# RoyalGLX — Car Accessories Site

## Overview
A static marketing/landing site for "RoyalGLX", a car accessories business based in Baghdad, Iraq. Built with React + Vite, TypeScript, Tailwind CSS v4, and Radix UI/shadcn-style components. Client-side only — no backend or database.

## Stack
- Vite + React 18 + TypeScript
- Tailwind CSS v4 (via `@tailwindcss/vite`)
- Radix UI primitives, shadcn-style components in `src/components/ui`
- Wouter for routing, React Query, React Hook Form + Zod

## Running the project
- Workflow **"Start application"** runs `npm run dev` and serves on port 5000 (webview).
- `npm run build` produces a production build in `dist/`.
- `npm run typecheck` runs the TypeScript compiler with no emit.

## Project structure
- `src/App.tsx` — app entry/routes
- `src/pages/` — page components (`home.tsx`, `not-found.tsx`)
- `src/components/layout/` and `src/components/sections/` — layout and page sections
- `src/components/ui/` — reusable UI primitives
- `src/contexts/language-context.tsx` — i18n/language context
- `src/hooks/` — custom hooks (mobile detection, theme, toast)

## User preferences
None recorded yet.

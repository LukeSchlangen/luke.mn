# Luke Schlangen's Portfolio Website

This is a personal portfolio website built with [Next.js](https://nextjs.org/) and [Tailwind CSS](https://tailwindcss.com/). It features a configurable interface that changes themes based on the URL path.

## Features

- **Dynamic Theming**: The website's appearance and "vibe" (professional, fun, etc.) can be changed via the URL.
- **Next.js App Router**: Uses the latest Next.js features including the App Router and Server Components.
- **Configurable Deployment**: Includes options for simulating different deployment configurations.

## Getting Started

First, install the dependencies:

```bash
pnpm install
```

Then, run the development server:

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Project Structure

- `src/app`: Application source code (App Router).
- `src/app/components`: Reusable UI components.
- `src/app/utils`: Utility functions, including path parsing for themes.
- `src/app/types`: TypeScript type definitions.

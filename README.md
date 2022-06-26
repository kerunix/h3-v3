# Nuxt 3 Kissmy Minimal Starter

Look at the [nuxt 3 documentation](https://v3.nuxtjs.org) to learn more.

## Features

- Vue 3 + Nuxt 3 as the base UI framework
- Vite as a build tool
- Nuxt's `$fetch` for http requests (with a wrapping composable)
- Typescript because it's 2022
- Tailwind CSS for styling
- Headless UI and Heroicons for some UI comfort (auto imported)
- ESLint for linting
- @intlify/nuxt3 for i18n using yaml files (`useI18n` is auto imported)


## Setup

Make sure to install the dependencies using Yarn as your package manager

```bash
yarn install
```

## Development Server

Start the development server on http://localhost:3000

```bash
npm run dev
```

## Production

Build the application for production:

```bash
npm run build
```

Locally preview production build:

```bash
npm run preview
```

## TODO
[] Add testing with Vitest + Vue Test Utils + Nuxt Test Utils

[] Add Pinia

[] Add Vee-Validate

[] Figure out what to do with routing

[] Figure out Auth (what's `nuxtServerInit` in Nuxt 3 ?)
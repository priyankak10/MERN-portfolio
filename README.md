# MERN Portfolio

This project is a MERN-based software engineer portfolio.

- Frontend: React + Vite
- Backend: Node.js + Express + MongoDB (optional local connection)
- Deployment target for compiled frontend: GitHub Pages

## Folder Structure

- `client`: React app (deploy this compiled build to GitHub Pages)
- `server`: Express API for profile/project data

## Quick Start

1. Install dependencies:

```bash
npm run install:all
```

2. Run backend API:

```bash
npm run dev:server
```

3. Run frontend locally in a second terminal:

```bash
npm run dev:client
```

## Environment

- Copy `server/.env.example` to `server/.env` and set `MONGODB_URI` if needed.
- Copy `client/.env.example` to `client/.env` and set `VITE_API_BASE_URL=http://localhost:5000` for local API integration.

If `VITE_API_BASE_URL` is not set, the frontend uses built-in fallback data and still works as a static site.

## Build for GitHub Pages

From project root:

```bash
npm run build
```

This compiles static assets into `client/dist`.

## Deploy to GitHub Pages

1. Update `homepage` in `client/package.json`:

```json
"homepage": "https://YOUR_GITHUB_USERNAME.github.io/MERN-portfolio/"
```

2. Commit and push your repository to GitHub.
3. Run deployment:

```bash
npm run deploy
```

The `gh-pages` package publishes `client/dist` to the `gh-pages` branch.

## Notes

- GitHub Pages hosts static assets only, so backend APIs are not hosted there.
- Host the backend separately (Render, Railway, Azure, etc.) and set `VITE_API_BASE_URL` accordingly.

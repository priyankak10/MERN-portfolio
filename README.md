# MERN Portfolio

This repository contains my personal software engineer portfolio built with the MERN stack.
It highlights my experience, projects, achievements, and resume files with preview and download support.
The frontend is deployed on GitHub Pages, and the backend API is designed for optional external hosting.

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

1. Ensure `homepage` in `client/package.json` points to your repo URL:

```json
"homepage": "https://priyankak10.github.io/MERN-portfolio/"
```

2. Commit and push your repository to GitHub (`main` branch).

3. Deploy from the `client` folder:

```bash
cd client
npm run deploy
```

The `gh-pages` package publishes `client/dist` to the `gh-pages` branch.

4. Configure GitHub Pages in repository settings (one-time):

- Open repository: `https://github.com/priyankak10/MERN-portfolio`
- Go to **Settings > Pages**
- Under **Build and deployment**:
  - Source: `Deploy from a branch`
  - Branch: `gh-pages`
  - Folder: `/(root)`
- Save

5. Access the external link:

- `https://priyankak10.github.io/MERN-portfolio/`

6. If the page does not load immediately:

- Wait 1-5 minutes after first deployment.
- Hard refresh (`Ctrl+F5`).
- Check GitHub Pages/Actions status in repository.

## Update After Changes

After making portfolio updates:

```bash
cd client
npm run deploy
```

Refresh the same GitHub Pages URL.

## Notes

- GitHub Pages hosts static assets only, so backend APIs are not hosted there.
- Host the backend separately (Render, Railway, Azure, etc.) and set `VITE_API_BASE_URL` accordingly.

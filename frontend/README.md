# Supervaise Notes Frontend

A React + Vite frontend for the Supervaise Notes app.

## Setup

1. Install dependencies:
   ```sh
   npm install
   ```
2. Lint code:
   ```sh
   npx eslint src/
   ```

## Environment Variables

- Set API URL in `.env`:
  ```
  VITE_API_URL=https://your-api-url
  ```

## Running Locally

- Start the development server:
  ```sh
  npm run dev
  ```

## Deployment

- Build for production:
  ```sh
  npm run build
  ```
- Upload the contents of `dist/` to S3 for static hosting.

## Project Structure

- `src/` - React source code
- `public/` - Static assets (if any)
- `.env` - Environment variables (not committed to git)

---

For backend/API setup, see the backend README.

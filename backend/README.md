# Supervaise Notes Backend

A Python (AWS Lambda) backend for the Supervaise Notes app, managed with the Serverless Framework.

## Setup

1. Install dependencies:
   ```sh
   pip install -r requirements.txt
   ```
2. Lint code:
   ```sh
   flake8 .
   ```

## Environment Variables

- Set in `serverless.yml` (e.g., `TABLE_NAME`)

## Running Locally

- Use [Serverless Offline](https://github.com/dherault/serverless-offline) to emulate AWS Lambda/API Gateway:
  ```sh
  sls offline
  ```

## Deployment

- Deploy with Serverless Framework:
  ```sh
  sls deploy
  ```

## API Endpoints

- `GET /notes` — List all notes
- `POST /notes` — Add a new note (JSON body: `{ "content": "..." }`)
- `DELETE /notes/{id}` — Delete a note by ID

## Project Structure

- `handler.py` — Lambda function handlers
- `serverless.yml` — Serverless Framework config
- `.flake8` — Linting config
- `__pycache__/` — Python cache (ignored)

---

For frontend setup, see the frontend README.

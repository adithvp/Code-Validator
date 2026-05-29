# AI Code Validator Platform

Production-ready AI-powered code validator with a premium VS Code + ChatGPT inspired UI.

## Stack

- Frontend: React, Vite, Tailwind CSS, Monaco Editor, Axios, Framer Motion
- Backend: FastAPI, LangChain, Gemini 2.5 Flash, Pydantic, Python-dotenv, Uvicorn

## Project Structure

```bash
ai-code-validator/
├── frontend/
│   ├── src/components/
│   ├── src/services/
│   └── src/App.jsx
└── backend/
    ├── app.py
    ├── validator.py
    ├── models.py
    ├── routes/
    └── requirements.txt
```

## Setup

### 1) Frontend

```bash
cd frontend
npm install
cp .env.example .env
npm run dev
```
```
cd frontend
npm install
copy .env.example .env
npm run dev
```

### 2) Backend

```bash
cd backend
cd backend
python3 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
cp .env.example .env
```

Set `GOOGLE_API_KEY` in `backend/.env`.

Start backend:

```bash
uvicorn app:app --reload --host 0.0.0.0 --port 8000
```

## API

### `POST /validate`

Request:

```json
{
  "code": "def hello(:\n    print('x')",
  "language": "python"
}
```

Response:

```json
{
  "errors": [
    {
      "error_type": "Syntax Error",
      "error_message": "Missing closing parenthesis",
      "line_number": 1,
      "severity": "High",
      "suggested_fix": "Add a closing parenthesis after function name."
    }
  ],
  "optimized_code": "def hello():\n    print('x')"
}
```

## Deployment Notes

- Frontend: Deploy to Vercel/Netlify; set `VITE_API_BASE_URL`
- Backend: Deploy to Render/Fly.io/AWS with `GOOGLE_API_KEY` configured securely
- Use HTTPS and restricted CORS origins in production
- For higher traffic, move rate limiting to Redis



terminal 
cd backend
cd "c:\Users\adith\Downloads\code\Code Validator\backend"

.\.venv\Scripts\Activate.ps1

uvicorn app:app --reload --host 127.0.0.1 --port 8000
----------------------------------------------------
First-time setup:

cd "c:\Users\adith\Downloads\code\Code Validator\backend"

python -m venv .venv

Set-ExecutionPolicy -Scope Process -ExecutionPolicy Bypass

.\.venv\Scripts\Activate.ps1

pip install -r requirements.txt

copy .env.example .env


Then edit backend\.env and set your GOOGLE_API_KEY.
------------------------------------------
frontend :
cd "c:\Users\adith\Downloads\code\Code Validator\frontend"

npm install

copy .env.example .env

npm run dev

If activation fails:

Set-ExecutionPolicy -Scope Process -ExecutionPolicy Bypass
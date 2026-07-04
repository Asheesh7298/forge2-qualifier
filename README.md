\# Forge 2 Qualifier — Kanban Board



A Trello-style Kanban board: Laravel API (SQLite) + React (Vite) frontend, built with a two-agent system (OpenClaw + Hermes) orchestrated through Slack.



\## Models \& Routing

\- \*\*Hermes (brain)\*\*: Gemini `gemini-2.5-flash` — planning, memory, skills, cron

\- \*\*OpenClaw (hands)\*\*: Groq `openai/gpt-oss-120b` (with Ollama `qwen2.5-coder` as local fallback) — coding execution



\## Run Instructions



\### Backend

\\`\\`\\`bash

cd backend

composer install

php artisan migrate

php artisan serve

\\`\\`\\`

API runs on http://127.0.0.1:8000



\### Frontend

\\`\\`\\`bash

cd frontend

npm install

npm run dev

\\`\\`\\`

Frontend runs on http://localhost:5173



\## Live URL

\[to be added]



\## Features

\- Boards → Lists → Cards (CRUD)

\- Move cards between lists

\- Tags/labels with color

\- Assign members to cards

\- Due dates with overdue flagging


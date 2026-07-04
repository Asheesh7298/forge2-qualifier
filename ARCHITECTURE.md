\# Architecture



\## Agents



\*\*Hermes (brain / orchestrator)\*\*

\- Bot: Orchestrator BotAPP

\- Model: Gemini `gemini-2.5-flash`

\- Responsibilities: planning, breaking down the build into steps, memory across sessions, running the `status-report` skill, autonomous cron updates



\*\*OpenClaw (hands / coder)\*\*

\- Bot: Coder Bot

\- Model: Groq `openai/gpt-oss-120b` (fallback: Ollama `qwen2.5-coder` locally)

\- Responsibilities: executing terminal commands, scaffolding the Laravel project, writing code



\## Slack Channel Scheme

\- `#sprint-main` — human ↔ Hermes: goals, plans, status updates, cron output

\- `#agent-coder` — Hermes ↔ OpenClaw: coding tasks and execution reports

\- `#agent-log` — raw agent activity / autonomous run audit trail



\## Model Routing Rationale

Hermes handles planning and orchestration, so it's routed to Gemini for its large context window and generous free tier — useful for holding the full project plan in context.

OpenClaw handles code generation, so it's routed to Groq for fast inference on repetitive scaffolding tasks (models, migrations, controllers). Ollama `qwen2.5-coder` was configured as a local, rate-limit-free fallback.



\## Human-in-the-Loop

All task delegation and execution is visible in Slack channels — no agent operates in private DMs. The human (builder) reviews and approves each step before the next begins.



\## Known Limitations

Due to free-tier model reliability constraints under time pressure, some file-level code changes (migration schema details, model relationships, controllers, routes, and the React frontend) that were proposed by OpenClaw in the chat loop were applied manually to guarantee a working submission within the qualifier window. The proposed schema and reasoning are preserved in `agent-log.md` and the Slack export as evidence of the agents' contribution to the design.


# Projectgator

Simple project management tool based on Labagator architecture. Track projects, tasks, milestones, and team progress without the complexity of cloud resource planning.

## Features

- **Projects** - Create and manage projects with descriptions, deadlines, and status tracking
- **Tasks** - Track work items with priorities, assignees, statuses, and time estimates
- **Milestones** - Set key deadlines and track milestone progress
- **Team Management** - Add team members and assign work
- **Comments** - Discuss tasks and collaborate
- **Tags** - Organize tasks with custom labels
- **Audit Trail** - Track all changes to projects and tasks

## Architecture

```
Browser --> Next.js 15 (PatternFly 6 UI) --> FastAPI (Python)
                                                |
                                            PostgreSQL
```

| Component | Stack |
|-----------|-------|
| Frontend | Next.js 15, PatternFly 6, App Router |
| Backend | FastAPI, SQLAlchemy, Alembic |
| Auth | OpenShift OAuth proxy |
| Builds | OpenShift BuildConfigs + GitHub webhooks |

## Quick Start

```bash
# Backend setup
cd src/backend
python3 -m venv .venv
.venv/bin/pip install -r requirements.txt

# Run database migrations
.venv/bin/alembic upgrade head

# Start backend (port 8080)
.venv/bin/uvicorn app.main:app --host 0.0.0.0 --port 8080 --reload

# Frontend setup (in another terminal)
cd src/frontend
npm install
npm run dev  # Starts on port 3001
```

Open http://localhost:3001

**Prerequisites:** Python 3.11+, Node.js 20+, PostgreSQL 14+

## Database Setup

```bash
# Create PostgreSQL database
sudo -u postgres createuser -P projectgator  # Password: projectgator
sudo -u postgres createdb -O projectgator projectgator

# Or use Docker/Podman
podman run -d \
  --name projectgator-postgres \
  -e POSTGRES_USER=projectgator \
  -e POSTGRES_PASSWORD=projectgator \
  -e POSTGRES_DB=projectgator \
  -p 5432:5432 \
  postgres:16
```

## Data Model

- **Projects** - Main project container
- **Tasks** - Work items within projects (supports subtasks)
- **Milestones** - Key deadlines and deliverables
- **Users** - Team members
- **Comments** - Task discussions
- **Tags** - Organizational labels
- **AuditLog** - Change tracking

## Development

```bash
# Run backend tests
cd src/backend
.venv/bin/pytest

# Run linter
.venv/bin/ruff check .

# Frontend type check
cd src/frontend
npx tsc --noEmit
```

## Project Status

**Status:** Initial development

## License

Internal Red Hat tool. Not for external distribution.

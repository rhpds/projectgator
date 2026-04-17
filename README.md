# Projectgator 🐊

[![License](https://img.shields.io/badge/license-Internal-blue.svg)](LICENSE)
[![Python](https://img.shields.io/badge/python-3.11+-blue.svg)](https://www.python.org/downloads/)
[![Node](https://img.shields.io/badge/node-20+-green.svg)](https://nodejs.org/)

A simplified project management tool based on Labagator architecture. Track projects, tasks, milestones, and team progress without the complexity of cloud resource planning and deployment orchestration.

![Projectgator Home](docs/screenshots/home.png)

## Table of Contents

- [Features](#features)
- [Screenshots](#screenshots)
- [Architecture](#architecture)
- [Quick Start](#quick-start)
- [Installation](#installation)
- [Configuration](#configuration)
- [Database Schema](#database-schema)
- [API Documentation](#api-documentation)
- [Development](#development)
- [Deployment](#deployment)
- [Contributing](#contributing)
- [License](#license)

## Features

### Core Functionality

- **📋 Projects** - Create and manage projects with descriptions, deadlines, and status tracking
  - Planning, Active, On Hold, Completed, and Cancelled states
  - Owner assignment and date tracking
  - Full project lifecycle management

- **✅ Tasks** - Comprehensive task tracking with rich metadata
  - Priority levels (Low, Medium, High, Critical)
  - Status tracking (Todo, In Progress, Blocked, Done)
  - Assignee and reporter tracking
  - Time estimation and actual hours logging
  - Parent-child task relationships (subtasks)
  - Due date management

- **🎯 Milestones** - Set key deadlines and track progress
  - Upcoming, Active, Completed, and Missed states
  - Project association
  - Deadline tracking

- **👥 Team Management** - User management and role-based access
  - Admin, Member, and Viewer roles
  - Email-based user identification
  - Activity tracking

- **💬 Comments** - Task-level discussions and collaboration
  - Threaded conversations on tasks
  - User attribution
  - Timestamp tracking

- **🏷️ Tags** - Flexible organization system
  - Custom labels with color coding
  - Many-to-many task associations
  - PatternFly color scheme support

- **📜 Audit Trail** - Complete change history
  - Before/after state tracking
  - User attribution
  - Action logging (create, update, delete)
  - JSON-based state snapshots

## Screenshots

### Home Dashboard
![Home Dashboard](docs/screenshots/home.png)
*Welcome screen with quick access to Projects, Tasks, and Milestones*

### Projects View
![Projects](docs/screenshots/projects.png)
*Project listing with status, deadlines, and team information*

### Tasks View
![Tasks](docs/screenshots/tasks.png)
*Task management with filtering, sorting, and bulk operations*

## Architecture

```
┌─────────────┐         ┌──────────────┐         ┌──────────────┐
│   Browser   │────────▶│   Next.js    │────────▶│   FastAPI    │
│             │         │   Frontend   │         │   Backend    │
│ PatternFly  │◀────────│  (Port 3001) │◀────────│  (Port 8080) │
│     UI      │         └──────────────┘         └──────┬───────┘
└─────────────┘                                         │
                                                        │
                                                        ▼
                                                ┌──────────────┐
                                                │  PostgreSQL  │
                                                │   Database   │
                                                │  (Port 5432) │
                                                └──────────────┘
```

### Technology Stack

| Component | Technology | Version | Purpose |
|-----------|-----------|---------|---------|
| **Frontend** | Next.js | 15.1+ | React framework with App Router |
| | PatternFly | 6.0+ | Enterprise UI component library |
| | TypeScript | 5+ | Type-safe JavaScript |
| **Backend** | FastAPI | 0.115+ | Modern Python web framework |
| | SQLAlchemy | 2.0+ | ORM and database toolkit |
| | Alembic | 1.13+ | Database migration tool |
| | Pydantic | 2.9+ | Data validation |
| **Database** | PostgreSQL | 14+ | Relational database |
| **Auth** | OAuth Proxy | - | OpenShift OAuth integration |
| **Deployment** | OpenShift | 4.x | Container orchestration |
| | Ansible | 2.x | Infrastructure automation |

### Design Principles

1. **Simplicity** - Focus on core project management without unnecessary complexity
2. **Familiar Architecture** - Based on proven Labagator patterns for easy deployment
3. **Modern Stack** - Latest stable versions of Next.js 15, React 19, FastAPI
4. **Type Safety** - TypeScript frontend, Pydantic backend schemas
5. **Audit Everything** - Complete change tracking for accountability
6. **Developer Experience** - Fast local development with hot reload

## Quick Start

### Prerequisites

- **Python 3.11+** - Backend runtime
- **Node.js 20+** - Frontend runtime
- **PostgreSQL 14+** - Database (or use Docker/Podman)
- **Git** - Source control

### 1. Clone the Repository

```bash
git clone https://github.com/rhpds/projectgator.git
cd projectgator
```

### 2. Start PostgreSQL

#### Option A: Using Podman/Docker

```bash
podman run -d \
  --name projectgator-postgres \
  -e POSTGRES_USER=projectgator \
  -e POSTGRES_PASSWORD=projectgator \
  -e POSTGRES_DB=projectgator \
  -p 5432:5432 \
  postgres:16
```

#### Option B: Using System PostgreSQL

```bash
# Create user and database
sudo -u postgres createuser -P projectgator  # Password: projectgator
sudo -u postgres createdb -O projectgator projectgator
```

### 3. Backend Setup

```bash
cd src/backend

# Create virtual environment
python3 -m venv .venv
source .venv/bin/activate  # On Windows: .venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Run database migrations
alembic upgrade head

# Start backend server (with auto-reload)
uvicorn app.main:app --host 0.0.0.0 --port 8080 --reload
```

Backend will be available at: http://localhost:8080

### 4. Frontend Setup

```bash
cd src/frontend

# Install dependencies
npm install

# Start development server
npm run dev
```

Frontend will be available at: http://localhost:3001

### 5. Access the Application

Open your browser to **http://localhost:3001**

## Installation

### Detailed Backend Setup

```bash
cd src/backend

# Create and activate virtual environment
python3 -m venv .venv
source .venv/bin/activate

# Upgrade pip
pip install --upgrade pip

# Install all dependencies
pip install -r requirements.txt

# Verify installation
python -c "import fastapi, sqlalchemy, alembic; print('✓ Backend dependencies installed')"
```

### Detailed Frontend Setup

```bash
cd src/frontend

# Install dependencies
npm install

# Verify installation
npm run type-check

# Build for production (optional)
npm run build
```

## Configuration

### Environment Variables

Create a `.env` file in the project root (copy from `.env.example`):

```bash
# Database
PROJECTGATOR_DATABASE_URL=postgresql://projectgator:projectgator@localhost:5432/projectgator

# Auth (comma-separated groups)
PROJECTGATOR_ALLOWED_GROUPS=rhdp-projectgator-admins,rhpds-admins
PROJECTGATOR_ALLOWED_USERS=

# CORS origins for API access
PROJECTGATOR_CORS_ORIGINS=http://localhost:3001,http://localhost:3000

# Debug mode (enables verbose logging)
PROJECTGATOR_DEBUG=false
```

### Backend Configuration

Settings are managed via `src/backend/app/core/config.py` using Pydantic Settings:

- **Prefix**: `PROJECTGATOR_`
- **Nested settings**: Use double underscore (e.g., `PROJECTGATOR_DATABASE__POOL_SIZE`)
- **Environment file**: `.env` in project root
- **Defaults**: Configured for local development

### Frontend Configuration

Next.js configuration in `src/frontend/next.config.js`:

- **API Proxy**: Automatically proxies `/api/*` to backend (localhost:8080)
- **React Strict Mode**: Enabled for development
- **CSS**: Global PatternFly imports in `layout.tsx`

## Database Schema

### Entity Relationship Diagram

```
┌──────────────┐       ┌──────────────┐       ┌──────────────┐
│    Users     │       │   Projects   │       │  Milestones  │
├──────────────┤       ├──────────────┤       ├──────────────┤
│ id (PK)      │◀──────│ owner_id (FK)│       │ id (PK)      │
│ email        │       │ name         │       │ project_id   │
│ name         │       │ description  │───────│ name         │
│ role         │       │ status       │       │ due_date     │
│ created_at   │       │ start_date   │       │ status       │
│ updated_at   │       │ due_date     │       └──────────────┘
└──────┬───────┘       │ completed_at │
       │               └──────┬───────┘
       │                      │
       │                      │
       │               ┌──────▼───────┐       ┌──────────────┐
       │               │    Tasks     │       │   Comments   │
       │               ├──────────────┤       ├──────────────┤
       │               │ id (PK)      │       │ id (PK)      │
       └──────────────▶│ project_id   │───────│ task_id (FK) │
       ┌──────────────▶│ assignee_id  │       │ user_id (FK) │
       │               │ reporter_id  │       │ content      │
       │               │ title        │       │ created_at   │
       │               │ description  │       └──────────────┘
       │               │ status       │
       │               │ priority     │       ┌──────────────┐
       │               │ parent_task  │       │     Tags     │
       │               │ due_date     │       ├──────────────┤
       │               │ est_hours    │       │ id (PK)      │
       │               └──────┬───────┘       │ name         │
       │                      │               │ color        │
       │                      └───────────────└──────────────┘
       │                           (M:N via task_tags)
       │
       │               ┌──────────────┐
       └──────────────▶│  AuditLog    │
                       ├──────────────┤
                       │ id (PK)      │
                       │ table_name   │
                       │ record_id    │
                       │ action       │
                       │ user_id      │
                       │ before_state │
                       │ after_state  │
                       │ created_at   │
                       └──────────────┘
```

### Tables

#### `users`
- Stores user accounts and roles
- Roles: `admin`, `member`, `viewer`
- Unique email constraint

#### `projects`
- Main project container
- Statuses: `planning`, `active`, `on_hold`, `completed`, `cancelled`
- Cascade delete: deletes all tasks and milestones

#### `tasks`
- Work items with rich metadata
- Statuses: `todo`, `in_progress`, `blocked`, `done`
- Priorities: `low`, `medium`, `high`, `critical`
- Supports parent-child relationships (subtasks)
- Many-to-many with tags

#### `milestones`
- Key project deadlines
- Statuses: `upcoming`, `active`, `completed`, `missed`

#### `comments`
- Task-level discussions
- Cascade delete with task

#### `tags`
- Organizational labels
- PatternFly color options: `grey`, `blue`, `green`, `orange`, `red`, `purple`, `cyan`

#### `audit_logs`
- Complete change history
- JSONB columns for before/after state
- Indexed on table_name, record_id, created_at

## API Documentation

### Base URL

```
http://localhost:8080/api/v1
```

### Authentication

Currently configured for local development. Production deployment uses OpenShift OAuth proxy.

### Endpoints

#### Projects

```http
GET    /api/v1/projects          # List all projects
GET    /api/v1/projects/{id}     # Get project by ID
POST   /api/v1/projects          # Create new project
PATCH  /api/v1/projects/{id}     # Update project
DELETE /api/v1/projects/{id}     # Delete project
```

**Example: Create Project**
```bash
curl -X POST http://localhost:8080/api/v1/projects \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Q2 Marketing Campaign",
    "description": "Social media and content marketing for Q2",
    "status": "planning",
    "owner_id": 1,
    "start_date": "2026-04-01",
    "due_date": "2026-06-30"
  }'
```

#### Tasks

```http
GET    /api/v1/tasks                    # List all tasks
GET    /api/v1/tasks?project_id={id}    # Filter by project
GET    /api/v1/tasks?status={status}    # Filter by status
GET    /api/v1/tasks?assignee_id={id}   # Filter by assignee
GET    /api/v1/tasks/{id}               # Get task by ID
POST   /api/v1/tasks                    # Create new task
PATCH  /api/v1/tasks/{id}               # Update task
DELETE /api/v1/tasks/{id}               # Delete task
```

**Example: Create Task**
```bash
curl -X POST http://localhost:8080/api/v1/tasks \
  -H "Content-Type: application/json" \
  -d '{
    "project_id": 1,
    "title": "Design landing page mockups",
    "description": "Create 3 design variations for the campaign landing page",
    "status": "todo",
    "priority": "high",
    "assignee_id": 2,
    "reporter_id": 1,
    "due_date": "2026-04-15",
    "estimated_hours": 8.0
  }'
```

#### Health Check

```http
GET /api/v1/health  # Returns {"status": "healthy"}
```

### Response Format

**Success Response (200)**
```json
{
  "id": 1,
  "name": "Q2 Marketing Campaign",
  "description": "Social media and content marketing for Q2",
  "status": "planning",
  "owner_id": 1,
  "start_date": "2026-04-01",
  "due_date": "2026-06-30",
  "completed_date": null,
  "created_at": "2026-04-17T15:53:00Z",
  "updated_at": "2026-04-17T15:53:00Z"
}
```

**Error Response (404)**
```json
{
  "detail": "Project not found"
}
```

## Development

### Running Tests

#### Backend Tests

```bash
cd src/backend
pytest                    # Run all tests
pytest -v                 # Verbose output
pytest --cov              # With coverage report
pytest tests/test_api/    # Specific directory
```

#### Frontend Type Checking

```bash
cd src/frontend
npx tsc --noEmit         # Type check without emitting files
```

### Code Quality

#### Backend Linting

```bash
cd src/backend
ruff check .              # Check for issues
ruff check . --fix        # Auto-fix issues
ruff format .             # Format code
```

#### Frontend Linting

```bash
cd src/frontend
npm run lint              # ESLint
```

### Database Migrations

#### Create New Migration

```bash
cd src/backend
alembic revision --autogenerate -m "Add new column to tasks"
```

#### Apply Migrations

```bash
alembic upgrade head      # Upgrade to latest
alembic downgrade -1      # Downgrade one revision
alembic history           # Show migration history
```

#### Migration Best Practices

1. Always review auto-generated migrations
2. Test migrations on a copy of production data
3. Migrations should be reversible (implement `downgrade()`)
4. Never edit applied migrations, create new ones
5. Use descriptive migration messages

### Local Development Workflow

1. **Start services** - PostgreSQL, backend, frontend
2. **Make changes** - Edit code with hot reload
3. **Run tests** - Verify changes don't break existing functionality
4. **Create migration** - If schema changes are needed
5. **Commit** - Small, focused commits with descriptive messages
6. **Push** - Triggers CI/CD pipeline

### Debugging

#### Backend Debugging

```bash
# Enable debug mode
export PROJECTGATOR_DEBUG=true

# Run with debugger
python -m pdb -m uvicorn app.main:app --reload
```

#### Frontend Debugging

- Use browser DevTools (F12)
- React DevTools extension for component inspection
- Network tab for API request debugging

#### Database Inspection

```bash
# Connect to database
psql postgresql://projectgator:projectgator@localhost:5432/projectgator

# Useful queries
\dt                       # List tables
\d users                  # Describe users table
SELECT * FROM tasks WHERE status = 'in_progress';
```

## Deployment

### OpenShift Deployment

Projectgator uses Ansible for automated deployment to OpenShift, following the same pattern as Labagator.

#### Prerequisites

- OpenShift cluster access
- `oc` CLI tool installed
- Ansible installed
- Cluster admin or sufficient permissions

#### Deployment Steps

```bash
# 1. Create vars file
cp ansible/vars/dev.yml.example ansible/vars/dev.yml

# 2. Edit vars file with your cluster details
vim ansible/vars/dev.yml

# 3. Deploy to dev environment
ansible-playbook ansible/deploy.yml -e env=dev

# 4. Deploy to production
ansible-playbook ansible/deploy.yml -e env=prod
```

#### Environment URLs

- **Dev**: `https://projectgator-dev.apps.<cluster-hostname>`
- **Prod**: `https://projectgator.apps.<cluster-hostname>`

### CI/CD Pipeline

GitHub webhooks trigger OpenShift builds automatically:

1. **Push to `main`** → Builds `projectgator-dev` namespace
2. **Push to `production`** → Builds `projectgator-prod` namespace
3. **ImageStream update** → Auto-rollout to deployments

### Environment Variables (Production)

Set via OpenShift ConfigMap and Secrets:

```yaml
# ConfigMap: projectgator-backend-config
PROJECTGATOR_CORS_ORIGINS: https://projectgator.apps.example.com
PROJECTGATOR_ALLOWED_GROUPS: rhdp-projectgator-admins,rhpds-admins

# Secret: projectgator-database
PROJECTGATOR_DATABASE_URL: postgresql://...
```

## Contributing

### Branching Strategy

- `main` - Development branch (auto-deploys to dev)
- `production` - Stable branch (auto-deploys to prod)
- `feature/*` - Feature branches
- `fix/*` - Bug fix branches

### Commit Message Format

```
<type>(<scope>): <subject>

<body>

<footer>
```

**Types**: `feat`, `fix`, `docs`, `style`, `refactor`, `test`, `chore`

**Example**:
```
feat(tasks): add priority filtering to task list

- Add priority filter dropdown
- Update API to support priority query param
- Add tests for priority filtering

Closes #42
```

### Pull Request Process

1. Create feature branch from `main`
2. Make changes with tests
3. Run linters and type checks
4. Push and create PR
5. Wait for CI checks to pass
6. Request review from team
7. Merge after approval

### Code Review Guidelines

- Check for code quality and style
- Verify tests cover new functionality
- Ensure database migrations are safe
- Review for security vulnerabilities
- Confirm documentation is updated

## Project Structure

```
projectgator/
├── .env.example                    # Environment template
├── .gitignore                      # Git ignore patterns
├── README.md                       # This file
├── DESIGN.md                       # Design decisions
├── docs/                           # Documentation
│   └── screenshots/                # Application screenshots
├── ansible/                        # Deployment automation
│   ├── deploy.yml                  # Main playbook
│   ├── templates/                  # K8s manifests
│   └── vars/                       # Environment configs
├── src/
│   ├── backend/                    # FastAPI backend
│   │   ├── alembic/                # Database migrations
│   │   │   ├── versions/           # Migration files
│   │   │   ├── env.py              # Alembic config
│   │   │   └── script.py.mako      # Migration template
│   │   ├── app/
│   │   │   ├── __init__.py
│   │   │   ├── main.py             # FastAPI app
│   │   │   ├── api/                # Route handlers
│   │   │   │   ├── projects.py
│   │   │   │   └── tasks.py
│   │   │   ├── core/               # Config & database
│   │   │   │   ├── config.py
│   │   │   │   └── database.py
│   │   │   ├── models/             # SQLAlchemy models
│   │   │   │   ├── user.py
│   │   │   │   ├── project.py
│   │   │   │   ├── task.py
│   │   │   │   ├── milestone.py
│   │   │   │   ├── comment.py
│   │   │   │   ├── tag.py
│   │   │   │   └── audit.py
│   │   │   ├── schemas/            # Pydantic schemas
│   │   │   │   ├── project.py
│   │   │   │   ├── task.py
│   │   │   │   └── user.py
│   │   │   └── services/           # Business logic
│   │   ├── tests/                  # Backend tests
│   │   ├── alembic.ini             # Alembic config
│   │   └── requirements.txt        # Python dependencies
│   └── frontend/                   # Next.js frontend
│       ├── src/
│       │   ├── app/                # App Router pages
│       │   │   ├── layout.tsx      # Root layout
│       │   │   ├── page.tsx        # Home page
│       │   │   ├── projects/       # Projects pages
│       │   │   └── tasks/          # Tasks pages
│       │   ├── components/         # React components
│       │   ├── services/           # API client
│       │   └── types/              # TypeScript types
│       ├── public/                 # Static assets
│       ├── next.config.js          # Next.js config
│       ├── tsconfig.json           # TypeScript config
│       ├── package.json            # Node dependencies
│       └── package-lock.json       # Locked dependencies
```

## License

**Internal Red Hat tool.** Not for external distribution.

This project is proprietary software developed for internal use within Red Hat. All rights reserved.

## Support

For questions, issues, or feature requests:

1. **GitHub Issues**: https://github.com/rhpds/projectgator/issues
2. **Slack**: #rhdp-projectgator (internal)
3. **Email**: rhdp-team@redhat.com

## Acknowledgments

- **Based on Labagator** - Event lab deployment scheduler architecture
- **PatternFly** - Red Hat's open source design system
- **FastAPI** - Modern Python web framework
- **Next.js** - React framework for production

---

**Made with ❤️ by the RHDP Team**

# Projectgator

[![License](https://img.shields.io/badge/license-Internal-blue.svg)](LICENSE)
[![Python](https://img.shields.io/badge/python-3.11+-blue.svg)](https://www.python.org/downloads/)
[![Node](https://img.shields.io/badge/node-20+-green.svg)](https://nodejs.org/)

A streamlined project management tool designed for simplicity and efficiency. Built on the battle-tested Labagator architecture, Projectgator helps teams track projects, tasks, and milestones without the overhead of complex deployment orchestration systems.

## Welcome to Projectgator

Projectgator brings together the best practices from enterprise-grade event management tools and distills them into a focused, user-friendly project management experience. Whether you're managing a small team or coordinating multiple concurrent initiatives, Projectgator provides the structure you need without overwhelming you with unnecessary features.

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
- [Support](#support)

## Features

### Core Functionality

**Projects**  
Organize your work into projects with rich metadata and status tracking. Each project can have a description, start and due dates, and progress through multiple states from planning to completion. Projects serve as containers for related tasks and provide a high-level view of your initiatives.

**Tasks**  
Break down your projects into manageable work items. Tasks support priority levels from low to critical, status tracking from todo to done, and detailed time tracking with both estimates and actuals. The hierarchical task structure supports parent-child relationships, making it easy to organize complex work into subtasks.

**Milestones**  
Mark key deadlines and deliverables with milestones. Track progress toward major goals and ensure your team stays aligned on critical dates. Milestones provide visibility into project timelines and help identify potential scheduling conflicts.

**Team Management**  
Assign team members to projects and tasks with role-based access control. Support for admin, member, and viewer roles ensures appropriate access levels across your organization. Track who created and is responsible for each piece of work.

**Comments and Collaboration**  
Enable team communication directly on tasks. Comments are timestamped and attributed, creating a clear conversation history that helps maintain context and institutional knowledge.

**Flexible Organization**  
Use tags to create custom organizational schemes that match your workflow. Color-coded labels make it easy to visually categorize and filter work items according to your team's needs.

**Complete Audit Trail**  
Every change to projects and tasks is logged with before and after states. This comprehensive audit trail supports compliance requirements, enables undo functionality, and provides visibility into how work evolves over time.

## Screenshots

### Home Dashboard
![Home Dashboard](docs/screenshots/home.png)

The home page provides quick access to all major features with a clean, modern interface built on PatternFly design principles.

### Projects View
![Projects](docs/screenshots/projects-empty.png)

The projects page displays your active projects in an organized gallery layout, with color-coded status indicators and key metadata at a glance.

### Tasks View
![Tasks](docs/screenshots/tasks-empty.png)

Task management with priority and status indicators helps you quickly assess workload and identify high-priority items requiring attention.

## Architecture

Projectgator follows a modern, scalable architecture pattern that separates concerns while maintaining developer productivity:

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

The technology choices prioritize stability, developer experience, and long-term maintainability:

| Component | Technology | Version | Purpose |
|-----------|-----------|---------|---------|
| **Frontend** | Next.js | 15.1+ | React framework with App Router for optimal performance |
| | PatternFly | 6.0+ | Enterprise UI component library from Red Hat |
| | TypeScript | 5+ | Type-safe JavaScript for reduced bugs |
| **Backend** | FastAPI | 0.115+ | High-performance Python web framework |
| | SQLAlchemy | 2.0+ | Powerful ORM with advanced querying |
| | Alembic | 1.13+ | Database migration tool for schema evolution |
| | Pydantic | 2.9+ | Data validation and settings management |
| **Database** | PostgreSQL | 14+ | Robust relational database with JSONB support |
| **Auth** | OAuth Proxy | - | OpenShift OAuth integration for SSO |
| **Deployment** | OpenShift | 4.x | Container orchestration platform |
| | Ansible | 2.x | Infrastructure as code for repeatable deployments |

### Design Principles

**Simplicity First**  
Every feature is evaluated against the question: "Does this help users manage their work more effectively?" We resist feature creep and maintain a focused scope.

**Familiar Patterns**  
Built on the proven Labagator architecture, Projectgator leverages established patterns that teams already understand, reducing the learning curve for deployment and maintenance.

**Modern Best Practices**  
Utilizing the latest stable versions of Next.js 15 and React 19, we benefit from performance improvements and developer experience enhancements without chasing bleeding-edge instability.

**Type Safety Throughout**  
TypeScript on the frontend and Pydantic schemas on the backend catch errors at development time rather than in production, improving reliability.

**Audit Everything**  
Comprehensive change tracking isn't an afterthought—it's built into the core data model, ensuring you always have visibility into how your projects evolve.

**Developer Experience**  
Fast local development with hot reload, comprehensive test coverage, and clear documentation make it easy to contribute and extend the system.

## Quick Start

Getting started with Projectgator is straightforward. This guide assumes you have basic familiarity with Python and Node.js development.

### Prerequisites

Before you begin, ensure you have the following installed:

- **Python 3.11 or higher** - Backend runtime environment
- **Node.js 20 or higher** - Frontend runtime and build tools
- **PostgreSQL 14 or higher** - Database (or Docker/Podman to run it)
- **Git** - Source control

### Step 1: Clone the Repository

```bash
git clone https://github.com/rhpds/projectgator.git
cd projectgator
```

### Step 2: Start PostgreSQL

Choose the option that works best for your environment:

#### Option A: Using Podman or Docker

This is the recommended approach for local development:

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

If you prefer to use your system's PostgreSQL installation:

```bash
# Create user and database
sudo -u postgres createuser -P projectgator  # Password: projectgator
sudo -u postgres createdb -O projectgator projectgator
```

### Step 3: Backend Setup

```bash
cd src/backend

# Create and activate virtual environment
python3 -m venv .venv
source .venv/bin/activate  # On Windows: .venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Run database migrations
alembic upgrade head

# Start the backend server with auto-reload
uvicorn app.main:app --host 0.0.0.0 --port 8080 --reload
```

The backend will be available at http://localhost:8080. You can verify it's running by visiting http://localhost:8080/api/v1/health.

### Step 4: Frontend Setup

Open a new terminal window:

```bash
cd src/frontend

# Install dependencies
npm install

# Start the development server
npm run dev
```

The frontend will be available at http://localhost:3001.

### Step 5: Access the Application

Open your web browser and navigate to **http://localhost:3001**. You'll see the Projectgator home page with quick access to Projects, Tasks, and Milestones.

## Installation

### Detailed Backend Setup

The backend requires Python 3.11 or higher. We recommend using a virtual environment to isolate dependencies:

```bash
cd src/backend

# Create virtual environment
python3 -m venv .venv

# Activate virtual environment
# On Linux/macOS:
source .venv/bin/activate
# On Windows:
.venv\Scripts\activate

# Upgrade pip to latest version
pip install --upgrade pip

# Install all dependencies
pip install -r requirements.txt

# Verify installation
python -c "import fastapi, sqlalchemy, alembic; print('Backend dependencies installed successfully')"
```

The `requirements.txt` includes both runtime and development dependencies, so you'll have everything you need for local development including pytest, ruff, and other tools.

### Detailed Frontend Setup

The frontend requires Node.js 20 or higher:

```bash
cd src/frontend

# Install dependencies
npm install

# Verify installation with type checking
npm run type-check

# Build for production (optional)
npm run build

# The build output will be optimized and ready for deployment
```

## Configuration

### Environment Variables

Configuration is managed through environment variables with the `PROJECTGATOR_` prefix. Create a `.env` file in the project root by copying from the example:

```bash
cp .env.example .env
```

Edit the `.env` file with your configuration:

```bash
# Database connection
PROJECTGATOR_DATABASE_URL=postgresql://projectgator:projectgator@localhost:5432/projectgator

# Authentication (comma-separated OpenShift groups)
PROJECTGATOR_ALLOWED_GROUPS=rhdp-projectgator-admins,rhpds-admins
PROJECTGATOR_ALLOWED_USERS=

# CORS configuration for API access
PROJECTGATOR_CORS_ORIGINS=http://localhost:3001,http://localhost:3000

# Debug mode (enables verbose logging)
PROJECTGATOR_DEBUG=false
```

### Backend Configuration Details

The backend uses Pydantic Settings for configuration management, defined in `src/backend/app/core/config.py`:

- **Environment prefix**: `PROJECTGATOR_`
- **Nested settings**: Use double underscore for nesting (e.g., `PROJECTGATOR_DATABASE__POOL_SIZE`)
- **Environment file**: `.env` in project root (automatically loaded)
- **Defaults**: Configured for local development out of the box

### Frontend Configuration Details

Next.js configuration is in `src/frontend/next.config.js`:

- **API Proxy**: Development server automatically proxies `/api/*` requests to the backend at localhost:8080
- **React Strict Mode**: Enabled for catching potential issues during development
- **CSS**: Global PatternFly styles imported in `layout.tsx`
- **Image Optimization**: Next.js built-in image optimization for better performance

## Database Schema

### Entity Relationship Overview

Projectgator uses a normalized relational schema optimized for query performance and data integrity:

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

### Table Descriptions

**users**  
Stores user accounts with role-based access control. Roles include `admin` (full access), `member` (read/write), and `viewer` (read-only). Email addresses are unique and serve as the primary identifier.

**projects**  
The main container for organizing work. Projects can be in various states: `planning` (initial setup), `active` (work in progress), `on_hold` (temporarily suspended), `completed` (finished successfully), or `cancelled` (terminated). Cascade delete ensures that removing a project also removes all associated tasks and milestones.

**tasks**  
Represents individual work items within projects. Tasks support four statuses: `todo` (not started), `in_progress` (currently being worked on), `blocked` (waiting on external dependencies), and `done` (completed). Priority levels (`low`, `medium`, `high`, `critical`) help with work prioritization. Tasks can have parent-child relationships to create hierarchical work breakdowns.

**milestones**  
Marks significant project deadlines and deliverables. Statuses include `upcoming` (future milestone), `active` (current focus), `completed` (achieved), and `missed` (deadline passed without completion).

**comments**  
Enables discussion and collaboration at the task level. All comments are timestamped and attributed to users, creating an audit trail of conversations. Comments cascade delete with their parent tasks.

**tags**  
Provides flexible categorization through custom labels. Tags support PatternFly color schemes (`grey`, `blue`, `green`, `orange`, `red`, `purple`, `cyan`) for visual organization. The many-to-many relationship with tasks allows a single tag to be applied to multiple tasks and vice versa.

**audit_logs**  
Maintains a complete history of all changes to the system. Each audit entry captures the table name, record ID, action type (`create`, `update`, `delete`), the user who made the change, and JSON snapshots of the before and after states. This comprehensive logging supports compliance requirements and enables undo functionality.

## API Documentation

### Base URL

```
http://localhost:8080/api/v1
```

For production deployments, replace localhost with your deployed API domain.

### Authentication

The local development environment does not enforce authentication. In production deployments on OpenShift, authentication is handled by an OAuth proxy that validates user credentials before requests reach the API.

### Projects Endpoints

**List All Projects**
```http
GET /api/v1/projects
```

Returns an array of all projects visible to the current user.

**Get Specific Project**
```http
GET /api/v1/projects/{id}
```

Retrieves detailed information about a single project by ID.

**Create New Project**
```http
POST /api/v1/projects
Content-Type: application/json

{
  "name": "Q2 Marketing Campaign",
  "description": "Social media and content marketing initiatives for Q2",
  "status": "planning",
  "owner_id": 1,
  "start_date": "2026-04-01",
  "due_date": "2026-06-30"
}
```

Creates a new project and returns the created project with its assigned ID.

**Update Project**
```http
PATCH /api/v1/projects/{id}
Content-Type: application/json

{
  "status": "active",
  "description": "Updated description with additional details"
}
```

Partial update of project fields. Only provided fields are updated.

**Delete Project**
```http
DELETE /api/v1/projects/{id}
```

Removes a project and all associated tasks and milestones. This operation cannot be undone.

### Tasks Endpoints

**List Tasks**
```http
GET /api/v1/tasks
GET /api/v1/tasks?project_id=1
GET /api/v1/tasks?status=in_progress
GET /api/v1/tasks?assignee_id=2
```

Returns filtered or unfiltered list of tasks. Query parameters can be combined.

**Get Specific Task**
```http
GET /api/v1/tasks/{id}
```

Retrieves detailed information about a single task by ID.

**Create New Task**
```http
POST /api/v1/tasks
Content-Type: application/json

{
  "project_id": 1,
  "title": "Design landing page mockups",
  "description": "Create three design variations for the campaign landing page",
  "status": "todo",
  "priority": "high",
  "assignee_id": 2,
  "reporter_id": 1,
  "due_date": "2026-04-15",
  "estimated_hours": 8.0
}
```

Creates a new task and returns the created task with its assigned ID.

**Update Task**
```http
PATCH /api/v1/tasks/{id}
Content-Type: application/json

{
  "status": "in_progress",
  "actual_hours": 3.5
}
```

Partial update of task fields. Only provided fields are updated.

**Delete Task**
```http
DELETE /api/v1/tasks/{id}
```

Removes a task. This operation cannot be undone.

### Health Check

```http
GET /api/v1/health
```

Returns `{"status": "healthy"}` if the API is operational. Useful for monitoring and health checks.

### Response Formats

**Success Response (200 OK)**
```json
{
  "id": 1,
  "name": "Q2 Marketing Campaign",
  "description": "Social media and content marketing initiatives for Q2",
  "status": "planning",
  "owner_id": 1,
  "start_date": "2026-04-01",
  "due_date": "2026-06-30",
  "completed_date": null,
  "created_at": "2026-04-17T15:53:00Z",
  "updated_at": "2026-04-17T15:53:00Z"
}
```

**Error Response (404 Not Found)**
```json
{
  "detail": "Project not found"
}
```

**Error Response (422 Validation Error)**
```json
{
  "detail": [
    {
      "loc": ["body", "name"],
      "msg": "field required",
      "type": "value_error.missing"
    }
  ]
}
```

## Development

### Running Tests

**Backend Tests**

The backend includes a comprehensive test suite using pytest:

```bash
cd src/backend

# Run all tests
pytest

# Run with verbose output
pytest -v

# Run with coverage report
pytest --cov

# Run specific test file
pytest tests/test_api/test_projects.py

# Run tests matching a pattern
pytest -k "test_create"
```

Tests use a temporary SQLite database and don't affect your development PostgreSQL instance.

**Frontend Type Checking**

Ensure type safety across the frontend:

```bash
cd src/frontend

# Type check without emitting files
npx tsc --noEmit
```

### Code Quality

**Backend Linting and Formatting**

We use Ruff for fast, comprehensive Python linting:

```bash
cd src/backend

# Check for linting issues
ruff check .

# Automatically fix issues where possible
ruff check . --fix

# Format code
ruff format .
```

**Frontend Linting**

ESLint configuration ensures consistent code style:

```bash
cd src/frontend

# Run ESLint
npm run lint
```

### Database Migrations

Alembic manages database schema evolution:

**Create New Migration**

```bash
cd src/backend

# Autogenerate migration from model changes
alembic revision --autogenerate -m "Add priority column to tasks"

# Review the generated migration file in alembic/versions/
# Edit if necessary to ensure correctness
```

**Apply Migrations**

```bash
# Upgrade to latest version
alembic upgrade head

# Downgrade one revision
alembic downgrade -1

# View migration history
alembic history

# View current version
alembic current
```

**Migration Best Practices**

1. Always review autogenerated migrations before applying
2. Test migrations on a copy of production data when possible
3. Ensure all migrations are reversible by implementing the `downgrade()` function
4. Never edit migrations that have been applied to production
5. Use clear, descriptive migration messages

### Local Development Workflow

**Daily Development Process**

1. **Start services** - Ensure PostgreSQL, backend, and frontend are running
2. **Make changes** - Edit code with hot reload enabled for fast iteration
3. **Run tests** - Verify changes don't introduce regressions
4. **Create migration** - If you've modified database models
5. **Commit changes** - Use clear, descriptive commit messages
6. **Push** - Trigger the CI/CD pipeline

**Debugging Tips**

**Backend Debugging**

Enable debug mode for verbose logging:

```bash
export PROJECTGATOR_DEBUG=true

# Run with Python debugger
python -m pdb -m uvicorn app.main:app --reload
```

**Frontend Debugging**

- Use browser DevTools (F12) for JavaScript debugging
- Install React DevTools extension for component inspection
- Check Network tab for API request/response debugging
- Console logs automatically show in the browser console

**Database Debugging**

Connect directly to inspect data:

```bash
# Connect to PostgreSQL
psql postgresql://projectgator:projectgator@localhost:5432/projectgator

# Useful commands:
\dt                       # List all tables
\d users                  # Describe users table
\d+ tasks                 # Detailed table description

# Example queries:
SELECT * FROM tasks WHERE status = 'in_progress';
SELECT COUNT(*) FROM projects WHERE status = 'active';
```

## Deployment

### OpenShift Deployment

Projectgator uses Ansible for automated, repeatable deployments to OpenShift clusters. The deployment process handles everything from namespace creation to webhook configuration.

**Prerequisites**

- OpenShift cluster access with appropriate permissions
- `oc` CLI tool installed and configured
- Ansible installed on your deployment machine
- Cluster admin or sufficient RBAC permissions

**Deployment Process**

1. **Create Environment Variables File**

```bash
cp ansible/vars/dev.yml.example ansible/vars/dev.yml
vim ansible/vars/dev.yml
```

Edit the file with your cluster-specific configuration, including database credentials, OAuth settings, and domain names.

2. **Run Deployment Playbook**

```bash
# Deploy to development environment
ansible-playbook ansible/deploy.yml -e env=dev

# Deploy to production environment
ansible-playbook ansible/deploy.yml -e env=prod
```

The playbook handles:
- Namespace and RBAC setup
- Secret creation
- Build configuration
- Deployment manifests
- Route configuration
- Database migrations
- Webhook configuration

**Environment URLs**

Once deployed, your application will be available at:

- **Development**: `https://projectgator-dev.apps.<cluster-hostname>`
- **Production**: `https://projectgator.apps.<cluster-hostname>`

### Continuous Integration and Deployment

**Automated Builds**

GitHub webhooks trigger OpenShift builds automatically:

1. Developer pushes to `main` branch
2. GitHub webhook notifies OpenShift BuildConfig
3. Build pod created and container image built
4. ImageStream updated with new image
5. Deployment automatically rolls out new version

This pipeline requires no manual intervention for standard code changes.

**Environment Promotion**

To promote code from development to production:

```bash
git checkout production
git merge main
git push origin production
```

The same automated build process applies to the production environment.

### Configuration Management

**Environment-Specific Settings**

Environment variables are managed through:

- **ConfigMap** (`projectgator-backend-config`) for non-sensitive configuration
- **Secrets** for database credentials and OAuth tokens

Update configuration:

```bash
# Edit the ConfigMap
oc edit configmap projectgator-backend-config -n projectgator-dev

# Restart pods to pick up changes
oc rollout restart deployment/projectgator-backend -n projectgator-dev
```

### Backup and Recovery

Production environments should implement regular database backups:

```bash
# Create manual backup
oc exec deployment/projectgator-postgres -n projectgator-prod -- \
  pg_dump -U projectgator projectgator > backup-$(date +%Y%m%d).sql

# Restore from backup
cat backup-20260417.sql | oc exec -i deployment/projectgator-postgres -n projectgator-prod -- \
  psql -U projectgator projectgator
```

## Contributing

We welcome contributions from the community. Whether you're fixing bugs, adding features, or improving documentation, your help makes Projectgator better for everyone.

### Branching Strategy

- `main` - Primary development branch, deploys to dev environment
- `production` - Stable release branch, deploys to production
- `feature/*` - Feature development branches
- `fix/*` - Bug fix branches

### Contribution Process

1. **Fork the repository** and create a feature branch from `main`
2. **Make your changes** with appropriate tests
3. **Run the test suite** and ensure all tests pass
4. **Run linters** and fix any code quality issues
5. **Commit your changes** with clear, descriptive messages
6. **Push to your fork** and create a Pull Request
7. **Wait for CI checks** to pass
8. **Request review** from maintainers
9. **Address feedback** if requested
10. **Merge** after approval

### Commit Message Guidelines

Use clear, descriptive commit messages that explain the "why" behind changes:

```
feat(tasks): add priority filtering to task list

Add a dropdown filter for task priority levels. This helps users
quickly find high-priority items that need immediate attention.

Updates the API to support priority query parameter and adds
corresponding tests for the new functionality.

Closes #42
```

**Commit Types**:
- `feat` - New features
- `fix` - Bug fixes
- `docs` - Documentation changes
- `style` - Code style changes (formatting, etc.)
- `refactor` - Code refactoring
- `test` - Test additions or modifications
- `chore` - Build process or auxiliary tool changes

### Code Review Standards

When reviewing code, consider:

- **Functionality** - Does it work as intended?
- **Tests** - Are there appropriate tests?
- **Documentation** - Are changes documented?
- **Code Quality** - Is it readable and maintainable?
- **Security** - Are there any security concerns?
- **Performance** - Could this impact performance?

## Support

### Getting Help

If you encounter issues or have questions:

**GitHub Issues**  
Report bugs, request features, or ask questions at https://github.com/rhpds/projectgator/issues

**Internal Communication**  
For Red Hat employees:
- Slack: #rhdp-projectgator
- Email: rhdp-team@redhat.com

When reporting issues, please include:
- Steps to reproduce the problem
- Expected behavior
- Actual behavior
- Environment details (OS, browser, etc.)
- Relevant error messages or logs

### Acknowledgments

**Built On Strong Foundations**

Projectgator is made possible by excellent open source software:

- **Labagator** - The architectural foundation and inspiration
- **PatternFly** - Red Hat's comprehensive design system
- **FastAPI** - Modern, high-performance Python web framework
- **Next.js** - The React framework for production
- **PostgreSQL** - Powerful, reliable database system

**The Team**

Developed and maintained by the Red Hat Demo Platform team with contributions from the community.

## License

**Internal Red Hat Tool**

This project is proprietary software developed for internal use within Red Hat. All rights reserved. Not for external distribution.

---

**Projectgator - Simple project management, done right**

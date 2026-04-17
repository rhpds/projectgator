# Projectgator - Simple Project Management Tool

## Overview
A simplified project management tool based on labagator, focused on core project tracking without cloud deployment complexity.

## Core Features
- **Projects** - Create and manage projects with descriptions, deadlines, and status
- **Tasks** - Track work items with priorities, assignees, and status
- **Milestones** - Set key deadlines and track progress
- **Team Management** - Add team members and assign work
- **Comments** - Discuss tasks and projects
- **Tags** - Organize with custom labels
- **Audit Trail** - Track all changes

## Simplified Data Model

### Projects
- id, name, description, status (planning, active, on_hold, completed, cancelled)
- owner_id (user), start_date, due_date, completed_date
- created_at, updated_at

### Tasks
- id, project_id, title, description, status (todo, in_progress, blocked, done)
- priority (low, medium, high, critical)
- assignee_id (user), reporter_id (user)
- due_date, estimated_hours, actual_hours
- parent_task_id (for subtasks)
- created_at, updated_at

### Milestones
- id, project_id, name, description, due_date
- status (upcoming, active, completed, missed)
- created_at, updated_at

### Users
- id, email, name, role (admin, member, viewer)
- created_at, updated_at

### Comments
- id, task_id, user_id, content
- created_at, updated_at

### Tags
- id, name, color
- Many-to-many with Tasks

### AuditLog
- id, table_name, record_id, action, user_id
- before_state (JSON), after_state (JSON)
- created_at

## Architecture (Same as Labagator)
- **Backend**: FastAPI + SQLAlchemy + Alembic + PostgreSQL
- **Frontend**: Next.js 15 + PatternFly 6
- **Auth**: OpenShift OAuth proxy
- **Deployment**: OpenShift + Ansible

## Removed Complexity
- No cloud provider integration
- No capacity planning
- No cost estimation
- No Babylon clusters
- No Google Sheets sync (maybe add later as optional)
- No complex deployment workflows
- Simpler status workflows

/**
 * Frontend type definitions
 */

export interface Project {
  id: number;
  name: string;
  description: string | null;
  status: 'planning' | 'active' | 'on_hold' | 'completed' | 'cancelled';
  owner_id: number;
  start_date: string | null;
  due_date: string | null;
  completed_date: string | null;
  created_at: string;
  updated_at: string;
}

export interface Task {
  id: number;
  project_id: number;
  title: string;
  description: string | null;
  status: 'todo' | 'in_progress' | 'blocked' | 'done';
  priority: 'low' | 'medium' | 'high' | 'critical';
  assignee_id: number | null;
  reporter_id: number;
  due_date: string | null;
  estimated_hours: number | null;
  actual_hours: number | null;
  parent_task_id: number | null;
  created_at: string;
  updated_at: string;
}

export interface User {
  id: number;
  email: string;
  name: string;
  role: 'admin' | 'member' | 'viewer';
  created_at: string;
  updated_at: string;
}

export interface Milestone {
  id: number;
  project_id: number;
  name: string;
  description: string | null;
  due_date: string;
  status: 'upcoming' | 'active' | 'completed' | 'missed';
  created_at: string;
  updated_at: string;
}

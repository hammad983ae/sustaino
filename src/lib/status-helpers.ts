import type { JobStatus, JobPriority } from '@/types';

// Status color mappings
export const getStatusColor = (status: JobStatus): string => {
  switch (status) {
    case 'completed': return 'bg-success/20 text-success border-success/30';
    case 'in-progress': return 'bg-primary/20 text-primary border-primary/30';
    case 'pending': return 'bg-warning/20 text-warning border-warning/30';
    case 'overdue': return 'bg-destructive/20 text-destructive border-destructive/30';
    case 'cancelled': return 'bg-muted text-muted-foreground border-muted/30';
    case 'on-hold': return 'bg-warning/20 text-warning border-warning/30';
    default: return 'bg-muted text-muted-foreground';
  }
};

// Priority color mappings
export const getPriorityColor = (priority: JobPriority): string => {
  switch (priority) {
    case 'high': return 'bg-destructive/20 text-destructive border-destructive/30';
    case 'medium': return 'bg-warning/20 text-warning border-warning/30';
    case 'low': return 'bg-success/20 text-success border-success/30';
    default: return 'bg-muted text-muted-foreground';
  }
};

// Status display names
export const getStatusDisplayName = (status: JobStatus): string => {
  switch (status) {
    case 'in-progress': return 'In Progress';
    case 'on-hold': return 'On Hold';
    case 'overdue': return 'Overdue';
    default: return status.charAt(0).toUpperCase() + status.slice(1);
  }
};

// Priority display names
export const getPriorityDisplayName = (priority: JobPriority): string => {
  return priority.charAt(0).toUpperCase() + priority.slice(1);
};

// Check if job is overdue
export const isJobOverdue = (dueDate: string, status: JobStatus): boolean => {
  if (status === 'completed') return false;
  const today = new Date();
  const due = new Date(dueDate);
  return due < today;
};

// Get progress color based on percentage
export const getProgressColor = (progress: number): string => {
  if (progress >= 80) return 'bg-success';
  if (progress >= 50) return 'bg-primary';
  if (progress >= 25) return 'bg-warning';
  return 'bg-destructive';
};
import { useState, useEffect, useCallback } from 'react';
import { toast } from '@/hooks/use-toast';

export interface Task {
  id: string;
  title: string;
  description?: string;
  completed: boolean;
  priority: 'low' | 'medium' | 'high';
  dueDate?: string;
  category?: string;
  createdAt: string;
  updatedAt: string;
}

const STORAGE_KEY = 'task_manager_data';

// Single source of truth for task state management
export const useTaskManager = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);

  // Load tasks from localStorage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsedTasks = JSON.parse(saved);
        setTasks(parsedTasks);
      }
    } catch (error) {
      console.error('Failed to load tasks from localStorage:', error);
      toast({
        title: "Storage Error",
        description: "Failed to load saved tasks",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  }, []);

  // Persist to localStorage whenever tasks change
  const persistTasks = useCallback((newTasks: Task[]) => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newTasks));
    } catch (error) {
      console.error('Failed to save tasks to localStorage:', error);
      toast({
        title: "Storage Error",
        description: "Failed to save task changes",
        variant: "destructive"
      });
    }
  }, []);

  // Add new task
  const addTask = useCallback((taskData: Omit<Task, 'id' | 'createdAt' | 'updatedAt'>) => {
    const newTask: Task = {
      ...taskData,
      id: `task_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    setTasks(prev => {
      const updated = [...prev, newTask];
      persistTasks(updated);
      return updated;
    });

    toast({
      title: "Task Added",
      description: `"${newTask.title}" has been added to your task list`
    });

    return newTask.id;
  }, [persistTasks]);

  // Update existing task
  const updateTask = useCallback((id: string, updates: Partial<Omit<Task, 'id' | 'createdAt'>>) => {
    setTasks(prev => {
      const updated = prev.map(task => 
        task.id === id 
          ? { ...task, ...updates, updatedAt: new Date().toISOString() }
          : task
      );
      persistTasks(updated);
      return updated;
    });
  }, [persistTasks]);

  // Toggle task completion - single source of truth
  const toggleTaskCompletion = useCallback((id: string) => {
    setTasks(prev => {
      const updated = prev.map(task => {
        if (task.id === id) {
          const newCompleted = !task.completed;
          
          // Show feedback
          toast({
            title: newCompleted ? "Task Completed" : "Task Reopened",
            description: `"${task.title}" has been ${newCompleted ? 'completed' : 'reopened'}`
          });

          return {
            ...task,
            completed: newCompleted,
            updatedAt: new Date().toISOString()
          };
        }
        return task;
      });
      
      // Single write to localStorage
      persistTasks(updated);
      return updated;
    });
  }, [persistTasks]);

  // Delete task
  const deleteTask = useCallback((id: string) => {
    setTasks(prev => {
      const taskToDelete = prev.find(t => t.id === id);
      const updated = prev.filter(task => task.id !== id);
      persistTasks(updated);
      
      if (taskToDelete) {
        toast({
          title: "Task Deleted",
          description: `"${taskToDelete.title}" has been removed`
        });
      }
      
      return updated;
    });
  }, [persistTasks]);

  // Get tasks by category
  const getTasksByCategory = useCallback((category?: string) => {
    return category ? tasks.filter(task => task.category === category) : tasks;
  }, [tasks]);

  // Get completed tasks
  const getCompletedTasks = useCallback(() => {
    return tasks.filter(task => task.completed);
  }, [tasks]);

  // Get pending tasks
  const getPendingTasks = useCallback(() => {
    return tasks.filter(task => !task.completed);
  }, [tasks]);

  // Clear all completed tasks
  const clearCompletedTasks = useCallback(() => {
    setTasks(prev => {
      const updated = prev.filter(task => !task.completed);
      persistTasks(updated);
      
      toast({
        title: "Completed Tasks Cleared",
        description: "All completed tasks have been removed"
      });
      
      return updated;
    });
  }, [persistTasks]);

  // Get task statistics
  const getStats = useCallback(() => {
    const total = tasks.length;
    const completed = tasks.filter(t => t.completed).length;
    const pending = total - completed;
    const completionRate = total > 0 ? Math.round((completed / total) * 100) : 0;

    return { total, completed, pending, completionRate };
  }, [tasks]);

  return {
    tasks,
    loading,
    addTask,
    updateTask,
    deleteTask,
    toggleTaskCompletion,
    getTasksByCategory,
    getCompletedTasks,
    getPendingTasks,
    clearCompletedTasks,
    getStats
  };
};
export interface Todo {
  id: string;
  title: string;
  completed: boolean;
  priority: 'low' | 'medium' | 'high';
  dueDate: string;
  category: string;
}

export interface FocusSession {
  todoId: string;
  startTime: number;
  duration: number; // in minutes
}

export interface Settings {
  defaultFocusDuration: number;
  defaultPriority: 'low' | 'medium' | 'high';
  categories: string[];
}
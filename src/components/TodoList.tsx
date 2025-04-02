import React from 'react';
import { Circle, CheckCircle2, Clock, AlertCircle } from 'lucide-react';
import { Todo } from '../types';

interface TodoListProps {
  todos: Todo[];
  filter: string;
  onToggle: (id: string) => void;
  onStartFocus: (id: string) => void;
}

const priorityColors = {
  low: 'text-blue-500',
  medium: 'text-yellow-500',
  high: 'text-red-500',
};

export default function TodoList({ todos, filter, onToggle, onStartFocus }: TodoListProps) {
  const filteredTodos = todos.filter(todo => 
    filter === 'all' || 
    (filter === 'completed' && todo.completed) || 
    (filter === 'active' && !todo.completed)
  );

  return (
    <div className="space-y-2">
      {filteredTodos.map(todo => (
        <div
          key={todo.id}
          className="flex items-center justify-between p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow"
        >
          <div className="flex items-center space-x-3">
            <button
              onClick={() => onToggle(todo.id)}
              className="focus:outline-none"
            >
              {todo.completed ? (
                <CheckCircle2 className="w-6 h-6 text-green-500" />
              ) : (
                <Circle className="w-6 h-6 text-gray-400" />
              )}
            </button>
            <div className={`${todo.completed ? 'line-through text-gray-500' : ''}`}>
              <p className="font-medium">{todo.title}</p>
              <div className="flex items-center space-x-2 text-sm text-gray-500">
                <span className={priorityColors[todo.priority]}>
                  <AlertCircle className="w-4 h-4 inline mr-1" />
                  {todo.priority}
                </span>
                <span>
                  <Clock className="w-4 h-4 inline mr-1" />
                  {new Date(todo.dueDate).toLocaleDateString()}
                </span>
                <span className="bg-gray-100 px-2 py-0.5 rounded">
                  {todo.category}
                </span>
              </div>
            </div>
          </div>
          <button
            onClick={() => onStartFocus(todo.id)}
            className="px-3 py-1 text-sm bg-indigo-500 text-white rounded hover:bg-indigo-600 transition-colors"
          >
            Focus
          </button>
        </div>
      ))}
    </div>
  );
}
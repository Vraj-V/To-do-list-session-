import React, { useState } from 'react';
import { Plus, Settings as SettingsIcon } from 'lucide-react';
import TodoList from './components/TodoList';
import FocusSession from './components/FocusSession';
import SettingsComponent from './components/Settings';
import { Todo, FocusSession as FocusSessionType, Settings as SettingsType } from './types';

function App() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filter, setFilter] = useState('all');
  const [activeFocus, setActiveFocus] = useState<FocusSessionType | null>(null);
  const [showSettings, setShowSettings] = useState(false);
  const [settings, setSettings] = useState<SettingsType>({
    defaultFocusDuration: 25,
    defaultPriority: 'medium',
    categories: ['Work', 'Personal', 'Shopping', 'Health'],
  });
  const [newTodo, setNewTodo] = useState({
    title: '',
    priority: settings.defaultPriority,
    dueDate: new Date().toISOString().split('T')[0],
    category: settings.categories[0],
  });

  const addTodo = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTodo.title.trim()) return;

    setTodos(prev => [...prev, {
      id: Date.now().toString(),
      title: newTodo.title,
      completed: false,
      priority: newTodo.priority as 'low' | 'medium' | 'high',
      dueDate: newTodo.dueDate,
      category: newTodo.category,
    }]);

    setNewTodo({
      title: '',
      priority: settings.defaultPriority,
      dueDate: new Date().toISOString().split('T')[0],
      category: settings.categories[0],
    });
  };

  const toggleTodo = (id: string) => {
    setTodos(prev => prev.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  const startFocus = (todoId: string) => {
    setActiveFocus({
      todoId,
      startTime: Date.now(),
      duration: settings.defaultFocusDuration,
    });
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-4xl mx-auto p-6">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Todo List</h1>
          <button
            onClick={() => setShowSettings(true)}
            className="p-2 text-gray-500 hover:text-gray-700"
          >
            <SettingsIcon className="w-6 h-6" />
          </button>
        </div>

        <form onSubmit={addTodo} className="mb-8 bg-white p-6 rounded-lg shadow-sm">
          <div className="flex gap-4">
            <input
              type="text"
              value={newTodo.title}
              onChange={e => setNewTodo(prev => ({ ...prev, title: e.target.value }))}
              placeholder="Add a new task..."
              className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            />
            <select
              value={newTodo.priority}
              onChange={e => setNewTodo(prev => ({ ...prev, priority: e.target.value as 'low' | 'medium' | 'high' }))}
              className="rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
            <input
              type="date"
              value={newTodo.dueDate}
              onChange={e => setNewTodo(prev => ({ ...prev, dueDate: e.target.value }))}
              className="rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            />
            <select
              value={newTodo.category}
              onChange={e => setNewTodo(prev => ({ ...prev, category: e.target.value }))}
              className="rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            >
              {settings.categories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
            <button
              type="submit"
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
            >
              <Plus className="w-5 h-5 mr-1" />
              Add
            </button>
          </div>
        </form>

        <div className="mb-6 flex space-x-4">
          <button
            onClick={() => setFilter('all')}
            className={`px-4 py-2 rounded-md ${filter === 'all' ? 'bg-indigo-600 text-white' : 'bg-white text-gray-700'}`}
          >
            All
          </button>
          <button
            onClick={() => setFilter('active')}
            className={`px-4 py-2 rounded-md ${filter === 'active' ? 'bg-indigo-600 text-white' : 'bg-white text-gray-700'}`}
          >
            Active
          </button>
          <button
            onClick={() => setFilter('completed')}
            className={`px-4 py-2 rounded-md ${filter === 'completed' ? 'bg-indigo-600 text-white' : 'bg-white text-gray-700'}`}
          >
            Completed
          </button>
        </div>

        <TodoList
          todos={todos}
          filter={filter}
          onToggle={toggleTodo}
          onStartFocus={startFocus}
        />

        {activeFocus && (
          <FocusSession
            duration={activeFocus.duration}
            onComplete={() => setActiveFocus(null)}
            onCancel={() => setActiveFocus(null)}
          />
        )}

        {showSettings && (
          <SettingsComponent
            settings={settings}
            onUpdate={newSettings => {
              setSettings(newSettings);
              setShowSettings(false);
            }}
            onClose={() => setShowSettings(false)}
          />
        )}
      </div>
    </div>
  );
}

export default App;
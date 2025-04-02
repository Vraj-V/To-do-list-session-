import React from 'react';
import { Settings as SettingsIcon } from 'lucide-react';
import { Settings } from '../types';

interface SettingsProps {
  settings: Settings;
  onUpdate: (settings: Settings) => void;
  onClose: () => void;
}

export default function SettingsComponent({ settings, onUpdate, onClose }: SettingsProps) {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    
    onUpdate({
      defaultFocusDuration: Number(formData.get('defaultFocusDuration')),
      defaultPriority: formData.get('defaultPriority') as 'low' | 'medium' | 'high',
      categories: (formData.get('categories') as string).split(',').map(c => c.trim()),
    });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-md">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold flex items-center">
            <SettingsIcon className="w-6 h-6 mr-2" />
            Settings
          </h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            ×
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Default Focus Duration (minutes)
            </label>
            <input
              type="number"
              name="defaultFocusDuration"
              defaultValue={settings.defaultFocusDuration}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Default Priority
            </label>
            <select
              name="defaultPriority"
              defaultValue={settings.defaultPriority}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Categories (comma-separated)
            </label>
            <input
              type="text"
              name="categories"
              defaultValue={settings.categories.join(', ')}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            />
          </div>

          <div className="flex justify-end space-x-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
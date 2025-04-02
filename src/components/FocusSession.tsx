import React, { useState, useEffect } from 'react';
import { Timer, X } from 'lucide-react';

interface FocusSessionProps {
  duration: number;
  onComplete: () => void;
  onCancel: () => void;
}

export default function FocusSession({ duration, onComplete, onCancel }: FocusSessionProps) {
  const [timeLeft, setTimeLeft] = useState(duration * 60);
  
  useEffect(() => {
    if (timeLeft <= 0) {
      onComplete();
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft(prev => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, onComplete]);

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-xl">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Focus Session</h2>
          <button onClick={onCancel} className="text-gray-500 hover:text-gray-700">
            <X className="w-6 h-6" />
          </button>
        </div>
        <div className="text-center">
          <Timer className="w-16 h-16 mx-auto mb-4 text-indigo-500" />
          <div className="text-4xl font-mono">
            {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
          </div>
          <p className="mt-4 text-gray-600">Stay focused on your task!</p>
        </div>
      </div>
    </div>
  );
}
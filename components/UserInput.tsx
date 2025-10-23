
import type React from 'react';
import { useState } from 'react';

interface UserInputProps {
  onSubmit: (text: string) => void;
  isLoading: boolean;
  placeholder: string;
  enabled: boolean;
}

const UserInput: React.FC<UserInputProps> = ({ onSubmit, isLoading, placeholder, enabled }) => {
  const [inputValue, setInputValue] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputValue.trim() && !isLoading && enabled) {
      onSubmit(inputValue.trim());
      setInputValue('');
    }
  };
  
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
        handleSubmit(e);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="p-4 bg-white/80 backdrop-blur-sm border-t border-gray-200">
      <div className="flex items-center space-x-2">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder={enabled ? placeholder : "Por favor, selecciona una opción arriba"}
          disabled={isLoading || !enabled}
          onKeyDown={handleKeyDown}
          className="flex-grow p-3 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-teal-400 transition-shadow disabled:bg-gray-200 disabled:cursor-not-allowed"
        />
        <button
          type="submit"
          disabled={isLoading || !inputValue.trim() || !enabled}
          className="w-12 h-12 bg-sky-500 text-white rounded-full flex items-center justify-center hover:bg-sky-600 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
        >
          {isLoading ? (
            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
          ) : (
             <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor"><path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"></path></svg>
          )}
        </button>
      </div>
    </form>
  );
};

export default UserInput;

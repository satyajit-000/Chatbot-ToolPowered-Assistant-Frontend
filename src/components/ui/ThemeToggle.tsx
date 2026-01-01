// import { useUIStore } from '../stores/uiStore';
import { Sun, Moon } from 'lucide-react';
import { useUIStore } from '../../store/ui.store';

export default function ThemeToggle() {
  const { theme, toggleTheme } = useUIStore();

  return (
    <button
      onClick={toggleTheme}
      className="relative w-14 h-8 flex items-center rounded-full p-1 transition-colors duration-300
                 bg-gray-300 dark:bg-gray-700"
    >
      {/* Circle */}
      <div
        className={`absolute top-1 left-1 w-6 h-6 bg-white rounded-full shadow-md transform 
                    transition-transform duration-300 ${theme === 'dark' ? 'translate-x-6' : ''}`}
      />
      
      {/* Icons */}
      <Sun className="absolute left-1.5 w-4 h-4 text-yellow-400" />
      <Moon className="absolute right-1.5 w-4 h-4 text-gray-900 dark:text-gray-200" />
    </button>
  );
}

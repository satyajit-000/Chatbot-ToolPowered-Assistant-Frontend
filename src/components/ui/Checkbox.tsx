import React from 'react';
import { Check } from 'lucide-react';

interface CheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

/**
 * Reusable Checkbox component with Tailwind styling
 */
const Checkbox: React.FC<CheckboxProps> = ({ label, className, ...props }) => {
  return (
    <label className={`flex items-center gap-2 cursor-pointer ${className || ''}`}>
      <div className="relative">
        <input
          type="checkbox"
          className="sr-only"
          {...props}
        />
        <div
          className={`w-5 h-5 rounded-md border border-gray-300 dark:border-gray-600 
                      flex items-center justify-center transition-colors duration-200
                      bg-white dark:bg-gray-800`}
        >
          {props.checked && <Check className="w-4 h-4 text-blue-600 dark:text-blue-400" />}
        </div>
      </div>
      <span className="text-sm text-slate-700 dark:text-slate-300">{label}</span>
    </label>
  );
};

export default Checkbox;

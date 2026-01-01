import React, { useState } from 'react';
import { cn } from '../../lib/utils';
import { Eye, EyeOff } from 'lucide-react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    error?: string;
    helperText?: string;
    togglePasswordPreview?: boolean
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
    ({ label, error, helperText, className = '', togglePasswordPreview = true, ...props }, ref) => {
        const [showPassword, setShowPassword] = useState(false);
        return (
            <div className="w-full">
                {label && (
                    <label className="block text-sm font-medium text-slate-900 dark:text-slate-100 mb-2">
                        {label}
                    </label>
                )}
                <div className="relative w-full">

                    <input
                        ref={ref}
                        className={cn(
                            'input w-full transition-colors',

                            // 🔴 Error state
                            error && 'border-red-500 focus:ring-red-500/20',

                            // 🚫 Disabled state
                            props.disabled && [
                                'bg-slate-100 text-slate-400 cursor-not-allowed',
                                'border-slate-200',
                                'dark:bg-slate-800 dark:text-slate-300 dark:border-slate-700',
                            ],

                            className
                        )}
                        {...props}
                        type={props.type == 'password' && showPassword ? 'text' : props.type}
                    />
                    {props.type == 'password' && togglePasswordPreview && (
                        <button type='button' className='absolute cursor-pointer right-3 top-1/2 -translate-y-1/2' onClick={() => setShowPassword(prev => !prev)}>
                            {showPassword ?
                                <EyeOff className='size-5' /> :
                                <Eye className='size-5' />
                            }
                        </button>

                    )}
                </div>


                {error && (
                    <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                        {error}
                    </p>
                )}

                {helperText && !error && (
                    <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                        {helperText}
                    </p>
                )}
            </div>
        );
    }
);


Input.displayName = 'Input';

export default Input;
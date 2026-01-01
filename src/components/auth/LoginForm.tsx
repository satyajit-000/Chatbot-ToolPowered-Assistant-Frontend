import React, { useState } from 'react';
import Button from '../ui/Button';
import Input from '../ui/Input';
import { useAuth } from '../../hooks/useAuth';
import { AlertCircle } from 'lucide-react';

interface LoginFormProps {
    onSwitchToSignup: () => void;
    onSwitchToForgotPassword: () => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ onSwitchToSignup, onSwitchToForgotPassword }) => {
    const { login, isLoading, error, clearError } = useAuth();

    const [formData, setFormData] = useState({
        username: '',
        password: '',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
        clearError(); // Clear error on input change
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        await login(formData);
    };

    return (
        <div className="card p-8">
            <div className="mb-8">
                <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">
                    Sign In
                </h2>
                <p className="text-slate-600 dark:text-slate-400">
                    Welcome back. Please enter your credentials.
                </p>
            </div>

            {error && (
                <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg flex items-start gap-3">
                    <AlertCircle className="w-5 h-5 text-red-600 dark:text-red-400 flex-shrink-0 mt-0.5" />
                    <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
                </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
                <Input
                    label="Username"
                    type="text"
                    name="username"
                    placeholder="Enter your username"
                    value={formData.username}
                    onChange={handleChange}
                    required
                    autoComplete="username"
                />

                <Input
                    label="Password"
                    type="password"
                    name="password"
                    placeholder="Enter your password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                    autoComplete="current-password"
                />

                <Button
                    type="submit"
                    variant="primary"
                    size="lg"
                    fullWidth
                    isLoading={isLoading}
                    loadingText='Signing in'
                >
                    Sign In
                </Button>
            </form>

            <div className="mt-6 pt-6 border-t border-slate-200 dark:border-slate-700 space-y-3">
                <button
                    onClick={onSwitchToForgotPassword}
                    className="text-sm text-blue-600 dark:text-blue-400 hover:underline block"
                >
                    Forgot your password?
                </button>
                <Button
                    onClick={onSwitchToSignup}
                    variant="secondary"
                    size="md"
                    fullWidth
                >
                    Create New Account
                </Button>
            </div>
        </div>
    );
};

export default LoginForm;
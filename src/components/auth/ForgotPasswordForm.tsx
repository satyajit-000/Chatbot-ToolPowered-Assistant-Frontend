import React, { useState } from 'react';
import Button from '../ui/Button';
import Input from '../ui/Input';
import { useAuth } from '../../hooks/useAuth';
import { AlertCircle, CheckCircle2, ArrowLeft } from 'lucide-react';

interface ForgotPasswordFormProps {
    onSwitchToLogin: () => void;
}

const ForgotPasswordForm: React.FC<ForgotPasswordFormProps> = ({ onSwitchToLogin }) => {
    const { forgotPassword, isLoading, error, clearError } = useAuth();
    const [email, setEmail] = useState('');
    const [success, setSuccess] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const result = await forgotPassword(email);

        if (result.success) {
            setSuccess(true);
        }
    };

    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value);
        clearError();
    };

    if (success) {
        return (
            <div className="card p-8">
                <div className="text-center">
                    <div className="w-16 h-16 bg-green-100 dark:bg-green-900/20 rounded-full flex items-center justify-center mx-auto mb-4">
                        <CheckCircle2 className="w-8 h-8 text-green-600 dark:text-green-400" />
                    </div>
                    <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
                        Check Your Email
                    </h2>
                    <p className="text-slate-600 dark:text-slate-400 mb-6">
                        We've sent a password reset link to <strong>{email}</strong>
                    </p>
                    <Button onClick={onSwitchToLogin} variant="primary" size="md" fullWidth>
                        <ArrowLeft className="w-4 h-4" />
                        Back to Sign In
                    </Button>
                </div>
            </div>
        );
    }

    return (
        <div className="card p-8">
            <div className="mb-8">
                <button
                    onClick={onSwitchToLogin}
                    className="text-blue-600 dark:text-blue-400 hover:underline mb-4 flex items-center gap-2 text-sm"
                >
                    <ArrowLeft className="w-4 h-4" />
                    Back to Sign In
                </button>
                <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">
                    Reset Password
                </h2>
                <p className="text-slate-600 dark:text-slate-400">
                    Enter your email to receive reset instructions
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
                    label="Email Address"
                    type="email"
                    name="email"
                    placeholder="name@company.com"
                    value={email}
                    onChange={handleEmailChange}
                    required
                    autoComplete="email"
                />

                <Button
                    type="submit"
                    variant="primary"
                    size="lg"
                    fullWidth
                    isLoading={isLoading}
                >
                    Send Reset Link
                </Button>
            </form>
        </div>
    );
};

export default ForgotPasswordForm;
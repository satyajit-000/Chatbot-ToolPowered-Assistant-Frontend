import React, { useState } from 'react';
import Button from '../ui/Button';
import Input from '../ui/Input';
// import authService from '../../services/authService';
import { AlertCircle, CheckCircle2 } from 'lucide-react';
import Checkbox from '../ui/Checkbox';
import { useAuth } from '../../hooks/useAuth';

interface SignupFormProps {
    onSwitchToLogin: () => void;
}

const SignupForm: React.FC<SignupFormProps> = ({ onSwitchToLogin }) => {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        firstName: '',
        lastName: '',
        password: '',
        confirmPassword: '',
    });
    // const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);
    // const [isSubmitting, setIsSubmitting] = useState(false);
    const [isUsernameAsEmail, setIsUsernameAsEmail] = useState(false);
    const { signup, error, isLoading } = useAuth();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {

        setFormData((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
            ...(isUsernameAsEmail && e.target.name === 'email' ? { username: e.target.value } : {}),
        }));


        // setError('');
    };

    const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const checked = e.target.checked;

        setIsUsernameAsEmail(checked);

        setFormData((prev) => ({
            ...prev,
            username: checked ? prev.email : '',
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const result = await signup(formData);

        if (result.success) {
            setSuccess(true);
            // Redirect to login after 2 seconds
            setTimeout(() => {
                onSwitchToLogin();
            }, 2000);
        }
    };

    if (success) {
        return (
            <div className="card p-8">
                <div className="text-center">
                    <div className="w-16 h-16 bg-green-100 dark:bg-green-900/20 rounded-full flex items-center justify-center mx-auto mb-4">
                        <CheckCircle2 className="w-8 h-8 text-green-600 dark:text-green-400" />
                    </div>
                    <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
                        Account Created!
                    </h2>
                    <p className="text-slate-600 dark:text-slate-400 mb-6">
                        Your account has been successfully created. Redirecting to login...
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div className="card p-8">
            <div className="mb-8">
                <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">
                    Create Account
                </h2>
                <p className="text-slate-600 dark:text-slate-400">
                    Get started with LangGraph Chatbot
                </p>
            </div>

            {error && (
                <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg flex items-start gap-3">
                    <AlertCircle className="w-5 h-5 text-red-600 dark:text-red-400 flex-shrink-0 mt-0.5" />
                    <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
                </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
                <Input
                    label="Username"
                    type="text"
                    name="username"
                    placeholder="Choose a username"
                    value={formData.username}
                    onChange={handleChange}
                    disabled={isUsernameAsEmail}
                    required
                    autoComplete="username"
                />

                <Input
                    label="Email Address"
                    type="email"
                    name="email"
                    placeholder="name@company.com"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    autoComplete="email"
                />

                <div className="grid grid-cols-2 gap-4">
                    <Input
                        label="First Name"
                        type="text"
                        name="firstName"
                        placeholder="John"
                        value={formData.firstName}
                        onChange={handleChange}
                        required
                        autoComplete="given-name"
                    />

                    <Input
                        label="Last Name"
                        type="text"
                        name="lastName"
                        placeholder="Doe"
                        value={formData.lastName}
                        onChange={handleChange}
                        required
                        autoComplete="family-name"
                    />
                </div>

                <Input
                    label="Password"
                    type="password"
                    name="password"
                    placeholder="Create a password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                    autoComplete="new-password"
                    helperText="Must be at least 8 characters"
                />

                <Input
                    label="Confirm Password"
                    type="password"
                    name="confirmPassword"
                    placeholder="Confirm your password"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    togglePasswordPreview={false}
                    required
                    autoComplete="new-password"
                />

                <Checkbox
                    label="Use email as username"
                    checked={isUsernameAsEmail}
                    onChange={handleCheckboxChange}
                />

                <Button
                    type="submit"
                    variant="primary"
                    size="lg"
                    fullWidth
                    isLoading={isLoading}
                    loadingText='Signing up'
                >
                    Create Account
                </Button>
            </form>

            <div className="mt-6 pt-6 border-t border-slate-200 dark:border-slate-700">
                <button
                    onClick={onSwitchToLogin}
                    className="text-sm text-blue-600 dark:text-blue-400 hover:underline block text-center w-full"
                >
                    Already have an account? Sign in
                </button>
            </div>
        </div>
    );
};

export default SignupForm;
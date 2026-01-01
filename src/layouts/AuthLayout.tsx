import React from 'react';
import { Shield, TrendingUp, Zap } from 'lucide-react';

interface AuthLayoutProps {
    children: React.ReactNode;
}

const AuthLayout: React.FC<AuthLayoutProps> = ({ children }) => {
    return (
        <div className="min-h-screen flex">
            {/* Left Side - Branding */}
            <div className="hidden lg:flex lg:flex-1 bg-white dark:bg-slate-950 text-white p-12 flex-col justify-center">
                <div className="max-w-md">
                    <h1 className="text-5xl font-bold mb-6">
                        LangGraph Chatbot
                    </h1>
                    <p className="text-lg text-slate-300 mb-12 leading-relaxed">
                        Enterprise-grade conversational AI platform for intelligent automation and customer engagement.
                    </p>

                    <div className="space-y-6">
                        <div className="flex items-start gap-4">
                            <div className="flex-shrink-0 w-12 h-12 bg-white/10 rounded-lg flex items-center justify-center">
                                <Shield className="w-6 h-6 text-blue-400" />
                            </div>
                            <div>
                                <h3 className="font-semibold text-lg mb-1">Enterprise Security</h3>
                                <p className="text-slate-400 text-sm">
                                    Bank-level encryption and compliance standards
                                </p>
                            </div>
                        </div>

                        <div className="flex items-start gap-4">
                            <div className="flex-shrink-0 w-12 h-12 bg-white/10 rounded-lg flex items-center justify-center">
                                <TrendingUp className="w-6 h-6 text-green-400" />
                            </div>
                            <div>
                                <h3 className="font-semibold text-lg mb-1">Advanced Analytics</h3>
                                <p className="text-slate-400 text-sm">
                                    Real-time insights and performance metrics
                                </p>
                            </div>
                        </div>

                        <div className="flex items-start gap-4">
                            <div className="flex-shrink-0 w-12 h-12 bg-white/10 rounded-lg flex items-center justify-center">
                                <Zap className="w-6 h-6 text-amber-400" />
                            </div>
                            <div>
                                <h3 className="font-semibold text-lg mb-1">Seamless Integration</h3>
                                <p className="text-slate-400 text-sm">
                                    Connect with your existing tools and workflows
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Right Side - Auth Forms */}
            <div className="flex-1 flex items-center justify-center p-8 bg-slate-50 dark:bg-slate-900">
                <div className="w-full max-w-md">
                    {children}
                </div>
            </div>
        </div>
    );
};

export default AuthLayout;

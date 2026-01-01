import React, { useState } from 'react';
import LoginForm from '../components/auth/LoginForm';
import SignupForm from '../components/auth/SignupForm';
import ForgotPasswordForm from '../components/auth/ForgotPasswordForm';

type AuthView = 'login' | 'signup' | 'forgot-password';

const AuthPage: React.FC = () => {
  const [currentView, setCurrentView] = useState<AuthView>('login');

  return (
    <>
      {currentView === 'login' && (
        <LoginForm
          onSwitchToSignup={() => setCurrentView('signup')}
          onSwitchToForgotPassword={() => setCurrentView('forgot-password')}
        />
      )}

      {currentView === 'signup' && (
        <SignupForm
          onSwitchToLogin={() => setCurrentView('login')}
        />
      )}

      {currentView === 'forgot-password' && (
        <ForgotPasswordForm
          onSwitchToLogin={() => setCurrentView('login')}
        />
      )}
    </>
  );
};

export default AuthPage;
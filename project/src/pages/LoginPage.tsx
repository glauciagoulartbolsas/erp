import React from 'react';
import LoginForm from '../components/LoginForm';
import { useRedirectIfAuthenticated } from '../hooks/useRedirectIfAuthenticated';

export default function LoginPage() {
  useRedirectIfAuthenticated();

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <LoginForm />
    </div>
  );
}
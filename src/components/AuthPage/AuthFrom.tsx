'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

const dummyUser = {
  email: 'ezmail@demo.com',
  password: 'ezmail123',
  name: 'EzMail Demo',
};

export default function AuthForm() {
  const [mode, setMode] = useState<'login' | 'signup'>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleAuth = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (mode === 'login') {
      if (email === dummyUser.email && password === dummyUser.password) {
        // Save session to localStorage
        localStorage.setItem('user', JSON.stringify(dummyUser));
        router.push('/dashboard');
      } else {
        alert('Invalid credentials');
      }
    } else {
      alert('Signup disabled in demo'); 
    }
  };

  return (
    <div className="w-full max-w-md p-8 border rounded-xl shadow">
      <h2 className="text-2xl font-semibold mb-4 capitalize">{mode}</h2>
      <form onSubmit={handleAuth} className="flex flex-col gap-4">
        <input
          type="email"
          placeholder="Email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border p-2 rounded"
        />
        <input
          type="password"
          placeholder="Password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border p-2 rounded"
        />
        <button type="submit" className="bg-blue-600 text-white p-2 rounded hover:bg-blue-700">
          {mode === 'login' ? 'Log In' : 'Sign Up'}
        </button>
      </form>
      <p className="mt-4 text-sm text-gray-600">
        {mode === 'login' ? 'No account?' : 'Already have an account?'}{' '}
        <button
          onClick={() => setMode(mode === 'login' ? 'signup' : 'login')}
          className="text-blue-600 underline cursor-pointer"
        >
          {mode === 'login' ? 'Sign up' : 'Log in'}
        </button>
      </p>
    </div>
  );
}

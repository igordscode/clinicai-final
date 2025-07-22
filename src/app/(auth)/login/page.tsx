'use client';

import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    const result = await signIn('credentials', {
      redirect: false,
      email,
      password,
    });

    if (result?.ok) {
      router.push('/Dashboard');
    } else {
      setError('Email ou senha inválidos.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-purple-100">
      <form
        onSubmit={handleSubmit}
        className="w-full flex flex-col gap-4"
      >
        <h2 className="text-xl font-bold text-center text-slate-800 dark:text-slate-100 mb-2">Acesse sua conta</h2>
        {error && <p className="text-red-500 text-center">{error}</p>}

       

        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          required
          className="border border-slate-300 dark:border-slate-700 rounded px-3 py-2 focus:ring-2 focus:ring-blue-400 outline-none transition"
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Senha"
          required
          className="border border-slate-300 dark:border-slate-700 rounded px-3 py-2 focus:ring-2 focus:ring-blue-400 outline-none transition"
        />
        <button
          type="submit"
          className="bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded px-4 py-2 font-semibold hover:scale-105 hover:shadow-lg transition"
        >
          Entrar
        </button>
      </form>
      
    </div>
  );
}

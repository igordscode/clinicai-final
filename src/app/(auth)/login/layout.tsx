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
      router.push('/');
    } else {
      setError('Email ou senha inválidos.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-purple-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900/30">
      <div className="w-full max-w-md bg-white/90 dark:bg-slate-900/80 rounded-2xl shadow-2xl p-8 flex flex-col items-center gap-6">
        {/* Logo e nome do sistema */}
        <div className="flex flex-col items-center gap-2 mb-2">
          <div className="w-14 h-14 rounded-full bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center shadow-lg">
            {/* Substitua pelo seu logo SVG */}
            <span className="text-white text-3xl font-bold">C</span>
          </div>
          <h1 className="text-2xl font-extrabold bg-gradient-to-r from-blue-700 to-purple-600 bg-clip-text text-transparent">
            ClinicAI
          </h1>
          <span className="text-xs text-slate-500 dark:text-slate-300">Healthcare Analytics</span>
        </div>
         {/* Botão Google */}
         <button
          type="button"
          onClick={() => signIn('google')}
          className="flex items-center justify-center gap-2 bg-white border border-slate-300 rounded px-4 py-2 shadow hover:bg-slate-50 transition text-slate-700 font-semibold w-full mb-2"
        >
          <img src="/google-icon.svg" alt="Google" className="w-5 h-5" />
          Entrar com Google
        </button>
        <form onSubmit={handleSubmit} className="w-full flex flex-col gap-4">
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
        <div className="flex flex-col items-center gap-2 mt-4">
        <span className="text-sm text-slate-500">¿No tienes cuenta?</span>
        <button
          type="button"
          onClick={() => router.push('/register')}
          className="text-blue-600 font-semibold hover:underline transition"
        >
          Crear tu cuenta
        </button>
      </div>
        <p className="text-xs text-slate-400 mt-2">© {new Date().getFullYear()} ClinicAI. Todos os direitos reservados.</p>
      </div>
    </div>
  );
}




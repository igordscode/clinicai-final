// Arquivo: src/app/register/success/page.tsx
'use client'; // Esta página precisa ler a URL, então é um Client Component

import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import React from 'react';

export default function RegistrationSuccessPage() {
  // Hook para ler os parâmetros da URL
  const searchParams = useSearchParams();
  // Pega o valor do parâmetro 'email'
  const email = searchParams.get('email');

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-slate-50 dark:bg-slate-900 text-center p-4">
      <div className="bg-white dark:bg-slate-800 p-8 rounded-2xl shadow-lg max-w-md">
        <h1 className="text-3xl font-bold text-green-600 dark:text-green-400 mb-4">
          ✅ Registro Concluído com Sucesso!
        </h1>
        <p className="text-slate-600 dark:text-slate-300 mb-2">
          Sua conta foi criada.
        </p>
        {email && (
          <p className="text-slate-600 dark:text-slate-300 mb-6">
            Enviamos uma confirmação para o email: <span className="font-semibold text-purple-600 dark:text-purple-400">{email}</span>
          </p>
        )}
        <Link href="/login">
          <span className="w-full bg-purple-600 text-white rounded-lg px-6 py-3 font-semibold hover:bg-purple-700 transition cursor-pointer">
            Ir para o Login
          </span>
        </Link>
      </div>
    </div>
  );
}
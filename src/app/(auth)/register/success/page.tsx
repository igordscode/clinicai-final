// ARQUIVO FINAL E CORRIGIDO: src/app/(auth)/register/success/page.tsx

'use client';

// Suas importações, agora com Suspense
import { useRouter, useSearchParams } from 'next/navigation';
import { useState, Suspense } from 'react';
import React from 'react';
import Link from 'next/link';

// =========================================================================
// O conteúdo da sua página agora vive em um componente separado
// =========================================================================
function SuccessContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [loading, setLoading] = useState(false);
  
  const email = searchParams.get('email');

  const handleGoToLogin = () => {
    setLoading(true);
    router.push('/login');
  };

  return (
    // Seu design impecável, sem alterações
    <div className="flex items-center justify-center min-h-screen bg-slate-100 dark:bg-slate-950">
      <div className="w-full max-w-md mx-auto p-8 flex flex-col items-center gap-6 bg-white dark:bg-slate-900 rounded-2xl shadow-2xl">
        <div className="flex flex-col items-center gap-2 mb-2">
          <div className="w-14 h-14 rounded-full bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center shadow-lg">
            <span className="text-white text-3xl font-bold">C</span>
          </div>
          <h1 className="text-2xl font-extrabold bg-gradient-to-r from-blue-700 to-purple-600 bg-clip-text text-transparent">
            ClinicAI
          </h1>
          <span className="text-xs text-slate-500">Healthcare Analytics</span>
        </div>
        <div className="flex flex-col items-center gap-2 text-center">
          <div className="text-4xl mb-2">🎉</div>
          <h2 className="text-xl font-bold text-slate-800 dark:text-slate-100">Cadastro realizado com sucesso!</h2>
          <p className="text-slate-600 dark:text-slate-300 text-sm">
            Bem-vindo(a) ao ClinicAI! Sua conta foi criada.
          </p>
          {email && (
            <p className="text-xs text-slate-500 mt-1">
              Agora é só fazer o login com o email: <span className="font-medium">{email}</span>
            </p>
          )}
        </div>
        <button
          onClick={handleGoToLogin}
          disabled={loading}
          className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg px-4 py-3 font-semibold hover:scale-105 hover:shadow-lg transition mt-4"
        >
          {loading ? "Redirecionando..." : "Ir para o Login"}
        </button>
      </div>
    </div>
  );
}

// =========================================================================
// O componente principal da página, que exportamos como default
// =========================================================================
export default function RegistrationSuccessPage() {
  return (
    // Ele "envelopa" o conteúdo com a barreira de Suspense
    <Suspense fallback={<div className="flex justify-center items-center min-h-screen">Carregando...</div>}>
      <SuccessContent />
    </Suspense>
  );
}
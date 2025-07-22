// Arquivo: src/app/register/success/page.tsx
'use client';

// Importações necessárias
import { useRouter, useSearchParams } from 'next/navigation'; // Trocamos usePathname por useSearchParams
import { signIn } from 'next-auth/react';
import { useEffect, useState } from 'react';
import React from 'react'; // Adicionando React para clareza

// Hook customizado para evitar renderização no servidor onde window não existe
function useEmailFromUrl() {
  const searchParams = useSearchParams();
  const email = searchParams.get('email');
  return email;
}

export default function RegistrationSuccessPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  
  // A única informação que precisamos da URL é o email
  const email = useEmailFromUrl(); 

  // Não vamos mais tentar fazer login automático, pois não temos a senha de forma segura.
  // A melhor prática é redirecionar o usuário para a página de login para que ele mesmo a insira.
  const handleGoToLogin = () => {
    setLoading(true);
    // Simplesmente redireciona para a página de login
    router.push('/login');
  };

  return (
    // Seu design está ótimo, vamos mantê-lo!
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
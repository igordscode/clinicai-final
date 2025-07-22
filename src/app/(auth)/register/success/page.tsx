"use client";
import { useRouter, usePathname } from "next/navigation";
import { signIn } from "next-auth/react";
import { useEffect, useState } from "react";

export default function RegisterSuccessPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  // Recupera email e senha do state do router
  const [credentials, setCredentials] = useState({ email: "", password: "" });

  useEffect(() => {
    if (window && window.history && window.history.state && window.history.state.usr) {
      setCredentials(window.history.state.usr);
    }
  }, []);

  const handleLogin = async () => {
    setLoading(true);
    const result = await signIn("credentials", {
      redirect: false,
      email: credentials.email,
      password: credentials.password,
    });
    setLoading(false);
    if (result?.ok) {
      router.push("/");
    } else {
      router.push("/login");
    }
  };

  return (
    <div className="w-full max-w-md mx-auto p-8 flex flex-col items-center gap-6 bg-white/90 dark:bg-slate-900/80 rounded-2xl shadow-2xl mt-20">
      <div className="flex flex-col items-center gap-2 mb-2">
        <div className="w-14 h-14 rounded-full bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center shadow-lg">
          <span className="text-white text-3xl font-bold">C</span>
        </div>
        <h1 className="text-2xl font-extrabold bg-gradient-to-r from-blue-700 to-purple-600 bg-clip-text text-transparent">
          ClinicAI
        </h1>
        <span className="text-xs text-slate-500">Healthcare Analytics</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <div className="text-3xl">🎉</div>
        <h2 className="text-xl font-bold text-center text-slate-800 dark:text-slate-100">Cadastro realizado com sucesso!</h2>
        <p className="text-center text-slate-600 dark:text-slate-300 text-sm">
          Bem-vindo(a) ao ClinicAI!<br />
          Sua conta foi criada com sucesso.<br />
        </p>
        <button
          onClick={handleLogin}
          disabled={loading}
          className="bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded px-4 py-2 font-semibold hover:scale-105 hover:shadow-lg transition mt-2"
        >
          {loading ? "Entrando..." : "Fazer login"}
        </button>
      </div>
    </div>
  );
} 
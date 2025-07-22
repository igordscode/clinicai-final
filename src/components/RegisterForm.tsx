"use client";
import { useState } from "react";
import { Card } from "./ui/card";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { ToastProvider, useToast } from "../components/Toast";

function validateEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function getPasswordStrength(password: string) {
  let score = 0;
  if (password.length >= 8) score++;
  if (/[A-Z]/.test(password)) score++;
  if (/[a-z]/.test(password)) score++;
  if (/\d/.test(password)) score++;
  if (/[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(password)) score++;
  return score;
}

const passwordRequirements = [
  {
    label: "Mínimo 8 caracteres",
    test: (pw: string) => pw.length >= 8,
  },
  {
    label: "Letra maiúscula",
    test: (pw: string) => /[A-Z]/.test(pw),
  },
  {
    label: "Letra minúscula",
    test: (pw: string) => /[a-z]/.test(pw),
  },
  {
    label: "Número",
    test: (pw: string) => /\d/.test(pw),
  },
  {
    label: "Caractere especial",
    test: (pw: string) => /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(pw),
  },
];

const strengthLabels = [
  "Muito fraca",
  "Fraca",
  "Razoável",
  "Boa",
  "Forte",
  "Excelente",
];
const strengthColors = [
  "bg-red-400",
  "bg-orange-400",
  "bg-yellow-400",
  "bg-blue-400",
  "bg-green-500",
  "bg-green-700",
];

export default function RegisterForm() {
  // Etapa do wizard
  const [step, setStep] = useState(1);

  // Etapa 1
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  // Etapa 2
  const [company, setCompany] = useState("");
  const [role, setRole] = useState("");
  const [area, setArea] = useState("");
  const [referral, setReferral] = useState("");

  // Etapa 3 - Convidar equipe
  const [teamEmails, setTeamEmails] = useState<string[]>([""]);
  const [teamErrors, setTeamErrors] = useState<string[]>([""]);

  const router = useRouter();
  // Toast notification (opcional)
  // const { toast } = useToast();
  const [registerError, setRegisterError] = useState("");

  // Validação etapa 1
  const passwordStrength = getPasswordStrength(password);
  const isStep1Valid =
    name.trim() &&
    validateEmail(email) &&
    passwordStrength === 5 &&
    !emailError &&
    !passwordError;

  // Validação etapa 2
  const isStep2Valid = company.trim() && role.trim() && area.trim() && referral.trim();

  // Validação etapa 3
  const isStep3Valid = teamEmails.every((e, i) => !e || validateEmail(e)) && teamEmails.filter(e => e).length > 0 ? teamEmails.every(e => validateEmail(e)) : true;

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    if (!validateEmail(e.target.value)) {
      setEmailError("E-mail inválido");
    } else {
      setEmailError("");
    }
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
    if (getPasswordStrength(e.target.value) < 5) {
      setPasswordError("A senha deve atender todos os requisitos abaixo.");
    } else {
      setPasswordError("");
    }
  };

  // Team emails handlers
  const handleTeamEmailChange = (idx: number, value: string) => {
    const newEmails = [...teamEmails];
    newEmails[idx] = value;
    setTeamEmails(newEmails);
    const newErrors = [...teamErrors];
    if (value && !validateEmail(value)) {
      newErrors[idx] = "E-mail inválido";
    } else {
      newErrors[idx] = "";
    }
    setTeamErrors(newErrors);
  };

  const addTeamEmail = () => {
    setTeamEmails([...teamEmails, ""]);
    setTeamErrors([...teamErrors, ""]);
  };

  const removeTeamEmail = (idx: number) => {
    if (teamEmails.length === 1) return;
    setTeamEmails(teamEmails.filter((_, i) => i !== idx));
    setTeamErrors(teamErrors.filter((_, i) => i !== idx));
  };

  // Novo: login automático após registro
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setRegisterError("");
    if (!isStep1Valid || !isStep2Valid) return;
    // Chama a API de registro
    const res = await fetch("/api/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password }),
    });
    if (!res.ok) {
      const data = await res.json();
      setRegisterError(data.error || "Erro ao registrar usuário.");
      return;
    }
    // Registro OK, login automático
    const result = await signIn("credentials", {
      redirect: false,
      email,
      password,
    });
    if (result?.ok) {
      router.push("/");
    } else {
      router.push("/login");
    }
  };

  // Wizard steps rendering
  return (
    <Card className="w-full max-w-md p-8 flex flex-col items-center gap-6">
      {/* Logo e nome do sistema */}
      <div className="flex flex-col items-center gap-2 mb-2">
        <div className="w-14 h-14 rounded-full bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center shadow-lg">
          <span className="text-white text-3xl font-bold">C</span>
        </div>
        <h1 className="text-2xl font-extrabold bg-gradient-to-r from-blue-700 to-purple-600 bg-clip-text text-transparent">
          ClinicAI
        </h1>
        <span className="text-xs text-slate-500">Healthcare Analytics</span>
      </div>
      {registerError && (
        <span className="text-red-500 text-center text-sm mb-2">{registerError}</span>
      )}
      <form className="w-full flex flex-col gap-4" onSubmit={handleSubmit} noValidate>
        {step === 1 && (
          <>
            <input
              type="text"
              placeholder="Nome"
              required
              className="border border-slate-300 rounded px-3 py-2"
              value={name}
              onChange={e => setName(e.target.value)}
            />
            <input
              type="email"
              placeholder="Email"
              required
              className={`border rounded px-3 py-2 ${emailError ? "border-red-500" : "border-slate-300"}`}
              value={email}
              onChange={handleEmailChange}
            />
            {emailError && (
              <span className="text-red-500 text-xs -mt-3">{emailError}</span>
            )}
            <input
              type="password"
              placeholder="Senha"
              required
              className={`border rounded px-3 py-2 ${passwordError ? "border-red-500" : "border-slate-300"}`}
              value={password}
              onChange={handlePasswordChange}
            />
            {/* Barra de força de senha */}
            {password && (
              <div className="w-full flex flex-col gap-1">
                <div className="h-2 w-full rounded bg-slate-200 overflow-hidden">
                  <div
                    className={`h-2 rounded transition-all duration-300 ${strengthColors[passwordStrength]}`}
                    style={{ width: `${(passwordStrength / 5) * 100}%` }}
                  ></div>
                </div>
                <span className={`text-xs font-semibold ${passwordStrength < 3 ? "text-red-500" : passwordStrength < 5 ? "text-yellow-600" : "text-green-600"}`}>
                  {strengthLabels[passwordStrength]}
                </span>
              </div>
            )}
            {/* Requisitos de senha */}
            <ul className="text-xs text-slate-600 dark:text-slate-300 space-y-1 mb-1">
              {passwordRequirements.map((req, idx) => (
                <li key={idx} className="flex items-center gap-2">
                  <span className={`w-3 h-3 rounded-full border flex items-center justify-center text-[10px] font-bold ${req.test(password) ? "bg-green-500 border-green-500 text-white" : "bg-white border-slate-300 text-slate-400"}`}>
                    {req.test(password) ? "✓" : "✗"}
                  </span>
                  {req.label}
                </li>
              ))}
            </ul>
            {passwordError && (
              <span className="text-red-500 text-xs -mt-3">{passwordError}</span>
            )}
            <button
              type="button"
              className="bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded px-4 py-2 font-semibold hover:scale-105 hover:shadow-lg transition"
              disabled={!isStep1Valid}
              onClick={() => setStep(2)}
            >
              Próximo
            </button>
          </>
        )}
        {step === 2 && (
          <>
            <input
              type="text"
              placeholder="Nome da empresa"
              required
              className="border border-slate-300 rounded px-3 py-2"
              value={company}
              onChange={e => setCompany(e.target.value)}
            />
            <input
              type="text"
              placeholder="Cargo/Função"
              required
              className="border border-slate-300 rounded px-3 py-2"
              value={role}
              onChange={e => setRole(e.target.value)}
            />
            <input
              type="text"
              placeholder="Área/Setor"
              required
              className="border border-slate-300 rounded px-3 py-2"
              value={area}
              onChange={e => setArea(e.target.value)}
            />
            <select
              required
              className="border border-slate-300 rounded px-3 py-2"
              value={referral}
              onChange={e => setReferral(e.target.value)}
            >
              <option value="">Como conheceu a plataforma?</option>
              <option value="Google">Google</option>
              <option value="Indicação">Indicação</option>
              <option value="Evento">Evento</option>
              <option value="Redes Sociais">Redes Sociais</option>
              <option value="Outro">Outro</option>
            </select>
            <div className="flex gap-2 mt-2">
              <button
                type="button"
                className="bg-slate-200 text-slate-700 rounded px-4 py-2 font-semibold hover:bg-slate-300 transition"
                onClick={() => setStep(1)}
              >
                Voltar
              </button>
              <button
                type="button"
                className="bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded px-4 py-2 font-semibold hover:scale-105 hover:shadow-lg transition"
                disabled={!isStep2Valid}
                onClick={() => setStep(3)}
              >
                Próximo
              </button>
            </div>
          </>
        )}
        {step === 3 && (
          <>
            <div className="flex flex-col gap-2 mb-2">
              <label className="font-semibold text-slate-700 dark:text-slate-200">Convide membros da sua equipe (opcional)</label>
              {teamEmails.map((email, idx) => (
                <div key={idx} className="flex gap-2 items-center">
                  <input
                    type="email"
                    placeholder="E-mail do colega"
                    className={`border rounded px-3 py-2 flex-1 ${teamErrors[idx] ? "border-red-500" : "border-slate-300"}`}
                    value={email}
                    onChange={e => handleTeamEmailChange(idx, e.target.value)}
                  />
                  {teamEmails.length > 1 && (
                    <button
                      type="button"
                      className="text-red-500 font-bold px-2"
                      onClick={() => removeTeamEmail(idx)}
                      aria-label="Remover e-mail"
                    >
                      ×
                    </button>
                  )}
                </div>
              ))}
              {teamErrors.some(e => e) && (
                <span className="text-red-500 text-xs">Verifique os e-mails digitados</span>
              )}
              <button
                type="button"
                className="text-blue-600 font-semibold hover:underline text-xs mt-1 self-start"
                onClick={addTeamEmail}
              >
                + Adicionar mais um
              </button>
            </div>
            <div className="flex gap-2 mt-2">
              <button
                type="button"
                className="bg-slate-200 text-slate-700 rounded px-4 py-2 font-semibold hover:bg-slate-300 transition"
                onClick={() => setStep(2)}
              >
                Voltar
              </button>
              <button
                type="button"
                className="bg-slate-200 text-slate-700 rounded px-4 py-2 font-semibold hover:bg-slate-300 transition"
                // LINHA NOVA (CORRETA)
                // Nós construímos a URL com o email como um parâmetro de busca
                onClick={() => router.push(`/register/success?email=${encodeURIComponent(email)}`)}
                            >
                Pular
              </button>
              <button
                type="submit"
                className="bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded px-4 py-2 font-semibold hover:scale-105 hover:shadow-lg transition"
                disabled={!isStep3Valid}
              >
                Convidar e Finalizar
        </button>
            </div>
          </>
        )}
      </form>
    </Card>
  );
}

"use client";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { useState, useRef, useEffect } from "react";
import { Sidebar } from "../components/Sidebar";
import { Header } from "../components/Header";
import { KpiCard } from "../components/KpiCard";
import { NpsGauge } from "../components/NpsGauge";
import { FinancialChart } from "../components/FinancialChart";
import { DoctorCarousel } from "../components/DoctorCarousel";
import { LeadsBarChart } from "../components/LeadsBarChart";
import { NpsGaugeCard } from "../components/NpsGaugeCard";
import { InsightsCard } from "../components/InsightsCard";
import { useToast } from "../components/Toast";
import { ToastDemo } from "../components/Toast";
import { KpiCardSkeleton, ChartCardSkeleton } from "../components/Skeleton";
import {
  UserPlus, CalendarPlus, DollarSign, Megaphone, FileText, Folder, Activity, Star, BadgeDollarSign, CheckCircle, ArrowUpRight, ArrowLeftRight, ArrowDownRight, TrendingDown, CreditCard, BarChart2, Smile, MessageCircle, RefreshCcw, Share2, Target, TrendingUp, Users, Stethoscope, Lightbulb, Eye, MoreVertical, Gift, Bell, AlertTriangle, Rocket, AlignVerticalDistributeEnd, Settings, Clock, Building2, Calendar
} from 'lucide-react';
import Link from "next/link";
import { StatusButton } from "../components/ui/StatusButton";

export default function Dashboard() {
  const [robotSmiling, setRobotSmiling] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [simulatedHour, setSimulatedHour] = useState<number | null>(null);
  const robotRef = useRef<HTMLDivElement>(null);
  const { showToast } = useToast();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [currentHour, setCurrentHour] = useState<string>("");

  // Função para obter saudação baseada no horário
  const getGreeting = () => {
    const hour = simulatedHour !== null ? simulatedHour : currentTime.getHours();
    
    if (hour >= 6 && hour < 12) {
      return "Buenos días";
    } else if (hour >= 12 && hour < 13) {
      return "Buen almuerzo";
    } else if (hour >= 13 && hour < 18) {
      return "Buenas tardes";
    } else if (hour >= 18 && hour < 19) {
      return "Hasta mañana";
    } else {
      return "Buenas noches";
    }
  };

  // Função para obter ícone baseado no horário
  const getTimeIcon = () => {
    const hour = simulatedHour !== null ? simulatedHour : currentTime.getHours();
    
    if (hour >= 6 && hour < 12) {
      return "🌅"; // Sol nascente
    } else if (hour >= 12 && hour < 13) {
      return "🍽️"; // Almoço
    } else if (hour >= 13 && hour < 18) {
      return "☀️"; // Sol da tarde
    } else if (hour >= 18 && hour < 19) {
      return "🏢"; // Fim do horário comercial
    } else {
      return "🌙"; // Noite
    }
  };

  // Função para obter configuração do robô baseada no horário
  const getRobotConfig = () => {
    const hour = simulatedHour !== null ? simulatedHour : currentTime.getHours();
    
    if (hour >= 6 && hour < 12) {
      return {
        expression: 'energetic',
        animation: 'robot-wave',
        color: 'from-yellow-400 to-orange-500',
        eyes: 'bg-blue-400',
        mouth: 'w-2.5 h-1 bg-green-600 rounded-full',
        accessories: 'coffee',
        description: 'Robô energizado tomando café da manhã e acenando'
      };
    } else if (hour >= 12 && hour < 13) {
      return {
        expression: 'hungry',
        animation: 'robot-eat',
        color: 'from-orange-400 to-red-500',
        eyes: 'bg-orange-400',
        mouth: 'w-2.5 h-1.5 bg-orange-600 rounded-full animate-pulse',
        accessories: 'lunch',
        description: 'Robô faminto comendo almoço'
      };
    } else if (hour >= 13 && hour < 18) {
      return {
        expression: 'focused',
        animation: 'robot-work',
        color: 'from-blue-400 to-purple-500',
        eyes: 'bg-blue-500',
        mouth: 'w-2 h-0.5 bg-blue-600 rounded-full',
        accessories: 'work',
        description: 'Robô focado trabalhando ativamente'
      };
    } else if (hour >= 18 && hour < 19) {
      return {
        expression: 'relieved',
        animation: 'robot-bye',
        color: 'from-green-400 to-emerald-500',
        eyes: 'bg-green-400',
        mouth: 'w-2.5 h-1 bg-green-600 rounded-full',
        accessories: 'goodbye',
        description: 'Robô aliviado se despedindo do trabalho'
      };
    } else {
      return {
        expression: 'sleepy',
        animation: 'robot-sleep',
        color: 'from-indigo-400 to-blue-900',
        eyes: 'bg-indigo-300',
        mouth: 'w-1.5 h-0.5 bg-indigo-500 rounded-full',
        accessories: 'moon',
        description: 'Robô sonolento preparando para dormir'
      };
    }
  };

  // Atualizar horário a cada minuto
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000); // Atualiza a cada minuto

    return () => clearInterval(timer);
  }, []);

  // Simular carregamento inicial
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
      showToast({
        type: 'success',
        title: 'Dashboard Carregado!',
        message: 'Todos os dados foram atualizados com sucesso.'
      });
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const updateHour = () => {
      const now = new Date();
      const hours = now.getHours().toString().padStart(2, '0');
      const minutes = now.getMinutes().toString().padStart(2, '0');
      setCurrentHour(`${hours}:${minutes}`);
    };
    updateHour();
    const interval = setInterval(updateHour, 1000 * 30); // Atualiza a cada 30s
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="font-sans antialiased bg-background flex w-full h-screen">
      
      {/* Main Content */}
      <div className="flex flex-col flex-1 w-full min-h-0">
        
        {/* Main Area com scroll independente */}
        <main className="flex-1 px-4 md:px-6 lg:px-8 py-4 md:py-6 bg-gradient-to-br from-slate-50 via-white to-blue-50/30 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900/30 overflow-y-auto scrollbar-thin h-full">
          
          {/* Welcome Banner - VERSÃO ULTRA COMPACTADA */}
          <section className="relative mb-3 md:mb-4 overflow-hidden">
            <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl p-2 md:p-3 lg:p-4 shadow-xl">
              
              {/* Top Row - Greeting and Controls */}
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-2 mb-3">
                {/* Left - Greeting */}
                                  <div className="flex items-center gap-2 md:gap-3">
                    <div className="w-8 h-8 md:w-12 md:h-12 bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-700 rounded-xl flex items-center justify-center shadow-xl relative overflow-hidden transform rotate-3 hover:rotate-0 transition-transform duration-300 container-3d">
                    {/* Efeito 3D - Sombra interna */}
                    <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent rounded-xl"></div>
                    {/* Robô dinâmico baseado no horário */}
                    <div 
                      ref={robotRef}
                      className="relative z-10 flex items-center justify-center robot-container"
                      onMouseEnter={() => setRobotSmiling(true)}
                      onMouseLeave={() => setRobotSmiling(false)}
                    >
                      {(() => {
                        const config = getRobotConfig();
                        return (
                          <>
                            {/* Cabeça do robô com cor dinâmica */}
                            <div className={`w-4 h-4 md:w-6 md:h-6 bg-gradient-to-br ${config.color} rounded-full relative shadow-inner animate-${config.animation}`}>
                              {/* Sensores laterais */}
                              <div className="absolute top-0.5 md:top-1 left-0.5 w-0.5 h-0.5 bg-white/80 rounded-full animate-pulse"></div>
                              <div className="absolute top-0.5 md:top-1 right-0.5 w-0.5 h-0.5 bg-white/80 rounded-full animate-pulse"></div>
                              
                              {/* Olhos principais com cor dinâmica */}
                              <div className={`absolute top-1.5 md:top-2 left-1 md:left-1.5 w-1 md:w-1.5 h-1 md:h-1.5 ${config.eyes} rounded-full flex items-center justify-center overflow-hidden`}>
                                <div className="w-0.5 h-0.5 bg-white rounded-full animate-pulse"></div>
                              </div>
                              <div className={`absolute top-1.5 md:top-2 right-1 md:right-1.5 w-1 md:w-1.5 h-1 md:h-1.5 ${config.eyes} rounded-full flex items-center justify-center overflow-hidden`}>
                                <div className="w-0.5 h-0.5 bg-white rounded-full animate-pulse"></div>
                              </div>
                              
                              {/* Boca dinâmica */}
                              <div className={`absolute bottom-0.5 md:bottom-1 left-1/2 transform -translate-x-1/2 transition-all duration-300 ${config.mouth}`}></div>
                              
                              {/* Acessórios de Cabeça - Gorras, Chapéus, etc */}
                              {config.accessories === 'coffee' && (
                                <>
                                  {/* Gorra de Café da Manhã */}
                                  <div className="absolute -top-0.5 md:-top-1 left-0.5 md:left-1 w-3 md:w-4 h-1.5 md:h-2 bg-gradient-to-r from-amber-600 to-orange-600 rounded-t-full transform -rotate-12 animate-hat-bounce">
                                    <div className="absolute -top-0.5 left-0.5 w-1 h-0.5 bg-amber-400 rounded-full"></div>
                                  </div>
                                  {/* Xícara de Café */}
                                  <div className="absolute -top-1 -right-1 w-2 h-2 bg-amber-600 rounded-full animate-bounce">
                                    <div className="w-1 h-1 bg-amber-500 rounded-full"></div>
                                    <div className="absolute -top-0.5 -right-0.5 w-0.5 h-0.5 bg-white rounded-full animate-pulse"></div>
                                  </div>
                                </>
                              )}
                              
                              {config.accessories === 'lunch' && (
                                <>
                                  {/* Chapéu de Chef */}
                                  <div className="absolute -top-0.5 md:-top-1 left-0.5 md:left-1 w-3 md:w-4 h-1.5 md:h-2 bg-gradient-to-r from-white to-gray-200 rounded-t-full transform -rotate-6 animate-hat-bounce">
                                    <div className="absolute -top-0.5 left-0.5 w-1 h-0.5 bg-red-500 rounded-full"></div>
                                  </div>
                                  {/* Prato de Comida */}
                                  <div className="absolute -top-0.5 -right-0.5 w-1.5 h-1.5 bg-orange-400 rounded-full animate-pulse">
                                    <div className="w-0.5 h-0.5 bg-orange-300 rounded-full"></div>
                                    <div className="absolute -top-0.5 -right-0.5 w-0.5 h-0.5 bg-white rounded-full animate-ping"></div>
                                  </div>
                                </>
                              )}
                              
                              {config.accessories === 'work' && (
                                <>
                                  {/* Óculos de Trabalho */}
                                  <div className="absolute top-1 md:top-1.5 left-0.5 md:left-1 w-3 md:w-4 h-0.5 bg-gray-800 rounded-full animate-glasses-glow">
                                    <div className="absolute left-0.5 w-1 h-0.5 bg-blue-400 rounded-full"></div>
                                    <div className="absolute right-0.5 w-1 h-0.5 bg-blue-400 rounded-full"></div>
                                  </div>
                                  {/* Gravata */}
                                  <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-0.5 h-1 bg-blue-600 rounded-full animate-tie-swing">
                                    <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1 h-0.5 bg-blue-500 rounded-full"></div>
                                  </div>
                                  {/* Ícone de Trabalho */}
                                  <div className="absolute -top-1 -right-1 w-2 h-2 bg-blue-400 rounded-full animate-ping">
                                    <div className="w-1 h-1 bg-blue-300 rounded-full"></div>
                                    <div className="absolute -top-0.5 -right-0.5 w-0.5 h-0.5 bg-white rounded-full animate-pulse"></div>
                                  </div>
                                </>
                              )}
                              
                              {config.accessories === 'goodbye' && (
                                <>
                                  {/* Chapéu de Despedida */}
                                  <div className="absolute -top-0.5 md:-top-1 left-0.5 md:left-1 w-3 md:w-4 h-1.5 md:h-2 bg-gradient-to-r from-green-500 to-emerald-600 rounded-t-full transform -rotate-6 animate-hat-bounce">
                                    <div className="absolute -top-0.5 left-0.5 w-1 h-0.5 bg-green-400 rounded-full"></div>
                                  </div>
                                  {/* Mala */}
                                  <div className="absolute -top-0.5 -right-0.5 w-1.5 h-1.5 bg-green-400 rounded animate-pulse">
                                    <div className="w-0.5 h-0.5 bg-green-300 rounded"></div>
                                    <div className="absolute -top-0.5 -right-0.5 w-0.5 h-0.5 bg-white rounded animate-bounce"></div>
                                  </div>
                                </>
                              )}
                              
                              {config.accessories === 'moon' && (
                                <>
                                  {/* Gorro de Dormir */}
                                  <div className="absolute -top-0.5 md:-top-1 left-0.5 md:left-1 w-3 md:w-4 h-1.5 md:h-2 bg-gradient-to-r from-indigo-400 to-purple-500 rounded-t-full transform -rotate-6 animate-hat-bounce">
                                    <div className="absolute -top-0.5 left-0.5 w-1 h-0.5 bg-indigo-300 rounded-full"></div>
                                  </div>
                                  {/* Lua */}
                                  <div className="absolute -top-1 -right-1 w-2 h-2 bg-indigo-400 rounded-full animate-pulse">
                                    <div className="w-1 h-1 bg-indigo-300 rounded-full"></div>
                                    <div className="absolute -top-0.5 -right-0.5 w-0.5 h-0.5 bg-white rounded-full animate-pulse"></div>
                                  </div>
                                </>
                              )}
                              

                            </div>
                            
                            {/* Braço acenando com animação dinâmica */}
                            <div className={`absolute -right-0.5 md:-right-1 top-0.5 md:top-1 w-1.5 md:w-2 h-3 md:h-4 bg-gradient-to-br from-gray-200 to-white rounded-full transform rotate-12 transition-all duration-300 animate-${config.animation}`}>
                              {/* Mão */}
                              <div className="absolute bottom-0 w-1.5 md:w-2 h-1 md:h-1.5 bg-gradient-to-br from-gray-200 to-white rounded-full transform rotate-45">
                                {/* Dedos */}
                                <div className="absolute -top-0.5 left-0.5 w-0.5 h-0.5 bg-gray-300 rounded-full"></div>
                                <div className="absolute -top-0.5 right-0.5 w-0.5 h-0.5 bg-gray-300 rounded-full"></div>
                              </div>
                            </div>
                          </>
                        );
                      })()}
                    </div>
                    {/* Brilho 3D */}
                    <div className="absolute top-1 md:top-2 left-1 md:left-2 w-2 md:w-3 h-2 md:h-3 bg-white/40 rounded-full blur-sm"></div>
                  </div>
                  <div>
                    <h1 className="text-lg md:text-2xl lg:text-3xl font-bold bg-gradient-to-r from-slate-900 via-blue-800 to-purple-800 dark:from-slate-100 dark:via-indigo-300 dark:to-purple-300 bg-clip-text text-transparent mb-1 flex items-center gap-2">
                      <span>{getGreeting()}, Camila</span>
                      <span className="text-base md:text-xl lg:text-2xl animate-pulse">{getTimeIcon()}</span>
                    </h1>
                    <p className="text-xs md:text-sm lg:text-base text-slate-600 dark:text-slate-400 font-medium">
                      Acá está el resumen de tu clínica Hoy
                      {simulatedHour !== null && (
                        <span className="ml-2 text-xs bg-amber-100 dark:bg-amber-800/50 text-amber-700 dark:text-amber-300 px-2 py-1 rounded-full">
                          Simulando: {simulatedHour}:00h
                        </span>
                      )}
                    </p>
                  </div>
                </div>

                {/* Right - Controls */}
                <div className="flex items-center gap-2 md:gap-3">
                  {/* Seletor de Horário para Testes */}
                  <select 
                    className="px-2 md:px-3 py-1 md:py-2 bg-white/80 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 rounded-xl text-xs md:text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-300 transition-all duration-200 text-slate-900 dark:text-slate-100"
                    value={simulatedHour !== null ? simulatedHour : 'real'}
                    onChange={(e) => {
                      const value = e.target.value;
                      if (value === 'real') {
                        setSimulatedHour(null);
                      } else {
                        setSimulatedHour(parseInt(value));
                      }
                    }}
                  >
                    <option value="real">Horário Real</option>
                    <option value="6">🌅 Manhã (6h)</option>
                    <option value="12">🍽️ Almoço (12h)</option>
                    <option value="13">☀️ Tarde (13h)</option>
                    <option value="18">🏢 Fim do Horário Comercial (18h)</option>
                    <option value="20">🌙 Noite (20h)</option>
                  </select>
                  
                  <select className="px-2 md:px-3 py-1 md:py-2 bg-white/80 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 rounded-xl text-xs md:text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-300 transition-all duration-200 text-slate-900 dark:text-slate-100">
                    <option>Julio 2025</option>
                    <option>Junio 2025</option>
                    <option>Mayo 2025</option>
                  </select>
                  <button className="p-1 md:p-2 rounded-xl bg-slate-50 dark:bg-slate-700 hover:bg-slate-100 dark:hover:bg-slate-600 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 transition-all duration-200 hover:scale-105">
                    <svg className="w-3 h-3 md:w-4 md:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                    </svg>
                  </button>
                  <div className="flex items-center gap-1 md:gap-2 px-2 md:px-4 py-1 md:py-2 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 border border-blue-200 dark:border-blue-700/50 rounded-xl">
                    <div className="w-2 h-2 md:w-3 md:h-3 bg-blue-500 rounded-full animate-pulse"></div>
                    <span className="text-xs md:text-sm font-semibold text-blue-700 dark:text-blue-300">7/8</span>
                    <span className="text-xs text-blue-600 dark:text-blue-400 hidden md:inline">profesionales online</span>
                  </div>
                </div>
              </div>

              {/* Middle Row - Status Indicators */}
              <div className="flex flex-row gap-2 mb-2">
                {/* Sistema Online */}
                <div className="flex items-center gap-2 bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-700/50 rounded-lg px-2 py-1 min-w-[40px] w-fit">
                  <StatusButton status="online" tooltip="Sistema Online" />
                </div>
                {/* Clínica Operacional */}
                <div className="flex items-center gap-2 bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-700/50 rounded-lg px-2 py-1 min-w-[40px] w-fit">
                  <StatusButton status="clinica" tooltip="Clínica Operacional" />
                </div>
                {/* Horario */}
                <div className="flex items-center gap-2 bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-700/50 rounded-lg px-2 py-1 min-w-[40px] w-fit">

                  <span className="text-[13px] text-purple-300 dark:text-purple-200 font-semibold leading-tight">{currentHour}</span>
                </div>
                {/* Ultima actualizacion */}
                <div className="flex items-center gap-2 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-700/50 rounded-lg px-2 py-1 min-w-[40px] w-fit">
                  <span className="text-[13px] text-blue-300 dark:text-blue-200 font-semibold leading-tight">2m</span>  
                  <RefreshCcw className="w-3 h-3 text-blue-300 dark:text-blue-200" tooltip='Ultima actualización' />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2 mb-4">
              </div>

              {/* Bottom Row - Main Content Grid - REORGANIZADO */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 md:gap-3">
                {/* Left - Próximas Citas (PROMOVIDA para posição principal) */}
                <div className="bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20 border border-indigo-200 dark:border-indigo-700/50 rounded-lg p-2 md:p-3 relative overflow-hidden h-full flex flex-col">
                  <div className="relative z-10 flex flex-col h-full">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs md:text-sm font-semibold text-indigo-700 dark:text-indigo-300 flex items-center gap-1.5">
                        <svg className="w-3 h-3 md:w-4 md:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        Próximas Citas
                      </span>
                      <span className="text-xs text-indigo-600 dark:text-indigo-400 font-medium bg-indigo-100 dark:bg-indigo-800/50 px-1.5 py-0.5 rounded-full">6 hoy</span>
                    </div>
                    
                    {/* Lista de consultas - Ocupa todo o espaço disponível */}
                    <div className="space-y-1.5 flex-1 flex flex-col justify-between">
                      {/* Consulta 1 - Próxima */}
                      <div className="bg-white/60 dark:bg-slate-800/60 rounded-lg p-1.5 border-l-3 border-indigo-500 hover:bg-white/80 dark:hover:bg-slate-800/80 transition-all duration-200 flex-1">
                        <div className="flex items-center justify-between mb-0.5">
                          <div className="text-xs font-semibold text-indigo-700 dark:text-indigo-300">Dr. García</div>
                          <span className="text-xs text-indigo-600 dark:text-indigo-400 bg-indigo-100 dark:bg-indigo-800/50 px-1 py-0.5 rounded">15 min</span>
                        </div>
                        <div className="text-xs text-indigo-600 dark:text-indigo-400">María López - Consulta General</div>
                        <div className="text-xs text-indigo-500 dark:text-indigo-400">Sala 3</div>
                      </div>

                      {/* Consulta 2 */}
                      <div className="bg-white/60 dark:bg-slate-800/60 rounded-lg p-1.5 border-l-3 border-emerald-500 hover:bg-white/80 dark:hover:bg-slate-800/80 transition-all duration-200 flex-1">
                        <div className="flex items-center justify-between mb-0.5">
                          <div className="text-xs font-semibold text-emerald-700 dark:text-emerald-300">Dra. Silva</div>
                          <span className="text-xs text-emerald-600 dark:text-emerald-400 bg-emerald-100 dark:bg-emerald-800/50 px-1 py-0.5 rounded">45 min</span>
                        </div>
                        <div className="text-xs text-emerald-600 dark:text-emerald-400">Carlos Mendoza - Cardiología</div>
                        <div className="text-xs text-emerald-500 dark:text-emerald-400">Sala 1</div>
                      </div>

                      {/* Consulta 3 */}
                      <div className="bg-white/60 dark:bg-slate-800/60 rounded-lg p-1.5 border-l-3 border-blue-500 hover:bg-white/80 dark:hover:bg-slate-800/80 transition-all duration-200 flex-1">
                        <div className="flex items-center justify-between mb-0.5">
                          <div className="text-xs font-semibold text-blue-700 dark:text-blue-300">Dr. López</div>
                          <span className="text-xs text-blue-600 dark:text-blue-400 bg-blue-100 dark:bg-blue-800/50 px-1 py-0.5 rounded">1h 15</span>
                        </div>
                        <div className="text-xs text-blue-600 dark:text-blue-400">Ana Torres - Pediatría</div>
                        <div className="text-xs text-blue-500 dark:text-blue-400">Sala 2</div>
                      </div>

                      {/* Consulta 4 */}
                      <div className="bg-white/60 dark:bg-slate-800/60 rounded-lg p-1.5 border-l-3 border-purple-500 hover:bg-white/80 dark:hover:bg-slate-800/80 transition-all duration-200 flex-1">
                        <div className="flex items-center justify-between mb-0.5">
                          <div className="text-xs font-semibold text-purple-700 dark:text-purple-300">Dra. Rodríguez</div>
                          <span className="text-xs text-purple-600 dark:text-purple-400 bg-purple-100 dark:bg-purple-800/50 px-1 py-0.5 rounded">2h 30</span>
                        </div>
                        <div className="text-xs text-purple-600 dark:text-purple-400">Luis Pérez - Dermatología</div>
                        <div className="text-xs text-purple-500 dark:text-purple-400">Sala 4</div>
                      </div>

                      {/* Consulta 5 */}
                      <div className="bg-white/60 dark:bg-slate-800/60 rounded-lg p-1.5 border-l-3 border-amber-500 hover:bg-white/80 dark:hover:bg-slate-800/80 transition-all duration-200 flex-1">
                        <div className="flex items-center justify-between mb-0.5">
                          <div className="text-xs font-semibold text-amber-700 dark:text-amber-300">Dr. Martínez</div>
                          <span className="text-xs text-amber-600 dark:text-amber-400 bg-amber-100 dark:bg-amber-800/50 px-1 py-0.5 rounded">3h 45</span>
                        </div>
                        <div className="text-xs text-amber-600 dark:text-amber-400">Elena Vargas - Ginecología</div>
                        <div className="text-xs text-amber-500 dark:text-amber-400">Sala 5</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Center - Métricas e Finanças Agrupadas */}
                <div className="space-y-2 md:space-y-3">
                  {/* KPIs Principais - VERSÃO ULTRA COMPACTA */}
                  <div className="grid grid-cols-3 gap-2">
                    {/* Citas Hoy */}
                    <div className="group relative bg-gradient-to-br from-emerald-500/10 via-emerald-400/5 to-emerald-600/10 dark:from-emerald-400/20 dark:via-emerald-500/10 dark:to-emerald-600/20 border border-emerald-200/50 dark:border-emerald-500/30 rounded-lg p-3 text-center overflow-hidden hover:scale-105 transition-all duration-300 hover:shadow-lg">
                      <div className="text-emerald-700 dark:text-emerald-300 font-bold text-xl">6</div>
                      <div className="text-xs text-emerald-600 dark:text-emerald-400">Citas Hoy</div>
                    </div>

                    {/* En Espera */}
                    <div className="group relative bg-gradient-to-br from-amber-500/10 via-amber-400/5 to-amber-600/10 dark:from-amber-400/20 dark:via-amber-500/10 dark:to-amber-600/20 border border-amber-200/50 dark:border-amber-500/30 rounded-lg p-3 text-center overflow-hidden hover:scale-105 transition-all duration-300 hover:shadow-lg">
                      <div className="text-amber-700 dark:text-amber-300 font-bold text-xl">8</div>
                      <div className="text-xs text-amber-600 dark:text-amber-400">En Espera</div>
                    </div>

                    {/* Urgencias */}
                    <div className="group relative bg-gradient-to-br from-red-500/10 via-red-400/5 to-red-600/10 dark:from-red-400/20 dark:via-red-500/10 dark:to-red-600/20 border border-red-200/50 dark:border-red-500/30 rounded-lg p-3 text-center overflow-hidden hover:scale-105 transition-all duration-300 hover:shadow-lg">
                      <div className="text-red-700 dark:text-red-300 font-bold text-xl">2</div>
                      <div className="text-xs text-red-600 dark:text-red-400">Urgencias</div>
                    </div>
                  </div>

                  {/* Finanzas del Día */}
                  <div className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 border border-green-200 dark:border-green-700/50 rounded-lg p-2 md:p-3">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs md:text-sm font-semibold text-green-700 dark:text-green-300 flex items-center gap-1.5">
                        <DollarSign className="w-3 h-3 md:w-4 md:h-4" />
                        Finanzas del Día
                      </span>
                      <span className="text-xs text-green-600 dark:text-green-400 font-medium bg-green-100 dark:bg-green-800/50 px-1.5 py-0.5 rounded-full">Hasta ahora</span>
                    </div>
                    
                    <div className="space-y-1.5">
                      <div className="space-y-1">
                        <div className="flex items-center justify-between">
                          <span className="text-xs text-green-600 dark:text-green-400">Facturado</span>
                          <span className="text-xs font-semibold text-green-700 dark:text-green-300">Gs. 2.4M</span>
                        </div>
                        <div className="w-full bg-green-200 dark:bg-green-800/50 rounded-full h-1.5">
                          <div className="bg-green-500 h-1.5 rounded-full" style={{width: '100%'}}></div>
                        </div>
                      </div>
                      
                      <div className="space-y-1">
                        <div className="flex items-center justify-between">
                          <span className="text-xs text-green-600 dark:text-green-400">Cobrado</span>
                          <span className="text-xs font-semibold text-green-700 dark:text-green-300">Gs. 1.8M</span>
                        </div>
                        <div className="w-full bg-green-200 dark:bg-green-800/50 rounded-full h-1.5">
                          <div className="bg-green-500 h-1.5 rounded-full" style={{width: '75%'}}></div>
                        </div>
                      </div>
                      
                      <div className="space-y-1">
                        <div className="flex items-center justify-between">
                          <span className="text-xs text-amber-600 dark:text-amber-400">Pendiente</span>
                          <span className="text-xs font-semibold text-amber-700 dark:text-amber-300">Gs. 600K</span>
                        </div>
                        <div className="w-full bg-amber-200 dark:bg-amber-800/50 rounded-full h-1.5">
                          <div className="bg-amber-500 h-1.5 rounded-full" style={{width: '25%'}}></div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Meta Diária */}
                  <div className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 border border-blue-200 dark:border-blue-700/50 rounded-lg p-2 md:p-3">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs md:text-sm font-semibold text-blue-700 dark:text-blue-300 flex items-center gap-1.5">
                        <Target className="w-3 h-3 md:w-4 md:h-4" />
                        Meta Diária
                      </span>
                      <span className="text-xs text-blue-600 dark:text-blue-400 font-medium bg-blue-100 dark:bg-blue-800/50 px-1.5 py-0.5 rounded-full">85%</span>
                    </div>
                    
                    <div className="space-y-1.5">
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-blue-600 dark:text-blue-400">Consultas</span>
                        <span className="text-xs font-semibold text-blue-700 dark:text-blue-300">6/8</span>
                      </div>
                      
                      <div className="w-full bg-blue-200 dark:bg-blue-800/50 rounded-full h-2">
                        <div className="bg-blue-500 h-2 rounded-full" style={{width: '75%'}}></div>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-blue-600 dark:text-blue-400">Tempo Médio</span>
                        <span className="text-xs font-semibold text-blue-700 dark:text-blue-300">25min</span>
                      </div>
                      
                      <div className="w-full bg-blue-200 dark:bg-blue-800/50 rounded-full h-2">
                        <div className="bg-blue-500 h-2 rounded-full" style={{width: '83%'}}></div>
                      </div>
                      
                      <div className="text-xs text-blue-600 dark:text-blue-400 text-center pt-1">
                        <span className="font-medium">Dica:</span> Agende 2 consultas extras para bater a meta! 🎯
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right - Ações Rápidas e Ocupação */}
                <div className="space-y-2 md:space-y-3">
                  {/* Ações Rápidas */}
                  <div className="space-y-1.5 md:space-y-2">
                    <div className="flex items-center gap-2 mb-1.5">
                      <div className="w-1 h-4 bg-gradient-to-b from-blue-500 to-purple-500 rounded-full"></div>
                      <h3 className="text-xs md:text-sm font-semibold text-slate-700 dark:text-slate-300">Acciones Rápidas</h3>
                    </div>
                    
                    <div className="space-y-1.5">
                      {/* Nuevo Lead */}
                      <button className="group relative w-full flex items-center gap-1.5 p-1.5 md:p-2 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 transform hover:rotate-1 overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent rounded-lg"></div>
                        <div className="relative z-10 flex items-center gap-1.5">
                          <div className="w-5 h-5 md:w-6 md:h-6 bg-white/20 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                            <UserPlus className="w-2.5 h-2.5 md:w-3 md:h-3" />
                          </div>
                          <div className="text-left">
                            <div className="text-xs font-semibold">Nuevo Lead</div>
                            <div className="text-xs opacity-80">Agregar paciente</div>
                          </div>
                        </div>
                        <div className="absolute top-1 left-1 w-1.5 h-1.5 bg-white/40 rounded-full blur-sm"></div>
                      </button>

                      {/* Nueva Cita */}
                      <button className="group relative w-full flex items-center gap-1.5 p-1.5 md:p-2 rounded-lg bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-medium hover:from-emerald-600 hover:to-teal-600 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 transform hover:rotate-1 overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent rounded-lg"></div>
                        <div className="relative z-10 flex items-center gap-1.5">
                          <div className="w-5 h-5 md:w-6 md:h-6 bg-white/20 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                            <CalendarPlus className="w-2.5 h-2.5 md:w-3 md:h-3" />
                          </div>
                          <div className="text-left">
                            <div className="text-xs font-semibold">Nueva Cita</div>
                            <div className="text-xs opacity-80">Programar</div>
                          </div>
                        </div>
                        <div className="absolute top-1 left-1 w-1.5 h-1.5 bg-white/40 rounded-full blur-sm"></div>
                      </button>

                      {/* Finanzas */}
                      <button className="group relative w-full flex items-center gap-1.5 p-1.5 md:p-2 rounded-lg bg-gradient-to-r from-amber-500 to-orange-500 text-white font-medium hover:from-amber-600 hover:to-orange-600 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 transform hover:rotate-1 overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent rounded-lg"></div>
                        <div className="relative z-10 flex items-center gap-1.5">
                          <div className="w-5 h-5 md:w-6 md:h-6 bg-white/20 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                            <DollarSign className="w-2.5 h-2.5 md:w-3 md:h-3" />
                          </div>
                          <div className="text-left">
                            <div className="text-xs font-semibold">Finanzas</div>
                            <div className="text-xs opacity-80">Ver estado</div>
                          </div>
                        </div>
                        <div className="absolute top-1 left-1 w-1.5 h-1.5 bg-white/40 rounded-full blur-sm"></div>
                      </button>

                      {/* Campaña */}
                      <button className="group relative w-full flex items-center gap-1.5 p-1.5 md:p-2 rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 text-white font-medium hover:from-purple-600 hover:to-pink-600 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 transform hover:rotate-1 overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent rounded-lg"></div>
                        <div className="relative z-10 flex items-center gap-1.5">
                          <div className="w-5 h-5 md:w-6 md:h-6 bg-white/20 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                            <Megaphone className="w-2.5 h-2.5 md:w-3 md:h-3" />
                          </div>
                          <div className="text-left">
                            <div className="text-xs font-semibold">Campaña</div>
                            <div className="text-xs opacity-80">Marketing</div>
                          </div>
                        </div>
                        <div className="absolute top-1 left-1 w-1.5 h-1.5 bg-white/40 rounded-full blur-sm"></div>
                      </button>

                      {/* Reporte */}
                      <button className="group relative w-full flex items-center gap-1.5 p-1.5 md:p-2 rounded-lg bg-gradient-to-r from-slate-500 to-gray-500 text-white font-medium hover:from-slate-600 hover:to-gray-600 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 transform hover:rotate-1 overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent rounded-lg"></div>
                        <div className="relative z-10 flex items-center gap-1.5">
                          <div className="w-5 h-5 md:w-6 md:h-6 bg-white/20 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                            <FileText className="w-2.5 h-2.5 md:w-3 md:h-3" />
                          </div>
                          <div className="text-left">
                            <div className="text-xs font-semibold">Reporte</div>
                            <div className="text-xs opacity-80">Mensual</div>
                          </div>
                        </div>
                        <div className="absolute top-1 left-1 w-1.5 h-1.5 bg-white/40 rounded-full blur-sm"></div>
                      </button>
                    </div>
                  </div>

                  {/* Ocupación Clínica */}
                  <div className="bg-gradient-to-br from-purple-50 to-indigo-50 dark:from-purple-900/20 dark:to-indigo-900/20 border border-purple-200 dark:border-purple-700/50 rounded-lg p-2 md:p-3">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs md:text-sm font-semibold text-purple-700 dark:text-purple-300 flex items-center gap-1.5">
                        <Building2 className="w-3 h-3 md:w-4 md:h-4" />
                        Ocupación Clínica
                      </span>
                      <span className="text-xs text-purple-600 dark:text-purple-400 font-medium bg-purple-100 dark:bg-purple-800/50 px-1.5 py-0.5 rounded-full">Estado actual</span>
                    </div>
                    
                    <div className="space-y-1.5">
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-purple-600 dark:text-purple-400">85% Ocupado</span>
                      </div>
                      
                      <div className="w-full bg-purple-200 dark:bg-purple-800/50 rounded-full h-2">
                        <div className="bg-purple-500 h-2 rounded-full" style={{width: '85%'}}></div>
                      </div>
                      
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-purple-600 dark:text-purple-400">17 Ocupados</span>
                        <span className="text-purple-600 dark:text-purple-400">3 Disponibles</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Container unificado para todos os grupos de indicadores */}
          <section className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl p-6 shadow-xl mb-6">
            {isLoading ? (
              <div className="space-y-6">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 bg-slate-200 dark:bg-slate-700 rounded-2xl animate-pulse"></div>
                  <div className="flex-1">
                    <div className="h-6 bg-slate-200 dark:bg-slate-700 rounded animate-pulse mb-2"></div>
                    <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded animate-pulse w-3/4"></div>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
                  {Array.from({ length: 4 }).map((_, i) => (
                    <KpiCardSkeleton key={i} />
                  ))}
                </div>
              </div>
            ) : (
              <>
                <div className="mb-10">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 rounded-2xl flex items-center justify-center shadow-lg relative overflow-hidden transform hover:scale-105 transition-all duration-300 container-3d">
                      {/* Efeito 3D - Sombra interna */}
                      <div className="absolute inset-0 bg-gradient-to-br from-white/30 to-transparent rounded-2xl"></div>
                      {/* Ícone */}
                      <div className="relative z-10 icon-glow">
                        <BarChart2 className="w-6 h-6 text-white" />
                      </div>
                      {/* Brilho 3D */}
                      <div className="absolute top-2 left-2 w-3 h-3 bg-white/50 rounded-full blur-sm"></div>
                      {/* Efeito de brilho animado */}
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 animate-shimmer"></div>
                    </div>
                    <div>
                      <h2 className="text-2xl lg:text-3xl font-bold bg-gradient-to-r from-slate-800 via-indigo-700 to-purple-700 dark:from-slate-100 dark:via-indigo-300 dark:to-purple-300 bg-clip-text text-transparent mb-2">
                        Indicadores Clave
                      </h2>
                      <p className="text-slate-600 dark:text-slate-400 text-base font-medium">Métricas essenciais para acompanhar o desempenho da clínica</p>
                    </div>
                  </div>
                </div>
              {/* Grupo: Financiero - VERSÃO PREMIUM */}
              <div className="mb-10">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-600 via-indigo-600 to-blue-800 rounded-xl flex items-center justify-center shadow-lg relative overflow-hidden transform hover:scale-105 transition-all duration-300 container-3d">
                  {/* Efeito 3D - Sombra interna */}
                  <div className="absolute inset-0 bg-gradient-to-br from-white/25 to-transparent rounded-xl"></div>
                  {/* Ícone */}
                  <div className="relative z-10 icon-glow">
                    <DollarSign className="w-5 h-5 text-white" />
                  </div>
                  {/* Brilho 3D */}
                  <div className="absolute top-1 left-1 w-2 h-2 bg-white/50 rounded-full blur-sm"></div>
                  {/* Efeito de brilho animado */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 animate-shimmer"></div>
                </div>
                <div>
                  <h3 className="text-2xl font-bold bg-gradient-to-r from-blue-800 to-indigo-800 dark:from-blue-200 dark:to-indigo-200 bg-clip-text text-transparent mb-1">
                    Financiero
                  </h3>
                  <p className="text-slate-600 dark:text-slate-400 text-base font-medium">Métricas financeiras e receita da clínica</p>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
                <div className="kpi-card-modern card-entrance" style={{ animationDelay: '0.1s' }}>
                  <KpiCard
                    title="Facturación (Mes)"
                    value="Gs. 74.000.000"
                    change="+8%"
                    changeType="up"
                    changeText="Mensual"
                    icon={<DollarSign className="w-4 h-4" />}
                    colorClass="text-blue-800"
                    borderClass="border-blue-800/30"
                    groupColor="blue"
                  />
                </div>
                <div className="kpi-card-modern card-entrance" style={{ animationDelay: '0.2s' }}>
                  <KpiCard
                    title="Resultado Neto (Mes)"
                    value="Gs. 33.950.000"
                    change="+5%"
                    changeType="up"
                    changeText="Mensual"
                    icon={<Activity className="w-4 h-4" />}
                    colorClass="text-blue-700"
                    borderClass="border-blue-800/30"
                    groupColor="blue"
                  />
                </div>
                <div className="kpi-card-modern card-entrance" style={{ animationDelay: '0.3s' }}>
                  <KpiCard
                    title="Valor del Paciente (LTV)"
                    value="Gs. 8.850.000"
                    change="-2%"
                    changeType="down"
                    changeText="vs Mes pasado"
                    icon={<Star className="w-4 h-4" />}
                    colorClass="text-blue-600"
                    borderClass="border-blue-800/30"
                    groupColor="blue"
                  />
                </div>
                <div className="kpi-card-modern card-entrance" style={{ animationDelay: '0.4s' }}>
                  <KpiCard
                    title="Pagos Confirmados (Semana)"
                    value="Gs. 22.350.000"
                    change="+7%"
                    changeType="up"
                    changeText="Semanal"
                    icon={<BadgeDollarSign className="w-4 h-4" />}
                    colorClass="text-blue-900"
                    borderClass="border-blue-800/30"
                    groupColor="blue"
                  />
                </div>
              </div>
            </div>
            {/* Grupo: Atención - VERSÃO PREMIUM */}
            <div className="mb-10">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-gradient-to-br from-emerald-600 via-teal-600 to-cyan-700 rounded-xl flex items-center justify-center shadow-lg relative overflow-hidden transform hover:scale-105 transition-all duration-300 container-3d">
                  {/* Efeito 3D - Sombra interna */}
                  <div className="absolute inset-0 bg-gradient-to-br from-white/25 to-transparent rounded-xl"></div>
                  {/* Ícone */}
                  <div className="relative z-10 icon-glow">
                    <Stethoscope className="w-5 h-5 text-white" />
                  </div>
                  {/* Brilho 3D */}
                  <div className="absolute top-1 left-1 w-2 h-2 bg-white/50 rounded-full blur-sm"></div>
                  {/* Efeito de brilho animado */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 animate-shimmer"></div>
                </div>
                <div>
                  <h3 className="text-2xl font-bold bg-gradient-to-r from-emerald-700 to-teal-700 dark:from-emerald-300 dark:to-teal-300 bg-clip-text text-transparent mb-1">
                    Atención
                  </h3>
                  <p className="text-slate-600 dark:text-slate-400 text-base font-medium">Consultas e atendimento ao paciente</p>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
                <div className="kpi-card-modern card-entrance" style={{ animationDelay: '0.5s' }}>
                  <KpiCard
                    title="Citas (Hoy)"
                    value="6"
                    change="+1"
                    changeType="up"
                    changeText="vs Lunes pasado"
                    icon={<CalendarPlus className="w-4 h-4" />}
                    colorClass="text-emerald-700"
                    borderClass="border-emerald-700/30"
                    groupColor="green"
                  />
                </div>
                <div className="kpi-card-modern card-entrance" style={{ animationDelay: '0.6s' }}>
                  <KpiCard
                    title="Consultas Concluidas (Mes)"
                    value="113"
                    change="0%"
                    changeType="neutral"
                    changeText="Sin variación"
                    icon={<CheckCircle className="w-4 h-4" />}
                    colorClass="text-emerald-700"
                    borderClass="border-emerald-700/30"
                    groupColor="green"
                  />
                </div>
                <div className="kpi-card-modern card-entrance" style={{ animationDelay: '0.7s' }}>
                  <KpiCard
                    title="Pacientes Nuevos (Mes)"
                    value="47"
                    change="+7"
                    changeType="up"
                    changeText="Mensual"
                    icon={<UserPlus className="w-4 h-4" />}
                    colorClass="text-emerald-700"
                    borderClass="border-emerald-700/30"
                    groupColor="green"
                  />
                </div>
                <div className="kpi-card-modern card-entrance" style={{ animationDelay: '0.8s' }}>
                  <KpiCard
                    title="Tasa de Ocupación (Hoy)"
                    value="85%"
                    change="+4%"
                    changeType="up"
                    changeText="vs Martes pasado"
                    icon={<Activity className="w-4 h-4" />}
                    colorClass="text-emerald-700"
                    borderClass="border-emerald-700/30"
                    groupColor="green"
                  />
                </div>
              </div>
            </div>
            {/* Grupo: Marketing & Leads - VERSÃO PREMIUM */}
            <div className="mb-10">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-gradient-to-br from-orange-600 via-amber-600 to-yellow-600 rounded-xl flex items-center justify-center shadow-lg relative overflow-hidden transform hover:scale-105 transition-all duration-300 container-3d">
                  {/* Efeito 3D - Sombra interna */}
                  <div className="absolute inset-0 bg-gradient-to-br from-white/25 to-transparent rounded-xl"></div>
                  {/* Ícone */}
                  <div className="relative z-10 icon-glow">
                    <Target className="w-5 h-5 text-white" />
                  </div>
                  {/* Brilho 3D */}
                  <div className="absolute top-1 left-1 w-2 h-2 bg-white/50 rounded-full blur-sm"></div>
                  {/* Efeito de brilho animado */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 animate-shimmer"></div>
                </div>
                <div>
                  <h3 className="text-2xl font-bold bg-gradient-to-r from-orange-700 to-amber-700 dark:from-orange-300 dark:to-amber-300 bg-clip-text text-transparent mb-1">
                    Marketing & Leads
                  </h3>
                  <p className="text-slate-600 dark:text-slate-400 text-base font-medium">Campanhas e conversão de leads</p>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
                <div className="kpi-card-modern card-entrance" style={{ animationDelay: '0.9s' }}>
                  <KpiCard
                    title="Ticket Medio (Mes)"
                    value="Gs. 650.000"
                    change="-3%"
                    changeType="down"
                    changeText="vs mes pasado"
                    icon={<CreditCard className="w-4 h-4" />}
                    colorClass="text-orange-600"
                    borderClass="border-orange-400/30"
                    groupColor="orange"
                  />
                </div>
                <div className="kpi-card-modern card-entrance" style={{ animationDelay: '1.0s' }}>
                  <KpiCard
                    title="CAC Promedio (Mes)"
                    value="Gs. 325.000"
                    change="-8%"
                    changeType="down"
                    changeText="vs Mes pasado"
                    icon={<Megaphone className="w-4 h-4" />}
                    colorClass="text-orange-500"
                    borderClass="border-orange-400/30"
                    groupColor="orange"
                  />
                </div>
                <div className="kpi-card-modern card-entrance" style={{ animationDelay: '1.1s' }}>
                  <KpiCard
                    title="Tasa de Conversión (Mes)"
                    value="32%"
                    change="0%"
                    changeType="neutral"
                    changeText="Sin variación"
                    icon={<TrendingUp className="w-4 h-4" />}
                    colorClass="text-orange-600"
                    borderClass="border-orange-400/30"
                    groupColor="orange"
                  />
                </div>
                <div className="kpi-card-modern card-entrance" style={{ animationDelay: '1.2s' }}>
                  <KpiCard
                    title="ROI de Campañas (Mes)"
                    value="320%"
                    change="+6%"
                    changeType="up"
                    changeText="Última vez"
                    icon={<BarChart2 className="w-4 h-4" />}
                    colorClass="text-orange-400"
                    borderClass="border-orange-400/30"
                    groupColor="orange"
                  />
                </div>
              </div>
            </div>
            {/* Grupo: Experiencia del Paciente - VERSÃO PREMIUM */}
            <div className="mb-10">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-gradient-to-br from-fuchsia-600 via-purple-600 to-violet-700 rounded-xl flex items-center justify-center shadow-lg relative overflow-hidden transform hover:scale-105 transition-all duration-300 container-3d">
                  {/* Efeito 3D - Sombra interna */}
                  <div className="absolute inset-0 bg-gradient-to-br from-white/25 to-transparent rounded-xl"></div>
                  {/* Ícone */}
                  <div className="relative z-10 icon-glow">
                    <Star className="w-5 h-5 text-white" />
                  </div>
                  {/* Brilho 3D */}
                  <div className="absolute top-1 left-1 w-2 h-2 bg-white/50 rounded-full blur-sm"></div>
                  {/* Efeito de brilho animado */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 animate-shimmer"></div>
                </div>
                <div>
                  <h3 className="text-2xl font-bold bg-gradient-to-r from-fuchsia-700 to-purple-700 dark:from-fuchsia-300 dark:to-purple-300 bg-clip-text text-transparent mb-1">
                    Experiencia del Paciente
                  </h3>
                  <p className="text-slate-600 dark:text-slate-400 text-base font-medium">Satisfação e retenção de pacientes</p>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
                <div className="kpi-card-modern card-entrance" style={{ animationDelay: '1.3s' }}>
                  <KpiCard
                    title="Pacientes Satisfechos (Mes)"
                    value="92%"
                    change="+2%"
                    changeType="up"
                    changeText="vs Anterior"
                    icon={<Smile className="w-4 h-4" />}
                    colorClass="text-purple-600"
                    borderClass="border-purple-500/30"
                    groupColor="purple"
                  />
                </div>
                <div className="kpi-card-modern card-entrance" style={{ animationDelay: '1.4s' }}>
                  <KpiCard
                    title="Nuevas Valoraciones (Mes)"
                    value="8"
                    change="0%"
                    changeType="neutral"
                    changeText="Sin variación"
                    icon={<MessageCircle className="w-4 h-4" />}
                    colorClass="text-purple-500"
                    borderClass="border-purple-500/30"
                    groupColor="purple"
                  />
                </div>
                <div className="kpi-card-modern card-entrance" style={{ animationDelay: '1.5s' }}>
                  <KpiCard
                    title="Pacientes que Retornan (Mes)"
                    value="37%"
                    change="-4%"
                    changeType="down"
                    changeText="Este mes"
                    icon={<RefreshCcw className="w-4 h-4" />}
                    colorClass="text-purple-400"
                    borderClass="border-purple-500/30"
                    groupColor="purple"
                  />
                </div>
                <div className="kpi-card-modern card-entrance" style={{ animationDelay: '1.6s' }}>
                  <KpiCard
                    title="Recomendaciones (Mes)"
                    value="62%"
                    change="+9%"
                    changeType="up"
                    changeText="Última vez"
                    icon={<Share2 className="w-4 h-4" />}
                    colorClass="text-purple-600"
                    borderClass="border-purple-500/30"
                    groupColor="purple"
                  />
                </div>
              </div>
              {/* NPS Score Gauge Bloco */}
              <NpsGaugeCard
                score={9.2}
                meta={9.0}
                badge="Acima de la media del sector"
                breakdown={[
                  { label: "Detratores", value: 12, color: "#ef4444", emoji: "😡" },
                  { label: "Neutros", value: 20, color: "#eab308", emoji: "😐" },
                  { label: "Promotores", value: 65, color: "#22c55e", emoji: "😍" },
                ]}
                feedbacks={["Muy buena atención, recomiendo!", "Tardaron en atenderme."]}
              />
            </div>
              </>
            ) }
          </section>

          {/* Centro de Inteligencia - Seção Principal */}
          <section className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl p-6 shadow-xl mb-6">
            {/* Faixa de insights */}
            <div className="bg-slate-100 dark:bg-slate-700 p-3 rounded-md text-sm text-muted-foreground mb-4">
              Insights generados automáticamente con Inteligencia Artificial para ayudar en la toma de decisiones estratégicas.
            </div>

            {/* Título destacado */}
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
              <Lightbulb className="w-5 h-5 text-blue-500" />
              Centro de Inteligencia
              <span className="relative group cursor-pointer">
                <RefreshCcw className="w-5 h-5 text-blue-500 animate-spin-slow" />
                <span className="absolute left-1/2 -translate-x-1/2 top-full mt-1 w-56 bg-white dark:bg-slate-800 text-xs text-zinc-700 dark:text-zinc-300 rounded shadow-lg px-3 py-2 opacity-0 group-hover:opacity-100 pointer-events-none transition z-50 border border-gray-200 dark:border-gray-700 whitespace-normal text-left">
                  Insights atualizados automaticamente a cada novo dado ou evento relevante.
                </span>
              </span>
            </h2>

            {/* Blocos em 3 colunas */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Bloco 1 */}
              <div className="bg-green-50 dark:bg-green-900/20 border-l-4 border-green-500 p-4 rounded-lg flex flex-col hover:shadow-xl hover:-translate-y-1 transition">
                <h3 className="font-bold text-green-800 dark:text-green-300 mb-2 flex items-center gap-1"><Rocket className="w-5 h-5 text-green-600" /> Meta Estratégica</h3>
                <p className="text-sm text-green-900 dark:text-green-200 mb-2">
                  Incrementar el ticket promedio sumando un <strong>12%</strong> enfocado en tratamientos estéticos.
                  Puede generar <strong>+Gs. 8.600.000</strong> adicionales.
                </p>
                <a href="#" className="text-green-700 dark:text-green-400 underline text-sm">Ver comparación de citas estéticas</a>
              </div>
              {/* Bloco 2 */}
              <div className="bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-500 p-4 rounded-lg flex flex-col hover:shadow-xl hover:-translate-y-1 transition">
                <h3 className="font-bold text-blue-800 dark:text-blue-300 mb-2 flex items-center gap-1"><Lightbulb className="w-5 h-5 text-blue-600" /> Oportunidad Latente</h3>
                <p className="text-sm text-blue-900 dark:text-blue-200 mb-2">
                  La tasa de conversión de la campaña actual es del <strong>48%</strong>, pero el cierre está en el promedio.
                </p>
                <a href="#" className="text-blue-700 dark:text-blue-400 underline text-sm">Ver campañas de Primera Evaluación Estética</a>
              </div>
              {/* Bloco 3 */}
              <div className="bg-yellow-50 dark:bg-yellow-900/20 border-l-4 border-yellow-500 p-4 rounded-lg flex flex-col hover:shadow-xl hover:-translate-y-1 transition">
                <h3 className="font-bold text-yellow-800 dark:text-yellow-300 mb-2 flex items-center gap-1"><AlertTriangle className="w-5 h-5 text-yellow-600" /> Riesgo de Estancamiento</h3>
                <p className="text-sm text-yellow-900 dark:text-yellow-200 mb-2">
                  <strong>13 pacientes</strong> no han regresado en más de <strong>20 días</strong> desde su cancelación.
                </p>
                <a href="#" className="text-yellow-700 dark:text-yellow-400 underline text-sm">Generar seguimiento automático</a>
              </div>
            </div>
          </section>

          {/* Turnos de Consulta e Pacientes Recientes - Lado a lado */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            {/* Turnos de Consulta */}
            <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl p-6 shadow-xl">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Turnos de Consulta</h3>
                <a href="#" className="text-sm text-blue-600 hover:underline font-medium">Ver todos</a>
              </div>
              <div className="flex flex-col gap-3">
                <div className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-700 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-600 transition">
                  <div>
                    <div className="font-medium text-gray-900 dark:text-gray-100">09:00 - 10:00</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">Dr. Silva - Limpieza</div>
                  </div>
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                </div>
                <div className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-700 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-600 transition">
                  <div>
                    <div className="font-medium text-gray-900 dark:text-gray-100">10:30 - 11:30</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">Dra. Oliveira - Consulta</div>
                  </div>
                  <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                </div>
                <div className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-700 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-600 transition">
                  <div>
                    <div className="font-medium text-gray-900 dark:text-gray-100">14:00 - 15:00</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">Dr. Santos - Endodontia</div>
                  </div>
                  <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                </div>
                <div className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-700 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-600 transition">
                  <div>
                    <div className="font-medium text-gray-900 dark:text-gray-100">15:30 - 16:30</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">Dr. Pereira - Implante</div>
                  </div>
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                </div>
              </div>
            </div>
            {/* Pacientes Recientes */}
            <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl p-6 shadow-xl">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Pacientes Recientes</h3>
                <a href="#" className="text-sm text-blue-600 hover:underline font-medium">Ver todos</a>
              </div>
              <div className="overflow-x-auto">
                <table className="min-w-full text-sm">
                  <thead>
                    <tr className="border-b border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400">
                      <th className="py-3 px-3 text-left font-medium">Nombre</th>
                      <th className="py-3 px-3 text-left font-medium">Contacto</th>
                      <th className="py-3 px-3 text-left font-medium">Estado</th>
                      <th className="py-3 px-3 text-left font-medium">Última Consulta</th>
                      <th className="py-3 px-3 text-left font-medium">Acciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-gray-100 dark:border-gray-700 hover:bg-slate-50 dark:hover:bg-slate-700 transition">
                      <td className="py-3 px-3 font-medium flex items-center gap-3">
                        <span className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center text-xs font-bold">MS</span> 
                        Maria Silva
                      </td>
                      <td className="py-3 px-3 text-gray-700 dark:text-gray-300">0984 123456</td>
                      <td className="py-3 px-3">
                        <span className="px-2 py-1 rounded-full bg-green-100 text-green-700 text-xs font-medium">Activo</span>
                      </td>
                      <td className="py-3 px-3 text-gray-700 dark:text-gray-300">25/07/2025</td>
                      <td className="py-3 px-3">
                        <button className="p-1 hover:bg-slate-200 dark:hover:bg-slate-600 rounded transition">
                          <MoreVertical className="w-4 h-4 text-gray-500" />
                        </button>
                      </td>
                    </tr>
                    <tr className="border-b border-gray-100 dark:border-gray-700 hover:bg-slate-50 dark:hover:bg-slate-700 transition">
                      <td className="py-3 px-3 font-medium flex items-center gap-3">
                        <span className="w-8 h-8 rounded-full bg-purple-600 text-white flex items-center justify-center text-xs font-bold">JP</span> 
                        João Pereira
                      </td>
                      <td className="py-3 px-3 text-gray-700 dark:text-gray-300">0971 654321</td>
                      <td className="py-3 px-3">
                        <span className="px-2 py-1 rounded-full bg-yellow-100 text-yellow-700 text-xs font-medium">Lead</span>
                      </td>
                      <td className="py-3 px-3 text-gray-700 dark:text-gray-300">20/07/2025</td>
                      <td className="py-3 px-3">
                        <button className="p-1 hover:bg-slate-200 dark:hover:bg-slate-600 rounded transition">
                          <MoreVertical className="w-4 h-4 text-gray-500" />
                        </button>
                      </td>
                    </tr>
                    <tr className="border-b border-gray-100 dark:border-gray-700 hover:bg-slate-50 dark:hover:bg-slate-700 transition">
                      <td className="py-3 px-3 font-medium flex items-center gap-3">
                        <span className="w-8 h-8 rounded-full bg-gray-600 text-white flex items-center justify-center text-xs font-bold">AO</span> 
                        Ana Oliveira
                      </td>
                      <td className="py-3 px-3 text-gray-700 dark:text-gray-300">0992 112233</td>
                      <td className="py-3 px-3">
                        <span className="px-2 py-1 rounded-full bg-gray-100 text-gray-700 text-xs font-medium">Inactivo</span>
                      </td>
                      <td className="py-3 px-3 text-gray-700 dark:text-gray-300">10/07/2025</td>
                      <td className="py-3 px-3">
                        <button className="p-1 hover:bg-slate-200 dark:hover:bg-slate-600 rounded transition">
                          <MoreVertical className="w-4 h-4 text-gray-500" />
                        </button>
                      </td>
                    </tr>
                    <tr className="hover:bg-slate-50 dark:hover:bg-slate-700 transition">
                      <td className="py-3 px-3 font-medium flex items-center gap-3">
                        <span className="w-8 h-8 rounded-full bg-green-600 text-white flex items-center justify-center text-xs font-bold">LC</span> 
                        Luz Caballero
                      </td>
                      <td className="py-3 px-3 text-gray-700 dark:text-gray-300">0983 624439</td>
                      <td className="py-3 px-3">
                        <span className="px-2 py-1 rounded-full bg-green-100 text-green-700 text-xs font-medium">Activo</span>
                      </td>
                      <td className="py-3 px-3 text-gray-700 dark:text-gray-300">28/07/2025</td>
                      <td className="py-3 px-3">
                        <button className="p-1 hover:bg-slate-200 dark:hover:bg-slate-600 rounded transition">
                          <MoreVertical className="w-4 h-4 text-gray-500" />
                        </button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          {/* Vista Rápida del Embudo */}
          <section className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl p-6 shadow-xl mb-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Vista Rápida del Embudo</h3>
              <a href="#" className="flex items-center gap-1 text-primary hover:underline text-sm font-medium">
                <Eye className="w-4 h-4" />
                Ver CRM completo
              </a>
            </div>
            
            <div className="flex flex-nowrap gap-4 overflow-x-auto items-center">
              {/* Bloco 1: Contactos */}
              <div className="min-w-[160px] rounded-lg bg-[oklch(0.6231_0.1880_259.8145)] p-4 flex flex-col items-center justify-center">
                <div className="text-3xl font-bold text-white">35</div>
                <div className="text-sm font-medium text-white">Contactos</div>
                <div className="text-xs text-white">ø 45s resp.</div>
              </div>
              {/* Arrow + Conversão 1 */}
              <div className="flex flex-col items-center min-w-[40px] justify-center">
                <ArrowUpRight className="w-6 h-6 text-muted-foreground" />
                <span className="text-xs text-muted-foreground mt-1">20%</span>
              </div>
              {/* Bloco 2: Calificados */}
              <div className="min-w-[160px] rounded-lg bg-[oklch(0.9514_0.0250_236.8242)] p-4 flex flex-col items-center justify-center">
                <div className="text-3xl font-bold text-[oklch(0.3791_0.1378_265.5222)]">7</div>
                <div className="text-sm font-medium text-[oklch(0.3791_0.1378_265.5222)]">Calificados</div>
                <div className="text-xs text-[oklch(0.3791_0.1378_265.5222)]">~2 días</div>
              </div>
              {/* Arrow + Conversão 2 */}
              <div className="flex flex-col items-center min-w-[40px] justify-center">
                <ArrowUpRight className="w-6 h-6 text-muted-foreground" />
                <span className="text-xs text-muted-foreground mt-1">71%</span>
              </div>
              {/* Bloco 3: Presupuesto */}
              <div className="min-w-[160px] rounded-lg bg-yellow-500 p-4 flex flex-col items-center justify-center">
                <div className="text-3xl font-bold text-white">5</div>
                <div className="text-sm font-medium text-white">Presupuesto</div>
                <div className="text-xs text-white">~3 días</div>
              </div>
              {/* Arrow + Conversão 3 */}
              <div className="flex flex-col items-center min-w-[40px] justify-center">
                <ArrowUpRight className="w-6 h-6 text-muted-foreground" />
                <span className="text-xs text-muted-foreground mt-1">60%</span>
              </div>
              {/* Bloco 4: Agendado */}
              <div className="min-w-[160px] rounded-lg bg-green-500 p-4 flex flex-col items-center justify-center">
                <div className="text-3xl font-bold text-white">3</div>
                <div className="text-sm font-medium text-white">Agendado</div>
                <div className="text-xs text-white">~1 día</div>
              </div>
              {/* Arrow + Conversão 4 */}
              <div className="flex flex-col items-center min-w-[40px] justify-center">
                <ArrowUpRight className="w-6 h-6 text-muted-foreground" />
              </div>
              {/* Bloco 5: Perdidos */}
              <div className="min-w-[160px] rounded-lg bg-[oklch(0.6368_0.2078_25.3313)] p-4 flex flex-col items-center justify-center">
                <div className="text-3xl font-bold text-white">2</div>
                <div className="text-sm font-medium text-white">Perdidos</div>
                <div className="text-xs text-white">---</div>
              </div>
            </div>
            <div className="flex items-center gap-2 mt-4">
              <Bell className="w-5 h-5 text-cyan-500" />
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Tiempo Promedio:</span>
              <span className="text-base font-bold text-gray-900 dark:text-gray-100">2.3 días</span>
              <span className="text-xs text-gray-500 dark:text-gray-400">(Lead a primera cita)</span>
            </div>
          </section>
          {/* Gráficos: Rendimiento Financiero + Leads Nuevos vs Convertidos */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            {/* Rendimiento Financiero */}
            <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl p-6 shadow-xl">
              <FinancialChart />
            </div>

            {/* Leads Nuevos vs Convertidos */}
            <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl p-6 shadow-xl">
              <section className="h-full w-full flex flex-col">
                <h2 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-4">Leads Nuevos vs Convertidos</h2>
                <LeadsBarChart />
                <div className="flex gap-6 mt-4 flex-wrap">
                  <div className="flex items-center gap-2">
                    <span className="inline-block w-4 h-2 rounded bg-[#e4a800]"></span>
                    <span className="text-xs text-gray-700 dark:text-gray-300">Leads Nuevos</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="inline-block w-4 h-2 rounded bg-[#00d7aa]"></span>
                    <span className="text-xs text-gray-700 dark:text-gray-300">Convertidos</span>
                  </div>
                </div>
              </section>
            </div>
          </div>
          {/* Análise Detalhada e Operações do Dia */}
          <section className="grid grid-cols-1 gap-6 mb-6">
            <div className="flex flex-col lg:flex-row gap-6">
              {/* Carrossel de Profissionais */}
              <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl p-6 shadow-xl flex-1 min-w-0">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-2xl font-semibold text-[#333333] dark:text-gray-100">Nuestros Profesionales</h2>
                  <a href="#" className="text-sm text-[#3b82f6] dark:text-blue-400 font-medium hover:underline">Ver todos</a>
                </div>
                <DoctorCarousel />
              </div>
              {/* Card de Ranking de Satisfação */}
              <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl p-6 shadow-xl w-full lg:w-80 flex flex-col gap-4 flex-shrink-0 mt-6 lg:mt-0">
                <div className="flex items-center gap-2 mb-2">
                  <Star className="w-6 h-6 text-yellow-400" />
                  <span className="font-semibold text-base text-gray-900 dark:text-gray-100">Ranking de Satisfacción</span>
                  <span className="ml-auto bg-yellow-100 text-yellow-700 text-xs font-medium rounded-full px-2 py-0.5">Mes</span>
                </div>
                <ol className="flex-1 flex flex-col gap-3">
                  <li className="flex items-center gap-3 p-2 rounded-lg bg-yellow-50 dark:bg-yellow-900/20">
                    <span className="text-2xl">🥇</span>
                    <div className="flex flex-col">
                      <span className="font-semibold text-gray-900 dark:text-gray-100">Dra. Camila Alves</span>
                      <span className="text-xs text-gray-600 dark:text-gray-400">Nota: <span className="font-bold text-yellow-600">4.9</span> <span className="text-yellow-400">★</span> (321 evaluaciones)</span>
                    </div>
                  </li>
                  <li className="flex items-center gap-3 p-2 rounded-lg bg-gray-50 dark:bg-gray-800/50">
                    <span className="text-2xl">🥈</span>
                    <div className="flex flex-col">
                      <span className="font-semibold text-gray-900 dark:text-gray-100">Dr. Juan Pereira</span>
                      <span className="text-xs text-gray-600 dark:text-gray-400">Nota: <span className="font-bold text-yellow-600">4.8</span> <span className="text-yellow-400">★</span> (289 evaluaciones)</span>
                    </div>
                  </li>
                  <li className="flex items-center gap-3 p-2 rounded-lg bg-yellow-50 dark:bg-yellow-900/20">
                    <span className="text-2xl">🥉</span>
                    <div className="flex flex-col">
                      <span className="font-semibold text-gray-900 dark:text-gray-100">Dra. Mariana Costa</span>
                      <span className="text-xs text-gray-600 dark:text-gray-400">Nota: <span className="font-bold text-yellow-600">4.7</span> <span className="text-yellow-400">★</span> (310 evaluaciones)</span>
                    </div>
                  </li>
                </ol>
                <button className="mt-2 px-4 py-2 rounded-lg bg-yellow-400 text-white font-medium hover:bg-yellow-500 transition text-sm shadow focus:ring-2 focus:ring-yellow-300">Ver ranking completo</button>
                <span className="text-xs text-gray-400 dark:text-gray-500 mt-2">Nota basada en las evaluaciones de los pacientes en el mes actual.</span>
              </div>
            </div>
          </section>
                  {/* RESUMO OPERACIONAL - NOVA SEÇÃO */}
                  <section className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl p-6 shadow-xl mb-6">
                    <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                      <Activity className="w-6 h-6 text-blue-600" />
                      Resumen Operacional
                    </h2>
                    {/* Linha 1: Mensagem da Semana */}
                    <div className="mb-6">
                      <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-700 rounded-xl p-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4 shadow-md">
                        <div className="flex items-center gap-3 mb-2 md:mb-0">
                          <Lightbulb className="w-10 h-10 text-yellow-400" />
                          <div>
                            <div className="font-semibold text-base text-blue-900 dark:text-blue-300 flex items-center gap-2">Mensaje de la Semana <span className="bg-blue-100 dark:bg-blue-800 text-blue-700 dark:text-blue-300 text-xs font-medium rounded-full px-2 py-0.5">Semana 30</span></div>
                            <div className="text-sm text-gray-800 dark:text-gray-200 mt-1">Meta: <span className="font-bold">15 nuevas consultas por odontólogo</span></div>
                            <div className="flex items-center gap-2 mt-1">
                              <div className="flex-1 h-2 bg-blue-200 dark:bg-blue-800 rounded-full overflow-hidden relative">
                                <div 
                                  className="h-full bg-gradient-to-r from-blue-500 to-blue-600 rounded-full transition-all duration-1000 ease-out relative animate-pulse"
                                  style={{ width: '66.67%' }}
                                >
                                  {/* Efeito de brilho sutil */}
                                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent rounded-full"></div>
                                </div>
                              </div>
                              <span className="text-xs text-blue-900 dark:text-blue-300 font-semibold min-w-[40px] text-right">10/15</span>
                              <span className="text-xs text-blue-600 dark:text-blue-400 font-medium">(67%)</span>
                            </div>
                            <div className="text-xs text-blue-700 dark:text-blue-400 mt-1">Consejo: Enfocar en leads calientes</div>
                          </div>
                        </div>
                        <button className="mt-2 md:mt-0 px-4 py-2 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-700 transition text-sm shadow focus:ring-2 focus:ring-blue-300">Ver detalles</button>
                      </div>
                    </div>
                    {/* Linha 2: Cards lado a lado */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      {/* Pacientes Ativos */}
                      <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-6 flex flex-col items-center shadow-md">
                        <div className="flex items-center gap-2 mb-2">
                          <Users className="w-6 h-6 text-violet-600" />
                          <span className="font-semibold text-base text-gray-900 dark:text-gray-100">Pacientes Ativos</span>
                        </div>
                        <div className="relative w-24 h-24 mb-2">
                          <svg viewBox="0 0 100 100" className="w-full h-full">
                            <circle cx="50" cy="50" r="40" fill="none" stroke="#e5e7eb" strokeWidth="10"/>
                            <circle cx="50" cy="50" r="40" fill="none" stroke="#6366f1" strokeWidth="10" strokeDasharray="251.2" strokeDashoffset="75.36" strokeLinecap="round"/>
                          </svg>
                          <div className="absolute inset-0 flex items-center justify-center">
                            <span className="text-xl font-bold text-violet-700 dark:text-violet-400">70%</span>
                          </div>
                        </div>
                        <span className="text-xs text-gray-700 dark:text-gray-300 mb-1">140 de 200 pacientes</span>
                        <span className="text-xs text-green-600 font-semibold flex items-center gap-1"><ArrowUpRight className="w-4 h-4" />+5% vs semana passada</span>
                        <button className="mt-2 px-3 py-1 rounded bg-violet-100 dark:bg-violet-900/20 text-violet-700 dark:text-violet-400 text-xs font-medium hover:bg-violet-200 dark:hover:bg-violet-800/30 transition">Ver lista</button>
                      </div>
                      {/* Consultas por Especialidade */}
                      <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-6 flex flex-col shadow-md">
                        <div className="flex items-center gap-2 mb-2">
                          <Stethoscope className="w-6 h-6 text-cyan-600" />
                          <span className="font-semibold text-base text-gray-900 dark:text-gray-100">Consultas por Especialidades</span>
                        </div>
                        <div className="flex flex-col gap-2 mt-2">
                          <div className="flex items-center gap-2">
                            <AlignVerticalDistributeEnd className="w-4 h-4 text-blue-500" />
                            <span className="w-20 text-xs text-gray-700 dark:text-gray-300">Ortodoncia</span>
                            <div className="flex-1 h-3 rounded bg-blue-100 dark:bg-blue-900/30 relative">
                              <div className="absolute left-0 top-0 h-3 rounded bg-blue-500 text-sm" style={{width: '70%'}}></div>
                            </div>
                            <span className="w-8 text-sm text-right font-medium">70 <span className="text-green-600 text-xs font-semibold ml-1">+10%</span></span>
                          </div>
                          <div className="flex items-center gap-2">
                            <AlignVerticalDistributeEnd className="w-4 h-4 text-green-500" />
                            <span className="w-20 text-xs text-gray-700 dark:text-gray-300">Endodoncia</span>
                            <div className="flex-1 h-3 rounded bg-green-100 dark:bg-green-900/30 relative">
                              <div className="absolute left-0 top-0 h-3 rounded bg-green-500 text-sm" style={{width: '50%'}}>
                              </div>
                            </div>
                            <span className="w-8 text-sm text-right font-medium">50 <span className="text-red-600 text-xs font-semibold ml-1">-5%</span></span>
                          </div>
                          <div className="flex items-center gap-2">
                            <AlignVerticalDistributeEnd className="w-4 h-4 text-yellow-500" />
                            <span className="w-20 text-xs text-gray-700 dark:text-gray-300">Periodoncia</span>
                            <div className="flex-1 h-3 rounded bg-yellow-100 dark:bg-yellow-900/30 relative">
                              <div className="absolute left-0 top-0 h-3 rounded bg-yellow-500 text-sm" style={{width: '30%'}}></div>
                            </div>
                            <span className="w-8 text-sm text-right font-medium">30 <span className="text-green-600 text-xs font-semibold ml-1">+2%</span></span>
                          </div>
                        </div>
                        <button className="mt-3 px-3 py-1 rounded bg-cyan-100 dark:bg-cyan-900/20 text-cyan-700 dark:text-cyan-400 text-xs font-medium hover:bg-cyan-200 dark:hover:bg-cyan-800/30 transition">Ver detalles</button>
                      </div>
                      {/* Alertas/Sugestões */}
                      <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-6 flex flex-col shadow-md">
                        <div className="flex items-center gap-2 mb-5">
                          <AlertTriangle className="w-6 h-6 text-yellow-500" />
                          <span className="font-semibold text-base text-gray-900 dark:text-gray-100">Alertas & Sugestiones</span>
                        </div>
                        <ul className="flex-1 flex flex-col gap-2 mt-2 text-sm">
                          <li className="flex items-center gap-2 text-yellow-700 dark:text-yellow-400"><Target className="w-4 h-4" />Faltan 5 consultas para la meta</li>
                          <li className="flex items-center gap-2 text-red-600 dark:text-red-400"><TrendingDown className="w-4 h-4" />Endodoncia baja 5% esta semana</li>
                          <li className="flex items-center gap-2 text-blue-700 dark:text-blue-400"><Bell className="w-4 h-4" />3 pacientes sin retorno</li>
                          <li className="flex items-center gap-2 text-fuchsia-700 dark:text-fuchsia-400"><Gift className="w-4 h-4" />2 pacientes cumplen años esta semana</li>
                        </ul>
                        <div className="flex gap-2 mt-3">
                          <button className="px-3 py-1 rounded bg-yellow-100 dark:bg-yellow-900/20 text-yellow-700 dark:text-yellow-400 text-xs font-medium hover:bg-yellow-200 dark:hover:bg-yellow-800/30 transition">Seguir</button>
                          <button className="px-3 py-1 rounded bg-blue-100 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400 text-xs font-medium hover:bg-blue-200 dark:hover:bg-blue-800/30 transition">Enviar recordatorio</button>
                        </div>
                      </div>
                    </div>
                  </section>
        </main> 
      </div>
    </div>
  );
}
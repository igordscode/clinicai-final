"use client";

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
  UserPlus, CalendarPlus, DollarSign, Megaphone, FileText, Folder, Activity, Star, BadgeDollarSign, CheckCircle, ArrowUpRight, ArrowLeftRight, ArrowDownRight, TrendingDown, CreditCard, BarChart2, Smile, MessageCircle, RefreshCcw, Share2, Target, TrendingUp, Users, Stethoscope, Lightbulb, Eye, MoreVertical, Gift, Bell, AlertTriangle, Rocket, AlignVerticalDistributeEnd
} from 'lucide-react';

export default function Dashboard() {
  const [robotSmiling, setRobotSmiling] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const robotRef = useRef<HTMLDivElement>(null);
  const { showToast } = useToast();

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

  return (
    <div className="font-sans antialiased h-screen bg-background flex">
      {/* Sidebar Fixa */}
      <Sidebar 
        userName="Camila" 
        isCollapsed={sidebarCollapsed}
        onToggle={() => setSidebarCollapsed(!sidebarCollapsed)}
      />
      {/* Main Content */}
      <div className="flex flex-col flex-1 h-screen">
        {/* Header */}
        <Header userName="Camila" notifications={3} />
        {/* Main Area com scroll independente */}
        <main className="flex-1 px-6 md:px-8 py-6 bg-gradient-to-br from-slate-50 via-white to-blue-50/30 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900/30 overflow-y-auto scrollbar-thin">
          
          {/* ===== WELCOME BANNER - RESUMEN OPERACIONAL ===== */}
          <section className="relative mb-8 overflow-hidden">
            <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl p-4 md:p-6 lg:p-8 shadow-xl">
              <div className="flex flex-col xl:flex-row xl:items-start xl:justify-between gap-6">
                {/* Left Content - Expandido */}
                <div className="flex-1">
                  {/* Header Principal */}
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-12 h-12 md:w-14 md:h-14 lg:w-16 lg:h-16 bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-700 rounded-2xl flex items-center justify-center shadow-xl relative overflow-hidden transform rotate-3 hover:rotate-0 transition-transform duration-300 container-3d">
                      {/* Efeito 3D - Sombra interna */}
                      <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent rounded-xl"></div>
                      {/* Robô simples */}
                      <div 
                        ref={robotRef}
                        className="relative z-10 flex items-center justify-center robot-container"
                        onMouseEnter={() => setRobotSmiling(true)}
                        onMouseLeave={() => setRobotSmiling(false)}
                      >
                        {/* Cabeça do robô */}
                        <div className="w-4 h-4 md:w-5 md:h-5 lg:w-6 lg:h-6 bg-gradient-to-br from-gray-100 to-white rounded-full relative shadow-inner">
                          {/* Sensores laterais */}
                          <div className="absolute top-1 left-0.5 w-0.5 h-0.5 bg-blue-400 rounded-full animate-pulse"></div>
                          <div className="absolute top-1 right-0.5 w-0.5 h-0.5 bg-blue-400 rounded-full animate-pulse"></div>
                          {/* Olhos principais */}
                          <div className="absolute top-2 left-1.5 w-1.5 h-1.5 bg-black rounded-full flex items-center justify-center overflow-hidden">
                            <div className="w-0.5 h-0.5 bg-blue-400 rounded-full animate-pulse"></div>
                          </div>
                          <div className="absolute top-2 right-1.5 w-1.5 h-1.5 bg-black rounded-full flex items-center justify-center overflow-hidden">
                            <div className="w-0.5 h-0.5 bg-blue-400 rounded-full animate-pulse"></div>
                          </div>
                          {/* Boca */}
                          <div className={`absolute bottom-1 left-1/2 transform -translate-x-1/2 transition-all duration-300 ${
                            robotSmiling 
                              ? 'w-2.5 h-0.5 bg-gray-600 rounded-full' 
                              : 'w-2 h-0.5 bg-gray-600 rounded-full'
                          }`}></div>
                        </div>
                        
                        {/* Braço acenando */}
                        <div className={`absolute -right-1 top-1 w-2 h-4 bg-gradient-to-br from-gray-200 to-white rounded-full transform rotate-12 transition-all duration-300 ${
                          robotSmiling ? 'scale-110 animate-wave-once' : 'robot-arm-subtle'
                        }`}>
                          {/* Mão */}
                          <div className="absolute bottom-0 w-2 h-1.5 bg-gradient-to-br from-gray-200 to-white rounded-full transform rotate-45">
                            {/* Dedos */}
                            <div className="absolute -top-0.5 left-0.5 w-0.5 h-0.5 bg-gray-300 rounded-full"></div>
                            <div className="absolute -top-0.5 right-0.5 w-0.5 h-0.5 bg-gray-300 rounded-full"></div>
                          </div>
                        </div>
                      </div>
                      {/* Brilho 3D */}
                      <div className="absolute top-2 left-2 w-3 h-3 bg-white/40 rounded-full blur-sm"></div>
                    </div>
                    <div>
                      <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-slate-900 via-blue-800 to-purple-800 dark:from-slate-100 dark:via-blue-200 dark:to-purple-200 bg-clip-text text-transparent mb-2">
                        Hola, Camila
                      </h1>
                      <p className="text-slate-600 dark:text-slate-400 text-base md:text-lg lg:text-xl font-medium">Resumen Operacional del Día</p>
                    </div>
                  </div>
                  
                  {/* Status Indicators - Expandidos */}
                  <div className="flex flex-wrap items-center gap-3 md:gap-4 lg:gap-6 text-xs md:text-sm lg:text-base mb-6">
                    <div className="flex items-center gap-3 text-emerald-600 dark:text-emerald-400">
                      <div className="w-3 h-3 bg-emerald-500 rounded-full animate-pulse"></div>
                      <span className="font-semibold">Sistema Online</span>
                    </div>
                    <div className="flex items-center gap-3 text-blue-600 dark:text-blue-400">
                      <svg className="w-4 h-4 lg:w-5 lg:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span className="font-medium">Última actualización: hace 2 min</span>
                    </div>
                    <div className="flex items-center gap-3 text-purple-600 dark:text-purple-400">
                      <div className="w-4 h-4 bg-purple-500 rounded-full flex items-center justify-center">
                        <div className="w-2 h-2 bg-white rounded-full"></div>
                      </div>
                      <span className="font-medium">Clínica Operacional</span>
                    </div>
                    <div className="flex items-center gap-3 text-amber-600 dark:text-amber-400">
                      <svg className="w-4 h-4 lg:w-5 lg:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                      </svg>
                      <span className="font-medium">Horario: 8:00 - 18:00</span>
                    </div>
                    <div className="flex items-center gap-3 text-cyan-600 dark:text-cyan-400">
                      <svg className="w-4 h-4 lg:w-5 lg:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      <span className="font-medium">Ubicación: Asunción Centro</span>
                    </div>
                  </div>
                </div>

                {/* Right Content - Dados Diários */}
                <div className="flex flex-col gap-3 min-w-[300px]">
                  {/* Date Selector e KPIs Diários */}
                  <div className="flex items-center gap-3">
                    <select className="px-3 py-2 bg-white/80 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-300 transition-all duration-200 text-slate-900 dark:text-slate-100">
                      <option>Julio 2025</option>
                      <option>Junio 2025</option>
                      <option>Mayo 2025</option>
                    </select>
                    <button className="p-2 rounded-xl bg-slate-50 dark:bg-slate-700 hover:bg-slate-100 dark:hover:bg-slate-600 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 transition-all duration-200 hover:scale-105">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                      </svg>
                    </button>
                    <div className="flex items-center gap-2 px-3 py-2 bg-gradient-to-r from-emerald-50 to-green-50 dark:from-emerald-900/20 dark:to-green-900/20 border border-emerald-200 dark:border-emerald-700/50 rounded-xl">
                      <div className="w-3 h-3 bg-emerald-500 rounded-full"></div>
                      <span className="text-sm font-semibold text-emerald-700 dark:text-emerald-300">6</span>
                      <span className="text-xs text-emerald-600 dark:text-emerald-400">citas hoy</span>
                    </div>
                    <div className="flex items-center gap-2 px-3 py-2 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 border border-blue-200 dark:border-blue-700/50 rounded-xl">
                      <div className="w-3 h-3 bg-blue-500 rounded-full animate-pulse"></div>
                      <span className="text-sm font-semibold text-blue-700 dark:text-blue-300">7/8</span>
                      <span className="text-xs text-blue-600 dark:text-blue-400">online</span>
                    </div>
                  </div>

                  {/* Próxima Consulta - Dados Real-time */}
                  <div className="bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20 border border-indigo-200 dark:border-indigo-700/50 rounded-lg p-3 relative overflow-hidden group hover:scale-[1.02] transition-all duration-300">
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    <div className="relative z-10">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-semibold text-indigo-700 dark:text-indigo-300 flex items-center gap-2">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          Próxima Cita
                        </span>
                        <span className="text-xs text-indigo-600 dark:text-indigo-400 font-medium">en 15 min</span>
                      </div>
                      <div className="text-xs text-indigo-600 dark:text-indigo-400">
                        <div>• Dr. García - Consulta General</div>
                        <div>• Paciente: María López</div>
                        <div>• Sala: Consultório 3</div>
                      </div>
                    </div>
                  </div>

                  {/* Performance Financeira Diária */}
                  <div className="bg-gradient-to-br from-emerald-50 to-green-50 dark:from-emerald-900/20 dark:to-green-900/20 border border-emerald-200 dark:border-emerald-700/50 rounded-lg p-3 relative overflow-hidden group hover:scale-[1.02] transition-all duration-300">
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    <div className="relative z-10">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-semibold text-emerald-700 dark:text-emerald-300 flex items-center gap-2">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                          </svg>
                          Finanzas del Día
                        </span>
                        <span className="text-xs text-emerald-600 dark:text-emerald-400 font-medium">Hasta ahora</span>
                      </div>
                      <div className="space-y-1">
                        <div className="text-xs text-emerald-600 dark:text-emerald-400">• Facturado: <span className="font-semibold">Gs. 2.4M</span></div>
                        <div className="text-xs text-emerald-600 dark:text-emerald-400">• Cobrado: <span className="font-semibold">Gs. 1.8M</span></div>
                        <div className="text-xs text-emerald-600 dark:text-emerald-400">• Pendiente: <span className="font-semibold">Gs. 600K</span></div>
                      </div>
                    </div>
                  </div>

                  {/* Quick Status Cards */}
                  <div className="grid grid-cols-3 gap-2">
                    {/* Status: Citas Hoy */}
                    <div className="bg-gradient-to-br from-emerald-50 to-emerald-100 dark:from-emerald-900/30 dark:to-emerald-800/20 border border-emerald-200 dark:border-emerald-700/50 rounded-lg p-2 text-center relative overflow-hidden group hover:scale-105 transition-all duration-300">
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                      <div className="relative z-10">
                        <div className="text-lg font-bold text-emerald-700 dark:text-emerald-300">6</div>
                        <div className="text-xs text-emerald-600 dark:text-emerald-400 font-medium">Citas Hoy</div>
                      </div>
                    </div>
                    
                    {/* Status: Pacientes en Espera */}
                    <div className="bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-900/30 dark:to-orange-800/20 border border-orange-200 dark:border-orange-700/50 rounded-lg p-2 text-center relative overflow-hidden group hover:scale-105 transition-all duration-300">
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                      <div className="relative z-10">
                        <div className="text-lg font-bold text-orange-700 dark:text-orange-300">8</div>
                        <div className="text-xs text-orange-600 dark:text-orange-400 font-medium">En Espera</div>
                      </div>
                    </div>
                    
                    {/* Status: Urgencias */}
                    <div className="bg-gradient-to-br from-red-50 to-red-100 dark:from-red-900/30 dark:to-red-800/20 border border-red-200 dark:border-red-700/50 rounded-lg p-2 text-center relative overflow-hidden group hover:scale-105 transition-all duration-300">
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                      <div className="relative z-10">
                        <div className="text-lg font-bold text-red-700 dark:text-red-300">2</div>
                        <div className="text-xs text-red-600 dark:text-red-400 font-medium">Urgencias</div>
                      </div>
                    </div>
                  </div>

                  {/* Ocupação da Clínica */}
                  <div className="bg-gradient-to-br from-purple-50 to-violet-50 dark:from-purple-900/20 dark:to-violet-900/20 border border-purple-200 dark:border-purple-700/50 rounded-lg p-3 relative overflow-hidden group hover:scale-[1.02] transition-all duration-300">
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    <div className="relative z-10">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-semibold text-purple-700 dark:text-purple-300">Ocupación Clínica</span>
                        <span className="text-xs text-purple-600 dark:text-purple-400 font-medium">85%</span>
                      </div>
                      <div className="w-full h-2 bg-purple-200 dark:bg-purple-800 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-gradient-to-r from-purple-500 to-violet-500 rounded-full transition-all duration-1000 ease-out relative"
                          style={{ width: '85%' }}
                        >
                          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent rounded-full"></div>
                        </div>
                      </div>
                      <div className="flex items-center justify-between mt-1">
                        <span className="text-xs text-purple-600 dark:text-purple-400">17/20 consultórios</span>
                        <span className="text-xs text-purple-500 dark:text-purple-400 font-medium">3 disponibles</span>
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-wrap gap-2">
                    <button className="flex items-center gap-2 px-3 py-2 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 text-sm relative overflow-hidden transform hover:rotate-1">
                      <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent rounded-xl"></div>
                      <div className="relative z-10 flex items-center gap-2">
                        <UserPlus className="w-4 h-4" />
                        Nuevo Lead
                      </div>
                      <div className="absolute top-1 left-1 w-2 h-2 bg-white/40 rounded-full blur-sm"></div>
                    </button>
                    <button className="flex items-center gap-2 px-3 py-2 rounded-xl bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 text-emerald-700 font-medium transition-all duration-300 hover:scale-105 text-sm relative overflow-hidden transform hover:rotate-1 shadow-md hover:shadow-lg">
                      <div className="absolute inset-0 bg-gradient-to-br from-white/30 to-transparent rounded-xl"></div>
                      <div className="relative z-10 flex items-center gap-2">
                        <CalendarPlus className="w-4 h-4" />
                        Nueva Cita
                      </div>
                      <div className="absolute top-1 left-1 w-2 h-2 bg-white/50 rounded-full blur-sm"></div>
                    </button>
                    <button className="flex items-center gap-2 px-3 py-2 rounded-xl bg-amber-50 hover:bg-amber-100 border border-amber-200 text-amber-700 font-medium transition-all duration-300 hover:scale-105 text-sm relative overflow-hidden transform hover:rotate-1 shadow-md hover:shadow-lg">
                      <div className="absolute inset-0 bg-gradient-to-br from-white/30 to-transparent rounded-xl"></div>
                      <div className="relative z-10 flex items-center gap-2">
                        <DollarSign className="w-4 h-4" />
                        Ver Finanzas
                      </div>
                      <div className="absolute top-1 left-1 w-2 h-2 bg-white/50 rounded-full blur-sm"></div>
                    </button>
                    <button className="flex items-center gap-2 px-3 py-2 rounded-xl bg-purple-50 hover:bg-purple-100 border border-purple-200 text-purple-700 font-medium transition-all duration-300 hover:scale-105 text-sm relative overflow-hidden transform hover:rotate-1 shadow-md hover:shadow-lg">
                      <div className="absolute inset-0 bg-gradient-to-br from-white/30 to-transparent rounded-xl"></div>
                      <div className="relative z-10 flex items-center gap-2">
                        <Megaphone className="w-4 h-4" />
                        Lanzar Campaña
                      </div>
                      <div className="absolute top-1 left-1 w-2 h-2 bg-white/50 rounded-full blur-sm"></div>
                    </button>
                    <button className="flex items-center gap-2 px-3 py-2 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-700 font-medium transition-all duration-300 hover:scale-105 text-sm relative overflow-hidden transform hover:rotate-1 shadow-md hover:shadow-lg">
                      <div className="absolute inset-0 bg-gradient-to-br from-white/30 to-transparent rounded-xl"></div>
                      <div className="relative z-10 flex items-center gap-2">
                        <FileText className="w-4 h-4" />
                        Reporte del Mes
                      </div>
                      <div className="absolute top-1 left-1 w-2 h-2 bg-white/50 rounded-full blur-sm"></div>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* ===== KPIs DETALHADOS - MÉTRICAS SEMANAIS/MENSAIS ===== */}
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
                      <div className="absolute inset-0 bg-gradient-to-br from-white/30 to-transparent rounded-2xl"></div>
                      <div className="relative z-10 icon-glow">
                        <BarChart2 className="w-6 h-6 text-white" />
                      </div>
                      <div className="absolute top-2 left-2 w-3 h-3 bg-white/50 rounded-full blur-sm"></div>
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 animate-shimmer"></div>
                    </div>
                    <div>
                      <h2 className="text-2xl lg:text-3xl font-bold bg-gradient-to-r from-slate-800 via-indigo-700 to-purple-700 dark:from-slate-100 dark:via-indigo-300 dark:to-purple-300 bg-clip-text text-transparent mb-2">
                        Indicadores Clave
                      </h2>
                      <p className="text-slate-600 dark:text-slate-400 text-base font-medium">Métricas detalhadas para análise de performance</p>
                    </div>
                  </div>
                </div>

                {/* Grupo: Financiero - MÉTRICAS MENSAIS */}
                <div className="mb-10">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 bg-gradient-to-br from-blue-600 via-indigo-600 to-blue-800 rounded-xl flex items-center justify-center shadow-lg relative overflow-hidden transform hover:scale-105 transition-all duration-300 container-3d">
                      <div className="absolute inset-0 bg-gradient-to-br from-white/25 to-transparent rounded-xl"></div>
                      <div className="relative z-10 icon-glow">
                        <DollarSign className="w-5 h-5 text-white" />
                      </div>
                      <div className="absolute top-1 left-1 w-2 h-2 bg-white/50 rounded-full blur-sm"></div>
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 animate-shimmer"></div>
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold bg-gradient-to-r from-blue-800 to-indigo-800 dark:from-blue-200 dark:to-indigo-200 bg-clip-text text-transparent mb-1">
                        Financiero
                      </h3>
                      <p className="text-slate-600 dark:text-slate-400 text-base font-medium">Métricas financeiras mensais da clínica</p>
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

                {/* Grupo: Atención - MÉTRICAS MENSAIS */}
                <div className="mb-10">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 bg-gradient-to-br from-emerald-600 via-teal-600 to-cyan-700 rounded-xl flex items-center justify-center shadow-lg relative overflow-hidden transform hover:scale-105 transition-all duration-300 container-3d">
                      <div className="absolute inset-0 bg-gradient-to-br from-white/25 to-transparent rounded-xl"></div>
                      <div className="relative z-10 icon-glow">
                        <Stethoscope className="w-5 h-5 text-white" />
                      </div>
                      <div className="absolute top-1 left-1 w-2 h-2 bg-white/50 rounded-full blur-sm"></div>
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 animate-shimmer"></div>
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold bg-gradient-to-r from-emerald-700 to-teal-700 dark:from-emerald-300 dark:to-teal-300 bg-clip-text text-transparent mb-1">
                        Atención
                      </h3>
                      <p className="text-slate-600 dark:text-slate-400 text-base font-medium">Consultas e atendimento mensal</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
                    <div className="kpi-card-modern card-entrance" style={{ animationDelay: '0.5s' }}>
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
                    <div className="kpi-card-modern card-entrance" style={{ animationDelay: '0.6s' }}>
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
                    <div className="kpi-card-modern card-entrance" style={{ animationDelay: '0.7s' }}>
                      <KpiCard
                        title="Tasa de Ocupación (Mes)"
                        value="78%"
                        change="+4%"
                        changeType="up"
                        changeText="vs Mes pasado"
                        icon={<Activity className="w-4 h-4" />}
                        colorClass="text-emerald-700"
                        borderClass="border-emerald-700/30"
                        groupColor="green"
                      />
                    </div>
                    <div className="kpi-card-modern card-entrance" style={{ animationDelay: '0.8s' }}>
                      <KpiCard
                        title="Satisfacción (Mes)"
                        value="4.8★"
                        change="+0.2"
                        changeType="up"
                        changeText="vs Mes pasado"
                        icon={<Star className="w-4 h-4" />}
                        colorClass="text-emerald-700"
                        borderClass="border-emerald-700/30"
                        groupColor="green"
                      />
                    </div>
                  </div>
                </div>
              </>
            )}
          </section>

          {/* ===== GRÁFICOS E ANÁLISES HISTÓRICAS ===== */}
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 mb-6">
            <FinancialChart />
            <LeadsBarChart />
          </div>

          {/* ===== INSIGHTS E RECOMENDAÇÕES ===== */}
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 mb-6">
            <InsightsCard />
            <DoctorCarousel />
          </div>
        </main>
      </div>
      <ToastDemo />
    </div>
  );
} 
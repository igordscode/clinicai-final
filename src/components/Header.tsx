"use client";
import React from "react";
import ThemeToggle from "./ThemeToggle";
import { usePathname } from 'next/navigation';
import { BarChart2, Calendar, MessageCircle, CreditCard, Briefcase, Users, RefreshCcw, Star, Megaphone, DollarSign, Stethoscope, Target, Smile, User, UserCheck, Cog } from 'lucide-react';
import { useSession } from "next-auth/react";

type HeaderConfig = {
  [key: string]: {
    title: string;
    subtitle: string;
    icon: React.ComponentType<any>;
  };
};

const headerConfig: HeaderConfig = {
  '/': { title: 'Inicio', subtitle: 'Página principal do sistema', icon: BarChart2 },
  '/Dashboard': { title: 'Dashboard', subtitle: 'Visión general de la clínica', icon: BarChart2 },
  '/Dashboard/financeiro': { title: 'Dashboard', subtitle: 'Visión general de la clínica', icon: BarChart2 },
  '/Dashboard/atencion': { title: 'Dashboard', subtitle: 'Visión general de la clínica', icon: BarChart2 },
  '/Dashboard/marketing': { title: 'Dashboard', subtitle: 'Visión general de la clínica', icon: BarChart2 },
  '/Dashboard/experiencia': { title: 'Dashboard', subtitle: 'Visión general de la clínica', icon: BarChart2 },
  '/Agenda': { title: 'Agenda', subtitle: 'Gestione y visualice los agendamientos de la clínica', icon: Calendar },
  '/Chat': { title: 'Chat', subtitle: 'Comunicación en tiempo real con pacientes y equipo', icon: MessageCircle },
  '/CRM': { title: 'CRM', subtitle: 'Relación y seguimiento de clientes', icon: CreditCard },
  '/CRM/comercial': { title: 'CRM', subtitle: 'Relación y seguimiento de clientes', icon: CreditCard },
  '/CRM/pacientes': { title: 'CRM', subtitle: 'Relación y seguimiento de clientes', icon: CreditCard },
  '/CRM/remarketing': { title: 'CRM', subtitle: 'Relación y seguimiento de clientes', icon: CreditCard },
  '/CRM/feedback': { title: 'CRM', subtitle: 'Relación y seguimiento de clientes', icon: CreditCard },
  '/CRM/campanhas': { title: 'CRM', subtitle: 'Relación y seguimiento de clientes', icon: CreditCard },
  '/Pacientes': { title: 'Pacientes', subtitle: 'Lista y gestión de pacientes', icon: User },
  '/Doctores': { title: 'Doctores', subtitle: 'Lista y gestión de profesionales', icon: UserCheck },
  '/Configuraciones': { title: 'Configuraciones', subtitle: 'Preferencias y ajustes de la plataforma', icon: Cog },
};

interface HeaderProps {
  userName?: string;
  notifications?: number;
  onMenuClick?: () => void;
}

export const Header: React.FC<HeaderProps> = ({ userName = "Camila", notifications = 3, onMenuClick }) => {
  const { data: session } = useSession();
  const displayName = session?.user?.name || userName || "Usuário";
  const pathname = usePathname();
  const config = headerConfig[pathname] || headerConfig['/' + pathname.split('/')[1]] || headerConfig['/'];
  const Icon = config.icon;

  return (
    <header className="h-20 flex items-center justify-between px-6 md:px-8 bg-white dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700 shadow-lg sticky top-0 z-20 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-50/30 via-transparent to-purple-50/30"></div>
      <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-blue-400/5 to-purple-400/5 rounded-full blur-3xl"></div>
      
      <div className="relative z-10 flex items-center justify-between w-full">
        {/* Mobile Menu Button */}
        <button
          className="lg:hidden mr-2 p-2 rounded-xl bg-gradient-to-r from-slate-50 to-gray-50 dark:from-slate-800/50 dark:to-gray-800/50 border border-slate-200/60 dark:border-slate-600/60 text-slate-700 dark:text-slate-300 transition-all duration-300 hover:shadow-lg relative overflow-visible"
          onClick={onMenuClick}
          aria-label="Abrir menu"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
        {/* Left Section - Title */}
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-3 mr-2 overflow-visible">
            <div className="w-10 h-10 bg-gradient-to-br from-slate-800 to-slate-600 rounded-xl flex items-center justify-center shadow-lg relative overflow-hidden transform hover:rotate-1 transition-transform duration-300">
              {/* Efeito 3D - Sombra interna */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent rounded-xl"></div>
              {/* Ícone dinâmico */}
              <div className="relative z-10">
                <Icon className="w-6 h-6 text-white" />
              </div>
              {/* Brilho 3D */}
              <div className="absolute top-1 left-1 w-2 h-2 bg-white/40 rounded-full blur-sm"></div>
            </div>
            <div>
              <h1 className="text-xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 dark:from-slate-100 dark:to-slate-300 bg-clip-text text-transparent">
                {config.title}
              </h1>
              <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">{config.subtitle}</p>
            </div>
          </div>
        </div>

        {/* Center Section - Search */}
        <div className="flex-1 max-w-md mx-8 hidden lg:block">
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-300 opacity-0 group-hover:opacity-100"></div>
            <div className="relative flex items-center">
              <div className="absolute left-4 w-5 h-5 flex items-center justify-center text-slate-400 group-hover:text-slate-600 transition-colors">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <input 
                type="text" 
                placeholder="Buscar pacientes, consultas, relatórios..." 
                className="w-full pl-12 pr-4 py-3 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-300 transition-all duration-200 placeholder:text-slate-400 dark:placeholder:text-slate-500 group-hover:bg-white dark:group-hover:bg-slate-700 group-hover:shadow-sm text-slate-900 dark:text-slate-100"
              />
            </div>
          </div>
        </div>

        {/* Right Section - Actions & Profile */}
        <div className="flex items-center space-x-4">
          {/* Theme Toggle */}
          <div className="flex items-center">
            <ThemeToggle className="p-1 md:p-2" iconClassName="w-5 h-5 md:w-6 md:h-6" />
          </div>
          
          {/* Quick Actions */}
          <div className="hidden md:flex items-center space-x-2">
            <button className="p-2 rounded-xl bg-gradient-to-r from-emerald-50 to-teal-50 dark:from-emerald-900/20 dark:to-teal-900/20 hover:from-emerald-100 hover:to-teal-100 dark:hover:from-emerald-800/30 dark:hover:to-teal-800/30 border border-emerald-200/60 dark:border-emerald-700/60 text-emerald-700 dark:text-emerald-300 transition-all duration-300 hover:shadow-lg hover:scale-105 relative overflow-hidden transform hover:rotate-1">
              {/* Efeito 3D - Sombra interna */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/30 to-transparent dark:from-white/10 rounded-xl"></div>
              {/* Conteúdo */}
              <div className="relative z-10">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
              </div>
              {/* Brilho 3D */}
              <div className="absolute top-0.5 left-0.5 w-1.5 h-1.5 bg-white/50 dark:bg-white/20 rounded-full blur-sm"></div>
            </button>
            <button className="p-2 rounded-xl bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 hover:from-blue-100 hover:to-indigo-100 dark:hover:from-blue-800/30 dark:hover:to-indigo-800/30 border border-blue-200/60 dark:border-blue-700/60 text-blue-700 dark:text-blue-300 transition-all duration-300 hover:shadow-lg hover:scale-105 relative overflow-hidden transform hover:rotate-1">
              {/* Efeito 3D - Sombra interna */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/30 to-transparent dark:from-white/10 rounded-xl"></div>
              {/* Conteúdo */}
              <div className="relative z-10">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              {/* Brilho 3D */}
              <div className="absolute top-0.5 left-0.5 w-1.5 h-1.5 bg-white/50 dark:bg-white/20 rounded-full blur-sm"></div>
            </button>
          </div>

          {/* Notifications */}
          <div className="relative">
            <button className="relative p-2 rounded-xl bg-gradient-to-r from-slate-50 to-gray-50 dark:from-slate-800/50 dark:to-gray-800/50 hover:from-slate-100 hover:to-gray-100 dark:hover:from-slate-700/60 dark:hover:to-gray-700/60 border border-slate-200/60 dark:border-slate-600/60 text-slate-700 dark:text-slate-300 transition-all duration-300 hover:shadow-lg hover:scale-105 group relative overflow-hidden transform hover:rotate-1">
              {/* Efeito 3D - Sombra interna */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/30 to-transparent dark:from-white/10 rounded-xl"></div>
              {/* Conteúdo */}
              <div className="relative z-10">
                <svg className="w-5 h-5 group-hover:text-slate-800 dark:group-hover:text-slate-200 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-5 5v-5zM4.19 4.19A2 2 0 004 6v10a2 2 0 002 2h10a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-1.81 1.19z" />
                </svg>
              </div>
              {/* Brilho 3D */}
              <div className="absolute top-0.5 left-0.5 w-1.5 h-1.5 bg-white/50 dark:bg-white/20 rounded-full blur-sm"></div>
              {notifications > 0 && (
                <div className="absolute -top-1 -right-1 w-6 h-6 bg-gradient-to-r from-red-500 to-pink-500 text-white text-xs font-bold flex items-center justify-center rounded-full border-2 border-white dark:border-slate-800 shadow-lg animate-pulse">
                  {notifications}
                </div>
              )}
            </button>
          </div>

          {/* Mobile Search */}
          <button className="lg:hidden p-2 rounded-xl bg-gradient-to-r from-slate-50 to-gray-50 dark:from-slate-800/50 dark:to-gray-800/50 hover:from-slate-100 hover:to-gray-100 dark:hover:from-slate-700/60 dark:hover:to-gray-700/60 border border-slate-200/60 dark:border-slate-600/60 text-slate-700 dark:text-slate-300 transition-all duration-300 hover:shadow-lg relative overflow-hidden transform hover:rotate-1">
            {/* Efeito 3D - Sombra interna */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/30 to-transparent dark:from-white/10 rounded-xl"></div>
            {/* Conteúdo */}
            <div className="relative z-10">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            {/* Brilho 3D */}
            <div className="absolute top-0.5 left-0.5 w-1.5 h-1.5 bg-white/50 dark:bg-white/20 rounded-full blur-sm"></div>
          </button>

          {/* Profile */}
          <div className="flex items-center space-x-3">
            <div className="hidden sm:block text-right">
              <p className="text-sm font-semibold text-slate-800 dark:text-slate-200">{displayName}</p>
              <p className="text-xs text-slate-500 dark:text-slate-400">Administrador</p>
            </div>
            <div className="relative group cursor-pointer">
              <div className="w-10 h-10 bg-gradient-to-br from-slate-700 to-slate-800 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300 hover:scale-105 relative overflow-hidden transform hover:rotate-1">
                {/* Efeito 3D - Sombra interna */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent rounded-xl"></div>
                {/* Conteúdo */}
                <div className="relative z-10">
                  <span className="text-white font-semibold text-sm">
                    {displayName.charAt(0).toUpperCase()}
                  </span>
                </div>
                {/* Brilho 3D */}
                <div className="absolute top-1 left-1 w-2 h-2 bg-white/40 rounded-full blur-sm"></div>
              </div>
              <div className="absolute -bottom-0.5 -right-0.5 w-4 h-4 bg-green-400 rounded-full border-2 border-white"></div>
              <div className="absolute top-full right-0 mt-2 w-8 h-8 flex items-center justify-center text-slate-400 dark:text-slate-500 group-hover:text-slate-600 dark:group-hover:text-slate-300 transition-colors">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}; 
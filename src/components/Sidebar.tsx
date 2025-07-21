"use client";

interface SidebarProps {
  userName?: string;
  isCollapsed?: boolean;
  onToggle?: () => void;
  isOpen?: boolean;
  onClose?: () => void;
}

import React, { useState } from "react";
import Link from "next/link";
import { Calendar, Cog } from 'lucide-react';
import { usePathname } from 'next/navigation';

export const Sidebar = ({ userName = "Camila", isCollapsed = false, onToggle, isOpen = false, onClose }: SidebarProps) => {
  // Mobile drawer classes
  const mobileDrawer = isOpen
    ? 'fixed inset-0 z-40 flex md:hidden'
    : 'hidden';
  const mobileSidebar = isOpen
    ? 'translate-x-0'
    : '-translate-x-full';

  // Adiciona estado para expandir/colapsar o menu CRM e Dashboard
  const [crmOpen, setCrmOpen] = useState(false);
  const [dashboardOpen, setDashboardOpen] = useState(false);

  const pathname = usePathname();

  const handleToggle = () => {
    setCrmOpen(false);
    setDashboardOpen(false);
    if (onToggle) onToggle();
  };

  return (
    <>
      {/* Mobile Drawer */}
      <div className={mobileDrawer}>
        {/* Backdrop */}
        <div className={`fixed inset-0 bg-black/40 z-40 transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`} onClick={onClose} />
        {/* Sidebar Drawer */}
        <aside className={`fixed left-0 top-0 bottom-0 w-64 bg-gradient-to-b from-slate-50 to-white dark:from-slate-800 dark:to-slate-900 border-r border-slate-200 dark:border-slate-700 shadow-lg z-50 flex flex-col h-full transition-transform duration-300 ${mobileSidebar}`}>
          {/* Botão de fechar */}
          <button className="absolute top-4 right-4 z-50 p-2 rounded-full bg-white dark:bg-slate-800 shadow hover:bg-slate-100 dark:hover:bg-slate-700" onClick={onClose} aria-label="Fechar menu">
            <svg className="w-6 h-6 text-slate-700 dark:text-slate-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          {/* Conteúdo da sidebar (perfil + navegação) */}
          <div className="p-6 border-b border-slate-200 dark:border-slate-700 flex items-center gap-3">
            <div className="relative">
              <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-full flex items-center justify-center shadow-md">
                <span className="text-white font-semibold text-sm">{userName.charAt(0).toUpperCase()}</span>
              </div>
              <div className="absolute -bottom-0.5 -right-0.5 w-4 h-4 bg-green-400 rounded-full border-2 border-white"></div>
            </div>
            <div>
              <p className="text-sm font-semibold text-slate-800 dark:text-slate-200">{userName}</p>
              <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">Administrador</p>
            </div>
          </div>
          {/* Navigation (reaproveitar o mesmo nav) */}
          <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto h-full max-h-screen">
            <div className="space-y-1">
              <h3 className="text-xs font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider px-3 mb-3">Principal</h3>
              {/* Inicio */}
              {(() => {
                const isActive = pathname === '/' || pathname === '/Inicio';
                return (
                  <Link
                    href="/"
                    className={`group relative flex items-center h-12 w-full ${isActive ? 'bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl shadow-lg text-white' : 'text-slate-600 dark:text-slate-300'} ${isCollapsed ? 'justify-center w-12 px-0' : 'justify-start px-4'}`}
                    aria-label="Inicio"
                    style={{ overflow: "visible" }}
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0h6" />
                    </svg>
                    {!isCollapsed && (
                      <span className={`ml-4 font-medium text-base ${isActive ? 'text-white' : 'text-slate-700 dark:text-white'}`}>Inicio</span>
                    )}
                    {isCollapsed && (
                      <span className="absolute left-[60px] top-1/2 -translate-y-1/2 px-2 py-1 bg-gray-200 text-slate-700 dark:text-white rounded text-sm whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity z-50 shadow-lg">
                        Inicio
                      </span>
                    )}
                  </Link>
                );
              })()}
              {/* Agenda */}
              <Link
                href="/Agenda"
                className={`group relative flex items-center h-12 w-full ${pathname === '/Agenda' ? 'bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl shadow-lg text-white' : 'text-slate-600 dark:text-slate-300'} ${isCollapsed ? 'justify-center w-12 px-0' : 'justify-start px-4'}`}
                aria-label="Agenda"
              >
                <Calendar className="w-5 h-5" />
                {!isCollapsed && <span className="ml-4 font-medium text-base">Agenda</span>}
                {isCollapsed && <span className="absolute left-[60px] top-1/2 -translate-y-1/2 px-2 py-1 bg-gray-200 text-slate-700 dark:text-white rounded text-sm whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity z-50 shadow-lg">Agenda</span>}
              </Link>
              {/* Chat */}
              <Link href="/Chat" className={`group relative flex items-center h-12 w-full ${pathname === '/Chat' ? 'bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl shadow-lg text-white' : 'text-slate-600 dark:text-slate-300'} ${isCollapsed ? 'justify-center w-12 px-0' : 'justify-start px-4'}`} aria-label="Chat">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 15a2 2 0 01-2 2H7a2 2 0 01-2-2V7a2 2 0 012-2h12a2 2 0 012 2v8z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 21h-6a2 2 0 01-2-2v-1a2 2 0 012-2h6a2 2 0 012 2v1a2 2 0 01-2 2z" />
                </svg>
                {!isCollapsed && <span className="ml-4 font-medium text-base">Chat</span>}
                {isCollapsed && <span className="absolute left-[60px] top-1/2 -translate-y-1/2 px-2 py-1 bg-gray-200 text-slate-700 dark:text-white rounded text-sm whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity z-50 shadow-lg">Chat</span>}
              </Link>
              {/* CRM - Menu expansível */}
              <div>
                <button
                  type="button"
                  className={`group relative flex items-center h-12 w-full font-medium transition-all duration-200 ${pathname.startsWith('/CRM') ? 'bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl shadow-lg text-white' : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 hover:text-slate-800 dark:hover:text-slate-100 hover:shadow-md'} ${isCollapsed ? 'justify-center w-12 px-0' : 'justify-start px-4'}`}
                  onClick={() => setCrmOpen((open) => !open)}
                  aria-expanded={crmOpen}
                  aria-controls="crm-submenu"
                  aria-label="CRM"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v4a1 1 0 001 1h3l3 3V8l-3 3H4a1 1 0 01-1-1V7a1 1 0 011-1h16a1 1 0 011 1v10a1 1 0 01-1 1H4a1 1 0 01-1-1v-2" />
                  </svg>
                  {!isCollapsed && <span className="ml-4 font-medium text-base">CRM</span>}
                  {isCollapsed && <span className="absolute left-[60px] top-1/2 -translate-y-1/2 px-2 py-1 bg-gray-200 text-slate-700 dark:text-white rounded text-sm whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity z-50 shadow-lg">CRM</span>}
                  {!isCollapsed && <svg className={`w-4 h-4 ml-auto transition-transform ${crmOpen ? "rotate-90" : ""}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>}
                </button>
                {/* Submenu CRM */}
                {crmOpen && (
                  <div id="crm-submenu" className="ml-8 mt-1 flex flex-col gap-1">
                    <Link href="/CRM/comercial" className={`block px-2 py-1 rounded ${pathname === '/CRM/comercial' ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold' : 'text-slate-700 dark:text-white hover:bg-slate-100 dark:hover:bg-slate-700'}`} aria-label="Comercial">Comercial</Link>
                    <Link href="/CRM/pacientes" className={`block px-2 py-1 rounded ${pathname === '/CRM/pacientes' ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold' : 'text-slate-700 dark:text-white hover:bg-slate-100 dark:hover:bg-slate-700'}`} aria-label="Pacientes">Pacientes</Link>
                    <Link href="/CRM/remarketing" className={`block px-2 py-1 rounded ${pathname === '/CRM/remarketing' ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold' : 'text-slate-700 dark:text-white hover:bg-slate-100 dark:hover:bg-slate-700'}`} aria-label="Remarketing">Remarketing</Link>
                    <Link href="/CRM/feedback" className={`block px-2 py-1 rounded ${pathname === '/CRM/feedback' ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold' : 'text-slate-700 dark:text-white hover:bg-slate-100 dark:hover:bg-slate-700'}`} aria-label="Feedback">Feedback</Link>
                    <Link href="/CRM/campanhas" className={`block px-2 py-1 rounded ${pathname === '/CRM/campanhas' ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold' : 'text-slate-700 dark:text-white hover:bg-slate-100 dark:hover:bg-slate-700'}`} aria-label="Campanhas">Campanhas</Link>
                  </div>
                )}
              </div>
              {/* Dashboard - Menu expansível */}
              <div>
                <button
                  type="button"
                  className={`group relative flex items-center h-12 w-full font-medium transition-all duration-200 ${pathname.startsWith('/Dashboard') ? 'bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl shadow-lg text-white' : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 hover:text-slate-800 dark:hover:text-slate-100 hover:shadow-md'} ${isCollapsed ? 'justify-center w-12 px-0' : 'justify-start px-4'}`}
                  onClick={() => setDashboardOpen((open) => !open)}
                  aria-expanded={dashboardOpen}
                  aria-controls="dashboard-submenu"
                  aria-label="Dashboard"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                  {!isCollapsed && <span className="ml-4 font-medium text-base">Dashboard</span>}
                  {isCollapsed && <span className="absolute left-[60px] top-1/2 -translate-y-1/2 px-2 py-1 bg-gray-200 text-slate-700 dark:text-white rounded text-sm whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity z-50 shadow-lg">Dashboard</span>}
                  {!isCollapsed && <svg className={`w-4 h-4 ml-auto transition-transform ${dashboardOpen ? "rotate-90" : ""}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>}
                </button>
                {/* Submenu Dashboard */}
                {dashboardOpen && (
                  <div id="dashboard-submenu" className="ml-8 mt-1 flex flex-col gap-1">
                    <Link href="/Dashboard/financeiro" className={`block px-2 py-1 rounded ${pathname === '/Dashboard/financeiro' ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold' : 'text-slate-700 dark:text-white hover:bg-slate-100 dark:hover:bg-slate-700'}`} aria-label="Financeiro">Financeiro</Link>
                    <Link href="/Dashboard/atencion" className={`block px-2 py-1 rounded ${pathname === '/Dashboard/atencion' ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold' : 'text-slate-700 dark:text-white hover:bg-slate-100 dark:hover:bg-slate-700'}`} aria-label="Atención">Atención</Link>
                    <Link href="/Dashboard/marketing" className={`block px-2 py-1 rounded ${pathname === '/Dashboard/marketing' ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold' : 'text-slate-700 dark:text-white hover:bg-slate-100 dark:hover:bg-slate-700'}`} aria-label="Marketing">Marketing</Link>
                    <Link href="/Dashboard/experiencia" className={`block px-2 py-1 rounded ${pathname === '/Dashboard/experiencia' ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold' : 'text-slate-700 dark:text-white hover:bg-slate-100 dark:hover:bg-slate-700'}`} aria-label="Experiencia del Cliente">Experiencia del Cliente</Link>
                  </div>
                )}
              </div>

              {/* Pacientes */}
              <Link href="/Pacientes" className={`group relative flex items-center h-12 w-full ${pathname === '/Pacientes' ? 'bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl shadow-lg text-white' : 'text-slate-600 dark:text-slate-300'} ${isCollapsed ? 'justify-center w-12 px-0' : 'justify-start px-4'}`} aria-label="Pacientes">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
                </svg>
                {!isCollapsed && <span className="ml-4 font-medium text-base">Pacientes</span>}
                {isCollapsed && <span className="absolute left-[60px] top-1/2 -translate-y-1/2 px-2 py-1 bg-gray-200 text-slate-700 dark:text-white rounded text-sm whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity z-50 shadow-lg">Pacientes</span>}
              </Link>

              {/* Doctores */}
              <Link href="/Doctores" className={`group relative flex items-center h-12 w-full ${pathname === '/Doctores' ? 'bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl shadow-lg text-white' : 'text-slate-600 dark:text-slate-300'} ${isCollapsed ? 'justify-center w-12 px-0' : 'justify-start px-4'}`} aria-label="Doctores">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14c3.866 0 7-1.343 7-3V7a7 7 0 10-14 0v4c0 1.657 3.134 3 7 3zm0 0v4m-4 0h8" />
                </svg>
                {!isCollapsed && <span className="ml-4 font-medium text-base">Doctores</span>}
                {isCollapsed && <span className="absolute left-[60px] top-1/2 -translate-y-1/2 px-2 py-1 bg-gray-200 text-slate-700 dark:text-white rounded text-sm whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity z-50 shadow-lg">Doctores</span>}
              </Link>
              <a href="#" className="group relative flex items-center gap-3 px-4 py-3 rounded-xl text-slate-600 dark:text-slate-300 font-medium transition-all duration-200 hover:bg-slate-100 dark:hover:bg-slate-700 hover:text-slate-800 dark:hover:text-slate-100 hover:shadow-md" aria-label="Configuraciones">
                <div className="w-5 h-5 flex items-center justify-center text-slate-400 dark:text-slate-500 group-hover:text-slate-600 dark:group-hover:text-slate-300 transition-colors">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <span className="ml-4 font-medium text-base text-slate-700 dark:text-white">Configuraciones</span>
                {isCollapsed && <span className="absolute left-[60px] top-1/2 -translate-y-1/2 px-2 py-1 bg-gray-200 text-slate-700 dark:text-white rounded text-sm whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity z-50 shadow-lg">Configuraciones</span>}
              </a>
            </div>
            <div className="space-y-1 pt-4">
              <h3 className="text-xs font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider px-3 mb-3">Sistema</h3>
              {/* Configuraciones */}
              <Link
                href="/Configuraciones"
                className={`group relative flex items-center h-12 w-full ${pathname === '/Configuraciones' ? 'bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl shadow-lg text-white' : 'text-slate-600 dark:text-slate-300'} ${isCollapsed ? 'justify-center w-12 px-0' : 'justify-start px-4'}`}
                aria-label="Configuraciones"
              >
                <Cog className="w-5 h-5" />
                {!isCollapsed && <span className="ml-4 font-medium text-base">Configuraciones</span>}
                {isCollapsed && <span className="absolute left-[60px] top-1/2 -translate-y-1/2 px-2 py-1 bg-gray-200 text-slate-700 dark:text-white rounded text-sm whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity z-50 shadow-lg">Configuraciones</span>}
              </Link>
            </div>
          </nav>
        </aside>
      </div>
      {/* Sidebar fixa no desktop */}
      <aside className={`hidden md:flex flex-col h-screen bg-gradient-to-b from-slate-50 to-white dark:from-slate-800 dark:to-slate-900 border-r border-slate-200 dark:border-slate-700 shadow-sm relative ${isCollapsed ? 'overflow-visible' : 'overflow-hidden'} z-30 flex-shrink-0 transition-all duration-300 ease-in-out ${isCollapsed ? 'w-20' : 'w-72'}`}>
              {/* Background decoration */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 via-transparent to-purple-50/30 dark:from-blue-900/20 dark:via-transparent dark:to-purple-900/20"></div>
        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-blue-400/10 to-purple-400/10 dark:from-blue-400/5 dark:to-purple-400/5 rounded-full blur-3xl"></div>
      
      <div className="relative z-10 flex flex-col h-full">
        {/* Header */}
        <div className="p-6 border-b border-slate-200 dark:border-slate-700">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="relative">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center shadow-sm">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                </div>
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-400 rounded-full border-2 border-white animate-pulse"></div>
              </div>
              <div className={`transition-all duration-300 ${isCollapsed ? 'opacity-0 w-0 overflow-hidden' : 'opacity-100 w-auto'}`}>
                <h1 className="text-xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 dark:from-slate-100 dark:to-slate-300 bg-clip-text text-transparent whitespace-nowrap">
                  ClinicAI
                </h1>
                <p className="text-xs text-slate-500 dark:text-slate-400 font-medium whitespace-nowrap">Healthcare Analytics</p>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation com rolagem independente */}
        <div className="flex-1 overflow-y-auto overflow-x-hidden sidebar-scroll">
          <nav className="px-4 py-6 space-y-2">
            <div className="space-y-1">
              <h3 className={`text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider px-3 mb-3 transition-all duration-300 ${isCollapsed ? 'opacity-0 h-0 overflow-hidden' : 'opacity-100 h-auto'}`}>
                Principal
              </h3>
              
              {/* Inicio */}
              {(() => {
                const isActive = pathname === '/' || pathname === '/Inicio';
                return (
                  <Link
                    href="/"
                    className={`group relative flex items-center h-12 w-full ${isActive ? 'bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl shadow-lg text-white' : 'text-slate-600 dark:text-slate-300'} ${isCollapsed ? 'justify-center w-12 px-0' : 'justify-start px-4'}`}
                    style={{ overflow: "visible" }}
                    aria-label="Inicio"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0h6" />
                    </svg>
                    {!isCollapsed && (
                      <span className={`ml-4 font-medium text-base ${isActive ? 'text-white' : 'text-slate-700 dark:text-white'}`}>Inicio</span>
                    )}
                    {isCollapsed && (
                      <span className="absolute left-[60px] top-1/2 -translate-y-1/2 px-2 py-1 bg-gray-200 text-slate-700 dark:text-white rounded text-sm whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity z-50 shadow-lg">
                        Inicio
                      </span>
                    )}
                  </Link>
                );
              })()}

              {/* Agenda */}
              <Link
                href="/Agenda"
                className={`group relative flex items-center h-12 w-full ${pathname === '/Agenda' ? 'bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl shadow-lg text-white' : 'text-slate-600 dark:text-slate-300'} ${isCollapsed ? 'justify-center w-12 px-0' : 'justify-start px-4'}`}
                aria-label="Agenda"
              >
                <Calendar className="w-5 h-5" />
                {!isCollapsed && <span className="ml-4 font-medium text-base">Agenda</span>}
                {isCollapsed && <span className="absolute left-[60px] top-1/2 -translate-y-1/2 px-2 py-1 bg-gray-200 text-slate-700 dark:text-white rounded text-sm whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity z-50 shadow-lg">Agenda</span>}
              </Link>

              {/* Chat */}
              <Link href="/Chat" className={`group relative flex items-center h-12 w-full ${pathname === '/Chat' ? 'bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl shadow-lg text-white' : 'text-slate-600 dark:text-slate-300'} ${isCollapsed ? 'justify-center w-12 px-0' : 'justify-start px-4'}`} aria-label="Chat">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 15a2 2 0 01-2 2H7a2 2 0 01-2-2V7a2 2 0 012-2h12a2 2 0 012 2v8z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 21h-6a2 2 0 01-2-2v-1a2 2 0 012-2h6a2 2 0 012 2v1a2 2 0 01-2 2z" />
                </svg>
                {!isCollapsed && <span className="ml-4 font-medium text-base">Chat</span>}
                {isCollapsed && <span className="absolute left-[60px] top-1/2 -translate-y-1/2 px-2 py-1 bg-gray-200 text-slate-700 dark:text-white rounded text-sm whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity z-50 shadow-lg">Chat</span>}
              </Link>

              {/* CRM - Menu expansível */}
              <div>
                <button
                  type="button"
                  className={`group relative flex items-center h-12 w-full font-medium transition-all duration-200 ${pathname.startsWith('/CRM') ? 'bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl shadow-lg text-white' : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 hover:text-slate-800 dark:hover:text-slate-100 hover:shadow-md'} ${isCollapsed ? 'justify-center w-12 px-0' : 'justify-start px-4'}`}
                  onClick={() => setCrmOpen((open) => !open)}
                  aria-expanded={crmOpen}
                  aria-controls="crm-submenu"
                  aria-label="CRM"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v4a1 1 0 001 1h3l3 3V8l-3 3H4a1 1 0 01-1-1V7a1 1 0 011-1h16a1 1 0 011 1v10a1 1 0 01-1 1H4a1 1 0 01-1-1v-2" />
                  </svg>
                  {!isCollapsed && <span className="ml-4 font-medium text-base">CRM</span>}
                  {isCollapsed && <span className="absolute left-[60px] top-1/2 -translate-y-1/2 px-2 py-1 bg-gray-200 text-slate-700 dark:text-white rounded text-sm whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity z-50 shadow-lg">CRM</span>}
                  {!isCollapsed && <svg className={`w-4 h-4 ml-auto transition-transform ${crmOpen ? "rotate-90" : ""}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>}
                </button>
                {/* Submenu CRM - bloco normal, não absoluto */}
                {crmOpen && (
                  <div id="crm-submenu" className="ml-8 mt-1 flex flex-col gap-1">
                    <Link href="/CRM/comercial" className={`block px-2 py-1 rounded ${pathname === '/CRM/comercial' ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold' : 'text-slate-700 dark:text-white hover:bg-slate-100 dark:hover:bg-slate-700'}`} aria-label="Comercial">Comercial</Link>
                    <Link href="/CRM/pacientes" className={`block px-2 py-1 rounded ${pathname === '/CRM/pacientes' ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold' : 'text-slate-700 dark:text-white hover:bg-slate-100 dark:hover:bg-slate-700'}`} aria-label="Pacientes">Pacientes</Link>
                    <Link href="/CRM/remarketing" className={`block px-2 py-1 rounded ${pathname === '/CRM/remarketing' ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold' : 'text-slate-700 dark:text-white hover:bg-slate-100 dark:hover:bg-slate-700'}`} aria-label="Remarketing">Remarketing</Link>
                    <Link href="/CRM/feedback" className={`block px-2 py-1 rounded ${pathname === '/CRM/feedback' ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold' : 'text-slate-700 dark:text-white hover:bg-slate-100 dark:hover:bg-slate-700'}`} aria-label="Feedback">Feedback</Link>
                    <Link href="/CRM/campanhas" className={`block px-2 py-1 rounded ${pathname === '/CRM/campanhas' ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold' : 'text-slate-700 dark:text-white hover:bg-slate-100 dark:hover:bg-slate-700'}`} aria-label="Campanhas">Campanhas</Link>
                  </div>
                )}
              </div>

              {/* Dashboard - Menu expansível */}
              <div>
                <button
                  type="button"
                  className={`group relative flex items-center h-12 w-full font-medium transition-all duration-200 ${pathname.startsWith('/Dashboard') ? 'bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl shadow-lg text-white' : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 hover:text-slate-800 dark:hover:text-slate-100 hover:shadow-md'} ${isCollapsed ? 'justify-center w-12 px-0' : 'justify-start px-4'}`}
                  onClick={() => setDashboardOpen((open) => !open)}
                  aria-expanded={dashboardOpen}
                  aria-controls="dashboard-submenu"
                  aria-label="Dashboard"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                  {!isCollapsed && <span className="ml-4 font-medium text-base">Dashboard</span>}
                  {isCollapsed && <span className="absolute left-[60px] top-1/2 -translate-y-1/2 px-2 py-1 bg-gray-200 text-slate-700 dark:text-white rounded text-sm whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity z-50 shadow-lg">Dashboard</span>}
                  {!isCollapsed && <svg className={`w-4 h-4 ml-auto transition-transform ${dashboardOpen ? "rotate-90" : ""}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>}
                </button>
                {/* Submenu Dashboard - bloco normal, não absoluto */}
                {dashboardOpen && (
                  <div id="dashboard-submenu" className="ml-8 mt-1 flex flex-col gap-1">
                    <Link href="/Dashboard/financeiro" className={`block px-2 py-1 rounded ${pathname === '/Dashboard/financeiro' ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold' : 'text-slate-700 dark:text-white hover:bg-slate-100 dark:hover:bg-slate-700'}`} aria-label="Financeiro">Financeiro</Link>
                    <Link href="/Dashboard/atencion" className={`block px-2 py-1 rounded ${pathname === '/Dashboard/atencion' ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold' : 'text-slate-700 dark:text-white hover:bg-slate-100 dark:hover:bg-slate-700'}`} aria-label="Atención">Atención</Link>
                    <Link href="/Dashboard/marketing" className={`block px-2 py-1 rounded ${pathname === '/Dashboard/marketing' ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold' : 'text-slate-700 dark:text-white hover:bg-slate-100 dark:hover:bg-slate-700'}`} aria-label="Marketing">Marketing</Link>
                    <Link href="/Dashboard/experiencia" className={`block px-2 py-1 rounded ${pathname === '/Dashboard/experiencia' ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold' : 'text-slate-700 dark:text-white hover:bg-slate-100 dark:hover:bg-slate-700'}`} aria-label="Experiencia del Cliente">Experiencia del Cliente</Link>
                  </div>
                )}
              </div>

              {/* Pacientes */}
              <Link href="/Pacientes" className={`group relative flex items-center h-12 w-full ${pathname === '/Pacientes' ? 'bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl shadow-lg text-white' : 'text-slate-600 dark:text-slate-300'} ${isCollapsed ? 'justify-center w-12 px-0' : 'justify-start px-4'}`} aria-label="Pacientes">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
                </svg>
                {!isCollapsed && <span className="ml-4 font-medium text-base">Pacientes</span>}
                {isCollapsed && <span className="absolute left-[60px] top-1/2 -translate-y-1/2 px-2 py-1 bg-gray-200 text-slate-700 dark:text-white rounded text-sm whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity z-50 shadow-lg">Pacientes</span>}
              </Link>

              {/* Doctores */}
              <Link href="/Doctores" className={`group relative flex items-center h-12 w-full ${pathname === '/Doctores' ? 'bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl shadow-lg text-white' : 'text-slate-600 dark:text-slate-300'} ${isCollapsed ? 'justify-center w-12 px-0' : 'justify-start px-4'}`} aria-label="Doctores">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14c3.866 0 7-1.343 7-3V7a7 7 0 10-14 0v4c0 1.657 3.134 3 7 3zm0 0v4m-4 0h8" />
                </svg>
                {!isCollapsed && <span className="ml-4 font-medium text-base">Doctores</span>}
                {isCollapsed && <span className="absolute left-[60px] top-1/2 -translate-y-1/2 px-2 py-1 bg-gray-200 text-slate-700 dark:text-white rounded text-sm whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity z-50 shadow-lg">Doctores</span>}
              </Link>
            </div>

            <div className="space-y-1 pt-4">
              <h3 className={`text-xs font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider px-3 mb-3 transition-all duration-300 ${isCollapsed ? 'opacity-0 h-0 overflow-hidden' : 'opacity-100 h-auto'}`}>
                Sistema
              </h3>
              
              {/* Configuraciones */}
              <Link
                href="/Configuraciones"
                className={`group relative flex items-center h-12 w-full ${pathname === '/Configuraciones' ? 'bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl shadow-lg text-white' : 'text-slate-600 dark:text-slate-300'} ${isCollapsed ? 'justify-center w-12 px-0' : 'justify-start px-4'}`}
                aria-label="Configuraciones"
              >
                <Cog className="w-5 h-5" />
                {!isCollapsed && <span className="ml-4 font-medium text-base">Configuraciones</span>}
                {isCollapsed && <span className="absolute left-[60px] top-1/2 -translate-y-1/2 px-2 py-1 bg-gray-200 text-slate-700 dark:text-white rounded text-sm whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity z-50 shadow-lg">Configuraciones</span>}
              </Link>
            </div>
          </nav>
        </div>

        {/* Botão Retrair fixo no rodapé */}
        <div className="px-4 pb-2">
          <button
            onClick={handleToggle}
            className={`
              w-full h-10 rounded-xl transition-all duration-500 ease-in-out
              ${isCollapsed 
                ? "bg-gradient-to-r from-blue-500 to-purple-600 shadow-lg shadow-blue-500/30" 
                : "bg-gradient-to-r from-slate-100 to-slate-200 dark:from-slate-700 dark:to-slate-800 shadow-md shadow-slate-500/20"
              }
              hover:scale-[1.02] transform hover:-translate-y-0.5
              focus:outline-none focus:ring-4 focus:ring-blue-500/20
              group relative overflow-hidden
            `}
            aria-label={isCollapsed ? "Expandir sidebar" : "Retrair sidebar"}
          >
            {/* Efeito de brilho no fundo */}
            <div
              className={`
                absolute inset-0 rounded-xl transition-all duration-500 ease-in-out
                ${isCollapsed 
                  ? "bg-gradient-to-r from-blue-400/20 to-purple-400/20 opacity-30" 
                  : "bg-gradient-to-r from-slate-300/20 to-slate-400/20 opacity-0"
                }
              `}
            />
            
            {/* Conteúdo do botão */}
            <div className="relative z-10 flex items-center justify-center gap-2">
              {/* Ícone de seta */}
              <svg
                className={`
                  w-4 h-4 transition-all duration-500 ease-in-out
                  ${isCollapsed ? "rotate-180 text-white" : "rotate-0 text-slate-600 dark:text-slate-300"}
                `}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              
              {/* Texto - só aparece quando expandido */}
              <span className={`font-medium transition-all duration-300 ${isCollapsed ? 'opacity-0 w-0 overflow-hidden' : 'opacity-100 w-auto'} ${isCollapsed ? 'text-white' : 'text-slate-600 dark:text-slate-300'}`}>
                {isCollapsed ? "Expandir" : "Retraer"}
              </span>
            </div>
          </button>
        </div>

        {/* User Profile */}
        <div className="p-4 border-t border-slate-200 dark:border-slate-700">
          <div className={`flex items-center gap-3 p-3 rounded-xl bg-gradient-to-r from-slate-50 to-slate-100/50 dark:from-slate-700 dark:to-slate-800/50 hover:from-slate-100 hover:to-slate-200/50 dark:hover:from-slate-600 dark:hover:to-slate-700/50 transition-all duration-200 cursor-pointer group ${isCollapsed ? 'justify-center' : ''}`}>
            <div className="relative">
              <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-full flex items-center justify-center shadow-md">
                <span className="text-white font-semibold text-sm">
                  {userName.charAt(0).toUpperCase()}
                </span>
              </div>
              <div className="absolute -bottom-0.5 -right-0.5 w-4 h-4 bg-green-400 rounded-full border-2 border-white"></div>
            </div>
            <div className={`flex-1 min-w-0 transition-all duration-300 ${isCollapsed ? 'opacity-0 w-0 overflow-hidden' : 'opacity-100 w-auto'}`}>
              <p className="text-sm font-semibold text-slate-800 dark:text-slate-200 truncate">{userName}</p>
              <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">Administrador</p>
            </div>
            <div className={`w-8 h-8 flex items-center justify-center text-slate-400 dark:text-slate-500 group-hover:text-slate-600 dark:group-hover:text-slate-300 transition-colors ${isCollapsed ? 'opacity-0 w-0 overflow-hidden' : 'opacity-100 w-auto'}`}>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
            
            {/* Etiqueta para sidebar retraída */}
            {isCollapsed && (
              <div className="absolute left-full ml-2 px-2 py-1 bg-emerald-600 dark:bg-emerald-500 text-white text-xs font-medium rounded-md whitespace-nowrap shadow-lg border border-emerald-500 dark:border-emerald-400 z-50">
                <div className="font-medium">{userName}</div>
                <div className="text-xs opacity-75">Administrador</div>
                <div className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-1 w-0 h-0 border-t-2 border-b-2 border-r-2 border-transparent border-r-emerald-600 dark:border-r-emerald-500"></div>
              </div>
            )}
          </div>
        </div>
      </div>
    </aside>
    </>
  );
}; 
"use client";

import { useState, useEffect } from "react";

type Theme = "light" | "dark" | "system";

type ThemeToggleProps = {
  className?: string;
  iconClassName?: string;
};

export default function ThemeToggle({ className = "", iconClassName = "" }: ThemeToggleProps) {
  const [theme, setTheme] = useState<Theme>("light");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const savedTheme = localStorage.getItem("theme") as Theme || "light";
    setTheme(savedTheme);
    
    // Aplicar tema inicial imediatamente
    const root = document.documentElement;
    root.classList.remove("light", "dark");
    
    if (savedTheme === "system") {
      const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
      root.classList.add(systemTheme);
    } else {
      root.classList.add(savedTheme);
    }
  }, []);

  useEffect(() => {
    if (!mounted) return;

    const root = document.documentElement;
    
    // Remove classes anteriores
    root.classList.remove("light", "dark");
    
    if (theme === "system") {
      const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
      root.classList.add(systemTheme);
    } else {
      root.classList.add(theme);
    }
    
    localStorage.setItem("theme", theme);
  }, [theme, mounted]);

  if (!mounted) {
    return (
      <div className="w-16 h-8 bg-slate-200 dark:bg-slate-700 rounded-full animate-pulse" />
    );
  }

  const isDark = theme === "dark" || (theme === "system" && window.matchMedia("(prefers-color-scheme: dark)").matches);

  return (
    <div className="relative">
      {/* Toggle Principal - Estilo Yin-Yang */}
      <button
        onClick={() => {
          const nextTheme = theme === "light" ? "dark" : "light";
          setTheme(nextTheme);
        }}
        className={`
          relative w-16 h-8 rounded-full transition-all duration-500 ease-in-out
          ${isDark 
            ? "bg-gradient-to-r from-slate-800 to-slate-900 shadow-lg shadow-slate-900/30" 
            : "bg-gradient-to-r from-amber-400 to-orange-500 shadow-lg shadow-amber-500/30"
          }
          hover:scale-105 transform hover:-translate-y-0.5
          focus:outline-none focus:ring-4 focus:ring-blue-500/20
        `}
        aria-label={`Mudar para tema ${isDark ? "claro" : "escuro"}`}
      >
        {/* Círculo deslizante */}
        <div
          className={`
            absolute top-1 w-6 h-6 rounded-full transition-all duration-500 ease-in-out
            ${isDark 
              ? "left-1 bg-slate-100 shadow-lg shadow-slate-900/50" 
              : "left-9 bg-white shadow-lg shadow-amber-900/30"
            }
            flex items-center justify-center
          `}
        >
          {/* Ícone do Sol */}
          <svg
            className={`
              w-3 h-3 transition-all duration-500 ease-in-out
              ${isDark ? "opacity-0 scale-0 rotate-180" : "opacity-100 scale-100 rotate-0"}
              text-amber-600
            `}
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fillRule="evenodd"
              d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"
              clipRule="evenodd"
            />
          </svg>
          
          {/* Ícone da Lua */}
          <svg
            className={`
              absolute w-3 h-3 transition-all duration-500 ease-in-out
              ${isDark ? "opacity-100 scale-100 rotate-0" : "opacity-0 scale-0 -rotate-180"}
              text-slate-600
            `}
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
          </svg>
        </div>

        {/* Efeito de brilho no fundo */}
        <div
          className={`
            absolute inset-0 rounded-full transition-all duration-500 ease-in-out
            ${isDark 
              ? "bg-gradient-to-r from-blue-400/20 to-purple-400/20 opacity-0" 
              : "bg-gradient-to-r from-yellow-400/20 to-orange-400/20 opacity-30"
            }
          `}
        />
      </button>


    </div>
  );
} 
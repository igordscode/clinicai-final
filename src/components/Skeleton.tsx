"use client";

import { cn } from "@/lib/utils";

interface SkeletonProps {
  className?: string;
  variant?: 'default' | 'card' | 'text' | 'avatar' | 'button';
  lines?: number;
}

export const Skeleton = ({ className, variant = 'default', lines = 1 }: SkeletonProps) => {
  const baseClasses = "animate-pulse bg-gradient-to-r from-slate-200 via-slate-300 to-slate-200 dark:from-slate-700 dark:via-slate-600 dark:to-slate-700 rounded";

  const variants = {
    default: "h-4 w-full",
    card: "h-32 w-full rounded-xl",
    text: "h-4 w-full",
    avatar: "h-12 w-12 rounded-full",
    button: "h-10 w-24 rounded-lg"
  };

  if (variant === 'text' && lines > 1) {
    return (
      <div className="space-y-2">
        {Array.from({ length: lines }).map((_, i) => (
          <div
            key={i}
            className={cn(
              baseClasses,
              variants[variant],
              i === lines - 1 ? "w-3/4" : "w-full",
              className
            )}
          />
        ))}
      </div>
    );
  }

  return (
    <div className={cn(baseClasses, variants[variant], className)} />
  );
};

// Skeleton específico para KPI Cards
export const KpiCardSkeleton = () => {
  return (
    <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-4 shadow-xl relative overflow-hidden">
      {/* Efeito 3D - Sombra interna */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/30 dark:from-slate-700/30 to-transparent rounded-xl"></div>
      
      <div className="relative z-10">
        {/* Header com ícone e título */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <Skeleton variant="avatar" className="h-8 w-8" />
            <Skeleton variant="text" className="h-3 w-20" />
          </div>
        </div>
        
        {/* Valor principal */}
        <div className="mb-3">
          <Skeleton variant="text" className="h-8 w-32" />
        </div>
        
        {/* Indicador de mudança */}
        <div className="flex items-center gap-2 p-2 rounded-lg bg-slate-50 dark:bg-slate-700/50 border">
          <Skeleton variant="avatar" className="h-6 w-6" />
          <div className="flex-1">
            <Skeleton variant="text" className="h-3 w-12 mb-1" />
            <Skeleton variant="text" className="h-2 w-16" />
          </div>
        </div>
      </div>
      
      {/* Brilho 3D */}
      <div className="absolute top-2 left-2 w-2 h-2 bg-white/60 dark:bg-slate-600/60 rounded-full blur-sm"></div>
    </div>
  );
};

// Skeleton para cards de gráficos
export const ChartCardSkeleton = () => {
  return (
    <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-6 shadow-xl relative overflow-hidden">
      {/* Efeito 3D - Sombra interna */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/30 dark:from-slate-700/30 to-transparent rounded-xl"></div>
      
      <div className="relative z-10">
        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <Skeleton variant="avatar" className="h-12 w-12" />
          <div className="flex-1">
            <Skeleton variant="text" className="h-6 w-48 mb-2" />
            <Skeleton variant="text" className="h-4 w-32" />
          </div>
        </div>
        
        {/* Área do gráfico */}
        <div className="h-64 w-full rounded-lg bg-slate-100 dark:bg-slate-700/50 relative overflow-hidden">
          {/* Linhas do gráfico skeleton */}
          <div className="absolute inset-0 flex items-end justify-between px-4 pb-4">
            {Array.from({ length: 7 }).map((_, i) => (
              <div
                key={i}
                className="w-8 bg-gradient-to-t from-slate-300 to-slate-200 dark:from-slate-600 dark:to-slate-500 rounded-t animate-pulse"
                style={{ height: `${Math.random() * 60 + 20}%` }}
              />
            ))}
          </div>
        </div>
        
        {/* Legendas */}
        <div className="flex justify-center gap-4 mt-4">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="flex items-center gap-2">
              <Skeleton variant="avatar" className="h-3 w-3" />
              <Skeleton variant="text" className="h-3 w-16" />
            </div>
          ))}
        </div>
      </div>
      
      {/* Brilho 3D */}
      <div className="absolute top-2 left-2 w-2 h-2 bg-white/60 dark:bg-slate-600/60 rounded-full blur-sm"></div>
    </div>
  );
};

// Skeleton para tabelas
export const TableSkeleton = ({ rows = 5 }: { rows?: number }) => {
  return (
    <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl shadow-xl relative overflow-hidden">
      {/* Efeito 3D - Sombra interna */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/30 dark:from-slate-700/30 to-transparent rounded-xl"></div>
      
      <div className="relative z-10">
        {/* Header da tabela */}
        <div className="p-6 border-b border-slate-200 dark:border-slate-700">
          <div className="flex items-center gap-3 mb-4">
            <Skeleton variant="avatar" className="h-10 w-10" />
            <div className="flex-1">
              <Skeleton variant="text" className="h-6 w-32 mb-2" />
              <Skeleton variant="text" className="h-4 w-48" />
            </div>
          </div>
        </div>
        
        {/* Cabeçalho da tabela */}
        <div className="px-6 py-4 border-b border-slate-200 dark:border-slate-700">
          <div className="grid grid-cols-4 gap-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <Skeleton key={i} variant="text" className="h-4 w-20" />
            ))}
          </div>
        </div>
        
        {/* Linhas da tabela */}
        <div className="divide-y divide-slate-200 dark:divide-slate-700">
          {Array.from({ length: rows }).map((_, i) => (
            <div key={i} className="px-6 py-4">
              <div className="grid grid-cols-4 gap-4">
                {Array.from({ length: 4 }).map((_, j) => (
                  <Skeleton key={j} variant="text" className="h-4 w-24" />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Brilho 3D */}
      <div className="absolute top-2 left-2 w-2 h-2 bg-white/60 dark:bg-slate-600/60 rounded-full blur-sm"></div>
    </div>
  );
};

// Skeleton para listas
export const ListSkeleton = ({ items = 5 }: { items?: number }) => {
  return (
    <div className="space-y-3">
      {Array.from({ length: items }).map((_, i) => (
        <div key={i} className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg p-4 shadow-md relative overflow-hidden">
          {/* Efeito 3D - Sombra interna */}
          <div className="absolute inset-0 bg-gradient-to-br from-white/30 dark:from-slate-700/30 to-transparent rounded-lg"></div>
          
          <div className="relative z-10 flex items-center gap-3">
            <Skeleton variant="avatar" className="h-10 w-10" />
            <div className="flex-1">
              <Skeleton variant="text" className="h-4 w-32 mb-2" />
              <Skeleton variant="text" className="h-3 w-48" />
            </div>
            <Skeleton variant="button" className="h-8 w-16" />
          </div>
          
          {/* Brilho 3D */}
          <div className="absolute top-2 left-2 w-2 h-2 bg-white/60 dark:bg-slate-600/60 rounded-full blur-sm"></div>
        </div>
      ))}
    </div>
  );
}; 
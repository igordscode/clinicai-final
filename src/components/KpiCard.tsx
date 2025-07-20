import React from "react";
import { DollarSign, Activity, Star, BadgeDollarSign, Users, ArrowUpRight, ArrowDownRight, ArrowLeftRight } from 'lucide-react';

interface KpiCardProps {
  title: string;
  value: string;
  change: string;
  changeType?: "up" | "down" | "neutral";
  changeText?: string;
  icon: React.ReactNode;
  colorClass?: string; // ex: 'text-blue-800', 'text-green-600'
  borderClass?: string; // ex: 'border-blue-800/30'
  groupColor?: string; // Nova prop para cor do grupo
}

export const KpiCard: React.FC<KpiCardProps> = ({
  title,
  value,
  change,
  changeType = "up",
  changeText,
  icon,
  colorClass = "text-blue-800",
  borderClass = "border-blue-800/30",
  groupColor = "blue", // Default para azul
}) => {
  const changeColor =
    changeType === "up"
      ? "text-emerald-600 dark:text-emerald-400"
      : changeType === "down"
      ? "text-red-600 dark:text-red-400"
      : "text-slate-500 dark:text-slate-400";
  
  const changeBgColor =
    changeType === "up"
      ? "bg-emerald-50 border-emerald-200 dark:bg-emerald-900/20 dark:border-emerald-700/30"
      : changeType === "down"
      ? "bg-red-50 border-red-200 dark:bg-red-900/20 dark:border-red-700/30"
      : "bg-slate-50 border-slate-200 dark:bg-slate-700/20 dark:border-slate-600/30";

  // Cores específicas por grupo com intensidade ajustada - Modo claro e escuro
  const groupColors = {
    blue: {
      border: "border-blue-300/80 dark:border-blue-600/40",
      bg: "bg-gradient-to-br from-blue-100/70 via-white to-blue-50/60 dark:from-blue-900/20 dark:via-slate-800 dark:to-blue-800/10",
      iconBg: "bg-gradient-to-br from-blue-200 via-blue-100 to-white dark:from-blue-700 dark:via-blue-600 dark:to-blue-500",
      accent: "border-blue-400/60 dark:border-blue-500/40",
      value: "from-blue-900 via-blue-800 to-blue-700 dark:from-blue-200 dark:via-blue-300 dark:to-blue-400",
      shadowIntensity: "shadow-xl hover:shadow-2xl dark:shadow-blue-500/10",
      glowColor: "shadow-blue-500/15 dark:shadow-blue-400/20"
    },
    green: {
      border: "border-emerald-300/80 dark:border-emerald-600/40",
      bg: "bg-gradient-to-br from-emerald-100/70 via-white to-emerald-50/60 dark:from-emerald-900/20 dark:via-slate-800 dark:to-emerald-800/10",
      iconBg: "bg-gradient-to-br from-emerald-200 via-emerald-100 to-white dark:from-emerald-700 dark:via-emerald-600 dark:to-emerald-500",
      accent: "border-emerald-400/60 dark:border-emerald-500/40",
      value: "from-emerald-900 via-emerald-800 to-emerald-700 dark:from-emerald-200 dark:via-emerald-300 dark:to-emerald-400",
      shadowIntensity: "shadow-xl hover:shadow-2xl dark:shadow-emerald-500/10",
      glowColor: "shadow-emerald-500/15 dark:shadow-emerald-400/20"
    },
    orange: {
      border: "border-orange-300/70 dark:border-orange-600/40",
      bg: "bg-gradient-to-br from-orange-100/60 via-white to-orange-50/40 dark:from-orange-900/20 dark:via-slate-800 dark:to-orange-800/10",
      iconBg: "bg-gradient-to-br from-orange-200 via-orange-100 to-white dark:from-orange-700 dark:via-orange-600 dark:to-orange-500",
      accent: "border-orange-400/50 dark:border-orange-500/40",
      value: "from-orange-900 via-orange-800 to-orange-700 dark:from-orange-200 dark:via-orange-300 dark:to-orange-400",
      shadowIntensity: "shadow-xl hover:shadow-2xl dark:shadow-orange-500/10",
      glowColor: "shadow-orange-500/15 dark:shadow-orange-400/20"
    },
    purple: {
      border: "border-purple-300/80 dark:border-purple-600/40",
      bg: "bg-gradient-to-br from-purple-100/70 via-white to-purple-50/60 dark:from-purple-900/20 dark:via-slate-800 dark:to-purple-800/10",
      iconBg: "bg-gradient-to-br from-purple-200 via-purple-100 to-white dark:from-purple-700 dark:via-purple-600 dark:to-purple-500",
      accent: "border-purple-400/60 dark:border-purple-500/40",
      value: "from-purple-900 via-purple-800 to-purple-700 dark:from-purple-200 dark:via-purple-300 dark:to-purple-400",
      shadowIntensity: "shadow-xl hover:shadow-2xl dark:shadow-purple-500/10",
      glowColor: "shadow-purple-500/15 dark:shadow-purple-400/20"
    }
  };

  const colors = groupColors[groupColor as keyof typeof groupColors] || groupColors.blue;

  const arrowIcon =
    changeType === "up" ? (
      <ArrowUpRight className="w-3 h-3" />
    ) : changeType === "down" ? (
      <ArrowDownRight className="w-3 h-3" />
    ) : (
      <ArrowLeftRight className="w-3 h-3" />
    );

  return (
    <div className={`group bg-white dark:bg-slate-800/90 ${colors.border} ${colors.shadowIntensity} ${colors.glowColor} rounded-xl p-4 relative overflow-hidden transform hover:scale-[1.03] transition-all duration-300 hover:-translate-y-1`}>
      {/* Efeito 3D - Background com cor do grupo */}
      <div className={`absolute inset-0 ${colors.bg} rounded-xl`}></div>
      
      {/* Brilho 3D superior - ajustado por cor */}
      <div className={`absolute top-2 left-2 w-4 h-4 bg-white/80 dark:bg-white/20 rounded-full blur-md`}></div>
      
      {/* Efeito de brilho animado */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 dark:via-white/10 to-transparent transform -skew-x-12 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
      
      {/* Conteúdo principal */}
      <div className="relative z-10">
        {/* Header com ícone e título */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <div className={`w-8 h-8 ${colors.iconBg} rounded-lg flex items-center justify-center shadow-md relative overflow-hidden transform hover:scale-110 transition-transform duration-300`}>
              {/* Efeito 3D - Sombra interna */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/40 dark:from-white/20 to-transparent rounded-lg"></div>
              {/* Ícone */}
              <div className="relative z-10">
                <div className={`${colorClass}`}>
                  {icon}
                </div>
              </div>
              {/* Brilho 3D */}
              <div className="absolute top-0.5 left-0.5 w-1.5 h-1.5 bg-white/60 dark:bg-white/30 rounded-full blur-sm"></div>
            </div>
            <div>
              <h3 className="text-xs font-semibold text-slate-700 dark:text-slate-200">{title}</h3>
            </div>
          </div>
        </div>
        
        {/* Valor principal */}
        <div className="mb-3">
          <div className={`text-2xl font-bold bg-gradient-to-r ${colors.value} bg-clip-text text-transparent`}>
            {value}
          </div>
        </div>
        
        {/* Indicador de mudança */}
        <div className={`flex items-center gap-2 p-2 rounded-lg ${changeBgColor} border relative overflow-hidden`}>
          {/* Efeito 3D - Sombra interna */}
          <div className="absolute inset-0 bg-gradient-to-br from-white/50 dark:from-white/20 to-transparent rounded-lg"></div>
          
          {/* Ícone de seta */}
          <div className="relative z-10">
            <div className={`p-1.5 rounded-md bg-white dark:bg-slate-700 shadow-sm ${changeColor}`}>
              {arrowIcon}
            </div>
          </div>
          
          {/* Texto de mudança */}
          <div className="relative z-10 flex-1">
            <div className={`text-xs font-bold ${changeColor}`}>
              {change}
            </div>
            {changeText && (
              <div className="text-xs text-slate-500 dark:text-slate-300 font-medium">
                {changeText}
              </div>
            )}
          </div>
          
          {/* Brilho 3D */}
          <div className="absolute top-0.5 right-0.5 w-1.5 h-1.5 bg-white/60 dark:bg-white/30 rounded-full blur-sm"></div>
        </div>
      </div>
      
      {/* Sombra de profundidade - ajustada por cor */}
      <div className={`absolute -bottom-3 left-2 right-2 h-4 bg-gradient-to-t from-slate-900/25 dark:from-black/40 to-transparent rounded-b-xl blur-lg`}></div>
    </div>
  );
};

 
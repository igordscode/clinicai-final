import React from "react";
import { cn } from "../../lib/utils";

interface ElevationProps {
  level?: "sm" | "md" | "lg" | "xl";
  color?: "blue" | "green" | "orange" | "purple" | "neutral";
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
}

const elevationStyles = {
  sm: {
    shadow: "shadow-md",
    hover: "hover:shadow-lg",
    glow: "shadow-slate-500/10",
    scale: "hover:scale-[1.01]",
    translate: "hover:-translate-y-0.5"
  },
  md: {
    shadow: "shadow-lg",
    hover: "hover:shadow-xl",
    glow: "shadow-slate-500/15",
    scale: "hover:scale-[1.02]",
    translate: "hover:-translate-y-1"
  },
  lg: {
    shadow: "shadow-xl",
    hover: "hover:shadow-2xl",
    glow: "shadow-slate-500/20",
    scale: "hover:scale-[1.03]",
    translate: "hover:-translate-y-1"
  },
  xl: {
    shadow: "shadow-2xl",
    hover: "hover:shadow-3xl",
    glow: "shadow-slate-500/25",
    scale: "hover:scale-[1.04]",
    translate: "hover:-translate-y-2"
  }
};

const colorGlows = {
  blue: "shadow-blue-500/15",
  green: "shadow-emerald-500/15",
  orange: "shadow-orange-500/15",
  purple: "shadow-purple-500/15",
  neutral: "shadow-slate-500/15"
};

export const Elevation: React.FC<ElevationProps> = ({
  level = "md",
  color = "neutral",
  children,
  className,
  hover = true
}) => {
  const styles = elevationStyles[level];
  const glowColor = colorGlows[color];

  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-xl transition-all duration-300",
        styles.shadow,
        hover && styles.hover,
        hover && styles.scale,
        hover && styles.translate,
        glowColor,
        className
      )}
    >
      {/* Efeito 3D - Background sutil */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/50 via-white to-white/30 rounded-xl"></div>
      
      {/* Brilho 3D superior */}
      <div className="absolute top-2 left-2 w-4 h-4 bg-white/80 rounded-full blur-md"></div>
      
      {/* Efeito de brilho animado no hover */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
      
      {/* Conteúdo */}
      <div className="relative z-10">
        {children}
      </div>
      
      {/* Sombra de profundidade */}
      <div className="absolute -bottom-3 left-2 right-2 h-4 bg-gradient-to-t from-slate-900/25 to-transparent rounded-b-xl blur-lg"></div>
    </div>
  );
};

// Variantes para diferentes tipos de componentes
export const CardElevation = ({ children, ...props }: Omit<ElevationProps, 'level'>) => (
  <Elevation level="lg" {...props}>
    {children}
  </Elevation>
);

export const ButtonElevation = ({ children, ...props }: Omit<ElevationProps, 'level'>) => (
  <Elevation level="md" {...props}>
    {children}
  </Elevation>
);

export const ModalElevation = ({ children, ...props }: Omit<ElevationProps, 'level'>) => (
  <Elevation level="xl" {...props}>
    {children}
  </Elevation>
); 
import React from "react";
import { Tooltip, TooltipTrigger, TooltipContent } from "./tooltip";

interface StatusButtonProps {
  status: "online" | "manutencao" | "desconectado" | "reconectando" | "clinica";
  tooltip: string;
}

const statusColor: Record<string, string> = {
  online: "bg-green-500",
  manutencao: "bg-yellow-400",
  desconectado: "bg-red-500",
  reconectando: "bg-blue-500 animate-pulse",
  clinica: "bg-purple-500",
};

export const StatusButton: React.FC<StatusButtonProps> = ({ status, tooltip }) => (
  <Tooltip>
    <TooltipTrigger asChild>
      <button
        type="button"
        className={`w-4 h-4 rounded-full border-2 border-white shadow ${statusColor[status]}`}
        aria-label={tooltip}
      />
    </TooltipTrigger>
    <TooltipContent sideOffset={8}>{tooltip}</TooltipContent>
  </Tooltip>
); 
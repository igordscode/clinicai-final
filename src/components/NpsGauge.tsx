import React from "react";

interface BreakdownItem {
  label: string;
  value: number;
  color: string;
  emoji: string;
}

interface NpsGaugeProps {
  nps: number;
  meta: number;
  breakdown: BreakdownItem[];
  badge?: string;
  feedbacks?: string[];
}

export const NpsGauge: React.FC<NpsGaugeProps> = ({ nps, meta, breakdown, badge, feedbacks }) => {
  // Gauge SVG config
  const percent = Math.max(0, Math.min(nps / 10, 1));
  const pointerAngle = Math.PI + percent * Math.PI;
  const pointerLength = 75;

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="relative">
        <svg width={220} height={120} className="max-w-full" aria-label={`Gráfico de NPS: ${nps} de 10`}>
          {/* Arcos do gauge */}
          <path d="M30,110 A80,80 0 0,1 190,110" stroke="#ef4444" strokeWidth={18} fill="none" />
          <path d="M110,30 A80,80 0 0,1 190,110" stroke="#eab308" strokeWidth={18} fill="none" />
          <path d="M30,110 A80,80 0 0,1 110,30" stroke="#22c55e" strokeWidth={18} fill="none" />
          {/* Ponteiro */}
          <g transform="translate(110,110)">
            <g transform={`rotate(${(pointerAngle * 180) / Math.PI - 180})`}>
              <line x1={0} y1={0} x2={pointerLength} y2={0} stroke="#374151" strokeWidth={5} />
            </g>
          </g>
        </svg>
        <button className="absolute top-2 right-2 group" aria-label="O que é NPS?">
          <svg className="w-5 h-5 text-zinc-400 group-hover:text-blue-600 transition" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><path strokeLinecap="round" strokeLinejoin="round" d="M12 16v-4M12 8h.01"/></svg>
          <span className="absolute left-1/2 -translate-x-1/2 top-8 w-48 bg-white text-xs text-zinc-700 rounded shadow-lg px-3 py-2 opacity-0 group-hover:opacity-100 pointer-events-none transition z-50 border border-gray-200 whitespace-normal text-left">
            NPS (Net Promoter Score) é uma métrica de satisfação do cliente, varia entre -100 a 10.
          </span>
        </button>
      </div>
      <span className="mt-4 flex items-end">
        <span className="text-5xl font-extrabold text-gray-900 leading-none">{nps}</span>
        <span className="ml-2 text-lg font-semibold text-green-600 leading-tight">NPS</span>
      </span>
      {/* Breakdown */}
      <div className="flex flex-col gap-2 w-full mt-6">
        {breakdown.map((item) => (
          <div key={item.label} className="flex items-center gap-2 text-base">
            <span className="text-2xl">{item.emoji}</span>
            <span className={`font-semibold`} style={{ color: item.color }}>{item.label}</span>
            <span className="ml-2 text-gray-400 font-medium">{item.value} pacientes</span>
          </div>
        ))}
      </div>
      <div className="border-t border-gray-100 w-full my-3"></div>
      <div className="flex flex-wrap gap-3 items-center w-full text-sm text-gray-600">
        <span>Meta de NPS: <span className="font-semibold text-gray-900">{meta}</span></span>
        <span className="flex items-center">NPS atual: <span className="font-semibold text-green-600 ml-1">{nps}</span>
          <svg className="ml-1 w-4 h-4 text-green-500" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"/></svg>
        </span>
        {badge && <span className="bg-green-50 text-green-700 px-2 py-0.5 rounded-full text-xs font-semibold">{badge}</span>}
      </div>
      {/* Feedbacks recentes */}
      {feedbacks && feedbacks.length > 0 && (
        <div className="w-full flex flex-col gap-2 mt-4">
          <span className="text-xs text-gray-500 mb-1">Feedbacks recentes</span>
          {feedbacks.map((fb, i) => (
            <div key={i} className={`flex items-start gap-2 ${i % 2 === 0 ? "bg-blue-50 border-l-4 border-blue-300 text-blue-800" : "bg-red-50 border-l-4 border-red-300 text-red-800"} px-3 py-2 rounded text-sm italic`}>
              <svg className={`w-5 h-5 ${i % 2 === 0 ? "text-blue-300" : "text-red-300"} flex-shrink-0`} fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 5h6M9 19h6M5 9h14M5 15h14"/></svg>
              {`"${fb}"`}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}; 
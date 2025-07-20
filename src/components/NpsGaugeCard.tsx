'use client';

import React, { useRef, useEffect } from 'react';

interface BreakdownItem {
  label: string;
  value: number;
  color: string;
  emoji: string;
}

interface NpsGaugeCardProps {
  score: number;
  meta: number;
  badge?: string;
  breakdown: BreakdownItem[];
  feedbacks?: string[];
}

export const NpsGaugeCard: React.FC<NpsGaugeCardProps> = ({ score, meta, badge, breakdown, feedbacks }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    // Config
    const cx = 110;
    const cy = 110;
    const r = 80;
    const arcWidth = 18;
    ctx.lineWidth = arcWidth;
    ctx.lineCap = 'round';
    // Detratores
    ctx.beginPath();
    ctx.strokeStyle = '#ef4444';
    ctx.arc(cx, cy, r, Math.PI, Math.PI + Math.PI / 3, false);
    ctx.stroke();
    // Neutros
    ctx.beginPath();
    ctx.strokeStyle = '#eab308';
    ctx.arc(cx, cy, r, Math.PI + Math.PI / 3, Math.PI + (2 * Math.PI) / 3, false);
    ctx.stroke();
    // Promotores
    ctx.beginPath();
    ctx.strokeStyle = '#22c55e';
    ctx.arc(cx, cy, r, Math.PI + (2 * Math.PI) / 3, 2 * Math.PI, false);
    ctx.stroke();
    // Ponteiro
    const percent = Math.max(0, Math.min(score / 10, 1));
    const pointerAngle = Math.PI + percent * Math.PI;
    const pointerLength = 75;
    ctx.save();
    ctx.translate(cx, cy);
    ctx.rotate(pointerAngle - Math.PI);
    ctx.beginPath();
    ctx.strokeStyle = '#374151';
    ctx.lineWidth = 5;
    ctx.moveTo(0, 0);
    ctx.lineTo(pointerLength, 0);
    ctx.stroke();
    ctx.restore();
  }, [score]);

  return (
    <div className="card mt-8 p-6 md:p-8 flex flex-col md:flex-row gap-8 items-center justify-center">
      {/* Coluna 1: Gauge */}
      <div className="flex flex-col items-center justify-center">
        <canvas ref={canvasRef} width={220} height={120} className="max-w-full" aria-label={`Gráfico de NPS: ${score} de 10`} />
        <span className="mt-4 flex items-end">
          <span className="text-5xl font-extrabold text-gray-900 dark:text-gray-100 leading-none">{score}</span>
          <span className="ml-2 text-lg font-semibold text-green-600 leading-tight">NPS</span>
        </span>
        {badge && <span className="mt-2 bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-300 px-2 py-0.5 rounded-full text-xs font-semibold">{badge}</span>}
      </div>
      {/* Coluna 2: Breakdown */}
      <div className="flex flex-col gap-2 w-56 min-w-[180px]">
        <span className="text-xs text-gray-500 dark:text-gray-400 mb-1">Distribuição</span>
        {breakdown.map((item) => (
          <div key={item.label} className="flex items-center gap-2 text-base">
            <span className="text-2xl">{item.emoji}</span>
            <span className="font-semibold" style={{ color: item.color }}>{item.label}</span>
            <span className="ml-2 text-gray-400 dark:text-gray-500 font-medium">{item.value} pacientes</span>
          </div>
        ))}
        <div className="border-t border-gray-100 dark:border-gray-700 w-full my-3"></div>
        <span className="text-xs text-gray-500 dark:text-gray-400">Meta de NPS: <span className="font-semibold text-gray-900 dark:text-gray-100">{meta}</span></span>
      </div>
      {/* Coluna 3: Feedbacks */}
      {feedbacks && feedbacks.length > 0 && (
        <div className="flex flex-col gap-2 w-64 min-w-[180px]">
          <span className="text-xs text-gray-500 dark:text-gray-400 mb-1">Feedbacks recentes</span>
          {feedbacks.map((fb, i) => (
            <div key={i} className={`flex items-start gap-2 ${i % 2 === 0 ? "bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-300 text-blue-800 dark:text-blue-300" : "bg-red-50 dark:bg-red-900/20 border-l-4 border-red-300 text-red-800 dark:text-red-300"} px-3 py-2 rounded text-sm italic`}>
              <svg className={`w-5 h-5 ${i % 2 === 0 ? "text-blue-300" : "text-red-300"} flex-shrink-0`} fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 5h6M9 19h6M5 9h14M5 15h14"/></svg>
              {`"${fb}"`}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}; 
import React from "react";
import { Rocket, Lightbulb, AlertTriangle, RefreshCcw } from "lucide-react";

export function InsightsCard() {
  return (
    <div className="card flex flex-col gap-6 p-8 min-w-[320px] w-full">
      {/* Faixa de insights */}
      <div className="bg-slate-100 dark:bg-slate-700 p-3 rounded-md text-sm text-muted-foreground mb-4">
        Insights generados automáticamente con Inteligencia Artificial para ayudar en la toma de decisiones estratégicas.
      </div>

      {/* Título destacado */}
      <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
        <Lightbulb className="w-5 h-5 text-blue-500" />
        Centro de Inteligencia
        <span className="relative group align-baseline cursor-pointer" style={{ display: 'inline-flex', alignItems: 'baseline', verticalAlign: 'middle' }}>
          <RefreshCcw className="w-5 h-5 text-blue-500 animate-spin-slow" />
                          <span className="absolute left-1/2 -translate-x-1/2 top-full mt-1 w-56 bg-white dark:bg-slate-800 text-xs text-zinc-700 dark:text-zinc-300 rounded shadow-lg px-3 py-2 opacity-0 group-hover:opacity-100 pointer-events-none transition z-50 border border-gray-200 dark:border-gray-700 whitespace-normal text-left">
                  Insights atualizados automaticamente a cada novo dado ou evento relevante.
                </span>
        </span>
      </h2>

      {/* Blocos em 3 colunas */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Bloco 1 */}
        <div className="bg-green-50 dark:bg-green-900/20 border-l-4 border-green-500 p-4 rounded-lg flex flex-col hover:shadow-xl hover:-translate-y-1 transition">
          <h3 className="font-bold text-green-800 dark:text-green-300 mb-2 flex items-center gap-1"><Rocket className="w-5 h-5 text-green-600" /> Meta Estratégica</h3>
          <p className="text-sm text-green-900 dark:text-green-200 mb-2">
            Incrementar el ticket promedio sumando un <strong>12%</strong> enfocado en tratamientos estéticos.<br />
            Puede generar <strong>+Gs. 8.600.000</strong> adicionales.
          </p>
          <a href="#" className="text-green-700 dark:text-green-400 underline text-sm">Ver comparación de citas estéticas</a>
        </div>
        {/* Bloco 2 */}
        <div className="bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-500 p-4 rounded-lg flex flex-col hover:shadow-xl hover:-translate-y-1 transition">
          <h3 className="font-bold text-blue-800 dark:text-blue-300 mb-2 flex items-center gap-1"><Lightbulb className="w-5 h-5 text-blue-600" /> Oportunidad Latente</h3>
          <p className="text-sm text-blue-900 dark:text-blue-200 mb-2">
            La tasa de conversión de la campaña actual es del <strong>48%</strong>, pero el cierre está en el promedio.
          </p>
          <a href="#" className="text-blue-700 dark:text-blue-400 underline text-sm">Ver campañas de Primera Evaluación Estética</a>
        </div>
        {/* Bloco 3 */}
        <div className="bg-yellow-50 dark:bg-yellow-900/20 border-l-4 border-yellow-500 p-4 rounded-lg flex flex-col hover:shadow-xl hover:-translate-y-1 transition">
          <h3 className="font-bold text-yellow-800 dark:text-yellow-300 mb-2 flex items-center gap-1"><AlertTriangle className="w-5 h-5 text-yellow-600" /> Riesgo de Estancamiento</h3>
          <p className="text-sm text-yellow-900 dark:text-yellow-200 mb-2">
            <strong>13 pacientes</strong> no han regresado en más de <strong>20 días</strong> desde su cancelación.
          </p>
          <a href="#" className="text-yellow-700 dark:text-yellow-400 underline text-sm">Generar seguimiento automático</a>
        </div>
      </div>
    </div>
  );
} 
import { Stethoscope, Activity, CalendarPlus, Users, CheckCircle } from 'lucide-react';

export default function AtencionDashboardPage() {
  return (
    <div className="flex flex-col gap-8 p-4 md:p-8">
      {/* Header moderno com ícone */}
      <header className="flex items-center gap-4 mb-2">
        <div className="w-12 h-12 bg-gradient-to-br from-emerald-600 via-teal-600 to-cyan-700 rounded-2xl flex items-center justify-center shadow-lg relative overflow-hidden">
          <Stethoscope className="w-7 h-7 text-white" />
        </div>
        <div>
          <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-emerald-700 to-teal-700 dark:from-emerald-300 dark:to-teal-300 bg-clip-text text-transparent mb-1">
            Atención
          </h1>
          <p className="text-slate-600 dark:text-slate-400 text-base">Acompanhe consultas, ocupação, novos pacientes e indicadores de atendimento da clínica.</p>
        </div>
      </header>

      {/* Grid de KPIs de Atendimento */}
      <section className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        {/* KPI 1 */}
        <div className="bg-white dark:bg-slate-800 border border-emerald-100 dark:border-emerald-700 rounded-xl p-6 shadow flex flex-col items-center justify-center">
          <span className="text-lg font-semibold text-emerald-700 dark:text-emerald-300 flex items-center gap-2"><CalendarPlus className="w-5 h-5" /> Consultas (Hoje)</span>
          <span className="text-2xl font-bold text-emerald-900 dark:text-emerald-100 mt-2">--</span>
        </div>
        {/* KPI 2 */}
        <div className="bg-white dark:bg-slate-800 border border-emerald-100 dark:border-emerald-700 rounded-xl p-6 shadow flex flex-col items-center justify-center">
          <span className="text-lg font-semibold text-emerald-700 dark:text-emerald-300 flex items-center gap-2"><CheckCircle className="w-5 h-5" /> Consultas Concluídas</span>
          <span className="text-2xl font-bold text-emerald-900 dark:text-emerald-100 mt-2">--</span>
        </div>
        {/* KPI 3 */}
        <div className="bg-white dark:bg-slate-800 border border-emerald-100 dark:border-emerald-700 rounded-xl p-6 shadow flex flex-col items-center justify-center">
          <span className="text-lg font-semibold text-emerald-700 dark:text-emerald-300 flex items-center gap-2"><Users className="w-5 h-5" /> Novos Pacientes</span>
          <span className="text-2xl font-bold text-emerald-900 dark:text-emerald-100 mt-2">--</span>
        </div>
        {/* KPI 4 */}
        <div className="bg-white dark:bg-slate-800 border border-emerald-100 dark:border-emerald-700 rounded-xl p-6 shadow flex flex-col items-center justify-center">
          <span className="text-lg font-semibold text-emerald-700 dark:text-emerald-300 flex items-center gap-2"><Activity className="w-5 h-5" /> Taxa de Ocupação</span>
          <span className="text-2xl font-bold text-emerald-900 dark:text-emerald-100 mt-2">--</span>
        </div>
      </section>

      {/* Filtros/Ações rápidas - Placeholder */}
      <section className="flex flex-wrap gap-4 items-center mt-2">
        <div className="bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-700/50 rounded-xl px-4 py-2 text-emerald-700 dark:text-emerald-300 text-sm font-medium">[Filtros e ações rápidas em construção]</div>
      </section>

      {/* Gráfico de Atendimento principal */}
      <section className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl p-6 shadow mt-2">
        <h2 className="text-xl font-semibold text-emerald-800 dark:text-emerald-200 mb-4 flex items-center gap-2">
          <Stethoscope className="w-6 h-6" /> Gráfico de Consultas e Ocupação
        </h2>
        <div className="h-72 flex items-center justify-center text-slate-400 dark:text-slate-500">
          [Gráfico de atendimento em construção]
        </div>
      </section>
    </div>
  );
}

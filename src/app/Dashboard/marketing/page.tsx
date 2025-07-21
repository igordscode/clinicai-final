import { Megaphone, TrendingUp, BarChart2, CreditCard, Target } from 'lucide-react';

export default function MarketingDashboardPage() {
  return (
    <div className="flex flex-col gap-8 p-4 md:p-8">
      {/* Header moderno com ícone */}
      <header className="flex items-center gap-4 mb-2">
        <div className="w-12 h-12 bg-gradient-to-br from-orange-600 via-amber-600 to-yellow-600 rounded-2xl flex items-center justify-center shadow-lg relative overflow-hidden">
          <Megaphone className="w-7 h-7 text-white" />
        </div>
        <div>
          <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-orange-700 to-amber-700 dark:from-orange-300 dark:to-amber-300 bg-clip-text text-transparent mb-1">
            Marketing
          </h1>
          <p className="text-slate-600 dark:text-slate-400 text-base">Acompanhe campanhas, leads, conversão e indicadores de marketing da clínica.</p>
        </div>
      </header>

      {/* Grid de KPIs de Marketing */}
      <section className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        {/* KPI 1 */}
        <div className="bg-white dark:bg-slate-800 border border-orange-100 dark:border-orange-700 rounded-xl p-6 shadow flex flex-col items-center justify-center">
          <span className="text-lg font-semibold text-orange-700 dark:text-orange-300 flex items-center gap-2"><TrendingUp className="w-5 h-5" /> Leads Novos</span>
          <span className="text-2xl font-bold text-orange-900 dark:text-orange-100 mt-2">--</span>
        </div>
        {/* KPI 2 */}
        <div className="bg-white dark:bg-slate-800 border border-orange-100 dark:border-orange-700 rounded-xl p-6 shadow flex flex-col items-center justify-center">
          <span className="text-lg font-semibold text-orange-700 dark:text-orange-300 flex items-center gap-2"><CreditCard className="w-5 h-5" /> CAC Médio</span>
          <span className="text-2xl font-bold text-orange-900 dark:text-orange-100 mt-2">--</span>
        </div>
        {/* KPI 3 */}
        <div className="bg-white dark:bg-slate-800 border border-orange-100 dark:border-orange-700 rounded-xl p-6 shadow flex flex-col items-center justify-center">
          <span className="text-lg font-semibold text-orange-700 dark:text-orange-300 flex items-center gap-2"><Target className="w-5 h-5" /> T. Conversão</span>
          <span className="text-2xl font-bold text-orange-900 dark:text-orange-100 mt-2">--</span>
        </div>
        {/* KPI 4 */}
        <div className="bg-white dark:bg-slate-800 border border-orange-100 dark:border-orange-700 rounded-xl p-6 shadow flex flex-col items-center justify-center">
          <span className="text-lg font-semibold text-orange-700 dark:text-orange-300 flex items-center gap-2"><BarChart2 className="w-5 h-5" /> ROI Campanhas</span>
          <span className="text-2xl font-bold text-orange-900 dark:text-orange-100 mt-2">--</span>
        </div>
      </section>

      {/* Filtros/Ações rápidas - Placeholder */}
      <section className="flex flex-wrap gap-4 items-center mt-2">
        <div className="bg-orange-50 dark:bg-orange-900/20 border border-orange-200 dark:border-orange-700/50 rounded-xl px-4 py-2 text-orange-700 dark:text-orange-300 text-sm font-medium">[Filtros e ações rápidas em construção]</div>
      </section>

      {/* Gráfico de Marketing principal */}
      <section className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl p-6 shadow mt-2">
        <h2 className="text-xl font-semibold text-orange-800 dark:text-orange-200 mb-4 flex items-center gap-2">
          <BarChart2 className="w-6 h-6" /> Gráfico de Leads e Conversão
        </h2>
        <div className="h-72 flex items-center justify-center text-slate-400 dark:text-slate-500">
          [Gráfico de marketing em construção]
        </div>
      </section>
    </div>
  );
}

import { Star, Smile, MessageCircle, RefreshCcw, Share2 } from 'lucide-react';

export default function ExperienciaDashboardPage() {
  return (
    <div className="flex flex-col gap-8 p-4 md:p-8">
      {/* Header moderno com ícone */}
      <header className="flex items-center gap-4 mb-2">
        <div className="w-12 h-12 bg-gradient-to-br from-fuchsia-600 via-purple-600 to-violet-700 rounded-2xl flex items-center justify-center shadow-lg relative overflow-hidden">
          <Star className="w-7 h-7 text-white" />
        </div>
        <div>
          <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-fuchsia-700 to-purple-700 dark:from-fuchsia-300 dark:to-purple-300 bg-clip-text text-transparent mb-1">
            Experiencia del Cliente
          </h1>
          <p className="text-slate-600 dark:text-slate-400 text-base">Acompanhe satisfação, NPS, feedbacks e indicadores de experiência do paciente.</p>
        </div>
      </header>

      {/* Grid de KPIs de Experiência */}
      <section className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        {/* KPI 1 */}
        <div className="bg-white dark:bg-slate-800 border border-fuchsia-100 dark:border-fuchsia-700 rounded-xl p-6 shadow flex flex-col items-center justify-center">
          <span className="text-lg font-semibold text-fuchsia-700 dark:text-fuchsia-300 flex items-center gap-2"><Smile className="w-5 h-5" /> NPS (Mês)</span>
          <span className="text-2xl font-bold text-fuchsia-900 dark:text-fuchsia-100 mt-2">--</span>
        </div>
        {/* KPI 2 */}
        <div className="bg-white dark:bg-slate-800 border border-fuchsia-100 dark:border-fuchsia-700 rounded-xl p-6 shadow flex flex-col items-center justify-center">
          <span className="text-lg font-semibold text-fuchsia-700 dark:text-fuchsia-300 flex items-center gap-2"><MessageCircle className="w-5 h-5" /> Feedbacks</span>
          <span className="text-2xl font-bold text-fuchsia-900 dark:text-fuchsia-100 mt-2">--</span>
        </div>
        {/* KPI 3 */}
        <div className="bg-white dark:bg-slate-800 border border-fuchsia-100 dark:border-fuchsia-700 rounded-xl p-6 shadow flex flex-col items-center justify-center">
          <span className="text-lg font-semibold text-fuchsia-700 dark:text-fuchsia-300 flex items-center gap-2"><RefreshCcw className="w-5 h-5" /> Retorno de Pacientes</span>
          <span className="text-2xl font-bold text-fuchsia-900 dark:text-fuchsia-100 mt-2">--</span>
        </div>
        {/* KPI 4 */}
        <div className="bg-white dark:bg-slate-800 border border-fuchsia-100 dark:border-fuchsia-700 rounded-xl p-6 shadow flex flex-col items-center justify-center">
          <span className="text-lg font-semibold text-fuchsia-700 dark:text-fuchsia-300 flex items-center gap-2"><Share2 className="w-5 h-5" /> Recomendação</span>
          <span className="text-2xl font-bold text-fuchsia-900 dark:text-fuchsia-100 mt-2">--</span>
        </div>
      </section>

      {/* Filtros/Ações rápidas - Placeholder */}
      <section className="flex flex-wrap gap-4 items-center mt-2">
        <div className="bg-fuchsia-50 dark:bg-fuchsia-900/20 border border-fuchsia-200 dark:border-fuchsia-700/50 rounded-xl px-4 py-2 text-fuchsia-700 dark:text-fuchsia-300 text-sm font-medium">[Filtros e ações rápidas em construção]</div>
      </section>

      {/* Gráfico de Experiência principal */}
      <section className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl p-6 shadow mt-2">
        <h2 className="text-xl font-semibold text-fuchsia-800 dark:text-fuchsia-200 mb-4 flex items-center gap-2">
          <Star className="w-6 h-6" /> Gráfico de Satisfação e NPS
        </h2>
        <div className="h-72 flex items-center justify-center text-slate-400 dark:text-slate-500">
          [Gráfico de experiência em construção]
        </div>
      </section>
    </div>
  );
}

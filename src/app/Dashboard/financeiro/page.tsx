import { DollarSign, BarChart2, Activity, TrendingUp, CreditCard } from 'lucide-react';

export default function FinanceiroDashboardPage() {
  return (
    <div className="flex flex-col gap-8 p-4 md:p-8">
      {/* Header moderno com ícone */}
      <header className="flex items-center gap-4 mb-2">
        <div className="w-12 h-12 bg-gradient-to-br from-blue-600 via-indigo-600 to-blue-800 rounded-2xl flex items-center justify-center shadow-lg relative overflow-hidden">
          <DollarSign className="w-7 h-7 text-white" />
        </div>
        <div>
          <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-800 to-indigo-800 dark:from-blue-200 dark:to-indigo-200 bg-clip-text text-transparent mb-1">
            Financeiro
          </h1>
          <p className="text-slate-600 dark:text-slate-400 text-base">Acompanhe os principais indicadores financeiros da clínica, receitas, despesas, fluxo de caixa e muito mais.</p>
        </div>
      </header>

      {/* Grid de KPIs Financeiros */}
      <section className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        {/* KPI 1 */}
        <div className="bg-white dark:bg-slate-800 border border-blue-100 dark:border-blue-700 rounded-xl p-6 shadow flex flex-col items-center justify-center">
          <span className="text-lg font-semibold text-blue-700 dark:text-blue-300 flex items-center gap-2"><BarChart2 className="w-5 h-5" /> Faturamento (Mês)</span>
          <span className="text-2xl font-bold text-blue-900 dark:text-blue-100 mt-2">--</span>
        </div>
        {/* KPI 2 */}
        <div className="bg-white dark:bg-slate-800 border border-blue-100 dark:border-blue-700 rounded-xl p-6 shadow flex flex-col items-center justify-center">
          <span className="text-lg font-semibold text-blue-700 dark:text-blue-300 flex items-center gap-2"><Activity className="w-5 h-5" /> Resultado Neto</span>
          <span className="text-2xl font-bold text-blue-900 dark:text-blue-100 mt-2">--</span>
        </div>
        {/* KPI 3 */}
        <div className="bg-white dark:bg-slate-800 border border-blue-100 dark:border-blue-700 rounded-xl p-6 shadow flex flex-col items-center justify-center">
          <span className="text-lg font-semibold text-blue-700 dark:text-blue-300 flex items-center gap-2"><TrendingUp className="w-5 h-5" /> Ticket Médio</span>
          <span className="text-2xl font-bold text-blue-900 dark:text-blue-100 mt-2">--</span>
        </div>
        {/* KPI 4 */}
        <div className="bg-white dark:bg-slate-800 border border-blue-100 dark:border-blue-700 rounded-xl p-6 shadow flex flex-col items-center justify-center">
          <span className="text-lg font-semibold text-blue-700 dark:text-blue-300 flex items-center gap-2"><CreditCard className="w-5 h-5" /> Pagos Confirmados</span>
          <span className="text-2xl font-bold text-blue-900 dark:text-blue-100 mt-2">--</span>
        </div>
      </section>

      {/* Filtros/Ações rápidas - Placeholder */}
      <section className="flex flex-wrap gap-4 items-center mt-2">
        <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-700/50 rounded-xl px-4 py-2 text-blue-700 dark:text-blue-300 text-sm font-medium">[Filtros e ações rápidas em construção]</div>
      </section>

      {/* Gráfico Financeiro principal */}
      <section className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl p-6 shadow mt-2">
        <h2 className="text-xl font-semibold text-blue-800 dark:text-blue-200 mb-4 flex items-center gap-2">
          <BarChart2 className="w-6 h-6" /> Gráfico de Receita vs Despesa
        </h2>
        <div className="h-72 flex items-center justify-center text-slate-400 dark:text-slate-500">
          [Gráfico financeiro em construção]
        </div>
      </section>
    </div>
  );
}

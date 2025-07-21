import { Calendar, Plus } from 'lucide-react';

export default function AgendaPage() {
  return (
    <div className="flex flex-col gap-8 p-4 md:p-8">
      {/* Header Agenda */}
      <header className="flex items-center gap-4 mb-6">
        <div className="w-12 h-12 bg-gradient-to-br from-emerald-600 via-teal-600 to-cyan-700 rounded-2xl flex items-center justify-center shadow-lg">
          <Calendar className="w-7 h-7 text-white" />
        </div>
        <div className="flex-1">
          <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-emerald-700 to-cyan-700 dark:from-emerald-300 dark:to-cyan-300 bg-clip-text text-transparent mb-1">
            Agenda de Agendamentos
          </h1>
          <p className="text-slate-600 dark:text-slate-400 text-base">Visualize, crie e gerencie os agendamentos da clínica.</p>
        </div>
        <button className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold px-4 py-2 rounded-xl shadow transition-colors" aria-label="Novo agendamento">
          <Plus className="w-5 h-5" /> Novo
        </button>
      </header>
      {/* Calendário (placeholder) */}
      <section className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl p-6 shadow flex flex-col items-center justify-center min-h-[220px]">
        <div className="text-slate-400 dark:text-slate-500 text-lg">[Calendário em construção]</div>
      </section>
      {/* Lista de agendamentos do dia (placeholder) */}
      <section className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl p-6 shadow">
        <h2 className="text-xl font-semibold text-emerald-800 dark:text-emerald-200 mb-4 flex items-center gap-2">
          <Calendar className="w-6 h-6" /> Agendamentos de Hoje
        </h2>
        <div className="flex flex-col gap-3">
          <div className="text-slate-400 dark:text-slate-500">[Lista de agendamentos em construção]</div>
        </div>
      </section>
    </div>
  );
}

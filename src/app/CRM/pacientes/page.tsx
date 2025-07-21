import { Plus, User, MoveRight, CheckCircle, XCircle } from 'lucide-react';

export default function CRMPacientesKanbanPage() {
  return (
    <div className="flex flex-col gap-8 p-4 md:p-8">
      {/* Header Kanban */}
      <header className="flex items-center gap-4 mb-6">
        <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 via-teal-500 to-cyan-600 rounded-2xl flex items-center justify-center shadow-lg">
          <MoveRight className="w-7 h-7 text-white" />
        </div>
        <div>
          <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-emerald-700 to-cyan-700 dark:from-emerald-300 dark:to-cyan-300 bg-clip-text text-transparent mb-1">
            Pacientes
          </h1>
          <p className="text-slate-600 dark:text-slate-400 text-base">Gerencie o ciclo de vida dos pacientes em formato Kanban.</p>
        </div>
      </header>
      {/* Kanban Board */}
      <section className="w-full overflow-x-auto">
        <div className="flex gap-6 min-w-[900px]">
          {/* Coluna: Novos */}
          <div className="flex-1 bg-slate-50 dark:bg-slate-800 rounded-xl p-4 border border-slate-200 dark:border-slate-700 min-w-[220px] flex flex-col">
            <div className="flex items-center justify-between mb-3">
              <span className="font-semibold text-emerald-700 dark:text-emerald-300 flex items-center gap-2"><User className="w-5 h-5" /> Novos</span>
              <button className="p-1 rounded hover:bg-emerald-100 dark:hover:bg-emerald-900" aria-label="Adicionar novo"><Plus className="w-4 h-4" /></button>
            </div>
            <div className="flex flex-col gap-3">
              <div className="bg-white dark:bg-slate-900 border border-emerald-100 dark:border-emerald-700 rounded-lg p-3 shadow-sm">
                <div className="font-medium text-emerald-800 dark:text-emerald-200">Paciente A</div>
                <div className="text-xs text-slate-500 dark:text-slate-400">Cadastro - 10/06</div>
              </div>
              <div className="bg-white dark:bg-slate-900 border border-emerald-100 dark:border-emerald-700 rounded-lg p-3 shadow-sm">
                <div className="font-medium text-emerald-800 dark:text-emerald-200">Paciente B</div>
                <div className="text-xs text-slate-500 dark:text-slate-400">Indicação - 09/06</div>
              </div>
            </div>
          </div>
          {/* Coluna: Em Progresso */}
          <div className="flex-1 bg-slate-50 dark:bg-slate-800 rounded-xl p-4 border border-slate-200 dark:border-slate-700 min-w-[220px] flex flex-col">
            <div className="font-semibold text-teal-700 dark:text-teal-300 flex items-center gap-2 mb-3"><MoveRight className="w-5 h-5" /> Em Progresso</div>
            <div className="flex flex-col gap-3">
              <div className="bg-white dark:bg-slate-900 border border-teal-100 dark:border-teal-700 rounded-lg p-3 shadow-sm">
                <div className="font-medium text-teal-800 dark:text-teal-200">Paciente C</div>
                <div className="text-xs text-slate-500 dark:text-slate-400">Em tratamento - 08/06</div>
              </div>
            </div>
          </div>
          {/* Coluna: Convertidos */}
          <div className="flex-1 bg-slate-50 dark:bg-slate-800 rounded-xl p-4 border border-slate-200 dark:border-slate-700 min-w-[220px] flex flex-col">
            <div className="font-semibold text-cyan-700 dark:text-cyan-300 flex items-center gap-2 mb-3"><CheckCircle className="w-5 h-5" /> Convertidos</div>
            <div className="flex flex-col gap-3">
              <div className="bg-white dark:bg-slate-900 border border-cyan-100 dark:border-cyan-700 rounded-lg p-3 shadow-sm">
                <div className="font-medium text-cyan-800 dark:text-cyan-200">Paciente D</div>
                <div className="text-xs text-slate-500 dark:text-slate-400">Alta - 07/06</div>
              </div>
            </div>
          </div>
          {/* Coluna: Perdidos */}
          <div className="flex-1 bg-slate-50 dark:bg-slate-800 rounded-xl p-4 border border-slate-200 dark:border-slate-700 min-w-[220px] flex flex-col">
            <div className="font-semibold text-rose-700 dark:text-rose-300 flex items-center gap-2 mb-3"><XCircle className="w-5 h-5" /> Perdidos</div>
            <div className="flex flex-col gap-3">
              <div className="bg-white dark:bg-slate-900 border border-rose-100 dark:border-rose-700 rounded-lg p-3 shadow-sm">
                <div className="font-medium text-rose-800 dark:text-rose-200">Paciente E</div>
                <div className="text-xs text-slate-500 dark:text-slate-400">Desistiu - 06/06</div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

import { Plus, User, MoveRight, CheckCircle, XCircle } from 'lucide-react';

export default function CRMRemarketingKanbanPage() {
  return (
    <div className="flex flex-col gap-8 p-4 md:p-8">
      {/* Header Kanban */}
      <header className="flex items-center gap-4 mb-6">
        <div className="w-12 h-12 bg-gradient-to-br from-pink-600 via-fuchsia-600 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg">
          <MoveRight className="w-7 h-7 text-white" />
        </div>
        <div>
          <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-pink-700 to-fuchsia-700 dark:from-pink-300 dark:to-fuchsia-300 bg-clip-text text-transparent mb-1">
            Remarketing
          </h1>
          <p className="text-slate-600 dark:text-slate-400 text-base">Gerencie estratégias de remarketing em formato Kanban.</p>
        </div>
      </header>
      {/* Kanban Board */}
      <section className="w-full overflow-x-auto">
        <div className="flex gap-6 min-w-[900px]">
          {/* Coluna: Novos */}
          <div className="flex-1 bg-slate-50 dark:bg-slate-800 rounded-xl p-4 border border-slate-200 dark:border-slate-700 min-w-[220px] flex flex-col">
            <div className="flex items-center justify-between mb-3">
              <span className="font-semibold text-pink-700 dark:text-pink-300 flex items-center gap-2"><User className="w-5 h-5" /> Novos</span>
              <button className="p-1 rounded hover:bg-pink-100 dark:hover:bg-pink-900" aria-label="Adicionar novo"><Plus className="w-4 h-4" /></button>
            </div>
            <div className="flex flex-col gap-3">
              <div className="bg-white dark:bg-slate-900 border border-pink-100 dark:border-pink-700 rounded-lg p-3 shadow-sm">
                <div className="font-medium text-pink-800 dark:text-pink-200">Paciente F</div>
                <div className="text-xs text-slate-500 dark:text-slate-400">Reativação - 10/06</div>
              </div>
              <div className="bg-white dark:bg-slate-900 border border-pink-100 dark:border-pink-700 rounded-lg p-3 shadow-sm">
                <div className="font-medium text-pink-800 dark:text-pink-200">Paciente G</div>
                <div className="text-xs text-slate-500 dark:text-slate-400">Campanha - 09/06</div>
              </div>
            </div>
          </div>
          {/* Coluna: Em Progresso */}
          <div className="flex-1 bg-slate-50 dark:bg-slate-800 rounded-xl p-4 border border-slate-200 dark:border-slate-700 min-w-[220px] flex flex-col">
            <div className="font-semibold text-fuchsia-700 dark:text-fuchsia-300 flex items-center gap-2 mb-3"><MoveRight className="w-5 h-5" /> Em Progresso</div>
            <div className="flex flex-col gap-3">
              <div className="bg-white dark:bg-slate-900 border border-fuchsia-100 dark:border-fuchsia-700 rounded-lg p-3 shadow-sm">
                <div className="font-medium text-fuchsia-800 dark:text-fuchsia-200">Paciente H</div>
                <div className="text-xs text-slate-500 dark:text-slate-400">Contato - 08/06</div>
              </div>
            </div>
          </div>
          {/* Coluna: Convertidos */}
          <div className="flex-1 bg-slate-50 dark:bg-slate-800 rounded-xl p-4 border border-slate-200 dark:border-slate-700 min-w-[220px] flex flex-col">
            <div className="font-semibold text-purple-700 dark:text-purple-300 flex items-center gap-2 mb-3"><CheckCircle className="w-5 h-5" /> Convertidos</div>
            <div className="flex flex-col gap-3">
              <div className="bg-white dark:bg-slate-900 border border-purple-100 dark:border-purple-700 rounded-lg p-3 shadow-sm">
                <div className="font-medium text-purple-800 dark:text-purple-200">Paciente I</div>
                <div className="text-xs text-slate-500 dark:text-slate-400">Retornou - 07/06</div>
              </div>
            </div>
          </div>
          {/* Coluna: Perdidos */}
          <div className="flex-1 bg-slate-50 dark:bg-slate-800 rounded-xl p-4 border border-slate-200 dark:border-slate-700 min-w-[220px] flex flex-col">
            <div className="font-semibold text-rose-700 dark:text-rose-300 flex items-center gap-2 mb-3"><XCircle className="w-5 h-5" /> Perdidos</div>
            <div className="flex flex-col gap-3">
              <div className="bg-white dark:bg-slate-900 border border-rose-100 dark:border-rose-700 rounded-lg p-3 shadow-sm">
                <div className="font-medium text-rose-800 dark:text-rose-200">Paciente J</div>
                <div className="text-xs text-slate-500 dark:text-slate-400">Não respondeu - 06/06</div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
} 
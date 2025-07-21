import { Plus, User, MoveRight, CheckCircle, XCircle } from 'lucide-react';

export default function CRMComercialKanbanPage() {
  return (
    <div className="flex flex-col gap-8 p-4 md:p-8">
      {/* Header Kanban */}
      <header className="flex items-center gap-4 mb-6">
        <div className="w-12 h-12 bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-700 rounded-2xl flex items-center justify-center shadow-lg">
          <MoveRight className="w-7 h-7 text-white" />
        </div>
        <div>
          <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-800 to-purple-800 dark:from-blue-200 dark:to-purple-200 bg-clip-text text-transparent mb-1">
            Comercial - Kanban
          </h1>
          <p className="text-slate-600 dark:text-slate-400 text-base">Gerencie oportunidades comerciais em formato Kanban.</p>
        </div>
      </header>
      {/* Kanban Board */}
      <section className="w-full overflow-x-auto">
        <div className="flex gap-6 min-w-[900px]">
          {/* Coluna: Novos */}
          <div className="flex-1 bg-slate-50 dark:bg-slate-800 rounded-xl p-4 border border-slate-200 dark:border-slate-700 min-w-[220px] flex flex-col">
            <div className="flex items-center justify-between mb-3">
              <span className="font-semibold text-blue-700 dark:text-blue-300 flex items-center gap-2"><User className="w-5 h-5" /> Novos</span>
              <button className="p-1 rounded hover:bg-blue-100 dark:hover:bg-blue-900" aria-label="Adicionar novo"><Plus className="w-4 h-4" /></button>
            </div>
            <div className="flex flex-col gap-3">
              <div className="bg-white dark:bg-slate-900 border border-blue-100 dark:border-blue-700 rounded-lg p-3 shadow-sm">
                <div className="font-medium text-blue-800 dark:text-blue-200">Empresa X</div>
                <div className="text-xs text-slate-500 dark:text-slate-400">Contato inicial - 10/06</div>
              </div>
              <div className="bg-white dark:bg-slate-900 border border-blue-100 dark:border-blue-700 rounded-lg p-3 shadow-sm">
                <div className="font-medium text-blue-800 dark:text-blue-200">Empresa Y</div>
                <div className="text-xs text-slate-500 dark:text-slate-400">Indicação - 09/06</div>
              </div>
            </div>
          </div>
          {/* Coluna: Em Progresso */}
          <div className="flex-1 bg-slate-50 dark:bg-slate-800 rounded-xl p-4 border border-slate-200 dark:border-slate-700 min-w-[220px] flex flex-col">
            <div className="font-semibold text-indigo-700 dark:text-indigo-300 flex items-center gap-2 mb-3"><MoveRight className="w-5 h-5" /> Em Progresso</div>
            <div className="flex flex-col gap-3">
              <div className="bg-white dark:bg-slate-900 border border-indigo-100 dark:border-indigo-700 rounded-lg p-3 shadow-sm">
                <div className="font-medium text-indigo-800 dark:text-indigo-200">Empresa Z</div>
                <div className="text-xs text-slate-500 dark:text-slate-400">Negociação - 08/06</div>
              </div>
            </div>
          </div>
          {/* Coluna: Convertidos */}
          <div className="flex-1 bg-slate-50 dark:bg-slate-800 rounded-xl p-4 border border-slate-200 dark:border-slate-700 min-w-[220px] flex flex-col">
            <div className="font-semibold text-emerald-700 dark:text-emerald-300 flex items-center gap-2 mb-3"><CheckCircle className="w-5 h-5" /> Convertidos</div>
            <div className="flex flex-col gap-3">
              <div className="bg-white dark:bg-slate-900 border border-emerald-100 dark:border-emerald-700 rounded-lg p-3 shadow-sm">
                <div className="font-medium text-emerald-800 dark:text-emerald-200">Empresa W</div>
                <div className="text-xs text-slate-500 dark:text-slate-400">Fechou - 07/06</div>
              </div>
            </div>
          </div>
          {/* Coluna: Perdidos */}
          <div className="flex-1 bg-slate-50 dark:bg-slate-800 rounded-xl p-4 border border-slate-200 dark:border-slate-700 min-w-[220px] flex flex-col">
            <div className="font-semibold text-rose-700 dark:text-rose-300 flex items-center gap-2 mb-3"><XCircle className="w-5 h-5" /> Perdidos</div>
            <div className="flex flex-col gap-3">
              <div className="bg-white dark:bg-slate-900 border border-rose-100 dark:border-rose-700 rounded-lg p-3 shadow-sm">
                <div className="font-medium text-rose-800 dark:text-rose-200">Empresa V</div>
                <div className="text-xs text-slate-500 dark:text-slate-400">Desistiu - 06/06</div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

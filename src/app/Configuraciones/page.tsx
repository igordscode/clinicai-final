import { Cog } from 'lucide-react';

export default function ConfiguracionesPage() {
  return (
    <div className="flex flex-col gap-8 p-4 md:p-8">
      {/* Header Configuraciones */}
      <header className="flex items-center gap-4 mb-6">
        <div className="w-12 h-12 bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-700 rounded-2xl flex items-center justify-center shadow-lg">
          <Cog className="w-7 h-7 text-white" />
        </div>
        <div className="flex-1">
          <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-700 to-indigo-700 dark:from-blue-300 dark:to-indigo-300 bg-clip-text text-transparent mb-1">
            Configurações do Sistema
          </h1>
          <p className="text-slate-600 dark:text-slate-400 text-base">Gerencie as preferências e ajustes da plataforma.</p>
        </div>
      </header>
      {/* Área de conteúdo inicial */}
      <section className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl p-6 shadow flex flex-col items-center justify-center min-h-[220px]">
        <div className="text-slate-400 dark:text-slate-500 text-lg">[Configurações em construção]</div>
      </section>
    </div>
  );
}

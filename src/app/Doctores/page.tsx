import { UserCheck } from 'lucide-react';

export default function DoctoresPage() {
  return (
    <div className="flex flex-col gap-8 p-4 md:p-8 items-center justify-center min-h-[60vh]">
      <div className="flex items-center gap-3 mb-4">
        <UserCheck className="w-10 h-10 text-blue-600" />
        <h1 className="text-3xl font-bold text-blue-800">Doctores</h1>
      </div>
      <p className="text-slate-500 text-lg">Página en construcción</p>
    </div>
  );
} 
"use client";

import { useState, useEffect, createContext, useContext, ReactNode } from 'react';
import { X, CheckCircle, AlertCircle, Info, AlertTriangle } from 'lucide-react';

type ToastType = 'success' | 'error' | 'info' | 'warning';

interface Toast {
  id: string;
  type: ToastType;
  title: string;
  message?: string;
  duration?: number;
}

interface ToastContextType {
  showToast: (toast: Omit<Toast, 'id'>) => void;
  hideToast: (id: string) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
};

interface ToastProviderProps {
  children: ReactNode;
}

export const ToastProvider = ({ children }: ToastProviderProps) => {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const showToast = (toast: Omit<Toast, 'id'>) => {
    const id = Math.random().toString(36).substr(2, 9);
    const newToast = { ...toast, id };
    setToasts(prev => [...prev, newToast]);

    // Auto-remove toast
    if (toast.duration !== 0) {
      setTimeout(() => {
        hideToast(id);
      }, toast.duration || 5000);
    }
  };

  const hideToast = (id: string) => {
    setToasts(prev => prev.filter(toast => toast.id !== id));
  };

  return (
    <ToastContext.Provider value={{ showToast, hideToast }}>
      {children}
      <ToastContainer toasts={toasts} hideToast={hideToast} />
    </ToastContext.Provider>
  );
};

interface ToastContainerProps {
  toasts: Toast[];
  hideToast: (id: string) => void;
}

const ToastContainer = ({ toasts, hideToast }: ToastContainerProps) => {
  const getToastIcon = (type: ToastType) => {
    switch (type) {
      case 'success':
        return <CheckCircle className="w-5 h-5 text-emerald-500" />;
      case 'error':
        return <AlertCircle className="w-5 h-5 text-red-500" />;
      case 'warning':
        return <AlertTriangle className="w-5 h-5 text-amber-500" />;
      case 'info':
        return <Info className="w-5 h-5 text-blue-500" />;
    }
  };

  const getToastStyles = (type: ToastType) => {
    switch (type) {
      case 'success':
        return 'bg-emerald-50 dark:bg-emerald-900/20 border-emerald-200 dark:border-emerald-700';
      case 'error':
        return 'bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-700';
      case 'warning':
        return 'bg-amber-50 dark:bg-amber-900/20 border-amber-200 dark:border-amber-700';
      case 'info':
        return 'bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-700';
    }
  };

  return (
    <div className="fixed top-4 right-4 z-50 space-y-2">
      {toasts.map((toast, index) => (
        <div
          key={toast.id}
          className={`relative w-80 bg-white dark:bg-slate-800 border rounded-xl shadow-2xl transform transition-all duration-500 ${
            getToastStyles(toast.type)
          } animate-slide-in`}
          style={{
            animationDelay: `${index * 100}ms`,
            transform: 'translateX(100%)',
            animation: 'slideIn 0.5s ease-out forwards'
          }}
        >
          {/* Efeito 3D - Sombra interna */}
          <div className="absolute inset-0 bg-gradient-to-br from-white/30 dark:from-slate-700/30 to-transparent rounded-xl"></div>
          
          <div className="relative z-10 p-4">
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0">
                {getToastIcon(toast.type)}
              </div>
              
              <div className="flex-1 min-w-0">
                <h4 className="text-sm font-semibold text-slate-900 dark:text-slate-100">
                  {toast.title}
                </h4>
                {toast.message && (
                  <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
                    {toast.message}
                  </p>
                )}
              </div>
              
              <button
                onClick={() => hideToast(toast.id)}
                className="flex-shrink-0 p-1 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors duration-200"
              >
                <X className="w-4 h-4 text-slate-400" />
              </button>
            </div>
          </div>
          
          {/* Brilho 3D */}
          <div className="absolute top-2 left-2 w-2 h-2 bg-white/60 dark:bg-slate-600/60 rounded-full blur-sm"></div>
          
          {/* Barra de progresso */}
          <div className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-b-xl animate-progress"></div>
        </div>
      ))}
    </div>
  );
};

// Componente de exemplo para demonstrar o uso
export const ToastDemo = () => {
  const { showToast } = useToast();

  return (
    <div className="flex gap-2">
      <button
        onClick={() => showToast({
          type: 'success',
          title: 'Sucesso!',
          message: 'Operação realizada com sucesso.'
        })}
        className="px-4 py-2 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 transition-colors"
      >
        Sucesso
      </button>
      
      <button
        onClick={() => showToast({
          type: 'error',
          title: 'Erro!',
          message: 'Algo deu errado. Tente novamente.'
        })}
        className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
      >
        Erro
      </button>
      
      <button
        onClick={() => showToast({
          type: 'warning',
          title: 'Atenção!',
          message: 'Esta ação requer confirmação.'
        })}
        className="px-4 py-2 bg-amber-500 text-white rounded-lg hover:bg-amber-600 transition-colors"
      >
        Aviso
      </button>
      
      <button
        onClick={() => showToast({
          type: 'info',
          title: 'Informação',
          message: 'Nova funcionalidade disponível.'
        })}
        className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
      >
        Info
      </button>
    </div>
  );
}; 
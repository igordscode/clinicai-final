'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface FunilData {
  [key: string]: number;
}

interface FunilResponse {
  success: boolean;
  data: FunilData;
  total: number;
}

export default function FunilVendas() {
  const [funilData, setFunilData] = useState<FunilData>({});
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchFunilData();
  }, []);

  const fetchFunilData = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await fetch('/api/funil');
      const data: FunilResponse = await response.json();
      
      if (data.success) {
        setFunilData(data.data);
        setTotal(data.total);
      } else {
        setError('Erro ao carregar dados do funil');
      }
    } catch (err) {
      setError('Erro de conexão');
      console.error('Erro ao buscar dados do funil:', err);
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status: string) => {
    const colors: { [key: string]: string } = {
      contactos: 'bg-blue-500',
      calificados: 'bg-yellow-500',
      presupuesto: 'bg-orange-500',
      negociacion: 'bg-purple-500',
      cerrado: 'bg-green-500',
      perdido: 'bg-red-500'
    };
    
    return colors[status] || 'bg-gray-500';
  };

  const getStatusLabel = (status: string) => {
    const labels: { [key: string]: string } = {
      contactos: 'Contatos',
      calificados: 'Qualificados',
      presupuesto: 'Orçamento',
      negociacion: 'Negociação',
      cerrado: 'Fechado',
      perdido: 'Perdido'
    };
    
    return labels[status] || status.charAt(0).toUpperCase() + status.slice(1);
  };

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Funil de Vendas</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
            <span className="ml-2">Carregando...</span>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Funil de Vendas</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8">
            <p className="text-red-500 mb-4">{error}</p>
            <button 
              onClick={fetchFunilData}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Tentar Novamente
            </button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>Funil de Vendas</span>
          <span className="text-sm font-normal text-gray-500">
            Total: {total} clientes
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {Object.entries(funilData).map(([status, count]) => (
            <div key={status} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-slate-700 rounded-lg">
              <div className="flex items-center space-x-3">
                <div className={`w-3 h-3 rounded-full ${getStatusColor(status)}`}></div>
                <span className="font-medium">{getStatusLabel(status)}</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-2xl font-bold text-gray-900 dark:text-gray-100">{count}</span>
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  ({((count / total) * 100).toFixed(1)}%)
                </span>
              </div>
            </div>
          ))}
          
          {Object.keys(funilData).length === 0 && (
                      <div className="text-center py-8 text-gray-500 dark:text-gray-400">
            Nenhum dado encontrado no funil de vendas
          </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
} 
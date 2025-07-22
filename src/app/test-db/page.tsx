"use client";

import { useState } from 'react';

type TestResult = {
  success: boolean;
  message?: string;
  error?: string;
  data?: {
    connection: {
      dbVersion: string;
      currentTime: string;
    };
    tables: string[];
    counts: {
      users: number;
      doctors: number;
      patients: number;
      appointments: number;
      rooms: number;
      financial_metrics: number;
    };
  };
};

type SeedResult = {
  success: boolean;
  message?: string;
  error?: string;
  data?: {
    patientsInserted?: number;
    appointmentsCreated?: number;
    doctorsOnline?: number;
    roomsOccupied?: number;
  };
};

export default function TestDatabase() {
  const [testResult, setTestResult] = useState<TestResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [seedResult, setSeedResult] = useState<SeedResult | null>(null);

  const testConnection = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/test-db');
      const result = await response.json();
      setTestResult(result);
    } catch (error) {
      setTestResult({ success: false, error: 'Erro de conexão' });
    } finally {
      setLoading(false);
    }
  };

  const seedData = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/seed-data', { method: 'POST' });
      const result = await response.json();
      setSeedResult(result);
    } catch (error) {
      setSeedResult({ success: false, error: 'Erro ao inserir dados' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">🧪 Teste de Banco de Dados</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Teste de Conexão */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">🔌 Teste de Conexão</h2>
            <button
              onClick={testConnection}
              disabled={loading}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:opacity-50"
            >
              {loading ? 'Testando...' : 'Testar Conexão'}
            </button>
            
            {testResult && (
              <div className="mt-4 p-4 rounded border">
                <div className={`font-semibold ${testResult.success ? 'text-green-600' : 'text-red-600'}`}>
                  {testResult.success ? '✅ Sucesso!' : '❌ Erro!'}
                </div>
                <div className="text-sm text-gray-600 mt-2">
                  {testResult.message || testResult.error || ''}
                </div>
                {testResult.data && (
                  <div className="mt-4 text-sm">
                    <div><strong>Banco:</strong> {testResult.data.connection?.dbVersion || '-'}</div>
                    <div>
                      <strong>Horário:</strong>{' '}
                      {testResult.data.connection?.currentTime
                        ? new Date(testResult.data.connection.currentTime).toLocaleString()
                        : '-'}
                    </div>
                    <div>
                      <strong>Tabelas:</strong> {testResult.data.tables?.join(', ') || '-'}
                    </div>
                    <div className="mt-2">
                      <strong>Registros:</strong>
                      <ul className="ml-4">
                        <li>Usuários: {testResult.data.counts?.users ?? '-'}</li>
                        <li>Médicos: {testResult.data.counts?.doctors ?? '-'}</li>
                        <li>Pacientes: {testResult.data.counts?.patients ?? '-'}</li>
                        <li>Consultas: {testResult.data.counts?.appointments ?? '-'}</li>
                        <li>Salas: {testResult.data.counts?.rooms ?? '-'}</li>
                        <li>Métricas: {testResult.data.counts?.financial_metrics ?? '-'}</li>
                      </ul>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Inserir Dados de Exemplo */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">🌱 Inserir Dados de Exemplo</h2>
            <button
              onClick={seedData}
              disabled={loading}
              className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 disabled:opacity-50"
            >
              {loading ? 'Inserindo...' : 'Inserir Dados'}
            </button>
            
            {seedResult && (
              <div className="mt-4 p-4 rounded border">
                <div className={`font-semibold ${seedResult.success ? 'text-green-600' : 'text-red-600'}`}>
                  {seedResult.success ? '✅ Sucesso!' : '❌ Erro!'}
                </div>
                <div className="text-sm text-gray-600 mt-2">
                  {seedResult.message || seedResult.error || ''}
                </div>
                {seedResult.data && (
                  <div className="mt-4 text-sm">
                    <div>Pacientes inseridos: {seedResult.data.patientsInserted ?? '-'}</div>
                    <div>Consultas criadas: {seedResult.data.appointmentsCreated ?? '-'}</div>
                    <div>Médicos online: {seedResult.data.doctorsOnline ?? '-'}</div>
                    <div>Salas ocupadas: {seedResult.data.roomsOccupied ?? '-'}</div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Instruções */}
        <div className="mt-8 bg-blue-50 p-6 rounded-lg">
          <h3 className="text-lg font-semibold mb-4">📋 Instruções</h3>
          <ol className="list-decimal list-inside space-y-2 text-sm">
            <li>Primeiro, certifique-se de que o Docker está rodando</li>
            <li>Execute: <code className="bg-gray-200 px-2 py-1 rounded">docker-compose up -d</code></li>
            <li>Teste a conexão clicando em "Testar Conexão"</li>
            <li>Se a conexão funcionar, insira dados de exemplo</li>
            <li>Volte ao dashboard para ver os dados reais!</li>
          </ol>
        </div>

        {/* Status do Docker */}
        <div className="mt-6 bg-yellow-50 p-4 rounded-lg">
          <h4 className="font-semibold mb-2">🐳 Status do Docker</h4>
          <p className="text-sm text-gray-600">
            Para verificar se o Docker está rodando, execute no terminal:
          </p>
          <code className="block bg-gray-200 px-3 py-2 rounded mt-2 text-sm">
            docker-compose ps
          </code>
        </div>
      </div>
    </div>
  );
} 
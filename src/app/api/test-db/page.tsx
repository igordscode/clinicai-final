// CÓDIGO CORRETO PARA O ARQUIVO: src/app/test-db/page.tsx
'use client';

import React, { useState } from 'react';

interface TestResult {
  success: boolean;
  message?: string;
  error?: string;
  details?: string;
  data?: {
    currentTime: string;
  };
}

export default function TestDbPage() {
  const [testResult, setTestResult] = useState<TestResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleTestConnection = async () => {
    setIsLoading(true);
    setTestResult(null);
    try {
      const response = await fetch('/api/test-db');
      const data: TestResult = await response.json();
      setTestResult(data);
    } catch (error) {
      setTestResult({
        success: false,
        error: 'Erro ao chamar a API de teste.',
        details: error instanceof Error ? error.message : 'Erro desconhecido',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Teste de Conexão com Banco de Dados</h1>
      <button
        onClick={handleTestConnection}
        disabled={isLoading}
        className="px-4 py-2 bg-blue-600 text-white rounded disabled:bg-gray-400"
      >
        {isLoading ? 'Testando...' : 'Iniciar Teste de Conexão'}
      </button>
      
      {testResult && (
        <div className="mt-4 p-4 rounded border">
          <div className={`font-semibold ${testResult.success ? 'text-green-600' : 'text-red-600'}`}>
            {testResult.success ? '✅ Sucesso!' : '❌ Erro!'}
          </div>
          <pre className="mt-2 p-2 bg-gray-100 dark:bg-gray-800 rounded text-sm overflow-x-auto">
            {JSON.stringify(testResult, null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
}
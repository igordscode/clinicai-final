import { NextRequest, NextResponse } from 'next/server';
import { pool } from '@/lib/database';

export async function GET(request: NextRequest) {
  try {
    // Conecta ao banco de dados
    const client = await pool.connect();
    
    try {
      // Query SQL para contar clientes por status
      const query = `
        SELECT 
          status,
          COUNT(*) as count
        FROM ao_clientes 
        WHERE status IS NOT NULL 
        GROUP BY status 
        ORDER BY count DESC
      `;
      
      const result = await client.query(query);
      
      // Formata o resultado para o formato desejado
      const funilData: Record<string, number> = {};
      
      result.rows.forEach((row) => {
        const status = row.status.toLowerCase();
        funilData[status] = parseInt(row.count);
      });
      
      // Retorna os dados do funil
      return NextResponse.json({
        success: true,
        data: funilData,
        total: Object.values(funilData).reduce((sum, count) => sum + count, 0)
      });
      
    } finally {
      // Sempre libera a conexão
      client.release();
    }
    
  } catch (error) {
    console.error('Erro ao consultar funil de vendas:', error);
    
    return NextResponse.json(
      {
        success: false,
        error: 'Erro interno do servidor',
        message: error instanceof Error ? error.message : 'Erro desconhecido'
      },
      { status: 500 }
    );
  }
} 
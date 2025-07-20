import { NextResponse } from 'next/server';
import pool from '../../../lib/database';

export async function GET() {
  try {
    console.log('🔍 Tentando conectar com o banco...');
    
    // Teste simples primeiro
    const client = await pool.connect();
    console.log('✅ Conexão estabelecida com sucesso!');
    
    // Testar conexão básica
    const result = await client.query('SELECT NOW() as current_time');
    console.log('✅ Query executada com sucesso!');
    
    client.release();
    
    return NextResponse.json({
      success: true,
      message: '✅ Conexão com banco de dados estabelecida!',
      data: {
        currentTime: result.rows[0].current_time,
        status: 'connected'
      }
    });
    
  } catch (error) {
    console.error('❌ Erro ao testar conexão com banco:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: 'Erro de conexão com banco de dados',
        details: error instanceof Error ? error.message : 'Erro desconhecido',
        stack: error instanceof Error ? error.stack : undefined
      },
      { status: 500 }
    );
  }
} 
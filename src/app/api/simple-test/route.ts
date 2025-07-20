import { NextResponse } from 'next/server';
import { Pool } from 'pg';

export async function GET() {
  try {
    console.log('🔍 Teste simples iniciado...');
    
    // Teste 2: Criar pool de conexão
    const pool = new Pool({
      user: 'clinicai_user',
      host: 'localhost',
      database: 'clinicai_db',
      password: 'clinicai_password',
      port: 5432,
    });
    
    console.log('✅ Pool criado com sucesso');
    
    // Teste 3: Tentar conectar
    const client = await pool.connect();
    console.log('✅ Cliente conectado com sucesso');
    
    // Teste 4: Executar query simples
    const result = await client.query('SELECT 1 as test');
    console.log('✅ Query executada:', result.rows[0]);
    
    client.release();
    await pool.end();
    
    return NextResponse.json({
      success: true,
      message: '✅ Todos os testes passaram!',
      data: result.rows[0]
    });
    
  } catch (error) {
    console.error('❌ Erro no teste:', error);
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Erro desconhecido',
      stack: error instanceof Error ? error.stack : undefined
    }, { status: 500 });
  }
} 
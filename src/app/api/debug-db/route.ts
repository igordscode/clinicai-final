// Copie e cole este código inteiro no seu arquivo src/app/api/debug-db/route.ts
import { NextResponse } from 'next/server';
import { exec } from 'child_process';
import util from 'util';

export async function GET() {
  try {
    console.log('🔍 Debugando conexão com banco...');
    
    const execAsync = util.promisify(exec);
    
    // Teste 1: Verificar se o postgres está rodando
    try {
      const { stdout } = await execAsync('docker exec clinicai_postgres psql -U postgres -c "SELECT version();"');
      console.log('✅ Conexão com postgres OK:', stdout);
    } catch (e) {
      // CORREÇÃO APLICADA AQUI
      if (e instanceof Error) {
        console.error('❌ Erro com postgres:', e.message);
      } else {
        console.error('❌ Erro com postgres (desconhecido):', String(e));
      }
    }
    
    // Teste 2: Verificar se o usuário clinicai_user existe
    try {
      const { stdout } = await execAsync('docker exec clinicai_postgres psql -U postgres -c "SELECT usename FROM pg_user WHERE usename = \'clinicai_user\';"');
      console.log('✅ Usuário clinicai_user existe:', stdout);
    } catch (e) {
      // CORREÇÃO APLICADA AQUI
      if (e instanceof Error) {
        console.error('❌ Erro ao verificar usuário:', e.message);
      } else {
        console.error('❌ Erro ao verificar usuário (desconhecido):', String(e));
      }
    }
    
    // Teste 3: Tentar conectar com clinicai_user
    try {
      const { stdout } = await execAsync('docker exec clinicai_postgres psql -U clinicai_user -d clinicai_db -c "SELECT 1;"');
      console.log('✅ Conexão com clinicai_user OK:', stdout);
    } catch (e) {
      // CORREÇÃO APLICADA AQUI
      if (e instanceof Error) {
        console.error('❌ Erro com clinicai_user:', e.message);
      } else {
        console.error('❌ Erro com clinicai_user (desconhecido):', String(e));
      }
    }
    
    // Teste 4: Verificar variáveis de ambiente do container
    try {
      const { stdout } = await execAsync('docker exec clinicai_postgres env | grep POSTGRES');
      console.log('✅ Variáveis de ambiente:', stdout);
    } catch (e) {
      // CORREÇÃO APLICADA AQUI
      if (e instanceof Error) {
        console.error('❌ Erro ao verificar env:', e.message);
      } else {
        console.error('❌ Erro ao verificar env (desconhecido):', String(e));
      }
    }
    
    return NextResponse.json({
      success: true,
      message: '✅ Debug concluído! Verifique os logs do console.',
      timestamp: new Date().toISOString()
    });
    
  } catch (error) {
    console.error('❌ Erro no debug:', error);
    // Este bloco já estava correto!
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Erro desconhecido'
    }, { status: 500 });
  }
}
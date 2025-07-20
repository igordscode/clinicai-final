import { Pool } from 'pg';

// Configuração da conexão com o banco de dados
const pool = new Pool({
  user: 'clinicai_user',
  host: process.env.NODE_ENV === 'production' ? 'postgres' : 'localhost',
  database: 'clinicai_db',
  password: 'clinicai_password',
  port: 5432,
  // Configurações adicionais para melhor estabilidade
  max: 20,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
});

// Testar conexão
pool.on('connect', () => {
  console.log('✅ Conectado ao banco de dados PostgreSQL');
});

pool.on('error', (err) => {
  console.error('❌ Erro na conexão com o banco:', err);
});

export default pool; 
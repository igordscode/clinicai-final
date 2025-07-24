// ARQUIVO: src/lib/database.ts

import { Pool } from 'pg';

// AVISO: Não deixe senhas ou dados sensíveis diretamente no código.
// Esta configuração lê a URL completa do seu arquivo .env.local

if (!process.env.DATABASE_URL) {
  throw new Error('A variável de ambiente DATABASE_URL não está definida.');
}

console.log('[DB] DATABASE_URL usada para conexão:', process.env.DATABASE_URL);

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  // Se você precisar de SSL em produção, adicione aqui:
  // ssl: {
  //   rejectUnauthorized: false,
  // },
});

export default pool;
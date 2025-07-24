import { Client } from 'pg';
const client = new Client({
  user: 'clinicai_user',
  host: 'host.docker.internal', // Alterado de 127.0.0.1
  database: 'clinicai_db',
  password: 'clinicai_password',
  port: 5432,
});
client.connect()
  .then(() => {
    console.log('Conectado ao banco com sucesso!');
    return client.query('SELECT NOW()');
  })
  .then(res => {
    console.log('Resposta:', res.rows);
  })
  .catch(err => {
    console.error('Erro ao conectar:', err);
  })
  .finally(() => client.end());
const { Client } = require('pg');
const client = new Client({
  user: 'clinicai_user',
  host: '127.0.0.1', // ou 'host.docker.internal'
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
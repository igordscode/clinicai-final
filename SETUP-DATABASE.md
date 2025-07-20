# 🗄️ Setup do Ambiente de Banco de Dados - ClinicAI

## 🚀 Configuração Completa

### 1. Pré-requisitos

#### Docker Desktop
- **Download**: https://www.docker.com/products/docker-desktop/
- **Instalação**: Execute o instalador e reinicie o computador
- **Iniciar**: Abra o Docker Desktop e aguarde ele ficar "Running"

#### Verificar Instalação
```powershell
# Execute este comando para verificar se tudo está funcionando
.\scripts\check-docker.ps1
```

### 2. Iniciar o Ambiente

#### Opção A: Script Automático (Recomendado)
```powershell
# Execute o script de setup
.\scripts\docker-setup.ps1
```

#### Opção B: Comandos Manuais
```powershell
# Iniciar os serviços
docker-compose up -d

# Verificar status
docker-compose ps

# Ver logs
docker-compose logs postgres
```

### 3. Acessar os Serviços

#### pgAdmin (Interface Web)
- **URL**: http://localhost:5050
- **Email**: admin@clinicai.com
- **Senha**: admin123

#### PostgreSQL (Conexão Direta)
- **Host**: localhost
- **Porta**: 5432
- **Database**: clinicai_db
- **Usuário**: clinicai_user
- **Senha**: clinicai_password

#### Redis (Cache)
- **Host**: localhost
- **Porta**: 6379

### 4. Configurar o Projeto Next.js

#### Instalar Dependências
```bash
npm install pg @types/pg
# Opcional: npm install prisma @prisma/client
```

#### Configurar Variáveis de Ambiente
Crie um arquivo `.env.local` na raiz do projeto:
```env
# Database Configuration
DATABASE_URL="postgresql://clinicai_user:clinicai_password@localhost:5432/clinicai_db"
POSTGRES_HOST=localhost
POSTGRES_PORT=5432
POSTGRES_DB=clinicai_db
POSTGRES_USER=clinicai_user
POSTGRES_PASSWORD=clinicai_password

# Redis Configuration
REDIS_URL="redis://localhost:6379"

# Application Configuration
NEXTAUTH_SECRET="your-secret-key-here"
NEXTAUTH_URL="http://localhost:3000"
```

### 5. Testar Conexão

#### Via pgAdmin
1. Acesse http://localhost:5050
2. Faça login com admin@clinicai.com / admin123
3. O servidor "ClinicAI Database" já estará configurado
4. Explore as tabelas criadas

#### Via Código
Crie um arquivo de teste em `src/app/api/test-db/route.ts`:
```typescript
import { NextResponse } from 'next/server';
import { Pool } from 'pg';

const pool = new Pool({
  host: process.env.POSTGRES_HOST,
  port: parseInt(process.env.POSTGRES_PORT || '5432'),
  database: process.env.POSTGRES_DB,
  user: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
});

export async function GET() {
  try {
    const client = await pool.connect();
    const result = await client.query('SELECT * FROM doctors LIMIT 5');
    client.release();
    
    return NextResponse.json({
      success: true,
      data: result.rows,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
      timestamp: new Date().toISOString()
    }, { status: 500 });
  }
}
```

### 6. Comandos Úteis

#### Gerenciar Containers
```bash
# Iniciar
docker-compose up -d

# Parar
docker-compose down

# Parar e remover dados
docker-compose down -v

# Ver logs
docker-compose logs postgres
docker-compose logs pgadmin

# Ver logs em tempo real
docker-compose logs -f postgres
```

#### Acessar PostgreSQL via CLI
```bash
# Conectar ao banco
docker exec -it clinicai_postgres psql -U clinicai_user -d clinicai_db

# Executar comando SQL
docker exec -it clinicai_postgres psql -U clinicai_user -d clinicai_db -c "SELECT * FROM doctors;"
```

#### Backup e Restore
```bash
# Fazer backup
docker exec clinicai_postgres pg_dump -U clinicai_user clinicai_db > backup.sql

# Restaurar backup
docker exec -i clinicai_postgres psql -U clinicai_user clinicai_db < backup.sql
```

### 7. Estrutura do Banco

#### Tabelas Criadas
- `users` - Usuários do sistema
- `doctors` - Médicos
- `patients` - Pacientes  
- `appointments` - Consultas/Agendamentos
- `rooms` - Salas de consulta
- `financial_metrics` - Métricas financeiras
- `system_settings` - Configurações do sistema

#### Dados de Exemplo
- 2 usuários (admin e camila)
- 5 médicos com diferentes especialidades
- 5 salas de consulta
- Configurações padrão do sistema

### 8. Troubleshooting

#### Problema: Docker não está rodando
```bash
# Verificar se o Docker Desktop está iniciado
# Reiniciar o Docker Desktop se necessário
```

#### Problema: Porta já em uso
```bash
# Verificar o que está usando a porta
netstat -ano | findstr :5432
netstat -ano | findstr :5050

# Parar o processo ou mudar as portas no docker-compose.yml
```

#### Problema: Container não inicia
```bash
# Verificar logs
docker-compose logs postgres

# Reconstruir containers
docker-compose down
docker-compose up --build -d
```

#### Problema: pgAdmin não conecta
1. Aguarde alguns segundos após o início
2. Verifique se o PostgreSQL está rodando: `docker-compose ps`
3. Verifique os logs: `docker-compose logs pgadmin`

### 9. Próximos Passos

1. ✅ **Ambiente configurado** - Docker + PostgreSQL + pgAdmin
2. 🔄 **Configurar variáveis de ambiente** no projeto Next.js
3. 🔄 **Instalar dependências** do banco de dados
4. 🔄 **Criar APIs** para conectar com o banco
5. 🔄 **Testar conexões** usando o pgAdmin
6. 🔄 **Desenvolver funcionalidades** usando o banco

### 10. Segurança

⚠️ **IMPORTANTE**: As credenciais padrão são apenas para desenvolvimento. Em produção:
- Use senhas fortes e únicas
- Configure SSL/TLS
- Use variáveis de ambiente seguras
- Implemente autenticação adequada

---

## 🎉 Pronto!

Seu ambiente de banco de dados está configurado e pronto para desenvolvimento! 
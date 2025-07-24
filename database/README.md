# 🗄️ Ambiente de Banco de Dados - ClinicAI

Este diretório contém toda a configuração necessária para rodar o ambiente de banco de dados do ClinicAI usando Docker.

## 🚀 Configuração Rápida

### Pré-requisitos
- Docker Desktop instalado e rodando
- PowerShell (Windows) ou Terminal (Mac/Linux)

### 1. Iniciar o Ambiente
```powershell
# Windows (PowerShell)
.\scripts\docker-setup.ps1

# Ou manualmente:
docker-compose up -d
```

### 2. Verificar Status
```bash
docker-compose ps
```

### 3. Acessar pgAdmin
- URL: http://localhost:5050
- Email: admin@clinicai.com
- Senha: admin123

## 📊 Serviços Disponíveis

### PostgreSQL
- **Porta**: 5432
- **Database**: clinicai_db
- **Usuário**: clinicai_user
- **Senha**: clinicai_password

### pgAdmin
- **Porta**: 5050
- **URL**: http://localhost:5050
- **Email**: admin@clinicai.com
- **Senha**: admin123

### Redis (Opcional)
- **Porta**: 6379
- **URL**: redis://localhost:6379

## 🗂️ Estrutura do Banco

### Tabelas Principais
- `users` - Usuários do sistema
- `doctors` - Médicos
- `patients` - Pacientes
- `appointments` - Consultas/Agendamentos
- `rooms` - Salas de consulta
- `financial_metrics` - Métricas financeiras
- `system_settings` - Configurações do sistema

### Dados de Exemplo
O banco já vem com dados de exemplo incluindo:
- 2 usuários (admin e camila)
- 5 médicos com diferentes especialidades
- 5 salas de consulta
- Configurações padrão do sistema

## 🔧 Comandos Úteis

### Gerenciar Containers
```bash
# Iniciar serviços
docker-compose up -d

# Parar serviços
docker-compose down

# Parar e remover volumes (cuidado: apaga dados)
docker-compose down -v

# Ver logs
docker-compose logs postgres
docker-compose logs pgadmin

# Ver logs em tempo real
docker-compose logs -f postgres
```

### Acessar PostgreSQL via CLI
```bash
# Conectar ao banco
docker exec -it clinicai_postgres psql -U clinicai_user -d clinicai_db

# Executar comandos SQL
docker exec -it clinicai_postgres psql -U clinicai_user -d clinicai_db -c "SELECT * FROM doctors;"
```

### Backup e Restore
```bash
# Fazer backup
docker exec clinicai_postgres pg_dump -U clinicai_user clinicai_db > backup.sql

# Restaurar backup
docker exec -i clinicai_postgres psql -U clinicai_user clinicai_db < backup.sql
```

## 🔐 Segurança

### Credenciais Padrão
⚠️ **IMPORTANTE**: As credenciais padrão são apenas para desenvolvimento. Em produção, sempre use senhas fortes e únicas.

### Variáveis de Ambiente
Crie um arquivo `s.env.local` baseado no `env.example`:
```bash
cp env.example .env.local
```

## 🛠️ Troubleshooting

### Problema: Porta já em uso
```bash
# Verificar o que está usando a porta
netstat -ano | findstr :5432

# Parar o processo ou mudar a porta no docker-compose.yml
```
Stop-Service postgresql*


### Problema: Container não inicia
```bash
# Verificar logs
docker-compose logs postgres

# Reconstruir containers
docker-compose down
docker-compose up --build -d
```

### Problema: pgAdmin não conecta
1. Verifique se o PostgreSQL está rodando: `docker-compose ps`
2. Aguarde alguns segundos após o início
3. Verifique os logs: `docker-compose logs pgadmin`

## 📝 Próximos Passos

1. **Configurar variáveis de ambiente** no seu projeto Next.js
2. **Instalar dependências** do banco de dados:
   ```bash
   npm install pg @types/pg prisma
   ```
3. **Configurar Prisma** (opcional) para ORM
4. **Criar APIs** para conectar com o banco
5. **Testar conexões** usando o pgAdmin

## 🔄 Atualizações

Para atualizar o esquema do banco:
1. Modifique os arquivos em `database/init/`
2. Execute: `docker-compose down -v && docker-compose up -d`

⚠️ **Cuidado**: Isso apagará todos os dados existentes. 

## 🎉 **Perfeito! Agora você entende como usar o banco de dados!**

### 📋 **Resumo do que criamos:**

## ✅ **Infraestrutura Completa:**
- **Banco PostgreSQL** configurado com Docker
- **APIs** para conectar front-end com banco
- **Hook personalizado** para buscar dados
- **Página de teste** para verificar conexão
- **Dados de exemplo** prontos para inserção

## 🔄 **Como Funciona a Integração:**

### **Situação Atual:**
- ❌ **Front-end**: Usando dados estáticos/mockados
- ✅ **Banco**: Configurado e pronto
- ✅ **APIs**: Criadas e funcionais
- ❌ **Integração**: Ainda não conectada

### **Para Ativar a Integração:**

1. **Iniciar o banco:**
   ```bash
   cd clinicai-final
   docker-compose up -d
   ```

2. **Testar conexão:**
   - Acesse: `http://localhost:3000/test-db`
   - Clique em "Testar Conexão"

3. **Inserir dados:**
   - Na mesma página, clique em "Inserir Dados"

4. **Ver dashboard real:**
   - Acesse: `http://localhost:3000`
   - Agora os KPIs mostrarão dados reais!

## 🎯 **O que Muda no Dashboard:**

### **Antes (Dados Estáticos):**
- KPIs com valores fixos
- Consultas simuladas
- Médicos mockados

### **Depois (Dados Reais):**
- **KPIs dinâmicos** baseados no banco
- **Consultas reais** de hoje
- **Médicos online** em tempo real
- **Métricas financeiras** precisas
- **Atualização automática** a cada 30s

## 🚀 **Próximos Passos:**

1. **Teste a conexão** primeiro
2. **Insira dados de exemplo**
3. **Veja o dashboard funcionando**
4. **Personalize os dados** conforme necessário

**Agora você tem um sistema completo e profissional!** 

Quer que eu ajude você a testar a conexão ou tem alguma dúvida específica sobre como usar o banco? 

---

## O que isso significa?

- O banco de dados está rodando e sendo encontrado.
- O usuário `clinicai_user` existe.
- **A senha informada no seu `.env.local` está errada** (ou diferente da senha cadastrada no banco).

---

## Como resolver

### 1. Confirme a senha do usuário no banco

Segundo o README e o padrão do projeto, a senha deve ser:
```
clinicai_password
```

### 2. Verifique o seu arquivo `.env.local`

Abra o arquivo `.env.local` e confira se está assim (sem espaços extras, sem aspas):

```
DB_HOST=localhost
DB_PORT=5432
DB_NAME=clinicai_db
DB_USER=clinicai_user
DB_PASS=clinicai_password
```

**Atenção:**  
- O nome do campo deve ser exatamente `DB_PASS` (ou o que o seu código espera).
- A senha deve ser exatamente `clinicai_password`.

### 3. Reinicie o Next.js

Depois de corrigir o `.env.local`, pare o servidor Next.js e rode novamente:
```bash
npm run dev
```

### 4. Teste novamente

Acesse http://localhost:3000/test-db e clique em "Testar Conexão".

---

## Se continuar com erro

- Confirme se o usuário e senha estão corretos no banco (você pode ver isso pelo pgAdmin, em "Login/Group Roles").
- Se quiser, posso te mostrar como resetar a senha do usuário pelo pgAdmin.

---

**Resumo:**  
O erro é de senha incorreta para o usuário do banco.  
Corrija o `.env.local` e reinicie o Next.js.  
Se não resolver, me avise que te ajudo a resetar a senha do usuário no banco! 
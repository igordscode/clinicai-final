# 🗄️ Guia Completo do Banco de Dados - ClinicAI

## 📋 **Resumo da Situação Atual**

### ✅ **O que já está funcionando:**
- **Banco PostgreSQL** configurado e rodando
- **APIs criadas** para conectar front-end com banco
- **Dashboard** com interface completa
- **Dados de exemplo** prontos para inserção

### 🔄 **Como conectar o front-end com o banco:**

## 🚀 **Passo a Passo para Ativar o Banco**

### 1. **Iniciar o Banco de Dados**
```bash
cd clinicai-final
docker-compose up -d
```

### 2. **Verificar se está rodando**
```bash
docker-compose ps
```
Você deve ver:
- `clinicai_postgres` (PostgreSQL)
- `clinicai_pgadmin` (Interface web)

### 3. **Testar a Conexão**
Acesse: `http://localhost:3000/test-db`

Clique em **"Testar Conexão"** para verificar se tudo está funcionando.

### 4. **Inserir Dados de Exemplo**
Na mesma página de teste, clique em **"Inserir Dados"** para popular o banco com:
- 5 pacientes
- 6 consultas para hoje
- Métricas financeiras
- Status dos médicos e salas

### 5. **Ver o Dashboard com Dados Reais**
Acesse: `http://localhost:3000`

Agora o dashboard mostrará dados reais do banco!

## 📊 **Estrutura do Banco**

### **Tabelas Principais:**
- `users` - Usuários do sistema
- `doctors` - Médicos (5 registros)
- `patients` - Pacientes (5 registros)
- `appointments` - Consultas/Agendamentos
- `rooms` - Salas de consulta (5 salas)
- `financial_metrics` - Métricas financeiras
- `system_settings` - Configurações

### **APIs Criadas:**
- `/api/test-db` - Testar conexão
- `/api/seed-data` - Inserir dados de exemplo
- `/api/dashboard` - Buscar dados do dashboard

## 🔧 **Como Funciona a Integração**

### **Fluxo de Dados:**
1. **Front-end** chama `/api/dashboard`
2. **API** conecta com PostgreSQL
3. **Banco** retorna dados reais
4. **Dashboard** exibe informações atualizadas

### **Dados em Tempo Real:**
- Consultas de hoje
- Médicos online
- Pacientes novos
- Métricas financeiras
- Próximas consultas

## 🎯 **KPIs Conectados ao Banco**

### **Financiero:**
- **Facturación**: Dados da tabela `financial_metrics`
- **Resultado Neto**: Calculado a partir das métricas
- **Valor del Paciente**: Média dos valores de consulta
- **Pagos Confirmados**: Consultas confirmadas

### **Atención:**
- **Citas (Hoy)**: Consultas de hoje da tabela `appointments`
- **Consultas Concluidas**: Status 'completed'
- **Pacientes Nuevos**: Novos registros na tabela `patients`
- **Tasa de Ocupación**: Salas ocupadas vs. total

### **Marketing & Leads:**
- **Ticket Medio**: Média dos valores de consulta
- **CAC Promedio**: Calculado a partir das métricas
- **Tasa de Conversión**: Consultas confirmadas vs. total
- **ROI de Campañas**: Métricas de marketing

### **Experiencia del Paciente:**
- **NPS Score**: Calculado a partir de feedback
- **Tiempo de Espera**: Baseado nos horários das consultas
- **Satisfacción**: Métricas de satisfação
- **Recomendaciones**: Taxa de recomendações

## 🛠️ **Troubleshooting**

### **Problema: Docker não inicia**
```bash
# Verificar se Docker está rodando
docker --version

# Reiniciar Docker Desktop
# Tentar novamente
docker-compose up -d
```

### **Problema: Porta já em uso**
```bash
# Verificar o que está usando a porta 5432
netstat -ano | findstr :5432

# Parar o processo ou mudar porta no docker-compose.yml
```

### **Problema: API não conecta**
1. Verificar se banco está rodando: `docker-compose ps`
2. Testar conexão: `http://localhost:3000/test-db`
3. Verificar logs: `docker-compose logs postgres`

## 📈 **Próximos Passos**

### **Para Produção:**
1. **Configurar variáveis de ambiente** no `.env.local`
2. **Usar senhas fortes** para o banco
3. **Configurar backup automático**
4. **Implementar autenticação**

### **Para Desenvolvimento:**
1. **Adicionar mais dados de exemplo**
2. **Criar APIs para CRUD completo**
3. **Implementar filtros e busca**
4. **Adicionar gráficos dinâmicos**

## 🎉 **Resultado Final**

Com tudo configurado, você terá:
- ✅ **Dashboard com dados reais** do banco PostgreSQL
- ✅ **KPIs atualizados** automaticamente
- ✅ **Consultas em tempo real**
- ✅ **Métricas financeiras** precisas
- ✅ **Interface profissional** e responsiva

**Agora seu ClinicAI está 100% funcional com banco de dados!** 🚀 
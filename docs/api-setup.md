# Configuração da API do Funil de Vendas

## Visão Geral

Esta API conecta o frontend do dashboard com o banco de dados PostgreSQL para exibir dados do funil de vendas em tempo real.

## Estrutura dos Arquivos

```
src/
├── app/
│   └── api/
│       ├── funil/
│       │   └── route.ts          # API do funil de vendas
│       └── test-db/
│           └── route.ts          # API para testar conexão
├── components/
│   └── FunilVendas.tsx          # Componente React do funil
└── lib/
    └── database.ts              # Configuração do PostgreSQL
```

## Configuração do Banco de Dados

### 1. Variáveis de Ambiente

Crie um arquivo `.env.local` na raiz do projeto com as seguintes variáveis:

```env
# Configurações do Banco de Dados PostgreSQL
DB_USER=postgres
DB_HOST=localhost
DB_NAME=dinastia
DB_PASSWORD=sua_senha_aqui
DB_PORT=5432

# Configurações do Ambiente
NODE_ENV=development
```

### 2. Estrutura da Tabela

A API espera uma tabela `ao_clientes` com a seguinte estrutura:

```sql
CREATE TABLE ao_clientes (
    id SERIAL PRIMARY KEY,
    numero VARCHAR(255),
    departamento VARCHAR(255),
    status VARCHAR(255),
    data TIMESTAMP,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);
```

## Endpoints da API

### 1. GET /api/funil

Retorna as contagens de clientes por status no funil de vendas.

**Resposta de Sucesso:**
```json
{
  "success": true,
  "data": {
    "contactos": 35,
    "calificados": 7,
    "presupuesto": 5,
    "negociacion": 3,
    "cerrado": 12,
    "perdido": 2
  },
  "total": 64
}
```

### 2. GET /api/test-db

Testa a conexão com o banco de dados.

**Resposta de Sucesso:**
```json
{
  "success": true,
  "message": "Conexão com o banco de dados estabelecida com sucesso!",
  "timestamp": "2024-01-15T10:30:00.000Z"
}
```

## Componente React

O componente `FunilVendas.tsx` exibe os dados do funil de vendas com:

- **Loading state**: Spinner durante o carregamento
- **Error handling**: Mensagens de erro e botão de retry
- **Status colors**: Cores diferentes para cada status
- **Percentages**: Porcentagens calculadas automaticamente
- **Responsive design**: Layout adaptável

## Como Usar

### 1. Instalar Dependências

```bash
npm install pg @types/pg
```

### 2. Configurar Variáveis de Ambiente

Copie o arquivo `.env.example` para `.env.local` e configure suas credenciais.

### 3. Testar Conexão

Acesse `http://localhost:3000/api/test-db` para verificar se a conexão está funcionando.

### 4. Usar o Componente

```tsx
import FunilVendas from '@/components/FunilVendas';

export default function Dashboard() {
  return (
    <div>
      <FunilVendas />
    </div>
  );
}
```

## Status do Funil

Os status suportados são:

- **contactos**: Contatos iniciais
- **calificados**: Leads qualificados
- **presupuesto**: Orçamentos enviados
- **negociacion**: Em negociação
- **cerrado**: Venda fechada
- **perdido**: Oportunidade perdida

## Tratamento de Erros

A API inclui tratamento robusto de erros:

- **Conexão com banco**: Timeout e retry automático
- **Queries inválidas**: Validação de SQL
- **Dados ausentes**: Fallbacks para valores nulos
- **Logs detalhados**: Console logging para debugging

## Performance

- **Connection pooling**: Reutilização de conexões
- **Query optimization**: Índices recomendados na coluna `status`
- **Caching**: Possibilidade de implementar cache Redis
- **Pagination**: Suporte para grandes volumes de dados 
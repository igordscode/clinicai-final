# Checklist de Migração: Dashboard HTML → React/Next.js

Este checklist serve para acompanhar o progresso da migração do protótipo HTML do dashboard para um projeto real em React (Next.js), incluindo preparação para integração com backend.

---

## 🏆 Épico 1: Preparação do Terreno
- [x] 1.1 Limpar o arquivo `src/app/page.tsx` (remover conteúdo padrão)
- [x] 1.2 Limpar o arquivo `src/app/globals.css` (remover estilos padrão)
- [x] 1.3 Copiar o HTML do `<body>` do protótipo para o `page.tsx`
- [x] 1.4 Substituir todos os `class` por `className` no JSX
- [x] 1.5 Copiar o CSS do `<style>` do protótipo para o `globals.css`
- [x] 1.6 Rodar o projeto (`npm run dev`) e validar visualmente

---

## 🏆 Épico 2: Refatoração em Componentes React
- [x] 2.1 Identificar blocos reutilizáveis (KPIs, cards, header, sidebar, etc)
- [x] 2.2 Criar componentes para cada bloco principal
    - [x] 2.2.1 Componente Header
    - [x] 2.2.2 Componente Sidebar/Menu
    - [x] 2.2.3 Componente KPI Card
    - [x] 2.2.4 Componente Card de Sessão
    - [x] 2.2.5 Componente Tabela/Lista
    - [x] 2.2.6 Componente Gráfico (placeholder)
    - [x] 2.2.7 Outros (tooltips, botões, etc)
- [x] 2.3 Substituir o HTML estático pelos componentes criados

---

## 🏆 Épico 3: Preparação para Dados Dinâmicos
- [ ] 3.1 Definir estrutura de dados esperada para cada componente
- [x] 3.2 Criar mocks (dados fake) para alimentar os componentes
- [x] 3.3 Refatorar componentes para receber props/dados dinâmicos
- [x] 3.4 Validar que a interface continua igual, mas agora com dados vindos dos mocks

---

## 🏆 Épico 4: Integração com Backend/API
- [ ] 4.1 Definir endpoints necessários para os KPIs e cards
- [ ] 4.2 Criar rotas de API (mock ou reais) no Next.js (`/api`)
- [ ] 4.3 Fazer fetch dos dados no frontend (React)
- [ ] 4.4 Substituir mocks pelos dados reais da API
- [ ] 4.5 Validar atualização em tempo real (se aplicável)

---

## 🏆 Épico 5: Deploy e Validação Final
- [ ] 5.1 Configurar deploy (Vercel, Netlify, etc)
- [ ] 5.2 Subir o projeto e testar em ambiente de produção
- [ ] 5.3 Validar responsividade e cross-browser
- [ ] 5.4 Revisar checklist e marcar tarefas concluídas

---

> Atualize este arquivo conforme for avançando. Marque as tarefas concluídas com [x]. 
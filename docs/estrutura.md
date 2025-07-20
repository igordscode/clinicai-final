# Estrutura do Dashboard ClinicAI – vFinal (Protótipo HTML)

**Missão da Tela:** Ser o cockpit central da clínica, reunindo KPIs estratégicos, insights inteligentes, agenda, funil, pacientes e operações do dia, com visual moderno, agrupamento claro e microinterações.

---

## Layout Geral

A página é composta por seções empilhadas verticalmente (mobile) e organizadas em grid (desktop), seguindo esta ordem:

1. **Header Global** (fixo no topo)
2. **Seção de Boas-vindas** (banner com nome do usuário, ações rápidas e seletor de período)
3. **KPIs Agrupados por Categoria**
    - Financeiro
    - Atenção
    - Marketing & Leads
    - Experiência do Paciente
4. **Centro de Inteligência** (cards de insights automáticos)
5. **Turnos de Consulta** (lista do dia)
6. **Pacientes Recentes** (tabela)
7. **Vista Rápida do Embudo** (funil de leads)
8. **Gráficos**
    - Rendimiento Financeiro (linha/área)
    - Leads Novos vs Convertidos (barras)
9. **Profissionais** (carrossel de cards)
10. **Ranking de Satisfação** (top 3 profissionais)
11. **Resumo Operacional** (metas, alertas, consultas por especialidade)
12. **Alertas & Sugestões** (cards de alerta, tooltips)
13. **Configurações** (acesso via menu lateral)

---

## Componentes Detalhados

### 1. Header Global
- Fixo no topo, inclui logo, navegação lateral, notificações, busca e perfil do usuário.

### 2. Seção de Boas-vindas
- Banner com saudação personalizada, ações rápidas (Novo Lead, Nova Cita, Ver Finanzas, etc.) e seletor de período.
- Exemplo:
  ```html
  <h1 class="text-3xl font-bold">Hola, Camila 👋</h1>
  <div class="flex gap-4">
    <button class="...">Nuevo Lead</button>
    <!-- outros botões -->
  </div>
  ```

### 3. KPIs Agrupados por Categoria
- KPIs organizados em grupos: Financeiro, Atenção, Marketing & Leads, Experiência do Paciente.
- Cada grupo tem ícone, título e grid de cards KPI.
- Cards incluem ícone, título, valor, variação e tooltip explicativo.
- Exemplo:
  ```html
  <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
    <div class="card ...">...</div>
    <!-- outros KPIs -->
  </div>
  ```

### 4. Centro de Inteligência
- Cards de insights automáticos (ex: Meta Estratégica, Oportunidade Latente, Risco de Estancamento).
- Cada card tem cor de fundo, ícone, título, texto e link de ação.

### 5. Turnos de Consulta
- Lista dos turnos do dia, com horário, profissional, procedimento e status (cor).

### 6. Pacientes Recentes
- Tabela com nome, contato, status, última consulta e ações rápidas.

### 7. Vista Rápida do Embudo
- Funil visual com blocos coloridos para cada etapa (Contactos, Calificados, Presupuesto, Agendado, Perdidos), setas de conversão e tempos médios.

### 8. Gráficos
- **Rendimiento Financeiro:** Gráfico de linha/área com gradiente, legendas e pontos de dados.
- **Leads Novos vs Convertidos:** Gráfico de barras lado a lado, legendas coloridas.

### 9. Profissionais
- Carrossel horizontal de cards de profissionais, com foto, nome, especialidade, nota, pacientes e receita do mês.

### 10. Ranking de Satisfação
- Card lateral com top 3 profissionais, medalhas, notas e avaliações.

### 11. Resumo Operacional
- Cards de meta semanal, pacientes ativos (gauge), consultas por especialidade (barras), alertas e sugestões.

### 12. Alertas & Sugestões
- Cards de alerta no topo (rotativos), tooltips explicativos nos KPIs e cards.

### 13. Configurações
- Acesso via menu lateral, inclui Meu Perfil, Notificações, Clínica, Usuários, Serviços, Integrações, Faturamento.

---

## Observações Finais
- Todos os nomes, agrupamentos e exemplos refletem o dashboard.html final.
- Seções antigas ou não implementadas foram removidas ou adaptadas.
- Para evoluções futuras, atualizar este documento para manter o alinhamento com o produto real.


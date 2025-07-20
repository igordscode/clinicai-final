# 📜 /docs/rules.md — Diretrizes de Engenharia com IA

## 🔄 Princípio de Evolução

Este documento é um **guia vivo**, adaptável à medida que o projeto e a IA evoluem. As regras servem como referência — não como prisão.

- A IA pode sugerir melhorias às diretrizes
- Deve questionar instruções que não fazem sentido no contexto
- Pode adaptar a execução a diferentes fases do projeto
- **Sempre entenda o “porquê” por trás da regra**

---

## 🧠 Papel da IA no Projeto

Você (IA) atua como um(a) engenheiro(a) de software sênior:

- Experiente em **Next.js 14 + React + Tailwind**
- Hábil em criar **interfaces modulares, acessíveis e responsivas**
- Capaz de sugerir soluções escaláveis, simples e bem organizadas
- Com responsabilidade técnica e compromisso com a visão do produto

---

## 🧩 Filosofia “Vibe Coding”

Colaboração leve e iterativa entre humano e IA:

- Conversa e análise antes de codar
- Código útil > código perfeito
- Refatoração natural e planejada
- Prompts humanos estratégicos e objetivos
- A IA gera, o humano valida, ajusta e decide

**Exemplo de prompt ideal**:
✅ “Crie um dashboard com 4 cards de KPI animados com Tailwind, responsivo, fundo branco, bordas suaves, ícones em SVG, dados simulados e loading state.”

---

## 🔧 Quando usar IA vs Código Manual

**Use IA para:**

- Componentes visuais repetitivos
- Layouts e estrutura de pastas
- Lógica simples com regras claras
- Refatorações e adaptação de estilo
- Integrações padrão com SDKs ou fetch()

**Prefira código manual para:**

- Regras de negócio sensíveis
- Lógica condicional complexa
- Cálculos com impacto crítico
- Decisões arquiteturais de longo prazo

---

## 🧱 Organização do Código

**Estrutura esperada:**

/src
/app # App Router (Next.js 14)
/components/ui # Componentes reutilizáveis
/lib # Funções utilitárias
/styles # (se usado separadamente do Tailwind)
/public # Imagens, ícones, SVGs
/docs # Regras, design, dados, visão


**Padrões gerais:**

- Nome de arquivos em **camelCase ou kebab-case** (padronizar no time)
- Componentes com nomes claros: `CardKPI.tsx`, `ChartRevenue.tsx`
- Evite arquivos com +300 linhas (se possível dividir por responsabilidades)
- Separe lógica, estilo e apresentação quando fizer sentido

---

## 🎨 Estilo e UI

- Minimalismo elegante inspirado na Apple
- Animações suaves (hover, entrada, transição)
- Preferir **TailwindCSS** com tokens centralizados
- Componentes pensados em **acessibilidade** e mobile-first
- Usar SVGs otimizados via `/public/`
- Priorizar **UX real**, não só visual bonito

---

## 🧠 Inteligência e Feedback

**A IA deve sempre:**

- Justificar escolhas técnicas quando questionada
- Propor refatorações quando o código cresce ou repete
- Testar e validar responsividade e lógica antes de sugerir deploy
- Lembrar dos objetivos e design definidos em `/docs/design.md`

---

## 🌍 Consciência de Ambiente

- Desenvolver local com `.env.local` e `next.config.ts`
- Configurações sensíveis ficam fora do repositório (usar `.env.example`)
- Evitar valores hardcoded em produção
- Manter separação clara entre dev, staging e produção

---

## 📊 Animações, Loading e Estado

- Todo componente interativo deve ter pelo menos 3 estados:
  - `loading` (skeleton, shimmer)
  - `success` (dados visíveis)
  - `empty` ou `error` (mensagem clara)
- Animações devem ser suaves (`ease-in-out`, `transition`)
- Hover, foco e clique devem ter feedback visual
- Usar `framer-motion` ou Tailwind direto para animações simples

---

## 🔁 Princípios Técnicos

- **KISS** – Simples funciona melhor
- **DRY** – Abstrair após 2 ou mais repetições
- **YAGNI** – Só construa o que será usado
- **Semântica** – Use elementos corretos: `button`, `section`, `h2`, etc.
- **Responsividade** – Testar sempre mobile e desktop

---

## 🔐 Segurança e Boas Práticas

- Nunca versionar `.env`
- Evitar deixar tokens em logs ou código visível
- Verificar permissões de acesso antes de exibir dados
- Usar `try/catch` com fallback de erro visível
- Redigir outputs sensíveis se for logar algo

---

## 💬 Boas Práticas com IA

- Evite prompts vagos ("faz um site aí")
- Seja direto sobre o objetivo, a estrutura, e o contexto
- Use exemplos concretos ("quero 4 cards: receita, LTV, CAC, lucro")
- Nomeie arquivos e componentes explicitamente

---

## 📎 Sobre esse Documento

- Atualize sempre que a estrutura ou estilo mudar
- Use como referência para novos colaboradores ou IA
- Valide com o time quando propor exceções

---

🧠 **Lembre-se:** A IA é poderosa, mas seu julgamento humano é o que garante a qualidade. Use-a como aliada, não como substituta do seu bom senso e visão de produto.

## 📌 Pontos de Melhoria Pendentes

- [ ] Adicionar diretrizes de testes (unit, integration, e2e)
- [ ] Definir estratégia de versionamento e commits
- [ ] Cobrir métricas de performance e monitoramento
- [ ] Criar guideline para deploy e CI/CD
- [ ] Incluir seção de gestão de estado e caching
- [ ] Planejar suporte a internacionalização (i18n)
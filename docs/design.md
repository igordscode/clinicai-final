O objetivo do `design.md` não é só guardar o código CSS. É **explicar a *intenção* por trás do design**. Isso ajuda a manter a consistência e guia qualquer pessoa (inclusive a IA ou um futuro desenvolvedor) a tomar decisões de design alinhadas com a sua visão.

# Design System – ClinicAI v1.1

Este documento é a fonte da verdade para toda a identidade visual e os princípios de design da aplicação ClinicAI. Ele reflete o design real do protótipo atual (dashboard.html), servindo como referência para futuras implementações em React, Node, etc.

---

## 🎨 1. Filosofia de Design

Nossa filosofia é **"Clareza, Hierarquia e Modernidade com Personalidade"**. O ClinicAI busca uma experiência visual que:
- Prioriza a clareza da informação e a hierarquia visual, facilitando a tomada de decisão rápida.
- Utiliza cores suaves em OKLCH para transmitir calma e sofisticação, evitando poluição visual.
- Adota cards arredondados, sombras leves e espaçamentos generosos para criar uma interface leve e agradável.
- Faz uso extensivo de ícones Lucide, tooltips explicativos e microinterações para enriquecer a experiência sem sobrecarregar o usuário.
- Inspira-se em SaaS modernos (Notion, Linear, Superhuman), mas com identidade própria, adaptando padrões globais ao contexto de clínicas e saúde.
- Garante que cada elemento visual tenha propósito, evitando decorações desnecessárias.

> O design system é vivo: sempre que o dashboard evoluir visualmente, atualize esta filosofia para manter o alinhamento entre intenção e entrega.

---

## 🖌️ 2. Paleta de Cores (Tokens CSS)

A paleta de cores abaixo está implementada como variáveis CSS globais no protótipo. Use sempre os tokens para garantir consistência visual.

```css
:root {
  --background: oklch(1.0000 0 0);
  --foreground: oklch(0.3211 0 0);
  --card: oklch(1.0000 0 0);
  --card-foreground: oklch(0.3211 0 0);
  --popover: oklch(1.0000 0 0);
  --popover-foreground: oklch(0.3211 0 0);
  --primary: oklch(0.6231 0.1880 259.8145);
  --primary-foreground: oklch(1.0000 0 0);
  --secondary: oklch(0.9670 0.0029 264.5419);
  --secondary-foreground: oklch(0.4461 0.0263 256.8018);
  --muted: oklch(0.9846 0.0017 247.8389);
  --muted-foreground: oklch(0.5510 0.0234 264.3637);
  --accent: oklch(0.9514 0.0250 236.8242);
  --accent-foreground: oklch(0.3791 0.1378 265.5222);
  --destructive: oklch(0.6368 0.2078 25.3313);
  --destructive-foreground: oklch(1.0000 0 0);
  --border: oklch(0.9276 0.0058 264.5313);
  --input: oklch(0.9276 0.0058 264.5313);
  --ring: oklch(0.6231 0.1880 259.8145);
  --radius: 0.375rem; /* 6px */
  --shadow: 0 1.5px 8px 0 rgba(30,34,40,0.06);
}
```

> **Obs:** Os valores acima são os mesmos do dashboard.html. Se houver ajuste futuro, sempre atualizar aqui.

---

## ✍️ 3. Tipografia

- **Fonte Principal:** `Inter`, fallback `sans-serif` (usada via Tailwind `font-sans`)
- **Hierarquia:**
  - `H1 (Títulos de Página)`: 2rem/3xl, bold (700)
  - `H2 (Seções)`: 1.5rem/2xl, semibold (600)
  - `H3 (Cards)`: 1.25rem/xl, semibold (600)
  - `Corpo`: 1rem/base, regular (400)
  - `Pequeno/Label`: 0.875rem/sm, medium (500)
- **Exemplo real:**
  ```html
  <h1 class="text-3xl font-bold">Hola, Camila 👋</h1>
  <h2 class="text-2xl font-bold mb-8">Indicadores Clave</h2>
  <span class="text-sm text-muted-foreground font-semibold">Facturación (Mes)</span>
  ```

---

## 🔳 4. Componentes e Estilo

- **Cards:**
  - Fundo: `var(--card)`
  - Borda: 1px sólida `var(--border)`
  - Raio: `var(--radius)` (6px)
  - Sombra: `var(--shadow)`
  - Exemplo:
    ```html
    <div class="card p-5 border border-blue-800/30 shadow-sm rounded-2xl flex flex-col gap-2">
      <!-- conteúdo do KPI -->
    </div>
    ```
- **Botões:**
  - Primário: fundo `var(--primary)`, texto branco, radius grande, sombra leve.
  - Secundário: borda `var(--primary)`, texto `var(--primary)`, fundo branco.
  - Exemplo:
    ```html
    <button class="flex items-center gap-1 px-3 py-1.5 rounded-2xl bg-blue-600 text-white font-medium hover:bg-blue-700 transition text-sm shadow-md">
      <i data-lucide='user-plus' class='w-4 h-4'></i> Nuevo Lead
    </button>
    ```
- **Ícones:** Lucide (via CDN), sempre alinhados ao texto, tamanho 4~6.
- **Tooltips:**
  - Usados para explicar KPIs e métricas.
  - Exemplo:
    ```html
    <span class="ml-1 relative group align-baseline cursor-pointer">
      <svg class="inline w-4 h-4 text-zinc-400 group-hover:text-blue-600 transition"></svg>
      <span class="absolute ... group-hover:opacity-100 ...">Texto explicativo</span>
    </span>
    ```
- **Espaçamento:**
  - Base: 4px (`gap-1`), múltiplos para paddings/margens (`gap-2`, `p-4`, etc.)
  - Cards e seções usam `gap-4` a `gap-8` para separar blocos.
- **Grid:**
  - KPIs: `grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6`
  - Cards principais: `flex flex-col md:flex-row gap-6`

---

## Exemplos Visuais do Dashboard

- **KPI Card:**
  ```html
  <div class="card p-5 border border-blue-800/30 shadow-sm rounded-2xl flex flex-col gap-2">
    <div class="flex items-center gap-2 items-end">
      <i data-lucide="dollar-sign" class="w-5 h-5 text-blue-800"></i>
      <span class="text-sm text-muted-foreground font-semibold">Facturación (Mes)</span>
    </div>
    <div class="text-2xl font-bold">Gs. 74.000.000</div>
    <div class="flex items-center gap-1 text-sm text-green-600">
      <i data-lucide="arrow-up-right" class="w-4 h-4"></i> +8% <span class="ml-1 text-muted-foreground">Mensual</span>
    </div>
  </div>
  ```

- **Card de Sessão (Centro de Inteligência):**
  ```html
  <div class="bg-green-50 border-l-4 border-green-500 p-4 rounded-lg flex flex-col hover:shadow-xl hover:-translate-y-1 transition">
    <h3 class="font-bold text-green-800 mb-2 flex items-center gap-1"><i data-lucide="rocket" class="w-5 h-5 text-green-600"></i> Meta Estratégica</h3>
    <p class="text-sm text-green-900 mb-2">Incrementar o ticket médio...</p>
    <a href="#" class="text-green-700 underline text-sm">Ver comparação</a>
  </div>
  ```

- **Botão de ação rápida:**
  ```html
  <button class="flex items-center gap-1 px-3 py-1.5 rounded-2xl bg-blue-600 text-white font-medium hover:bg-blue-700 transition text-sm shadow-md">
    <i data-lucide='user-plus' class='w-4 h-4'></i> Nuevo Lead
  </button>
  ```

- **Botão secundário:**
  ```html
  <button class="flex items-center gap-1 px-3 py-1.5 rounded-2xl border border-blue-600 text-blue-600 font-medium bg-white hover:bg-blue-50 transition text-sm shadow-md">
    <i data-lucide='calendar-plus' class='w-4 h-4'></i> Nueva Cita
  </button>
  ```

- **Tooltip explicativo:**
  ```html
  <span class="ml-1 relative group align-baseline cursor-pointer">
    <svg class="inline w-4 h-4 text-zinc-400 group-hover:text-blue-600 transition"></svg>
    <span class="absolute left-1/2 -translate-x-1/2 top-full mt-1 w-48 bg-white text-xs text-zinc-700 rounded shadow-lg px-3 py-2 opacity-0 group-hover:opacity-100 pointer-events-none transition z-50 border border-gray-200 whitespace-normal text-left">
      LTV (Lifetime Value): Valor total médio que um paciente gera durante sua relação com a clínica.
    </span>
  </span>
  ```

- **Grid de KPIs:**
  ```html
  <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
    <!-- cards de KPI aqui -->
  </div>
  ```

- **Espaçamento e separação de sessões:**
  ```html
  <section class="mb-16">
    <h2 class="text-2xl font-bold mb-8">Indicadores Clave</h2>
    <!-- conteúdo -->
  </section>
  ```

- **Hierarquia de títulos:**
  ```html
  <h1 class="text-3xl font-bold">Hola, Camila 👋</h1>
  <h2 class="text-2xl font-bold mb-8">Indicadores Clave</h2>
  <h3 class="text-lg font-semibold">Financiero</h3>
  ```

- **Ícones Lucide:**
  ```html
  <i data-lucide="users" class="w-6 h-6 text-violet-600"></i>
  ```

---

### Como Usar Este Documento

- Sempre consulte este arquivo antes de criar ou alterar componentes visuais.
- Ao migrar para React/Node, siga os tokens, hierarquia e exemplos daqui para manter a consistência visual.
- Se o protótipo evoluir, lembre-se de atualizar este documento!

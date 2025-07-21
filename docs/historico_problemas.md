# 🛠️ Histórico de Problemas Resolvidos - ClinicAI

---

## 2024-07-18 - Tailwind não aplica estilos / Dashboard sem formatação

**Problema:**  
O dashboard carregava, mas sem nenhuma formatação, cor ou responsividade.  
Erro: `Unknown at rule @tailwind` e problemas com PostCSS/Tailwind v4.

**Como resolvemos:**  
- Voltamos para Tailwind CSS v3.4.0 (mais estável)
- Corrigimos o postcss.config.mjs para usar `tailwindcss` e `autoprefixer`
- Limpamos o cache do Next.js e node_modules
- Reinstalamos as dependências
- Resultado: Dashboard voltou a funcionar com todos os estilos!

---

## 2024-07-17 - Erro: Module not found: Can't resolve './globals.css'

**Problema:**  
O arquivo `globals.css` foi deletado/renomeado e o Next.js não encontrava o CSS global.

**Como resolvemos:**  
- Recriamos o arquivo `globals.css` com o conteúdo correto do Tailwind
- Atualizamos o import no `layout.tsx`
- Reiniciamos o servidor

---

## Como usar este arquivo

- Sempre que resolver um bug, adicione uma nova seção com:
  - Data
  - Descrição do problema
  - Como foi resolvido (passo a passo)
  - Observações/dicas para o futuro

---

## Dicas

- Seja objetivo, mas detalhado o suficiente para que qualquer dev entenda.
- Se possível, adicione prints ou links para commits relacionados.
- Use datas para facilitar a busca.

---

## 2025-07-20 - Erro: PowerShell não reconhece `&&` como separador de comandos

**Problema:**  
Ao tentar executar `cd clinicai-final && npm run dev`, o PowerShell retorna erro:
```
The token '&&' is not a valid statement separator in this version.
```

**Como resolver:**  
**Opção 1 - Usar `;` (recomendado):**
```powershell
cd clinicai-final; npm run dev
```

**Opção 2 - Executar comandos separadamente:**
```powershell
cd clinicai-final
npm run dev
```

**Opção 3 - Usar `&&` com cmd (não PowerShell):**
```cmd
cd clinicai-final && npm run dev
```

**Por que acontece:**  
O PowerShell usa `;` como separador de comandos, diferente do bash/cmd que usa `&&`.

---

## 2025-07-20 - Erro: ENOENT - Could not read package.json

**Problema:**  
Ao executar `npm run dev` no diretório errado, retorna:
```
npm error code ENOENT
npm error syscall open
npm error path C:\Users\TestP\clinicai\package.json
npm error errno -4058
npm error enoent Could not read package.json: Error: ENOENT: no such file or directory
```

**Como resolver:**  
**Passo 1:** Verificar se está no diretório correto:
```powershell
pwd  # ou dir
```

**Passo 2:** Navegar para o diretório do projeto:
```powershell
cd clinicai-final
```

**Passo 3:** Verificar se o package.json existe:
```powershell
ls package.json  # ou dir package.json
```

**Passo 4:** Executar o comando:
```powershell
npm run dev
```

**Prevenção:**  
- Sempre verificar se está no diretório correto antes de executar comandos npm
- Usar `cd clinicai-final` antes de qualquer comando npm
- Verificar se existe `package.json` no diretório atual

---

## 2025-07-20 - Layout de Cards: Problema com grid vs flex

**Problema:**  
Cards de métricas (Citas Hoy, En Espera, Urgencias) não se organizavam corretamente no espaço disponível, causando desperdício de área.

**Como resolvemos:**  
**Antes (problemático):**
```jsx
<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-1.5 md:gap-2">
  <div className="flex gap-4 overflow-x-auto pb-2 mb-4">
    <div className="min-w-[140px] bg-emerald-50 border border-emerald-200 rounded-lg p-3 text-center">
      {/* conteúdo */}
    </div>
    {/* mais cards... */}
  </div>
</div>
```

**Depois (corrigido):**
```jsx
<div className="grid grid-cols-3 gap-2">
  <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-3 text-center">
    {/* conteúdo */}
  </div>
  {/* mais cards... */}
</div>
```

**Mudanças aplicadas:**
- Removido `flex` com `overflow-x-auto` desnecessário
- Substituído por `grid grid-cols-3` para 3 colunas fixas
- Removido `min-w-[140px]` que forçava larguras mínimas
- Simplificado padding e espaçamento

**Resultado:**  
Os 3 cards agora se distribuem perfeitamente no espaço disponível sem desperdício de área.

---

## [BUG] Tooltip da Sidebar retraída não aparecia corretamente e sumia o nome ao expandir

### Problema
- Quando a sidebar estava retraída, o tooltip customizado (nome da página) não aparecia corretamente ou ficava "atrás" do ícone.
- Quando expandida, o nome da página sumia (só aparecia o ícone centralizado).

### Solução
- O item da sidebar foi ajustado para:
  - Renderizar **sempre** o nome da página ao lado do ícone quando expandida (`!isCollapsed`).
  - Renderizar o **tooltip customizado** apenas quando retraída (`isCollapsed`), usando classes:
    - `absolute left-[60px] top-1/2 -translate-y-1/2 px-2 py-1 bg-gray-200 text-gray-900 rounded text-sm whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity z-50 shadow-lg`
  - O layout do `<a>` foi ajustado para:
    - `flex items-center h-12 w-full justify-start px-4` quando expandida
    - `flex items-center justify-center h-12 w-12` quando retraída
    - `overflow: visible` para evitar corte do tooltip
- O texto do menu aparece ao lado do ícone quando expandida, e como tooltip flutuante ao passar o mouse quando retraída.

### Exemplo de código:
```jsx
<a
  className={`group relative flex items-center h-12 w-full bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl shadow-lg ${isCollapsed ? 'justify-center w-12 px-0' : 'justify-start px-4'}`}
  style={{ overflow: "visible" }}
>
  <svg className="w-5 h-5" ... />
  {!isCollapsed && (
    <span className="ml-4 text-white font-medium text-base">Inicio</span>
  )}
  {isCollapsed && (
    <span className="absolute left-[60px] top-1/2 -translate-y-1/2 px-2 py-1 bg-gray-200 text-gray-900 rounded text-sm whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity z-50 shadow-lg">
      Inicio
    </span>
  )}
</a>
```

### Observações
- Esse padrão pode ser replicado para qualquer item de menu ou botão com tooltip customizado.
- O segredo é manter o texto sempre renderizado (expandida) e o tooltip só no hover (retraída), com posicionamento absoluto e z-index alto.

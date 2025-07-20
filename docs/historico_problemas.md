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

# docs
Documentação do projeto.

---

## Padrão de Sidebar com Tooltip Customizado

Para garantir consistência e ótima experiência de usuário em todas as páginas, utilize o seguinte padrão para itens de menu na sidebar:

- Quando expandida, o ícone e o texto ficam alinhados à esquerda, ocupando toda a largura do item.
- Quando retraída, apenas o ícone aparece centralizado, com o tooltip customizado ao passar o mouse.

### Exemplo de código reutilizável

```jsx
<a
  href="#"
  className={`group relative flex items-center h-12 w-full bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl shadow-lg ${isCollapsed ? 'justify-center w-12 px-0' : 'justify-start px-4'}`}
  style={{ overflow: "visible" }}
>
  <svg className="w-5 h-5" ... />
  {/* Texto ao lado do ícone, só quando expandida */}
  {!isCollapsed && (
    <span className="ml-4 text-white font-medium text-lg">Inicio</span>
  )}
  {/* Tooltip, só quando retraída */}
  {isCollapsed && (
    <span className="absolute left-[60px] top-1/2 -translate-y-1/2 px-2 py-1 bg-gray-200 text-gray-900 rounded text-base whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity z-50 shadow-lg">
      Inicio
    </span>
  )}
</a>
```

- Substitua o texto e o ícone conforme o item do menu.
- Use a prop/estado `isCollapsed` para controlar o modo retraído/expandido.
- Esse padrão pode ser replicado para qualquer menu lateral ou botão com tooltip customizado.

---

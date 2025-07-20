# Sistema de Elevação - Design System

## Visão Geral

O sistema de elevação fornece uma maneira consistente de criar efeitos 3D e profundidade em componentes da interface, melhorando a hierarquia visual e a experiência do usuário.

## Componentes

### Elevation
Componente base que aplica efeitos de elevação 3D.

```tsx
import { Elevation } from './elevation';

<Elevation level="lg" color="blue" hover={true}>
  <div className="p-4 bg-white">
    Conteúdo do card
  </div>
</Elevation>
```

### CardElevation
Variante otimizada para cards de conteúdo.

```tsx
import { CardElevation } from './elevation';

<CardElevation color="green">
  <div className="p-6 bg-white">
    Card de métricas
  </div>
</CardElevation>
```

### ButtonElevation
Variante otimizada para botões.

```tsx
import { ButtonElevation } from './elevation';

<ButtonElevation color="orange">
  <button className="px-4 py-2 bg-orange-500 text-white rounded-lg">
    Ação
  </button>
</ButtonElevation>
```

### ModalElevation
Variante para modais e overlays.

```tsx
import { ModalElevation } from './elevation';

<ModalElevation color="neutral">
  <div className="p-8 bg-white">
    Conteúdo do modal
  </div>
</ModalElevation>
```

## Níveis de Elevação

### sm (Pequeno)
- Sombra: `shadow-md`
- Hover: `shadow-lg`
- Escala: `1.01x`
- Movimento: `-0.5px`

### md (Médio) - Padrão
- Sombra: `shadow-lg`
- Hover: `shadow-xl`
- Escala: `1.02x`
- Movimento: `-1px`

### lg (Grande)
- Sombra: `shadow-xl`
- Hover: `shadow-2xl`
- Escala: `1.03x`
- Movimento: `-1px`

### xl (Extra Grande)
- Sombra: `shadow-2xl`
- Hover: `shadow-3xl`
- Escala: `1.04x`
- Movimento: `-2px`

## Cores de Glow

- `blue`: Glow azul para componentes financeiros
- `green`: Glow verde para componentes de saúde
- `orange`: Glow laranja para componentes de marketing
- `purple`: Glow roxo para componentes de experiência
- `neutral`: Glow neutro para componentes gerais

## Efeitos Incluídos

1. **Sombra Base**: Sombra padrão do Tailwind
2. **Sombra de Hover**: Sombra aumentada no hover
3. **Glow Colorido**: Brilho sutil na cor especificada
4. **Escala**: Leve aumento de tamanho no hover
5. **Movimento**: Movimento vertical no hover
6. **Brilho 3D**: Brilho no canto superior esquerdo
7. **Sombra de Profundidade**: Sombra na parte inferior
8. **Efeito Shimmer**: Brilho animado no hover

## Boas Práticas

1. **Use níveis apropriados**: `sm` para elementos pequenos, `xl` para modais
2. **Mantenha consistência**: Use a mesma cor de glow para elementos relacionados
3. **Não abuse**: Muitos elementos elevados podem criar confusão visual
4. **Considere a acessibilidade**: Efeitos visuais não devem interferir na usabilidade

## Exemplos de Uso

### Dashboard Cards
```tsx
<CardElevation color="blue">
  <KpiCard title="Faturamento" value="R$ 100.000" />
</CardElevation>
```

### Botões de Ação
```tsx
<ButtonElevation color="green">
  <button className="btn btn-primary">
    Salvar
  </button>
</ButtonElevation>
```

### Modais
```tsx
<ModalElevation color="neutral">
  <div className="modal-content">
    <h2>Confirmação</h2>
    <p>Tem certeza que deseja continuar?</p>
  </div>
</ModalElevation>
``` 
# Design System - Componentes UI

Componentes de UI reutilizáveis para o sistema de design da clínica.

## Componentes Disponíveis

### Básicos
- `button.tsx` - Botões com variantes e estados
- `card.tsx` - Cards de conteúdo
- `input.tsx` - Campos de entrada
- `tooltip.tsx` - Tooltips informativos

### Sistema de Elevação
- `elevation.tsx` - Sistema de elevação 3D para componentes
- `elevation.md` - Documentação completa do sistema

## Sistema de Elevação

O sistema de elevação fornece uma maneira consistente de criar efeitos 3D e profundidade em componentes da interface.

### Características
- ✅ **4 níveis de elevação**: sm, md, lg, xl
- ✅ **5 cores de glow**: blue, green, orange, purple, neutral
- ✅ **Efeitos 3D completos**: sombra, brilho, movimento
- ✅ **Variantes especializadas**: CardElevation, ButtonElevation, ModalElevation
- ✅ **Totalmente customizável**: className, hover, etc.

### Uso Rápido
```tsx
import { CardElevation } from './elevation';

<CardElevation color="blue">
  <div className="p-6 bg-white">
    Seu conteúdo aqui
  </div>
</CardElevation>
```

Veja a documentação completa em `elevation.md` para mais detalhes e exemplos.

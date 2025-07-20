# 🕐 Sistema de Simulação de Horário

## Como Mudar o Horário na Página

O dashboard ClinicAI agora possui um sistema de simulação de horário que permite testar como o robô e a interface se comportam em diferentes momentos do dia.

### 🎯 Funcionalidades

1. **Horário Real**: Usa o horário atual do seu computador
2. **Simulação de Horários**: Permite testar diferentes momentos do dia
3. **Mudanças Dinâmicas**: O robô, saudação e ícones mudam automaticamente

### 📍 Como Usar

#### 1. **Localizar o Seletor**
- O seletor de horário está localizado no canto superior direito da página
- Aparece como um dropdown com opções de horários

#### 2. **Opções Disponíveis**
- **Horário Real**: Volta ao horário atual do sistema
- **🌅 Manhã (6h)**: Testa o comportamento matinal
- **🍽️ Almoço (12h)**: Testa o período de almoço
- **☀️ Tarde (13h)**: Testa o período da tarde
- **🏢 Fim do Horário Comercial (18h)**: Testa o fechamento da clínica
- **🌙 Noite (20h)**: Testa o período noturno

#### 3. **Indicador Visual**
- Quando um horário simulado está ativo, aparece um badge amarelo indicando "Simulando: X:00h"
- Isso ajuda a identificar quando você está testando vs. usando o horário real

### 🤖 Comportamentos por Horário

#### **Manhã (6h-12h)**
- Saudação: "Buenos días"
- Ícone: 🌅 (Sol nascente)
- Robô: Energizado, animação robot-wave, cores amarelo/laranja
- Acessórios: 🧢 Gorra âmbar + ☕ Xícara de café
- **O que está fazendo**: Tomando café da manhã e acenando energicamente

#### **Almoço (12h-13h)**
- Saudação: "Buen almuerzo"
- Ícone: 🍽️ (Prato)
- Robô: Faminto, animação robot-eat, cores laranja/vermelho
- Acessórios: 👨‍🍳 Chapéu de chef + 🍕 Prato de comida
- **O que está fazendo**: Comendo almoço com animação de mastigação

#### **Tarde (13h-18h)**
- Saudação: "Buenas tardes"
- Ícone: ☀️ (Sol da tarde)
- Robô: Focado, animação robot-work, cores azul/roxo
- Acessórios: 👓 Óculos de trabalho + 🎀 Gravata + 💼 Ícone de trabalho
- **O que está fazendo**: Trabalhando ativamente com movimentos de foco

#### **Fim do Horário Comercial (18h-19h)**
- Saudação: "Hasta mañana"
- Ícone: 🏢 (Prédio)
- Robô: Aliviado, animação robot-bye, cores verde/esmeralda
- Acessórios: 🧢 Chapéu de despedida + 💼 Mala
- **O que está fazendo**: Se despedindo do trabalho com alívio

#### **Noite (19h+)**
- Saudação: "Buenas noches"
- Ícone: 🌙 (Lua)
- Robô: Sonolento, animação robot-sleep, cores índigo/azul escuro
- Acessórios: 🧤 Gorro de dormir + 🌙 Lua
- **O que está fazendo**: Preparando para dormir com movimentos lentos

### 🔧 Implementação Técnica

#### **Estados**
```typescript
const [simulatedHour, setSimulatedHour] = useState<number | null>(null);
```

#### **Lógica de Horário**
```typescript
const hour = simulatedHour !== null ? simulatedHour : currentTime.getHours();
```

#### **Funções Afetadas**
- `getGreeting()`: Saudação baseada no horário
- `getTimeIcon()`: Ícone baseado no horário
- `getRobotConfig()`: Configuração do robô baseada no horário

### 🎭 Animações do Robô - O que cada uma representa:

#### **robot-wave** (Manhã - 6h-12h)
- **Movimento**: Braço acenando energicamente
- **Representa**: Robô tomando café da manhã e cumprimentando
- **Animação**: Rotação suave do braço com movimento vertical

#### **robot-eat** (Almoço - 12h-13h)
- **Movimento**: Robô "mastigando" e se movendo
- **Representa**: Robô comendo almoço
- **Animação**: Escala e rotação sutil simulando mastigação

#### **robot-work** (Tarde - 13h-18h)
- **Movimento**: Robô focado e ativo
- **Representa**: Robô trabalhando ativamente
- **Animação**: Movimento vertical sutil com rotação mínima

#### **robot-bye** (Fim do Horário - 18h-19h)
- **Movimento**: Braço acenando com alívio
- **Representa**: Robô se despedindo do trabalho
- **Animação**: Aceno mais amplo e energético

#### **robot-sleep** (Noite - 19h+)
- **Movimento**: Robô "respirando" lentamente
- **Representa**: Robô preparando para dormir
- **Animação**: Escala e movimento vertical muito sutil

### 🎩 Acessórios Visuais - O que cada um representa:

#### **🧢 Gorras e Chapéus**
- **Manhã**: Gorra âmbar/laranja (café da manhã)
- **Almoço**: Chapéu de chef branco com detalhe vermelho
- **Tarde**: Óculos de trabalho (sem chapéu)
- **Despedida**: Chapéu verde/esmeralda
- **Noite**: Gorro de dormir índigo/roxo

#### **👓 Óculos de Trabalho**
- Aparecem apenas no período da tarde (13h-18h)
- Animação de brilho (`glasses-glow`)
- Representam foco e profissionalismo

#### **🎀 Gravata**
- Aparece apenas no período da tarde (13h-18h)
- Animação de balanço (`tie-swing`)
- Representa formalidade do trabalho

#### **💼 Objetos Contextuais**
- **Manhã**: Xícara de café âmbar
- **Almoço**: Prato de comida laranja
- **Tarde**: Ícone de trabalho azul
- **Despedida**: Mala verde
- **Noite**: Lua índigo

### 🎨 Personalização

Para adicionar novos horários ou modificar comportamentos:

1. **Adicionar Nova Opção**:
   ```typescript
   <option value="14">🕐 Meio-dia (14h)</option>
   ```

2. **Modificar Comportamento**:
   - Editar as funções `getGreeting()`, `getTimeIcon()`, `getRobotConfig()`
   - Adicionar novos casos nos `if/else` statements

3. **Novos Acessórios**:
   - Adicionar novos tipos de acessórios no robô
   - Criar animações CSS correspondentes

### 🚀 Próximas Melhorias

- [ ] Seletor de data (não apenas hora)
- [ ] Animações de transição entre horários
- [ ] Configuração de fuso horário
- [ ] Modo automático que simula passagem do tempo
- [ ] Salvamento de preferências de horário

### 💡 Dicas de Uso

1. **Teste Todos os Períodos**: Use cada opção para ver as diferenças
2. **Observe o Robô**: As mudanças mais visíveis são no robô e suas animações
3. **Verifique a Saudação**: A saudação muda conforme o horário
4. **Ícones Dinâmicos**: Os emojis mudam para representar o período
5. **Volte ao Real**: Sempre use "Horário Real" quando terminar os testes

### 🔄 Reset

Para voltar ao horário real:
- Selecione "Horário Real" no dropdown
- O badge de simulação desaparecerá
- O sistema voltará a usar o horário atual do computador 
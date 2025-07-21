# =========================================================================
# ETAPA 1: Construção (Build) - Instala dependências e constrói o projeto
# =========================================================================
# Usa uma imagem oficial do Node.js como base. A versão 'alpine' é mais leve.
FROM node:18-alpine AS builder

# Define o diretório de trabalho dentro do container
WORKDIR /app

# Copia os arquivos de definição de pacotes (package.json e package-lock.json)
# Copiar só eles primeiro aproveita o cache do Docker. Se eles não mudarem,
# o 'npm install' não precisa rodar de novo, tornando builds futuros mais rápidos.
COPY package*.json ./

# Instala as dependências do projeto
RUN npm install

# Copia todo o resto do código do projeto para o diretório de trabalho
COPY . .

# Roda o comando de build do Next.js para criar a versão otimizada
RUN npm run build

# =========================================================================
# ETAPA 2: Produção (Runner) - Serve a aplicação construída
# =========================================================================
# Começa uma nova etapa a partir de uma imagem limpa e leve para produção
FROM node:18-alpine AS runner
WORKDIR /app

# Copia SOMENTE os artefatos necessários da etapa de construção.
# Isso resulta numa imagem final muito menor e mais segura.
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json

# Expõe a porta em que a aplicação Next.js vai rodar
EXPOSE 3000

# O comando para iniciar o servidor de produção do Next.js
CMD ["npm", "start"]
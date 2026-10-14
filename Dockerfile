# ==========================================
# Estágio 1: Build (Compilação do TypeScript)
# ==========================================
FROM node:26-alpine AS builder

WORKDIR /usr/src/app

# Copia os arquivos de dependências
COPY package*.json ./

# Instala todas as dependências (incluindo devDependencies para compilar)
RUN npm ci

# Copia o código-fonte e configurações
COPY . .

#URL Padrão para a geração do Prisma Client
ENV DATABASE_URL="postgresql://manager:password@localhost:5432/manager_db?schema=public"

# Gera client do Prisma
RUN npx prisma generate

# Gera os arquivos compilados em JavaScript na pasta /dist
RUN npm run build

# Copia o JSON gerado pelo swagger-autogen (fica em src/, não em dist/)
RUN cp src/main/config/swagger-output.json dist/src/main/config/swagger-output.json

# ==========================================
# Estágio 2: Runner (Ambiente de Execução)
# ==========================================
FROM node:26-alpine AS runner

WORKDIR /usr/src/app

ENV NODE_ENV=production

# Copia apenas os arquivos de manifesto de pacotes
COPY package*.json ./

# Instala APENAS as dependências de produção para reduzir o tamanho da imagem
RUN npm ci --only=production

# Copia a pasta /dist gerada no estágio de build
COPY --from=builder /usr/src/app/dist ./dist

# Copia o schema do Prisma
COPY --from=builder /usr/src/app/prisma ./prisma

# Copia o client do Prisma
COPY --from=builder /usr/src/app/generated ./generated
COPY --from=builder /usr/src/app/node_modules/.prisma ./node_modules/.prisma

# Expõe a porta onde o Express escuta
EXPOSE 3333

# Comando para subir o servidor em produção
CMD ["node", "dist/src/main/server.js"]
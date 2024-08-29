# Imagem oficial do Node.js
FROM node:18-bullseye

# Definir o diretório de trabalho
WORKDIR /app

# Copiar o package.json e o package-lock.json para o container
COPY package*.json ./

# Instalando dependências do projeto
RUN npm install

# Copiar o restante do código
COPY . .

# Build da aplicação Next.js
RUN npm run build

# Expor a porta padrão do Next.js
EXPOSE 3000

# Comando para iniciar o servidor de produção
CMD ["npm", "start"]

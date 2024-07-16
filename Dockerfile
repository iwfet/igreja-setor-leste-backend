# Use a imagem base do Node.js 20
FROM node:20

# Defina o diretório de trabalho dentro do contêiner
WORKDIR /usr/src/app

# Copie os arquivos package.json e package-lock.json para o diretório de trabalho
COPY package*.json ./

# Instale as dependências
RUN npm install

# Copie todo o restante do código do aplicativo para o diretório de trabalho
COPY . .

# Exponha a porta que o NestJS usa
EXPOSE 5000

# Comando para rodar o aplicativo
CMD ["npm", "run", "start:dev"]

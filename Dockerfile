FROM node:20

RUN -p  /usr/src/app

WORKDIR /usr/src/app

COPY package*.json ./

RUN pnpm install

COPY . .

EXPOSE 5000

CMD ["pnpm", "run", "start:dev"]

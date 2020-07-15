FROM node:alpine

WORKDIR /usr/app

COPY package*.json ./
RUN npm install
RUN npm compile

COPY . .

EXPOSE 3000

CMD ["node", "./dist/server.js"]
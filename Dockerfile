FROM node:12.21.0-alpine

WORKDIR /usr/app

COPY package*.json ./

RUN npm install && npm cache clean --force

COPY . .

RUN npm run build

EXPOSE 3000

CMD [ "npm", "run", "start" ]

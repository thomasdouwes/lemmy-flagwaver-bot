FROM node:18

WORKDIR /usr/src/app

COPY bot.ts .
COPY package.json .
COPY package-lock.json .

RUN npm install

CMD [ "npm", "start" ]

FROM node:20-alpine
WORKDIR /usr/src/app

COPY package*.json ./

RUN npm ci

COPY src ./src
COPY tests ./tests

CMD ["npm", "run", "test"]

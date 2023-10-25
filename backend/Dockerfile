From node:20 AS base
WORKDIR /urs/src/app
COPY package*.json ./
RUN npm install

FROM base AS developement
COPY . .
CMD [ "npm", "run", "dev" ]

FROM base AS production
COPY . .
CMD [ "npm", "run", "start" ]
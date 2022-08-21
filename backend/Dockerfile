FROM node:14.20.0-alpine

WORKDIR /app

COPY package.json ./
COPY yarn.lock ./
COPY ./ ./
RUN yarn install --frozen-lockfile --force
RUN yarn build

CMD yarn migrate && yarn start
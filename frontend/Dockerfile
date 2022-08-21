FROM node:12.22.12-alpine

WORKDIR /app

COPY package.json ./
COPY yarn.lock ./
COPY ./ ./
RUN yarn install --frozen-lockfile --force
RUN yarn build

CMD yarn start
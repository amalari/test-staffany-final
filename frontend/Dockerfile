FROM node:12.22.12-alpine as build
WORKDIR /app
COPY package*.json ./
COPY yarn.lock ./
RUN yarn install --frozen-lockfile --force
COPY . .
RUN yarn build
CMD ["yarn", "start"]
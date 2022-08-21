# build
FROM node:12.22.12-alpine as build
WORKDIR /app
COPY package*.json ./
COPY yarn.lock ./
RUN yarn install --frozen-lockfile --force
COPY . .
RUN yarn build

# production
FROM nginx:stable-alpine
COPY container/nginx/default.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
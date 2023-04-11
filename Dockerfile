FROM node:18-alpine3.15 as build
WORKDIR /usr/src/app
COPY package.json package-lock.json ./
RUN npm install --force
COPY . .
RUN npm run build

FROM nginx:latest
COPY --from=build /usr/src/app/dist/pension-management-portal/ /usr/share/nginx/html


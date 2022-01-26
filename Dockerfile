FROM node:16 as build

WORKDIR /build/src

COPY . .

RUN yarn install --frozen-lockfile
RUN yarn build

FROM nginx:latest as runtime

COPY --from=build /build/src/build /usr/share/nginx/html
COPY nginx/nginx.conf /etc/nginx/nginx.conf

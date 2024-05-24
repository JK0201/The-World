# Build Phase
FROM node:16 AS build

WORKDIR /app

COPY package*.json /app

RUN npm ci

COPY . /app

RUN npm run build

# Run Phase
FROM nginx:1.21.4-alpine
COPY ./configs/nginx.conf /etc/nginx/conf.d/default.conf.template

ARG BACKEND_HOST
ARG BACKEND_PORT

ENV BACKEND_HOST ${BACKEND_HOST}
ENV BACKEND_PORT ${BACKEND_PORT}

COPY docker-entrypoint.sh /usr/local/bin/
RUN chmod +x /usr/local/bin/docker-entrypoint.sh

COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80
ENTRYPOINT ["docker-entrypoint.sh"]
CMD ["nginx", "-g", "daemon off;"]
FROM node:16.15.1-alpine as build

ARG ENV

WORKDIR /app

COPY . .

RUN npm install

RUN if [ "$ENV" = "dev" ]; then npm run build-dev; \
    elif [ "$ENV" = "test" ]; then npm run build-test; \
    else npm run build-prod; \
    fi

FROM nginx:alpine
COPY --from=build /app/clientApp /usr/share/nginx/html
COPY ./nginx-custom.conf /etc/nginx/conf.d/default.conf

# EXPOSE 80

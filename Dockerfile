FROM node:15.11.0-alpine3.11 AS build

RUN apk add build-base g++ python3 git && rm -rf /var/cache/apk/*

WORKDIR /build
COPY package.json .
COPY package-lock.json .

RUN npm install

COPY tsconfig.json .
COPY webpack.config.js .
COPY postcss.config.js .
COPY tailwind.config.js .
COPY .babelrc .
COPY src src

ENV NODE_ENV production
RUN npm run build

FROM node:15.11.0-alpine3.11 AS run

ENV NODE_ENV production

RUN apk add build-base g++ python3 git && rm -rf /var/cache/apk/*

RUN wget -O /usr/local/bin/dumb-init https://github.com/Yelp/dumb-init/releases/download/v1.2.5/dumb-init_1.2.5_x86_64
RUN chmod +x /usr/local/bin/dumb-init

RUN addgroup -S datadeck
RUN adduser -S -D -h /app datadeck datadeck

WORKDIR /app

COPY --from=build --chown=datadeck:datadeck --chmod=0644 /build/package.json /build/package-lock.json .
COPY --from=build --chown=datadeck:datadeck --chmod=0644 /build/dist dist
COPY --chown=datadeck:datadeck --chmod=0644 views views
COPY --chown=datadeck:datadeck --chmod=0644 LICENSE .

RUN chown -R datadeck:datadeck /app
RUN find /app -type f -print0 | xargs -P 100 -0 chmod 0644
RUN find /app -type d -print0 | xargs -P 100 -0 chmod 0755

RUN npm ci --only=production

USER datadeck
EXPOSE 3000
ENTRYPOINT [ "/usr/local/bin/dumb-init", "--" ]
CMD [ "node", "/app/dist/index.js" ]

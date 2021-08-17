FROM node:8.14.0-alpine

ARG apiEnv=production
ARG apiUrl=https://prepdata.org/api
ARG wriApiUrl=https://api.resourcewatch.org/v1
ARG callbackUrl=https://prepdata.org/auth

ENV NODE_ENV production
ENV API_ENV $apiEnv
ENV WRI_API_URL $wriApiUrl
ENV BASEMAP_TILE_URL https://cartodb-basemaps-{s}.global.ssl.fastly.net/dark_all/{z}/{x}/{y}.png
ENV API_URL $apiUrl
ENV CONTROL_TOWER_URL https://api.resourcewatch.org
ENV CALLBACK_URL $callbackUrl
ENV STATIC_SERVER_URL=
ENV APPLICATIONS prep
ENV OPBEAT_ORG_ID 17ab8eb501d2418a81f3167c10407e90
ENV OPBEAT_APP_ID 7170680c2a
ENV ADD_SEARCH_KEY cb7e797b8a3c0d09c323955f0c4f957a
ENV TRANSIFEX_LIVE_API fca0343bce994bf8ba3dcdeaab389136

RUN apk update && apk add --no-cache \
    build-base gcc bash git \
    cairo-dev pango-dev jpeg-dev

# Add app directory
WORKDIR /usr/src/app

# Install app dependencies
COPY package.json yarn.lock /usr/src/app/
RUN yarn install --frozen-lockfile --no-cache --production

# Bundle app source
COPY . /usr/src/app
RUN yarn run build

EXPOSE 3000

CMD ["yarn", "start"]

FROM node:12.14.0-alpine3.11

RUN apk add --no-cache --update build-base python2

WORKDIR /usr/src/app

COPY package*.json ./
RUN yarn

COPY . .

CMD [ "yarn", "serve" ]
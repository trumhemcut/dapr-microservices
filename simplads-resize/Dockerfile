FROM node:8-alpine
WORKDIR /app

RUN apk --no-cache add g++ gcc libgcc libstdc++ linux-headers make python
RUN npm install --quiet node-gyp -g

COPY package*.json ./
RUN npm install

COPY . .

EXPOSE 3000
CMD [ "node", "app.js" ]
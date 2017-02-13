FROM node:latest

RUN mkdir -p /usr/src/tacki
WORKDIR /usr/src/tachki

COPY package.json /usr/src/tachki/
COPY .eslintrc /usr/src/tachki/
COPY .babelrc /usr/src/tachki/
COPY webpack.config.js /usr/src/tachki/

RUN npm install

EXPOSE 8080

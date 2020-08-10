FROM node:12

MAINTAINER suresh

COPY . /src/app

WORKDIR /src/app

RUN npm install -f

EXPOSE 3000

ENTRYPOINT npm start


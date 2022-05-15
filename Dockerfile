FROM node:16-alpine

WORKDIR /home/node/app

RUN npm i -g pnpm

COPY package.json pnpm-lock.yaml ./

RUN pnpm i --frozen-lockfile

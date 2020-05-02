FROM node:14.1-alpine

RUN yarn
RUN yarn global add parcel-bundler

EXPOSE 1234

CMD ["parcel", "src/index.html", "--no-hmr", "--no-source-maps"]

FROM node:14.1-alpine

RUN yarn
RUN yarn global add parcel-bundler

EXPOSE 1234

CMD ["yarn", "start"]

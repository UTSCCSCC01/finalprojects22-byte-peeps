# Dockerfile adapted from
# https://javascript.plainenglish.io/create-and-dockerize-an-express-typescript-application-5c9f6d67ec2f

FROM node:16
WORKDIR /usr/src/app

COPY ./app/package*.json ./

RUN npm install --legacy-peer-deps

COPY ./app .

RUN npm run build

EXPOSE 3000
CMD ["node", "build/app.js"]
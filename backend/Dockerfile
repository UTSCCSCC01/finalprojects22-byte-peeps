# Dockerfile adapted from
# https://javascript.plainenglish.io/create-and-dockerize-an-express-typescript-application-5c9f6d67ec2f
# https://stackoverflow.com/questions/62554991/how-do-i-install-python-on-alpine-linux

FROM node:16-alpine3.15
WORKDIR /usr/src/app

COPY ./app/package*.json ./

RUN npm install --legacy-peer-deps

COPY ./app/requirements.txt ./

ENV PYTHONUNBUFFERED=1
RUN apk add --update --no-cache python3 && ln -sf python3 /usr/bin/python
RUN python3 -m ensurepip
RUN pip3 install --no-cache --upgrade pip setuptools
RUN pip3 install -r requirements.txt

COPY ./app .

RUN npm run build

EXPOSE 3000
CMD ["node", "build/app.js"]
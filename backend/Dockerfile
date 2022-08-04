
# ! Ubuntu
FROM ubuntu:latest

USER root

WORKDIR /home/src/app

RUN apt-get update
RUN apt-get -y install curl gnupg
RUN curl -sL https://deb.nodesource.com/setup_16.x  | bash -
RUN apt-get -y install nodejs
RUN apt-get -y install python3.9
RUN apt-get -y install python3-pip
RUN pip3 install --no-cache --upgrade pip setuptools

COPY ./app/requirements.txt ./

RUN pip3 install -r requirements.txt

COPY ./app/package*.json ./

RUN npm install --legacy-peer-deps

COPY ./app .

RUN npm run build

# copy the keywordExtraction.py file to the build directory
COPY ./app/src/middlewares/keywordExtraction/keywordExtraction.py ./build/middlewares/keywordExtraction/keywordExtraction.py

EXPOSE 3000
CMD ["node", "build/app.js"]

# # ! Debian Bullseye
# FROM node:16-bullseye

# USER root

# WORKDIR /home/src/app

# RUN apt update && apt upgrade
# RUN apt install python3.9
# RUN yes | apt install python3-pip
# RUN yes | pip3 install --no-cache --upgrade pip setuptools

# COPY ./app/requirements.txt ./

# RUN pip3 install -r requirements.txt

# COPY ./app/package*.json ./

# RUN npm install --legacy-peer-deps

# COPY ./app .

# RUN npm run build

# # copy the keywordExtraction.py file to the build directory
# # cp ./src/middlewares/keywordExtraction/keywordExtraction.py ./build/middlewares/keywordExtraction/keywordExtraction.py

# EXPOSE 3000
# CMD ["node", "build/app.js"]
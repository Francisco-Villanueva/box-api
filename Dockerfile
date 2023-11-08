FROM node:latest

WORKDIR /coworkers-api

COPY . .    

RUN npm install

EXPOSE 3001

CMD [ "npm", "start" ]
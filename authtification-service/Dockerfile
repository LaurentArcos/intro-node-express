FROM node:20-alpine
RUN mkdir -p /app
WORKDIR /app
COPY ./authentication-service/package*.json ./
RUN npm install 
EXPOSE 3002
FROM node:18-alpine
WORKDIR /app

COPY package*.json .
RUN npm install
COPY . .
EXPOSE 3000
CMD ["npx","serverless","offline","--noTimeout","--host","0.0.0.0"]

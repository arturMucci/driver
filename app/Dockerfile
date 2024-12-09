FROM node:18-alpine

WORKDIR /app

COPY . .

RUN npx next telemetry disable
RUN npm install

EXPOSE 80
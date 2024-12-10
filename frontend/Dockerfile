FROM node:18-alpine

WORKDIR /frontend

COPY . .

RUN npx next telemetry disable
RUN npm install

EXPOSE 80
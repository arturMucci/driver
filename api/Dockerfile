FROM node:18-alpine

ARG DATABASE_URL
ARG GOOGLE_API_KEY

ENV DATABASE_URL=${DATABASE_URL}
ENV GOOGLE_API_KEY=${GOOGLE_API_KEY}

WORKDIR /api

COPY . .

RUN npm install

RUN npx prisma generate --schema=/api/src/prisma/schema.prisma

COPY ./entrypoint.sh /api/entrypoint.sh

ENTRYPOINT ["sh", "-c", "/api/entrypoint.sh"]

EXPOSE 8080

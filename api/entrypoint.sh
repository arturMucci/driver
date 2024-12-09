
#!/bin/sh

echo "Running Prisma migrations..."
npx prisma migrate dev --name init --schema /app/src/prisma/schema.prisma
npx prisma migrate deploy --schema /app/src/prisma/schema.prisma

echo "Seeding the database..."
npx prisma db seed 

echo "Starting the application..."
npm run start:dev
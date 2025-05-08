import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  const cars = [
    { make: 'Toyota', model: 'Camry', year: 2020, color: 'White', price_per_day: 50 },
    { make: 'Honda', model: 'Civic', year: 2021, color: 'Black', price_per_day: 45 },
    { make: 'Tesla', model: 'Model 3', year: 2022, color: 'Red', price_per_day: 90 },
    { make: 'Ford', model: 'Mustang', year: 2019, color: 'Blue', price_per_day: 70 },
    { make: 'Chevrolet', model: 'Malibu', year: 2020, color: 'Silver', price_per_day: 55 },
  ];

  for (const car of cars) {
    await prisma.car.create({ data: car });
  }
}

main()
  .then(() => {
    console.log('Seeding complete.');
    return prisma.$disconnect();
  })
  .catch((e) => {
    console.error(e);
    prisma.$disconnect();
    process.exit(1);
  });

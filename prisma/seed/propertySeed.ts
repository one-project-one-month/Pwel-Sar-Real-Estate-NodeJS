// prisma/seed.ts
import { PrismaClient } from '../../generated/prisma';

const prisma = new PrismaClient();

async function main() {
  await prisma.propertyType.createMany({
    data: [
  { id: 1, name: 'Apartment' },
  { id: 2, name: 'House' },
  { id: 3, name: 'Condominium' },
  { id: 4, name: 'Villa' },
  { id: 5, name: 'Townhouse' },
  { id: 6, name: 'Duplex' },
  { id: 7, name: 'Penthouse' },
  { id: 8, name: 'Studio' },
  { id: 9, name: 'Commercial Building' },
  { id: 10, name: 'Office Space' },
  { id: 11, name: 'Retail Space' },
  { id: 12, name: 'Warehouse' },
  { id: 13, name: 'Factory' },
  { id: 14, name: 'Land Plot' },
  { id: 15, name: 'Farmhouse' },
  { id: 16, name: 'Serviced Apartment' },
  { id: 17, name: 'Bungalow' },
  { id: 18, name: 'Mansion' }
],
    skipDuplicates: true,
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());

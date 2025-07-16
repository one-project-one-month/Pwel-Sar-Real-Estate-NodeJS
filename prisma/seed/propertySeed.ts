// prisma/seed.ts
import { PrismaClient } from '../../generated/prisma';

const prisma = new PrismaClient();

async function main() {
  await prisma.propertyType.createMany({
    data: [
      { id: 1, name: 'Apartment' },
      { id: 2, name: 'House' },
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

import { faker } from '@faker-js/faker';

import { PostStatus, PostType, PrismaClient } from '../../generated/prisma';
import { amountToCents } from '../../src/utils/mmkUtils';
import { myanmarRegions, myanmarStreets, myanmarTownships } from './address';

const prisma = new PrismaClient();

export function generateMyanmarAddress() {
  const region = faker.helpers.arrayElement(myanmarRegions);
  const townshipList =
    myanmarTownships[region as keyof typeof myanmarTownships];
  const township = faker.helpers.arrayElement(townshipList);
  const street = faker.helpers.arrayElement(myanmarStreets);

  return {
    fullAddress: `${street}, ${township}, ${region}`,
    region,
    street,
    township,
  };
}

function generatePhotos(count: number) {
  return Array.from({ length: count }).map(() => ({
    path: faker.system.filePath(), 
    url: `https://loremflickr.com/640/480/real-estate?random=${Math.floor(
      Math.random() * 10000
    )}`,
  }));
}

function getRandomInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const salePrices = [
  1000000, 5000000, 9000000, 1500000, 4000000, 2500000, 1500000,
];
const leasePrices = [150000, 250000, 200000, 350000];
const rentPrices = [140000, 270000, 450000, 90000, 60000, 160000, 300000, 100000, 290000];

function getPriceByPostType(type: PostType): number {
  switch (type) {
    case PostType.Lease:
      return faker.helpers.arrayElement(leasePrices);
    case PostType.Rent:
      return faker.helpers.arrayElement(rentPrices);
    case PostType.Sale:
      return faker.helpers.arrayElement(salePrices);
    default:
      throw new Error('Unknown PostType');
  }
}

const postTypes = [PostType.Lease, PostType.Rent, PostType.Sale];

async function main() {
  for (let userId = 6; userId <= 15; userId++) {
    const numberOfPosts = getRandomInt(1, 3);

    for (let i = 0; i < numberOfPosts; i++) {
      const propertyTypeId = getRandomInt(1, 18);

      const type = faker.helpers.arrayElement(postTypes);
      const price = getPriceByPostType(type);

      const post = await prisma.post.create({
        data: {
          phone: `09${faker.number.int({ max: 999999999, min: 100000000 })}`,
          property: {
            create: {
              bathRoom: faker.number.int({ max: 4, min: 1 }),
              bedRoom: faker.number.int({ max: 5, min: 1 }),
              buildingNumber: faker.location.buildingNumber(),
              currency: 'MMK',
              floor: faker.number.int({ max: 10, min: 1 }),

              latitude: faker.location.latitude().toString(),
              length: faker.number.int({ max: 100, min: 20 }),
              longitude: faker.location.longitude().toString(),
              ownerId: userId,
              photos: {
                createMany: {
                  data: generatePhotos(10),
                },
              },
              price: amountToCents(price),
              propertyTypeId,
              region: generateMyanmarAddress().region,
              street: generateMyanmarAddress().street,
              township: generateMyanmarAddress().township,
              width: faker.number.int({ max: 100, min: 20 }),
            },
          },
          status: PostStatus.Active,
          type: type,
          user: {
            connect: { id: userId },
          },
        },
      });

      console.log(`Created post ${post.id} for user ${userId}`);

      console.log(`Created post ${post.id} for user ${userId}`);
    }
  }
}

main()
  .then(async () => {
    console.log('Seeding complete!');
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error('Seeding failed:', e);
    await prisma.$disconnect();
    process.exit(1);
  });

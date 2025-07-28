import { withAccelerate } from '@prisma/extension-accelerate';

import { PrismaClient } from '../../generated/prisma';

export const prisma = new PrismaClient().$extends(withAccelerate());

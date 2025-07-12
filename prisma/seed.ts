import bcrypt from 'bcrypt';

import { PrismaClient } from '../generated/prisma';

const prisma = new PrismaClient();

async function main() {
  const roles = [
    { name: 'Admin', value: 'super_admin' },
    { name: 'User', value: 'general_user' },
    { name: 'Agent', value: 'property_agent' },
  ];

  const roleMap: Record<string, number> = {};

  for (const role of roles) {
    const created = await prisma.role.upsert({
      create: {
        name: role.name as any,
        value: role.value,
      },
      update: { value: role.value },
      where: { name: role.name as any },
    });
    roleMap[role.name] = created.id;
  }

  const permissions = [
    { action: 'create', resource: 'property' },
    { action: 'read', resource: 'property' },
    { action: 'update', resource: 'property' },
    { action: 'delete', resource: 'property' },
    { action: 'approve', resource: 'post' },
    { action: 'ban', resource: 'user' },
    { action: 'view', resource: 'activity' },
  ];

  const permissionIds: number[] = [];

  for (const perm of permissions) {
    const created = await prisma.permission.create({
      data: {
        action: perm.action,
        resource: perm.resource,
        role: { connect: { id: roleMap.Admin } },
      },
    });
    permissionIds.push(created.id);
  }

  for (const permissionId of permissionIds) {
    await prisma.rolePermission.upsert({
      create: {
        permissionId,
        roleId: roleMap.Admin,
      },
      update: {},
      where: {
        roleId_permissionId: {
          permissionId,
          roleId: roleMap.Admin,
        },
      },
    });
  }

  const hashedPassword = await bcrypt.hash('Admin123!', 10);

  await prisma.user.upsert({
    create: {
      email: 'support@example.com',
      password: hashedPassword,
      role: { connect: { id: roleMap.Admin } },
      username: 'support',
    },
    update: {},
    where: { email: 'support@example.com' },
  });

  console.log('✅ Seed completed.');
}

main()
  .catch((e) => {
    console.error('❌ Seed error:', e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());

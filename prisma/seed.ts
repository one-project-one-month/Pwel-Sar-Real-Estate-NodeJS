import bcrypt from 'bcrypt';
import { PrismaClient, RoleName } from '../generated/prisma';

const prisma = new PrismaClient();

async function main() {
  const roles = [
    { name: RoleName.Admin, value: 'super_admin' },
    { name: RoleName.User, value: 'general_user' },
    { name: RoleName.Agent, value: 'property_agent' },
  ];

  const roleMap: Record<RoleName, number> = {} as Record<RoleName, number>;

  for (const role of roles) {
    const created = await prisma.role.upsert({
      where: { name: role.name },
      create: { name: role.name, value: role.value },
      update: { value: role.value },
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
        role: { connect: { id: roleMap[RoleName.Admin] } },
      },
    });
    permissionIds.push(created.id);
  }

  for (const permissionId of permissionIds) {
    await prisma.rolePermission.upsert({
      where: {
        roleId_permissionId: {
          roleId: roleMap[RoleName.Admin],
          permissionId,
        },
      },
      create: {
        roleId: roleMap[RoleName.Admin],
        permissionId,
      },
      update: {},
    });
  }

  const hashedPassword = await bcrypt.hash('Admin123!', 10);

  await prisma.user.upsert({
    where: { email: 'support@example.com' },
    create: {
      email: 'support@example.com',
      password: hashedPassword,
      role: { connect: { id: roleMap[RoleName.Admin] } },
      username: 'support',
    },
    update: {},
  });

  console.log('✅ Seed completed.');
}

main()
  .catch((e) => {
    console.error('❌ Seed error:', e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());

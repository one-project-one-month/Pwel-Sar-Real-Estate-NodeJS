import { PrismaClient } from "../generated/prisma";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

async function main() {
  const roles = [
    { name: "Admin", value: "super_admin" },
    { name: "User", value: "general_user" },
    { name: "Agent", value: "property_agent" },
  ];

  const roleMap: { [key: string]: number } = {};

  for (const role of roles) {
    const created = await prisma.role.upsert({
      where: { name: role.name as any },
      update: { value: role.value },
      create: {
        name: role.name as any,
        value: role.value,
      },
    });
    roleMap[role.name] = created.id;
  }

  const permissions = [
    { action: "create", resource: "property" },
    { action: "read", resource: "property" },
    { action: "update", resource: "property" },
    { action: "delete", resource: "property" },
    { action: "approve", resource: "post" },
    { action: "ban", resource: "user" },
    { action: "view", resource: "activity" },
  ];

  const permissionIds: number[] = [];

  for (const perm of permissions) {
    const created = await prisma.permission.create({
      data: {
        action: perm.action,
        resource: perm.resource,
        role: { connect: { id: roleMap["Admin"] } },
      },
    });
    permissionIds.push(created.id);
  }

  for (const permissionId of permissionIds) {
    await prisma.rolePermission.upsert({
      where: {
        roleId_permissionId: {
          roleId: roleMap["Admin"],
          permissionId,
        },
      },
      update: {},
      create: {
        roleId: roleMap["Admin"],
        permissionId,
      },
    });
  }

  const hashedPassword = await bcrypt.hash("Admin123!", 10);

  await prisma.user.upsert({
    where: { email: "support@example.com" },
    update: {},
    create: {
      username: "support",
      email: "support@example.com",
      password: hashedPassword,
      role: { connect: { id: roleMap["Admin"] } },
    },
  });

  console.log("✅ Seed completed.");
}

main()
  .catch((e) => {
    console.error("❌ Seed error:", e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());

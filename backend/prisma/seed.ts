import { PrismaClient } from '../generated/prisma';
const prisma = new PrismaClient();

async function main() {
  await prisma.userRole.createMany({
    data: [
      { id: 1, name: "ADMIN" },
      { id: 2, name: "HR" },
      { id: 3, name: "EMPLOYEE" },
    ],
    skipDuplicates: true,
  });
  console.log("User roles seeded");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());

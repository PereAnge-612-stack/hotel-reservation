const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function main() {
  const user = await prisma.user.update({
    where: { email: "papebenoit612@gmail.com" },
    data: { role: "admin" },
  });
  console.log("Mis à jour :", user.nom, "->", user.role);
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function main() {
  await prisma.evenement.createMany({
    data: [
      {
        nom: "Soirée Jazz au Lounge",
        description: "Une soirée musicale intimiste avec notre pianiste résident.",
        date: new Date("2026-08-15"),
        prix: 15000,
        image: "https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=800",
        placesTotal: 50,
      },
      {
        nom: "Brunch Dominical",
        description: "Un brunch gastronomique face à la piscine, tous les dimanches.",
        date: new Date("2026-08-02"),
        prix: 25000,
        image: "https://images.unsplash.com/photo-1533777857889-4be7c70b33f7?w=800",
        placesTotal: 30,
      },
      {
        nom: "Dégustation de Vins",
        description: "Découvrez une sélection de grands crus avec notre sommelier.",
        date: new Date("2026-08-20"),
        prix: 20000,
        image: "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?w=800",
        placesTotal: 20,
      },
    ],
  });
  console.log("✅ Événements ajoutés !");
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
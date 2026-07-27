const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

async function main() {
  await prisma.chambre.createMany({
    data: [
      {
        nom: "Suite Royale",
        description: "Une suite luxueuse avec vue sur la mer, jacuzzi et salon privé.",
        prix: 250,
        image: "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800",
        type: "Suite",
        disponible: true,
      },
      {
        nom: "Chambre Deluxe",
        description: "Chambre spacieuse avec lit king-size et balcon privatif.",
        prix: 120,
        image: "https://images.unsplash.com/photo-1618773928121-c32242e63f39?w=800",
        type: "Deluxe",
        disponible: true,
      },
      {
        nom: "Chambre Standard",
        description: "Chambre confortable et élégante pour un séjour agréable.",
        prix: 75,
        image: "https://images.unsplash.com/photo-1566665797739-1674de7a421a?w=800",
        type: "Standard",
        disponible: true,
      },
      {
        nom: "Suite Familiale",
        description: "Grande suite avec deux chambres, parfaite pour les familles.",
        prix: 180,
        image: "https://images.unsplash.com/photo-1590490360182-c33d57733427?w=800",
        type: "Suite",
        disponible: true,
      },
      {
        nom: "Chambre Vue Jardin",
        description: "Chambre calme avec vue sur notre jardin tropical.",
        prix: 90,
        image: "https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?w=800",
        type: "Standard",
        disponible: true,
      },
      {
        nom: "Penthouse",
        description: "Le summum du luxe, terrasse panoramique et service 5 étoiles.",
        prix: 450,
        image: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800",
        type: "Suite",
        disponible: true,
      },
    ],
  })
  console.log('✅ Chambres ajoutées !')
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect())
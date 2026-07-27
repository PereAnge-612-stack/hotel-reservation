import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import FiltreChambres from "./FiltreChambres";

const EURO_TO_FCFA = 655.957;

export function formatFCFA(euros: number) {
  const fcfa = Math.round(euros * EURO_TO_FCFA);
  return new Intl.NumberFormat("fr-FR").format(fcfa) + " FCFA";
}

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ type?: string; prix?: string }>;
}) {
  const { type, prix } = await searchParams;

  const chambres = await prisma.chambre.findMany({
    where: {
      disponible: true,
      ...(type && type !== "tous" ? { type } : {}),
      ...(prix ? { prix: { lte: parseFloat(prix) } } : {}),
    },
    orderBy: { prix: "asc" },
  });

  return (
    <main className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-card border-b border-border">
        <div className="max-w-6xl mx-auto px-4 py-6 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-foreground flex items-center gap-3">
  <svg viewBox="0 0 64 64" className="w-8 h-8" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="32" cy="32" r="30" stroke="#a78bfa" strokeWidth="2"/>
    <path
      d="M14 40c6-2 10-6 12-12 1-4 0-9-3-11 3-1 6 0 8 3 1-4 4-6 7-6-1 3 0 6 2 8 4 4 5 10 3 15-3 7-10 11-18 11-4 0-8-1-11-3-1-1-1-3 0-5z"
      fill="#a78bfa"
      opacity="0.9"
    />
    <circle cx="38" cy="18" r="1.5" fill="#0a0a14"/>
  </svg>
  Hôtel Prestige
</h1>
            <p className="text-muted-foreground mt-1">Découvrez nos chambres et suites d'exception</p>
          </div>
          
        </div>
      </div>

      {/* Chambres */}
      <div className="max-w-6xl mx-auto px-4 py-10">
        <FiltreChambres />

        <h2 className="text-2xl font-semibold text-foreground mb-6">
          {chambres.length} chambre{chambres.length > 1 ? "s" : ""} disponible{chambres.length > 1 ? "s" : ""}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {chambres.map((chambre) => (
            <Card key={chambre.id} className="overflow-hidden hover:shadow-lg transition-shadow">
              <img src={chambre.image} alt={chambre.nom} className="w-full h-48 object-cover" />
              <CardHeader>
                <div className="flex justify-between items-start">
                  <CardTitle className="text-lg">{chambre.nom}</CardTitle>
                  <Badge variant="secondary">{chambre.type}</Badge>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground text-sm">{chambre.description}</p>
                <p className="text-xl font-bold text-foreground mt-3">
                  {formatFCFA(chambre.prix)} <span className="text-sm font-normal text-muted-foreground">/ nuit</span>
                </p>
              </CardContent>
              <CardFooter>
                <Link href={`/reservation/${chambre.id}`} className="w-full">
                  <Button className="w-full">Réserver</Button>
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>

        {chambres.length === 0 && (
          <div className="text-center py-20 text-muted-foreground">
            <p className="text-xl">Aucune chambre trouvée pour ces critères.</p>
          </div>
        )}
      </div>
    </main>
  );
}
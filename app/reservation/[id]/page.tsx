import { prisma } from "@/lib/prisma";
import { Badge } from "@/components/ui/badge";
import FormulaireReservation from "./FormulaireReservation";
import { notFound } from "next/navigation";
import Link from "next/link";

const EURO_TO_FCFA = 655.957;
function formatFCFA(euros: number) {
  return new Intl.NumberFormat("fr-FR").format(Math.round(euros * EURO_TO_FCFA)) + " FCFA";
}

export default async function PageReservation({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const chambre = await prisma.chambre.findUnique({
    where: { id: parseInt(id) },
  });

  if (!chambre) return notFound();

  return (
    <main className="min-h-screen bg-background">
      <div className="bg-card border-b border-border">
        <div className="max-w-4xl mx-auto px-4 py-6 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-foreground">🏨 Réserver une chambre</h1>
          <Link href="/" className="text-sm text-muted-foreground hover:text-foreground">← Retour</Link>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-card border border-border rounded-xl overflow-hidden">
            <img src={chambre.image} alt={chambre.nom} className="w-full h-52 object-cover" />
            <div className="p-5">
              <div className="flex justify-between items-start mb-2">
                <h2 className="text-xl font-semibold text-foreground">{chambre.nom}</h2>
                <Badge variant="secondary">{chambre.type}</Badge>
              </div>
              <p className="text-muted-foreground text-sm mb-4">{chambre.description}</p>
              <p className="text-xl font-bold text-foreground">
                {formatFCFA(chambre.prix)} <span className="text-sm font-normal text-muted-foreground">/ nuit</span>
              </p>
            </div>
          </div>

          <FormulaireReservation chambreId={chambre.id} prix={chambre.prix} />
        </div>
      </div>
    </main>
  );
}
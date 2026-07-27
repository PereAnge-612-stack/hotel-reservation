import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { cookies } from "next/headers";
import { jwtVerify } from "jose";
import { formatFCFA } from "../page";

const secret = new TextEncoder().encode(process.env.NEXTAUTH_SECRET || "hotel-secret-2026");

export default async function PageAdmin() {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  let role: string | null = null;
  if (token) {
    try {
      const { payload } = await jwtVerify(token, secret);
      role = payload.role as string;
    } catch {
      role = null;
    }
  }

  if (role !== "admin") {
    return (
      <main className="min-h-screen bg-background flex items-center justify-center">
        <div className="bg-card border border-border rounded-xl p-10 w-full max-w-sm text-center">
          <div className="text-5xl mb-4">🔒</div>
          <h1 className="text-2xl font-bold text-foreground mb-2">Accès refusé</h1>
          <p className="text-muted-foreground mb-6 text-sm">
            Cette page est réservée aux administrateurs.
          </p>
          <Link href="/">
            <Button className="w-full">Retour à l'accueil</Button>
          </Link>
        </div>
      </main>
    );
  }

  const reservations = await prisma.reservation.findMany({
    include: { chambre: true },
    orderBy: { createdAt: "desc" },
  });

  return (
    <main className="min-h-screen bg-background">
      <div className="bg-card border-b border-border">
        <div className="max-w-6xl mx-auto px-4 py-6 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Page Admin</h1>
            <p className="text-muted-foreground mt-1">{reservations.length} réservation(s) au total</p>
          </div>
          <Link href="/">
            <Button variant="outline">Retour à l'accueil</Button>
          </Link>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-10">
        <div className="bg-card border border-border rounded-xl overflow-hidden">
          <table className="w-full text-sm">
            <thead className="border-b border-border">
              <tr>
                <th className="text-left px-6 py-4 font-medium text-muted-foreground">Client</th>
                <th className="text-left px-6 py-4 font-medium text-muted-foreground">Chambre</th>
                <th className="text-left px-6 py-4 font-medium text-muted-foreground">Arrivée</th>
                <th className="text-left px-6 py-4 font-medium text-muted-foreground">Départ</th>
                <th className="text-left px-6 py-4 font-medium text-muted-foreground">Prix</th>
                <th className="text-left px-6 py-4 font-medium text-muted-foreground">Téléphone</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {reservations.map((r) => (
                <tr key={r.id} className="hover:bg-muted/50">
                  <td className="px-6 py-4">
                    <div className="font-medium text-foreground">{r.nom}</div>
                    <div className="text-muted-foreground">{r.email}</div>
                  </td>
                  <td className="px-6 py-4 text-foreground">{r.chambre.nom}</td>
                  <td className="px-6 py-4 text-foreground">
                    {new Date(r.dateArrivee).toLocaleDateString("fr-FR")}
                  </td>
                  <td className="px-6 py-4 text-foreground">
                    {new Date(r.dateDepart).toLocaleDateString("fr-FR")}
                  </td>
                  <td className="px-6 py-4 font-medium text-foreground">{formatFCFA(r.chambre.prix)}</td>
                  <td className="px-6 py-4 text-foreground">{r.telephone}</td>
                </tr>
              ))}
            </tbody>
          </table>

          {reservations.length === 0 && (
            <div className="text-center py-20 text-muted-foreground">
              Aucune réservation pour le moment.
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
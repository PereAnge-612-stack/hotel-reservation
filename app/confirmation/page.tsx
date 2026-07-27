import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function PageConfirmation() {
  return (
    <main className="min-h-screen bg-background flex items-center justify-center">
      <div className="bg-card border border-border rounded-xl p-10 text-center max-w-md">
        <div className="text-6xl mb-4">🎉</div>
        <h1 className="text-2xl font-bold text-foreground mb-2">Réservation confirmée !</h1>
        <p className="text-muted-foreground mb-6">
          Merci pour votre réservation. Vous recevrez une confirmation par email très bientôt.
        </p>
        <Link href="/">
          <Button className="w-full">Retour à l'accueil</Button>
        </Link>
      </div>
    </main>
  );
}
"use client";

import { useEffect, useState } from "react";

type Reservation = {
  id: number;
  dateArrivee: string;
  dateDepart: string;
  chambre: { nom: string; prix: number; image: string };
};

export default function PageMesReservations() {
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [loading, setLoading] = useState(true);
  const [annulationEnCours, setAnnulationEnCours] = useState<number | null>(null);

  useEffect(() => {
    fetch("/api/reservations/me")
      .then((r) => r.json())
      .then((data) => setReservations(Array.isArray(data) ? data : []))
      .finally(() => setLoading(false));
  }, []);

  async function handleAnnuler(id: number) {
    if (!confirm("Confirmer l'annulation de cette réservation ?")) return;

    setAnnulationEnCours(id);
    const res = await fetch(`/api/reservations/${id}`, { method: "DELETE" });

    if (res.ok) {
      setReservations((prev) => prev.filter((r) => r.id !== id));
    } else {
      alert("Impossible d'annuler cette réservation.");
    }
    setAnnulationEnCours(null);
  }

  if (loading) {
    return (
      <main className="min-h-screen bg-background p-8">
        <p className="text-muted-foreground">Chargement...</p>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-background p-8">
      <h1 className="text-3xl font-bold text-foreground mb-6">Mes réservations</h1>

      {reservations.length === 0 ? (
        <p className="text-muted-foreground">Vous n'avez pas encore de réservation.</p>
      ) : (
        <div className="grid gap-4 max-w-3xl">
          {reservations.map((r) => (
            <div key={r.id} className="bg-card border border-border rounded-xl p-6 flex gap-4 items-center">
              <img src={r.chambre.image} alt={r.chambre.nom} className="w-32 h-24 object-cover rounded-lg" />
              <div className="flex-1">
                <h2 className="text-lg font-semibold text-foreground">{r.chambre.nom}</h2>
                <p className="text-sm text-muted-foreground">
                  Du {new Date(r.dateArrivee).toLocaleDateString("fr-FR")} au {new Date(r.dateDepart).toLocaleDateString("fr-FR")}
                </p>
                <p className="text-sm text-muted-foreground mt-1">{r.chambre.prix} FCFA / nuit</p>
              </div>
              <button
                onClick={() => handleAnnuler(r.id)}
                disabled={annulationEnCours === r.id}
                className="text-sm text-destructive hover:underline whitespace-nowrap disabled:opacity-50"
              >
                {annulationEnCours === r.id ? "Annulation..." : "Annuler"}
              </button>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}
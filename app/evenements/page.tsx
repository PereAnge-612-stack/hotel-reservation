"use client";

import { useEffect, useState } from "react";

type Evenement = {
  id: number;
  nom: string;
  description: string;
  date: string;
  prix: number;
  image: string;
  placesTotal: number;
};

export default function PageEvenements() {
  const [evenements, setEvenements] = useState<Evenement[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/evenements")
      .then((r) => r.json())
      .then((data) => setEvenements(Array.isArray(data) ? data : []))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <main className="min-h-screen bg-background p-8">
        <p className="text-muted-foreground">Chargement...</p>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-background p-8">
      <h1 className="text-3xl font-bold text-foreground mb-2">Événements</h1>
      <p className="text-muted-foreground mb-8">Vivez des moments uniques à l'Hôtel Prestige</p>

      {evenements.length === 0 ? (
        <p className="text-muted-foreground">Aucun événement prévu pour le moment.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {evenements.map((ev) => (
            <div key={ev.id} className="bg-card border border-border rounded-xl overflow-hidden">
              {ev.image && (
  <img src={ev.image} alt={ev.nom} className="w-full h-48 object-cover" />
)}
              <div className="p-5">
                <h2 className="text-lg font-semibold text-foreground mb-1">{ev.nom}</h2>
                <p className="text-sm text-muted-foreground mb-3">{ev.description}</p>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-muted-foreground">
                    {new Date(ev.date).toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric" })}
                  </span>
                  <span className="font-bold text-foreground">{ev.prix.toLocaleString("fr-FR")} FCFA</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}
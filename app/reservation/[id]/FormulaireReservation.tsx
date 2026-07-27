"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const EURO_TO_FCFA = 655.957;

function formatFCFA(euros: number) {
  return new Intl.NumberFormat("fr-FR").format(Math.round(euros * EURO_TO_FCFA)) + " FCFA";
}

export default function FormulaireReservation({ chambreId, prix }: { chambreId: number; prix: number }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    nom: "", email: "", telephone: "", dateArrivee: "", dateDepart: "",
  });

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  const nuits = form.dateArrivee && form.dateDepart
    ? Math.max(0, Math.ceil((new Date(form.dateDepart).getTime() - new Date(form.dateArrivee).getTime()) / (1000 * 60 * 60 * 24)))
    : 0;

  const total = nuits * prix;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);

    const res = await fetch("/api/reservations", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...form, chambreId }),
    });

    if (res.ok) {
      router.push("/confirmation");
    } else {
      const data = await res.json();
      alert(data.error || "Une erreur est survenue.");
      setLoading(false);
    }
  }

  return (
    <div className="bg-card border border-border rounded-xl p-6">
      <h3 className="text-lg font-semibold text-foreground mb-5">Vos informations</h3>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Label htmlFor="nom">Nom complet</Label>
          <Input id="nom" name="nom" placeholder="Adama Diallo" onChange={handleChange} required />
        </div>
        <div>
          <Label htmlFor="email">Email</Label>
          <Input id="email" name="email" type="email" placeholder="adama@email.com" onChange={handleChange} required />
        </div>
        <div>
          <Label htmlFor="telephone">Téléphone</Label>
          <Input id="telephone" name="telephone" placeholder="+221 77 000 00 00" onChange={handleChange} required />
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <Label htmlFor="dateArrivee">Arrivée</Label>
            <Input id="dateArrivee" name="dateArrivee" type="date" onChange={handleChange} required />
          </div>
          <div>
            <Label htmlFor="dateDepart">Départ</Label>
            <Input id="dateDepart" name="dateDepart" type="date" onChange={handleChange} required />
          </div>
        </div>

        {nuits > 0 && (
          <div className="bg-muted rounded-lg p-4 text-sm space-y-1">
            <div className="flex justify-between text-muted-foreground">
              <span>{formatFCFA(prix)} × {nuits} nuit{nuits > 1 ? "s" : ""}</span>
              <span>{formatFCFA(total)}</span>
            </div>
            <div className="flex justify-between font-bold text-foreground text-base border-t border-border pt-2 mt-2">
              <span>Total</span>
              <span>{formatFCFA(total)}</span>
            </div>
          </div>
        )}

        <Button type="submit" className="w-full" disabled={loading}>
          {loading ? "Réservation en cours..." : "Confirmer la réservation"}
        </Button>
      </form>
    </div>
  );
}
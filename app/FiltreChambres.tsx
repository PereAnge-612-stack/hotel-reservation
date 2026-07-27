"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { Button } from "@/components/ui/button";

export default function FiltreChambres() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [type, setType] = useState(searchParams.get("type") || "tous");
  const [prix, setPrix] = useState(searchParams.get("prix") || "500");

  function appliquerFiltres() {
    const params = new URLSearchParams();
    if (type !== "tous") params.set("type", type);
    params.set("prix", prix);
    router.push(`/?${params.toString()}`);
  }

  function reinitialiser() {
    setType("tous");
    setPrix("500");
    router.push("/");
  }

  return (
    <div className="bg-white rounded-xl shadow-sm p-5 mb-8 flex flex-wrap gap-6 items-end">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Type de chambre</label>
        <select
          value={type}
          onChange={(e) => setType(e.target.value)}
          className="bg-card text-foreground border border-border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
        >
          <option value="tous">Tous</option>
          <option value="Standard">Standard</option>
          <option value="Deluxe">Deluxe</option>
          <option value="Suite">Suite</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Prix max : <span className="font-bold">{prix}€</span>
        </label>
        <input
          type="range"
          min="50"
          max="500"
          step="10"
          value={prix}
          onChange={(e) => setPrix(e.target.value)}
          className="w-48"
        />
      </div>

      <Button onClick={appliquerFiltres}>Filtrer</Button>
      <Button variant="outline" onClick={reinitialiser}>Réinitialiser</Button>
    </div>
  );
}
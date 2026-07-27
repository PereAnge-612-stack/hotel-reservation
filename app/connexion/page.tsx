"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function PageConnexion() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const inscrit = searchParams.get("inscrit");
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ email: "", password: "" });
  const [erreur, setErreur] = useState("");

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErreur("");
    setLoading(true);

    const res = await fetch("/api/auth/connexion", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    const data = await res.json();
    if (res.ok) {
      router.push("/");
      router.refresh();
    } else {
      setErreur(data.error || "Une erreur est survenue.");
      setLoading(false);
    }
  }

  return (
    <main
      className="min-h-screen flex items-center justify-center px-4 relative"
      style={{
        backgroundImage: `linear-gradient(rgba(10,10,20,0.75), rgba(10,10,20,0.85)), url('/hotel-bg.jpg')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="absolute top-12 text-center px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-2">Bienvenue à l'Hôtel Prestige</h2>
        <p className="text-white/70 text-sm md:text-base">Votre séjour d'exception commence ici</p>
      </div>

      <div className="bg-card/95 backdrop-blur border border-border rounded-xl p-8 w-full max-w-md">
        <div className="text-center mb-6">
          <svg viewBox="0 0 64 64" className="w-10 h-10" fill="none" xmlns="http://www.w3.org/2000/svg">
  <circle cx="32" cy="32" r="30" stroke="#a78bfa" strokeWidth="2"/>
  <path
    d="M14 40c6-2 10-6 12-12 1-4 0-9-3-11 3-1 6 0 8 3 1-4 4-6 7-6-1 3 0 6 2 8 4 4 5 10 3 15-3 7-10 11-18 11-4 0-8-1-11-3-1-1-1-3 0-5z"
    fill="#a78bfa"
    opacity="0.9"
  />
  <circle cx="38" cy="18" r="1.5" fill="#0a0a14"/>
</svg>
          <h1 className="text-2xl font-bold text-foreground">Connexion</h1>
          <p className="text-muted-foreground text-sm mt-1">Bon retour parmi nous !</p>
        </div>

        {inscrit && (
          <div className="bg-green-500/10 text-green-500 text-sm rounded-lg px-4 py-3 mb-4">
            Compte créé avec succès ! Connectez-vous.
          </div>
        )}

        {erreur && (
          <div className="bg-destructive/10 text-destructive text-sm rounded-lg px-4 py-3 mb-4">
            {erreur}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="email">Email</Label>
            <Input id="email" name="email" type="email" placeholder="adama@email.com" onChange={handleChange} required />
          </div>
          <div>
            <Label htmlFor="password">Mot de passe</Label>
            <Input id="password" name="password" type="password" placeholder="••••••••" onChange={handleChange} required />
          </div>
          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? "Connexion..." : "Se connecter"}
          </Button>
        </form>

        <p className="text-center text-sm text-muted-foreground mt-6">
          Pas encore de compte ?{" "}
          <Link href="/inscription" className="text-foreground font-medium hover:underline">
            S'inscrire
          </Link>
        </p>
      </div>
    </main>
  );
}
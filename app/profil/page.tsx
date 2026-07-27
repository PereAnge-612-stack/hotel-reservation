"use client";

import { useEffect, useState } from "react";

export default function PageProfil() {
  const [user, setUser] = useState<{ nom: string; email: string } | null>(null);
  const [nom, setNom] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [message, setMessage] = useState("");
  const [erreur, setErreur] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetch("/api/auth/me")
      .then((r) => r.json())
      .then((data) => {
        setUser(data);
        setNom(data.nom || "");
      });
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setMessage("");
    setErreur("");

    if (password && password !== confirm) {
      setErreur("Les mots de passe ne correspondent pas.");
      return;
    }

    setLoading(true);
    const res = await fetch("/api/auth/profil", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ nom, password: password || undefined }),
    });

    if (res.ok) {
  setMessage("Profil mis à jour avec succès.");
  setPassword("");
  setConfirm("");
  window.dispatchEvent(new Event("user-updated"));
} else {
      setErreur("Une erreur est survenue.");
    }
    setLoading(false);
  }

  if (!user) {
    return (
      <main className="min-h-screen bg-background p-8">
        <p className="text-muted-foreground">Chargement...</p>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-background p-8 flex justify-center">
      <div className="bg-card border border-border rounded-xl p-8 w-full max-w-md h-fit">
        <h1 className="text-2xl font-bold text-foreground mb-1">Mon profil</h1>
        <p className="text-muted-foreground text-sm mb-6">{user.email}</p>

        {message && (
          <div className="bg-green-500/10 text-green-500 text-sm rounded-lg px-4 py-3 mb-4">{message}</div>
        )}
        {erreur && (
          <div className="bg-destructive/10 text-destructive text-sm rounded-lg px-4 py-3 mb-4">{erreur}</div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-sm text-foreground mb-1 block">Nom complet</label>
            <input
              value={nom}
              onChange={(e) => setNom(e.target.value)}
              className="w-full bg-background border border-border rounded-lg px-4 py-2 text-sm text-foreground"
            />
          </div>
          <div>
            <label className="text-sm text-foreground mb-1 block">Nouveau mot de passe (optionnel)</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Laisser vide pour ne pas changer"
              className="w-full bg-background border border-border rounded-lg px-4 py-2 text-sm text-foreground"
            />
          </div>
          {password && (
            <div>
              <label className="text-sm text-foreground mb-1 block">Confirmer le mot de passe</label>
              <input
                type="password"
                value={confirm}
                onChange={(e) => setConfirm(e.target.value)}
                className="w-full bg-background border border-border rounded-lg px-4 py-2 text-sm text-foreground"
              />
            </div>
          )}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-primary text-primary-foreground rounded-lg px-4 py-2 text-sm font-medium hover:opacity-90 disabled:opacity-50"
          >
            {loading ? "Enregistrement..." : "Enregistrer les modifications"}
          </button>
        </form>
      </div>
    </main>
  );
}
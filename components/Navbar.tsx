"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";

export default function Navbar() {
  const router = useRouter();
  const pathname = usePathname();
  const [user, setUser] = useState<{ nom: string; role?: string } | null>(null);

  useEffect(() => {
  function chargerUser() {
    fetch("/api/auth/me")
      .then((r) => r.json())
      .then((data) => { setUser(data.nom ? data : null); })
      .catch(() => {});
  }

  chargerUser();
  window.addEventListener("user-updated", chargerUser);
  return () => window.removeEventListener("user-updated", chargerUser);
}, []);

  async function handleDeconnexion() {
    await fetch("/api/auth/deconnexion", { method: "POST" });
    setUser(null);
    router.push("/");
    router.refresh();
  }

  const links = [
  { href: "/", label: "Chambres" },
  { href: "/evenements", label: "Événements" },
  ...(user ? [{ href: "/mes-reservations", label: "Mes réservations" }] : []),
  ...(user?.role === "admin" ? [{ href: "/admin", label: "Administration" }] : []),
];

  return (
    <aside className="fixed left-0 top-0 h-full w-48 bg-card border-r border-border flex flex-col z-50">
      {/* Logo */}
      <div className="px-6 py-6 border-b border-border">
        <Link href="/" className="flex flex-col items-center gap-2">
          <svg viewBox="0 0 64 64" className="w-10 h-10" fill="none" xmlns="http://www.w3.org/2000/svg">
  <circle cx="32" cy="32" r="30" stroke="#a78bfa" strokeWidth="2"/>
  <path
    d="M14 40c6-2 10-6 12-12 1-4 0-9-3-11 3-1 6 0 8 3 1-4 4-6 7-6-1 3 0 6 2 8 4 4 5 10 3 15-3 7-10 11-18 11-4 0-8-1-11-3-1-1-1-3 0-5z"
    fill="#a78bfa"
    opacity="0.9"
  />
  <circle cx="38" cy="18" r="1.5" fill="#0a0a14"/>
</svg>
          <span className="font-bold text-foreground text-sm text-center leading-tight">Hôtel Prestige</span>
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-6 flex flex-col gap-1">
        {links.map((link) => (
          <Link key={link.href} href={link.href}>
            <div className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors ${
              pathname === link.href
                ? "bg-primary text-primary-foreground font-medium"
                : "text-muted-foreground hover:text-foreground hover:bg-muted"
            }`}>
              <span>{link.label}</span>
            </div>
          </Link>
        ))}
      </nav>

      {/* Bas de la sidebar */}
      <div className="px-3 py-4 border-t border-border flex flex-col gap-2">
  {user ? (
    <>
      <Link href="/profil">
  <div className="px-3 py-2 text-sm text-muted-foreground hover:text-foreground hover:bg-muted rounded-lg transition-colors">
    <span className="font-medium text-foreground">{user.nom}</span>
  </div>
</Link>
      <button
        onClick={handleDeconnexion}
        className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-muted-foreground hover:text-foreground hover:bg-muted transition-colors w-full"
      >
        Déconnexion
      </button>
    </>
  ) : (
    <>
      <Link href="/connexion">
        <div className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-muted-foreground hover:text-foreground hover:bg-muted transition-colors">
          Connexion
        </div>
      </Link>
      <Link href="/inscription">
        <div className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm bg-primary text-primary-foreground font-medium hover:opacity-90 transition-opacity">
          S'inscrire
        </div>
      </Link>
    </>
  )}
</div>
    </aside>
  );
}
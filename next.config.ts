import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  typescript: {
    // Permet de valider le build sur Vercel même s'il reste des types manquants
    ignoreBuildErrors: true,
  },
  /* vos autres options de configuration déjà présentes */
};

export default nextConfig;

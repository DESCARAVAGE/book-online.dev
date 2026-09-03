import type { NextConfig } from "next";

// Dérivé de NEXT_PUBLIC_SUPABASE_URL plutôt qu'écrit en dur : évite de
// devoir modifier ce fichier si le projet Supabase change un jour.
const supabaseHostname = process.env.NEXT_PUBLIC_SUPABASE_URL
  ? new URL(process.env.NEXT_PUBLIC_SUPABASE_URL).hostname
  : undefined;

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    qualities: [90],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "picsum.photos",
      },
      // Photos réelles du site, servies depuis Supabase Storage.
      ...(supabaseHostname
        ? [
            {
              protocol: "https" as const,
              hostname: supabaseHostname,
              pathname: "/storage/v1/object/public/**",
            },
          ]
        : []),
    ],
  },
};

export default nextConfig;
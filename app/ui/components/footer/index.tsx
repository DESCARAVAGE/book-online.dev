import Link from "next/link";

const legalLinks = [
  { href: "/mentions-legales", label: "Mentions légales" },
  { href: "/confidentialite", label: "Confidentialité" },
  { href: "/cgv-cgu", label: "CGV & CGU" },
];

export default function Footer() {
  return (
    <footer className="soft-bg px-6 py-8 sm:px-10">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-4 text-sm text-gray-300 sm:flex-row sm:justify-between">
        <p>© {new Date().getFullYear()} Aesteria. Tous droits réservés.</p>

        <nav className="flex flex-wrap justify-center gap-x-6 gap-y-2">
          {legalLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="transition hover:text-white"
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </footer>
  );
}
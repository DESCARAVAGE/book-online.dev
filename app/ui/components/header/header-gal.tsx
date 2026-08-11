import Link from "next/link";

type HeaderGalProps = {
  collections: { slug: string; title: string }[];
  currentSlug: string;
};

// Pas de "use client" : ce ne sont que des liens de navigation,
// Next.js gère très bien <Link> depuis un Server Component.
export default function HeaderGal({ collections, currentSlug }: HeaderGalProps) {
  return (
    <nav className="flex gap-3 overflow-x-auto px-6 py-6 sm:px-10">
      {collections.map((c) => (
        <Link
          key={c.slug}
          href={`/collections/${c.slug}`}
          className={`shrink-0 rounded-full px-4 py-2 text-sm font-medium transition ${
            c.slug === currentSlug
              ? "bg-gray-900 text-white"
              : "bg-gray-100 text-gray-700 hover:bg-gray-200"
          }`}
        >
          {c.title}
        </Link>
      ))}
    </nav>
  );
}
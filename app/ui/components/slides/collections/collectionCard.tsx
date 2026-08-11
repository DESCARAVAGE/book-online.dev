export type Collection = {
  id: string | number;
  image: string;
  title: string;
  href?: string;
  isPrivate?: boolean;
};

// Carte cliquable d'une collection, redirige vers `href` (page galerie par défaut)
export default function CollectionCard({
  image,
  title,
  href = "/galerie",
  isPrivate = false,
}: Collection) {
  return (
    <a
      href={href}
      className="group relative block h-72 w-full overflow-hidden rounded-2xl shadow-md sm:h-80"
    >
      <img
        src={image}
        alt={title}
        draggable={false}
        className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />

      {/* pour l'instant, juste une différence visuelle : pas encore de
          vraie restriction d'accès tant que les codes ne sont pas branchés */}
      {isPrivate && (
        <span className="absolute right-3 top-3 rounded-full bg-black/70 px-3 py-1 text-xs font-medium text-white">
          🔒 Privé
        </span>
      )}

      <span className="absolute bottom-4 left-4 text-lg font-semibold text-white">
        {title}
      </span>
    </a>
  );
}
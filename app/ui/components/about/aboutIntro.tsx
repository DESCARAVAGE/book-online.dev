import { cinzel } from "@/app/ui/fonts";

export default function AboutIntro() {
  return (
    <section className="flex flex-col items-center gap-10 px-6 py-20 text-center sm:px-10 md:flex-row md:items-start md:gap-16 md:text-left">
      <div className="aspect-[4/5] w-full max-w-sm shrink-0 overflow-hidden rounded-md bg-foreground/10 md:w-2/5 md:max-w-none">
        <img
          src="https://picsum.photos/seed/about-photographe/600/750"
          alt=""
          className="h-full w-full object-cover"
        />
      </div>
      <div className="flex w-full flex-col items-center text-center md:w-3/5 md:items-start md:text-left">
        <h1
          className={`${cinzel.className} text-3xl font-semibold text-foreground sm:text-4xl`}
        >
          À propos
        </h1>
        <p className="mt-4 text-gray-600 dark:text-gray-400">
          Passionnée par la photographie depuis toujours, je capture des
          instants authentiques, entre lumière naturelle et émotions
          brutes. Chaque séance est pensée comme une aventure sur mesure,
          où votre histoire prend le pas sur les conventions.
        </p>
        <p className="mt-4 text-gray-600 dark:text-gray-400">
          Basée à Tours, je me déplace volontiers pour capturer le décor
          qui vous ressemble — qu'il s'agisse d'une forêt, d'une ville ou
          d'un lieu qui compte pour vous.
        </p>
      </div>
    </section>
  );
}
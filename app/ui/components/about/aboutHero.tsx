"use client";

import { motion } from "framer-motion";
import { cinzel } from "@/app/ui/fonts";
import AboutPhoto from "@/app/ui/components/slides/aboutMe/aboutPhoto";

type AboutHeroProps = {
  photo?: string;
};

export default function AboutHero({ photo }: AboutHeroProps) {
  return (
    <section className="flex flex-col gap-10 px-6 py-16 sm:px-10">
      <motion.p
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.6 }}
        className={`${cinzel.className} mx-auto max-w-2xl text-center text-lg italic text-foreground sm:text-xl`}
      >
        « Permettre à chacun d&apos;incarner l&apos;être de ses rêves le temps d&apos;un instant. »
      </motion.p>

      <div className="mx-auto flex w-full max-w-6xl flex-col items-center gap-10 md:flex-row md:items-start md:gap-16">
        <AboutPhoto src={photo} />

        <div className="flex w-full flex-col gap-8 text-center md:w-1/2 md:text-left">
          <div>
            <h2 className={`${cinzel.className} text-2xl font-semibold text-foreground`}>
              Bienvenue !
            </h2>
            <p className="mt-3 text-gray-600 dark:text-gray-400">
              Moi, c&apos;est Olivia. Je suis passionnée par l&apos;art, les histoires et la
              culture pop. Mais, ce que j&apos;aime par-dessus tout ? Mettre en image ce qui
              n&apos;existe que dans nos esprits. Qu&apos;il s&apos;agisse d&apos;un personnage
              tout droit sorti d&apos;une licence culte, d&apos;un costume façonné à la main
              pendant des mois ou d&apos;un univers original né d&apos;une simple étincelle, mon
              rôle est de donner vie à cette vision, le temps d&apos;un shooting.
            </p>
          </div>

          <div>
            <h2 className={`${cinzel.className} text-2xl font-semibold text-foreground`}>
              Présentation de ce que je veux faire
            </h2>
            <p className="mt-3 text-gray-600 dark:text-gray-400">
              On associe souvent la photographie à l&apos;art d&apos;immortaliser le réel. Ma
              démarche prend le chemin inverse : je crée un espace suspendu où l&apos;on
              s&apos;extrait du quotidien pour explorer d&apos;autres mondes. Mon intention est
              simple : permettre à chacun·e de se mettre dans la peau d&apos;un personnage sans
              jamais craindre le jugement. Que tu aies déjà posé cent fois ou que ce soit ta toute
              première fois, chaque séance se déroule dans un cadre bienveillant et à ton rythme.
              Je te guide pas à pas tout au long de l&apos;expérience.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
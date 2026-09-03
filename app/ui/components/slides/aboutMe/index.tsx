import AboutPhoto from "./aboutPhoto";
import AboutText from "./aboutText";

type AboutMeProps = {
  photo?: string;
};

export default function AboutMe({ photo }: AboutMeProps) {
  return (
    <section className="bg-background px-6 py-20 sm:px-10">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-10 md:flex-row md:gap-16">
        <AboutPhoto src={photo} />
        <AboutText />
      </div>
    </section>
  );
}
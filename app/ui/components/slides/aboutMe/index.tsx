import AboutPhoto from "./aboutPhoto";
import AboutText from "./aboutText";

export default function AboutMe() {
  return (
    <section className="bg-white px-6 py-20 sm:px-10">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-10 md:flex-row md:gap-16">
        <AboutPhoto />
        <AboutText />
      </div>
    </section>
  );
}
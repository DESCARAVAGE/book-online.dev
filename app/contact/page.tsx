import About from "@/app/ui/components/about";
import Footer from "../ui/components/footer";
import { getSitePhotos } from "@/app/lib/getPhoto/index";
import '@/app/ui/styles/slides.css';

export default async function AboutPage() {
  // Deux photos "about" existent (section: "about") : position 0 pour
  // l'accueil (voir slides/index.tsx), position 1 pour ici, la page
  // qui mène au formulaire de contact.
  const aboutPhotos = await getSitePhotos("about");

  return (<>
    <main className="flex flex-col p-10 my-5">
      <About aboutPhoto={aboutPhotos[1]} />
    </main>
    <Footer />
  </>
  );
}
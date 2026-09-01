import About from "@/app/ui/components/about";
import Footer from "../ui/components/footer";
import '@/app/ui/styles/slides.css';

export default function AboutPage() {
  return (<>
    <main className="flex flex-col p-10 my-5">
      <About />
    </main>
    <Footer />
  </>
  );
}
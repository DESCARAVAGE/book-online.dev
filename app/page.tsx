import { FaInstagram } from "react-icons/fa";
import { cinzel } from "./ui/fonts";

export default function Home() {
  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      {/* <main className="flex flex-1 w-full max-w-3xl flex-col items-center justify-between py-32 px-16 bg-white dark:bg-black sm:items-start"> */}
      <main className="flex flex-col justify-center gap-3
       py-32 px-16 bg-white dark:bg-black">
        <div>
          <h4 className={`${cinzel.className} max-w-xs  font-semibold leading-10 tracking-tight text-black dark:text-zinc-50`}>
            Olivia Ferreira - Gallery
          </h4>
          <div className="flex flex-col gap-4 text-base font-medium sm:flex-row">
            <a
              className="flex h-12 w-full items-center justify-center gap-2 rounded-full bg-foreground px-5 text-background transition-colors hover:bg-[#383838] dark:hover:bg-[#ccc] md:w-[158px]"
              href="https://www.instagram.com/aesteriya_/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaInstagram />
              <p>Instagram</p>
            </a>
          </div>
        </div>
      </main>
    </div>
  );
}

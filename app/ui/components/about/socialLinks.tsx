import { FaInstagram, FaLinkedin } from "react-icons/fa";
import SocialButton from "./socialBtn";

const insta = "aesteria.photo";
const linkedin = "olivia-ferreira-223444220";

// Réseaux sociaux — affichés dans la section À propos de la home et
// dans le bloc "Où me retrouver ?" de la page about/contact.
//
// Le <svg> caché ne définit qu'un dégradé réutilisable : technique
// standard pour appliquer un gradient à une icône SVG (fill: currentColor
// ne peut pas être un dégradé, mais fill: url(#id) le peut).
export default function SocialLinks() {
  return (
    <div className="flex flex-wrap justify-center gap-6 md:justify-start">
      <svg width="0" height="0" style={{ position: "absolute" }} aria-hidden="true">
        <defs>
          <linearGradient id="instagram-gradient" x1="0%" y1="100%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#FFDD55" />
            <stop offset="50%" stopColor="#E1306C" />
            <stop offset="100%" stopColor="#833AB4" />
          </linearGradient>
        </defs>
      </svg>

      <SocialButton
        href={`https://www.instagram.com/${insta}/`}
        label="Instagram"
        icon={<FaInstagram style={{ fill: "url(#instagram-gradient)" }} />}
      />
      <SocialButton
        href={`https://www.linkedin.com/in/${linkedin}/`}
        label="LinkedIn"
        icon={<FaLinkedin style={{ color: "#0A66C2" }} />}
      />
    </div>
  );
}
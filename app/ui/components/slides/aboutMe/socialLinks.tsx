import { FaInstagram, FaLinkedin } from "react-icons/fa";
import SocialButton from "./socialBtn";

const insta = "aesteria.photo";
const linkedin = "olivia-ferreira-223444220";

// Réseaux sociaux affichés dans la section À propos
export default function SocialLinks() {
  return (
    <div className="mt-6 flex flex-wrap justify-center gap-4 md:justify-start">
      <SocialButton
        href={`https://www.instagram.com/${insta}/`}
        label="Instagram"
        icon={<FaInstagram />}
      />
      <SocialButton
        href={`https://www.linkedin.com/in/${linkedin}/`}
        label="Linkdin"
        icon={<FaLinkedin />}
      />
    </div>
  );
}
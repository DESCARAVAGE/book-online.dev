// Rose des vents en filigrane : fixed (reste ancrée à l'écran pendant
// le scroll, comme un filigrane sur du papier à en-tête) plutôt
// qu'absolute (qui suivrait le défilement du contenu). currentColor
// piloté par text-foreground : --foreground suit déjà .dark
// correctement (contraste garanti dans les deux thèmes), contrairement
// à --primary qui reste fixe quel que soit le thème.
export default function PricingsBackground() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 -z-10 flex items-center justify-center overflow-hidden text-foreground"
    >
      <svg
        viewBox="0 0 680 400"
        className="h-auto w-[640px] shrink-0 opacity-[0.07] md:w-[900px]"
      >
        <circle cx="340" cy="200" r="150" fill="none" stroke="currentColor" strokeWidth="2" />
        <circle cx="340" cy="200" r="105" fill="none" stroke="currentColor" strokeWidth="1" />
        <path
          d="M480,200 L386.2,219.1 L439,299 L359.1,246.2 L340,340 L320.9,246.2 L241,299 L293.8,219.1 L200,200 L293.8,180.9 L241,101 L320.9,153.8 L340,60 L359.1,153.8 L439,101 L386.2,180.9 Z"
          fill="currentColor"
        />
        <circle cx="340" cy="200" r="6" fill="currentColor" />
      </svg>
    </div>
  );
}
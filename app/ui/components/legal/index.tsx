import type { ReactNode } from "react";

type LegalSection = {
  title: string;
  content: ReactNode;
};

type LegalLayoutProps = {
  title: string;
  updatedAt?: string;
  sections: LegalSection[];
};

// Layout partagé par les pages légales (mentions légales, confidentialité, CGV/CGU)
// pour une mise en page cohérente : titre, date de mise à jour, sections numérotées
export default function LegalLayout({
  title,
  updatedAt,
  sections,
}: LegalLayoutProps) {
  return (
    <section className="bg-white px-6 py-16 sm:px-10">
      <div className="mx-auto max-w-3xl">
        <h1 className="text-3xl font-semibold text-gray-900 sm:text-4xl">
          {title}
        </h1>
        {updatedAt && (
          <p className="mt-2 text-sm text-gray-400">
            Dernière mise à jour : {updatedAt}
          </p>
        )}

        <div className="mt-10 space-y-10">
          {sections.map((section, i) => (
            <div key={i}>
              <h2 className="text-xl font-semibold text-gray-900">
                {i + 1}. {section.title}
              </h2>
              <div className="mt-3 leading-relaxed text-gray-600">
                {section.content}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
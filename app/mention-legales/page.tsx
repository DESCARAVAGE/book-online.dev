import LegalLayout from "../ui/components/legal/index";

export default function MentionsLegalesPage() {
  return (
    <LegalLayout
      title="Mentions légales"
      updatedAt="À compléter"
      sections={[
        {
          title: "Éditeur du site",
          content: (
            <p>
              Le site est édité par [Nom / raison sociale], [statut juridique],
              domicilié à [adresse]. SIRET : [à compléter].
            </p>
          ),
        },
        {
          title: "Contact",
          content: <p>Email : [adresse email à compléter]</p>,
        },
        {
          title: "Hébergement",
          content: (
            <p>
              Le site est hébergé par [nom de l'hébergeur], [adresse de
              l'hébergeur à compléter].
            </p>
          ),
        },
        {
          title: "Propriété intellectuelle",
          content: (
            <p>
              Les photographies, textes et éléments graphiques présents sur ce
              site sont protégés par le droit d'auteur. Toute reproduction
              sans autorisation préalable est interdite.
            </p>
          ),
        },
        {
          title: "Liens hypertextes",
          content: (
            <p>
              Ce site peut contenir des liens vers des sites tiers. [Nom]
              décline toute responsabilité quant à leur contenu.
            </p>
          ),
        },
      ]}
    />
  );
}
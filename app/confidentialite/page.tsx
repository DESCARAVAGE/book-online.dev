import LegalLayout from "../ui/components/legal/index";

export default function ConfidentialitePage() {
  return (
    <LegalLayout
      title="Politique de confidentialité"
      updatedAt="À compléter"
      sections={[
        {
          title: "Responsable du traitement",
          content: (
            <p>
              [Nom / raison sociale] est responsable du traitement des
              données collectées via ce site.
            </p>
          ),
        },
        {
          title: "Données collectées",
          content: (
            <p>
              Les données transmises via le formulaire de contact ou de
              réservation (nom, email, message) sont utilisées uniquement
              pour répondre à votre demande.
            </p>
          ),
        },
        {
          title: "Destinataires des données",
          content: (
            <p>
              Vos données ne sont transmises qu'aux prestataires nécessaires
              au fonctionnement du site (hébergement, envoi d'emails), et ne
              sont jamais revendues à des tiers.
            </p>
          ),
        },
        {
          title: "Cookies",
          content: (
            <p>
              Ce site peut utiliser des cookies techniques nécessaires à son
              bon fonctionnement, et éventuellement des cookies de mesure
              d'audience. [Détails à compléter selon les outils utilisés.]
            </p>
          ),
        },
        {
          title: "Vos droits",
          content: (
            <p>
              Conformément au RGPD, vous disposez d'un droit d'accès, de
              rectification et de suppression de vos données. Pour l'exercer,
              contactez-nous à [adresse email à compléter].
            </p>
          ),
        },
      ]}
    />
  );
}
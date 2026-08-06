import LegalLayout from "../ui/components/legal/index";

export default function CgvCguPage() {
  return (
    <LegalLayout
      title="CGV & CGU"
      updatedAt="À compléter"
      sections={[
        {
          title: "Objet",
          content: (
            <p>
              Les présentes conditions régissent l'utilisation du site et la
              réservation de prestations photographiques auprès de [Nom].
            </p>
          ),
        },
        {
          title: "Prestations proposées",
          content: (
            <p>
              [Liste des prestations à compléter : mariage, portrait,
              grossesse, etc., avec un renvoi possible vers la page
              Collections.]
            </p>
          ),
        },
        {
          title: "Réservation et paiement",
          content: (
            <p>
              Les modalités de réservation, d'acompte et de paiement seront
              précisées ici [à compléter].
            </p>
          ),
        },
        {
          title: "Droit de rétractation",
          content: (
            <p>
              Conformément au Code de la consommation, le client dispose d'un
              délai de rétractation de 14 jours, sauf exécution de la
              prestation avant ce délai avec son accord exprès.
            </p>
          ),
        },
        {
          title: "Livraison des photographies",
          content: (
            <p>
              Les délais de livraison des photographies retouchées seront
              précisés ici [à compléter].
            </p>
          ),
        },
        {
          title: "Propriété intellectuelle",
          content: (
            <p>
              Les photographies restent la propriété intellectuelle du
              photographe. Leur usage par le client est limité au cadre privé,
              sauf accord contraire.
            </p>
          ),
        },
        {
          title: "Responsabilité",
          content: (
            <p>
              [Clause de responsabilité à compléter, notamment en cas
              d'imprévu le jour de la prestation.]
            </p>
          ),
        },
        {
          title: "Litiges",
          content: (
            <p>
              En cas de litige, une solution amiable sera recherchée en
              priorité. À défaut, les tribunaux compétents seront ceux du
              ressort de [ville/juridiction à compléter].
            </p>
          ),
        },
      ]}
    />
  );
}
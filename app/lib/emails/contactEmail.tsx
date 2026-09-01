import {
  Body,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Preview,
  Text,
} from "@react-email/components";

type ContactEmailProps = {
  name: string;
  email: string;
  message: string;
};

// Couleurs reprises telles quelles de globals.css (:root, thème
// clair) : un email s'affiche toujours "en clair" côté destinataire,
// pas de notion de thème sombre ici — inutile de dupliquer var(--dark).
const colors = {
  background: "#f0ede4",
  card: "#ffffff",
  foreground: "#070d0d",
  accent: "#473a74",
};

// Pas de police custom (Cinzel) : la plupart des clients mail
// bloquent les polices externes/@font-face. Un serif web-safe
// (Georgia) donne une allure proche sans dépendre d'un chargement
// externe qui échouerait silencieusement chez le destinataire.
export default function ContactEmail({ name, email, message }: ContactEmailProps) {
  return (
    <Html>
      <Head />
      <Preview>Nouveau message de {name} via le site Aesteria</Preview>
      <Body
        style={{
          backgroundColor: colors.background,
          fontFamily: "Georgia, 'Times New Roman', serif",
          padding: "32px 16px",
        }}
      >
        <Container
          style={{
            backgroundColor: colors.card,
            borderRadius: 8,
            padding: "32px",
            maxWidth: 480,
            border: `1px solid ${colors.accent}22`,
          }}
        >
          <Heading
            as="h1"
            style={{
              color: colors.foreground,
              fontSize: 22,
              letterSpacing: 1,
              textTransform: "uppercase",
              margin: "0 0 4px",
            }}
          >
            Aesteria — Photographe
          </Heading>
          <Text style={{ color: colors.accent, fontSize: 13, margin: "0 0 24px" }}>
            Nouveau message depuis le formulaire de contact
          </Text>

          <Hr style={{ borderColor: `${colors.accent}22`, margin: "0 0 24px" }} />

          <Text style={{ color: colors.foreground, fontSize: 15, margin: "0 0 8px" }}>
            <strong>De :</strong> {name} ({email})
          </Text>

          <Text
            style={{
              color: colors.foreground,
              fontSize: 15,
              lineHeight: 1.6,
              whiteSpace: "pre-wrap",
              marginTop: 16,
            }}
          >
            {message}
          </Text>
        </Container>
      </Body>
    </Html>
  );
}
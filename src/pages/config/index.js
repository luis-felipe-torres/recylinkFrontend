import Head from "next/head";
import { Container } from "@mui/material";
import ConfigPage from "@/components/ConfigPage";
import { BackgroundImage } from "@/components/BackgroundImage";

export default function Config() {
  return (
    <div>
      <Head>
        <title>Configuración de marcas y modelos</title>
      </Head>
      <BackgroundImage>
        <Container maxWidth="lg">
          <ConfigPage />
        </Container>
      </BackgroundImage>
    </div>
  );
}

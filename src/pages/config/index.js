import Head from "next/head";
import { Container } from "@mui/material";
import ConfigPage from "@/components/ConfigPage";

export default function Config() {
  return (
    <div>
      <Head>
        <title>Configuración de marcas y modelos</title>
      </Head>
      <Container maxWidth="lg">
        <ConfigPage />
      </Container>
    </div>
  );
}

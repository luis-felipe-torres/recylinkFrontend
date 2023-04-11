import Head from "next/head";
import { Container, Typography } from "@mui/material";
import MarcaList from "@/components/MarcaList";
import { BackgroundImage } from "@/components/BackgroundImage";

export default function Carros() {
  return (
    <div>
      <Head>
        <title>Marcas de Vehículos</title>
      </Head>
      <BackgroundImage>
        <Container maxWidth="m">
          <Typography
            variant="body1"
            style={{ marginTop: "16px", marginBottom: "32px" }}
          >
            Aquí puedes ver todas las marcas y modelos de carros disponibles.
          </Typography>
          <MarcaList />
        </Container>
      </BackgroundImage>
    </div>
  );
}

import Head from "next/head";
import { Container, Typography } from "@mui/material";

export default function Home() {
  return (
    <div>
      <Head>
        <title>Inicio</title>
      </Head>
      <Container maxWidth="sm">
        <Typography variant="h4" component="h1" gutterBottom>
          Página principal
        </Typography>
        <Typography variant="body1">
          Bienvenido a la página principal de nuestra aplicación de carros.
        </Typography>
      </Container>
    </div>
  );
}

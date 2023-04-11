import Head from "next/head";
import { Container, Typography, Box } from "@mui/material";
import { styled } from "@mui/system";

const BackgroundImage = styled("div")({
  backgroundImage: "url('https://source.unsplash.com/random?car')",
  backgroundSize: "cover",
  backgroundPosition: "center",
  height: "100vh",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
});

export default function Home() {
  return (
    <div>
      <Head>
        <title>Inicio</title>
      </Head>
      <BackgroundImage>
        <Container maxWidth="sm">
          <Box
            bgcolor="rgba(255, 255, 255, 0.9)"
            borderRadius={8}
            p={4}
            textAlign="center"
          >
            <Typography variant="h4" component="h1" gutterBottom>
              <b>Bienvenido a nuestra Aplicación de Carros</b>
            </Typography>
            <Typography variant="body1">
              Aquí podrás encontrar información sobre marcas y modelos de
              vehículos. Navega por nuestra aplicación para descubrir las
              características y especificaciones de diferentes autos.
            </Typography>
            <Typography variant="body1" mt={2}>
              <b>
                Utiliza los botones en la barra de navegación para explorar el
                catálogo de vehículos o configurar las marcas y modelos
                disponibles.
              </b>
            </Typography>
          </Box>
        </Container>
      </BackgroundImage>
    </div>
  );
}

import { AppBar, Toolbar, Typography, IconButton } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import Build from "@mui/icons-material/Build";
import Link from "next/link";

export default function Navbar() {
  return (
    <AppBar position="static">
      <Toolbar>
        <Link href="/" passHref>
          <IconButton edge="start" color="inherit" aria-label="inicio">
            <HomeIcon />
          </IconButton>
        </Link>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Mi Aplicación de Carros
        </Typography>
        <Link href="/carros" passHref>
          <IconButton
            edge="end"
            color="inherit"
            aria-label="carros"
            style={{ marginRight: "16px" }}
          >
            <DirectionsCarIcon />
          </IconButton>
        </Link>
        <Link href="/config" passHref>
          <IconButton edge="end" color="inherit" aria-label="carros">
            <Build />
          </IconButton>
        </Link>
      </Toolbar>
    </AppBar>
  );
}

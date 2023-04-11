import { AppBar, Toolbar, Typography, IconButton } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import Build from "@mui/icons-material/Build";
import Link from "next/link";
import { Backdrop, CircularProgress } from "@mui/material";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";

export default function Navbar() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const handleStart = () => {
      setLoading(true);
    };
    const handleComplete = () => {
      setLoading(false);
    };

    router.events.on("routeChangeStart", handleStart);
    router.events.on("routeChangeComplete", handleComplete);
    router.events.on("routeChangeError", handleComplete);

    return () => {
      router.events.off("routeChangeStart", handleStart);
      router.events.off("routeChangeComplete", handleComplete);
      router.events.off("routeChangeError", handleComplete);
    };
  }, [router]);

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Link href="/" passHref>
            <IconButton edge="start" color="inherit" aria-label="inicio">
              <HomeIcon />
            </IconButton>
          </Link>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Carros Online
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
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </>
  );
}

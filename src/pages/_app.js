import { CssBaseline } from "@mui/material";
import Navbar from "../components/Navbar";
import "../styles/globals.css";
import CustomApolloProvider from "../contexts/ApolloProvider";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <CssBaseline />
      <Navbar />
      <CustomApolloProvider>
        <Component {...pageProps} />
      </CustomApolloProvider>
    </>
  );
}

export default MyApp;

import "../styles/globals.scss";
import type { AppProps } from "next/app";
import Layout from "../components/Layout";
import { FavoritesProvider } from "../contexts/FavoritesContext";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <FavoritesProvider>
      <Layout>
        <Component {...pageProps} />
        <ToastContainer />
      </Layout>
    </FavoritesProvider>
  );
}

export default MyApp;

import Navbar from "../components/Navbar";
import "../styles/globals.css";
import { UserContext } from "../lib/context";

function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />;
}

export default MyApp;

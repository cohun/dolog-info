import Navbar from "../components/Navbar";
import "../styles/globals.css";
import { UserContext } from "../lib/context";

function MyApp({ Component, pageProps }) {
  return (
    <UserContext.Provider value={{ user: {}, username: "Attila" }}>
      <Component {...pageProps} />
    </UserContext.Provider>
  );
}

export default MyApp;

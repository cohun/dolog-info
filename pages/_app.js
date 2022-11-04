import Navbar from "../components/Navbar";
import "../styles/globals.css";
import toast, { Toaster } from "react-hot-toast";
import { UserContext } from "../lib/context";
import { useState, useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../lib/firebaseConfig";
import { collection, getDocs } from "firebase/firestore";

function MyApp({ Component, pageProps }) {
  const [user] = useAuthState(auth);
  const [blogName1, setBlogName1] = useState(null);
  /*   const onQuerySnapshot = async () => {
    let unsubscribe;
    const querySnapshot = await getDocs(collection(db, "users"));
    querySnapshot.forEach((doc) => {
      console.log(`${doc.id} => ${doc.data()}`);
    });
    unsubscribe = querySnapshot.onSnapshot();
  };

  useEffect(() => {
    if (user) {
      onQuerySnapshot();
    }
  }); */

  return (
    <>
      <UserContext.Provider value={{ name1: {}, blogName1: "Attila" }}>
        <Component {...pageProps} />
        <Toaster />
      </UserContext.Provider>
    </>
  );
}

export default MyApp;

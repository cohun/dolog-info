import Head from "next/head";
import Image from "next/image";
import { auth, provider } from "../../lib/firebaseConfig";
import { useState } from "react";
import { signOut } from "firebase/auth";
import { onAuthStateChanged } from "firebase/auth";
import { useRouter } from "next/router";
import Navbar from "../../components/Navbar";

const UserProfilePage = () => {
  const router = useRouter();

  const [name, setName] = useState(null);
  onAuthStateChanged(auth, (user) => {
    if (user) {
      setName(user.email);
      console.log(user);
    } else {
      setName(null);
    }
  });

  const SignOutButton = () =>
    signOut(auth)
      .then(() => {
        console.log("Signed out");
        user = {};
        router.push("/login");
        // Sign-out successful.
      })
      .catch((error) => {
        // An error happened.
      });
  return (
    <div>
      <Navbar></Navbar>
      <div>UserProfilePage </div>;<div>Hello {name}</div>
      <button onClick={SignOutButton}>Kijelentkezés</button>
    </div>
  );
};

export default UserProfilePage;

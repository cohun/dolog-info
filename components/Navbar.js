import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { UserContext } from "../lib/context";
import { useContext } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../lib/firebaseConfig";
import { signOut } from "firebase/auth";
import { useRouter } from "next/router";

const Navbar = () => {
  const router = useRouter();
  const [name, setName] = useState(null);
  onAuthStateChanged(auth, (user) => {
    if (user) {
      setName(user);
    } else {
      setName(null);
    }
  });
  const SignOutButton = () =>
    signOut(auth)
      .then(() => {
        console.log("Signed out");
        setName(null);
        router.push("/");
        // Sign-out successful.
      })
      .catch((error) => {
        // An error happened.
      });
  return (
    <nav
      className={
        name
          ? "navbar is-spaced has-background-black-ter has-shadow"
          : "navbar is-spaced "
      }
      role="navigation"
      aria-label="main navigation"
    >
      <button
        className="button is-large is-success is-outlined"
        style={{ background: "black" }}
      >
        <Link className="navbar-brand" href="/">
          <Image
            className=""
            src="/DologInfo.png"
            alt="logo"
            width="50"
            height="44"
          />
        </Link>

        <div id="navbarBasicExample" className="navbar-menu">
          <div className="navbar-start">
            <Link className="navbar-item" href="/">
              <a className="">
                <Image
                  className="mt-2"
                  src="/dolog.png"
                  alt="Dolog"
                  width="180"
                  height="51"
                />
              </a>
            </Link>
          </div>
        </div>
      </button>

      <div className="navbar-end">
        <div className="navbar-item">
          <div className="buttons">
            {!name && (
              <Link href="/register">
                <a className="button has-background-warning">
                  <strong>Regisztráció</strong>
                </a>
              </Link>
            )}

            {name && (
              <Link href="/home">
                <a className="button has-background-primary-dark">
                  Bejegyzések
                </a>
              </Link>
            )}

            {name && (
              <div onClick={SignOutButton}>
                <a className="button has-background-danger-dark is-hovered">
                  Kijelentkezés
                </a>
              </div>
            )}
            {!name && (
              <Link href="/login">
                <a className="button has-background-primary-dark">
                  Bejelentkezés
                </a>
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

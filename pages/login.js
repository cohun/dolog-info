import styles from "../styles/Home.module.css";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { auth, provider } from "../lib/firebaseConfig";
import { useState, useEffect } from "react";
import { signInWithPopup, signOut } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import { useRouter } from "next/router";
import Navbar from "../components/Navbar";
import LogInForm from "../components/LogInForm";
import toast from "react-hot-toast";
import CreateUsername from "../components/CreateUsername";

function SignOutButton(params) {}

function UsernameForm(params) {}

const blogNameButton = () => {
  toast.error("Jelentkezz be először a Google fiókodba!");
};

const Login = () => {
  const router = useRouter();
  const [blogName, setBlogName] = useState("Attila");
  const [user, setUser] = useAuthState(auth);
  useEffect(() => {
    console.log(user);
  }, [user]);

  const SignInButton = async () => {
    const result = await signInWithPopup(auth, provider)
      .then((result) => {
        // The signed-in user info.
        const user = result.user;
        // ...
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        toast.error(errorMessage);
        toast.error(errorCode);
        // ...
      });
    console.log(result);
    if (blogName) {
      router.push("/home");
    }
  };

  const [isActive, setIsActive] = useState(false);
  const show = () => setIsActive(!isActive);

  return (
    <div className={styles.container}>
      <Head>
        <title>DoLog Info</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="panel">
        <section className="panel-block hero is-black is-fullheight">
          <Image
            src="/dolog_background.jpg"
            className="is-fullwidth"
            alt="background"
            layout="fill"
          ></Image>
          <div className="hero-head">
            {!isActive ? (
              <Navbar></Navbar>
            ) : (
              <button
                className="button is-large is-success is-outlined m-5"
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
            )}
          </div>
          <div className="container"></div>
          <div className="container is-black is-dark pt-6 mb-0">
            <article className="message is-success">
              <div className="message-header is-justify-content-center">
                <p className="title has-text-black">Figyelem!</p>
              </div>
              <div className="message-body has-background-dark has-text-light">
                Ha már van fiókod, jelentkezz be email címmel és jelszóval, vagy
                egyszerűen használd <strong>Google fókodat</strong> és adj meg
                egy
                <strong className="has-text-warning">
                  {" "}
                  felhasználó nevet{" "}
                </strong>
                , amellyel azonosítod a bejegyzéseidet.
              </div>
            </article>
          </div>

          <div className="hero-body">
            <div className="container">
              <div className="columns is-justify-content-center">
                <div className="column ">
                  <button
                    className="button is-success is-outlined is-large mt-4"
                    onClick={SignInButton}
                  >
                    <span className="mt-2">
                      <Image
                        src="/Google_Logo.svg"
                        alt="logo"
                        width="110"
                        height="44"
                      />
                    </span>
                    <span>Google fiókkal</span>
                  </button>
                  <div className="section mt-2">
                    <figure className="">
                      <p className="image is-48x48">
                        <Image
                          src="/plus.png"
                          alt="plus"
                          width={48}
                          height={48}
                        />
                      </p>
                    </figure>
                  </div>
                  {user ? <CreateUsername></CreateUsername> : null}

                  <button
                    onClick={blogNameButton}
                    className="button is-warning is-outlined is-large mt-3"
                  >
                    <span className="mt-2 mx-5">
                      <Image
                        src="/anonymous.png"
                        alt="logo"
                        width="60"
                        height="44"
                      />
                    </span>
                    <span> Felhasználó név</span>
                  </button>
                </div>
                <div className="column mt-5 is-narrow">
                  <span className="">
                    <Image src="/or.png" alt="logo" width="60" height="44" />
                  </span>
                </div>
                <div className="column is-6-tablet is-5-desktop is-5-widescreen is-5-fullhd">
                  <button
                    className="button is-success is-outlined is-large mt-4 ml-3"
                    onClick={show}
                  >
                    <span className="mt-2">
                      <Image
                        src="/email1.png"
                        alt="logo"
                        width="50"
                        height="50"
                      />
                    </span>
                    <span className="ml-5"> Email- és jelszóval</span>
                  </button>

                  {/* <div className="panel-heading has-background-black mb-3">
                    <h1 className="is-size-3 has-text-success">
                      Email és jelszóval
                    </h1>
                  </div> */}
                  {isActive ? <LogInForm></LogInForm> : null}
                </div>
                <div className="column"></div>
              </div>
            </div>
          </div>
          <div className="container"></div>
          <div className="container"></div>
        </section>
      </main>
    </div>
  );
};

export default Login;

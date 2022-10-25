import styles from "../styles/Home.module.css";
import Head from "next/head";
import Image from "next/image";
import { auth, provider } from "../lib/firebaseConfig";
import { useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { useRouter } from "next/router";
import Navbar from "../components/Navbar";

function SignOutButton(params) {}

function UsernameForm(params) {}

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [checked, setChecked] = useState(false);
  const router = useRouter();

  const onCheckboxClick = () => {
    setChecked(!checked);
  };

  const SignInButton = () =>
    signInWithPopup(auth, provider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.

        // The signed-in user info.
        const user = result.user;
        console.log(user.uid);
        console.log(user.displayName);
        router.push("/home");
        // ...
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        // ...
        console.log(errorCode);
      });

  const SignOutButton = () =>
    signOut(auth)
      .then(() => {
        console.log("Signed out");
        // Sign-out successful.
      })
      .catch((error) => {
        // An error happened.
      });

  // TODO: Change this to sugnIn !!!
  const signUp = () => {
    createUserWithEmailAndPassword(auth, email, password)
      .then(() => {
        // Signed in
        router.push("/home");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        // ..
      });
  };

  return (
    <div className={styles.container}>
      {/*    {user ? (
        !username ? (
          <UsernameForm />
        ) : (
          <SignOutButton />
        )
      ) : (
        <SignInButton />
      )} */}
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
            <Navbar></Navbar>
          </div>
          <div className="container"></div>
          <div className="container is-black is-dark pt-6 mb-0">
            <article className="message is-success">
              <div className="message-header">
                <p className="has-text-black">Figyelem!</p>
              </div>
              <div className="message-body has-background-dark has-text-light">
                Ha már van fiókod, jelentkezz be email címmelel és jelszóval,
                vagy használd <strong>Google fókodat</strong>
              </div>
            </article>
          </div>

          <div className="hero-body">
            <div className="container">
              <div className="columns is-justify-content-center">
                <div className="column mt-6">
                  <button
                    className="button is-success is-outlined is-large mt-6"
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
                  <button className="button is-warning is-outlined is-large mt-6">
                    <span className="mt-2 mx-5">
                      <Image
                        src="/anonymous.png"
                        alt="logo"
                        width="60"
                        height="44"
                      />
                    </span>
                    <span> Anoním módon</span>
                  </button>
                </div>
                <div className="column is-6-tablet is-5-desktop is-4-widescreen is-4-fullhd">
                  <div className="panel-heading has-background-black mb-3">
                    <h1 className="title has-text-success">Bejelentkezés</h1>
                  </div>
                  <form
                    method="POST"
                    action=""
                    className="box p-5 has-background-dark has-text-grey-light"
                    encType="multipart/form-data"
                  >
                    <label className="is-block mb-4">
                      <span className="is-block mb-2">Email cím</span>
                      <input
                        required
                        name="email"
                        type="email"
                        className="input has-background-dark has-text-light"
                        placeholder="joe.bloggs@example.com"
                        onChange={(event) => setEmail(event.target.value)}
                        value={email}
                      />
                    </label>

                    <label className="is-block mb-4">
                      <span className="is-block mb-2">Jelszó</span>
                      <input
                        autoComplete="current-password webauthn"
                        name="password"
                        type="password"
                        className="input has-background-dark has-text-light"
                        minLength="6"
                        placeholder="(must be 6+ chars)"
                        required
                        onChange={(event) => setPassword(event.target.value)}
                        value={password}
                      />
                    </label>

                    <div className="mb-4">
                      <label>
                        <input
                          name="tos"
                          value="yes"
                          type="checkbox"
                          required
                          onClick={onCheckboxClick}
                        />
                        <span> Emlékezz rám!</span>
                      </label>
                    </div>

                    <div className="mb-4">
                      <button
                        type="submit"
                        className="button is-success has-text-black px-4"
                        onClick={signUp}
                      >
                        Bejelentkezés
                      </button>
                    </div>

                    <div>
                      <div className="is-size-7 has-text-right">
                        by
                        <span> </span>
                        <a
                          href="https://h-itb.hu"
                          className="has-text-grey-light"
                        >
                          H-ITB
                        </a>
                      </div>
                    </div>
                  </form>
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

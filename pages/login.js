import styles from '../styles/Home.module.css';
import Head from 'next/head';
import Image from 'next/image';
import { auth, provider } from '../lib/firebaseConfig';
import { useState, useEffect } from 'react';
import { signInWithPopup, signOut } from 'firebase/auth';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useRouter } from 'next/router';
import Navbar from '../components/Navbar';
import LogInForm from '../components/LogInForm';

function SignOutButton(params) {}

function UsernameForm(params) {}

const Login = () => {
  const router = useRouter();

  const [user, setUser] = useAuthState(auth);
  useEffect(() => {
    console.log(user);
  }, [user]);

  const SignInButton = async () => {
    const result = await signInWithPopup(auth, provider);
    console.log(result);
    router.push('/home');
  };

  const [isActive, setIsActive] = useState(true);
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
            <Navbar></Navbar>
          </div>
          <div className="container"></div>
          <div className="container is-black is-dark pt-6 mb-0">
            <article className="message is-success">
              <div className="message-header is-justify-content-center">
                <p className="title has-text-black">Figyelem!</p>
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
                  <button className="button is-warning is-outlined is-large mt-3">
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
                <div className="column is-6-tablet is-5-desktop is-4-widescreen is-4-fullhd">
                  <button className="button is-success is-outlined is-large mt-4">
                    <span className="mt-2">
                      <Image
                        src="/email1.png"
                        alt="logo"
                        width="80"
                        height="80"
                      />
                    </span>
                    <span className="ml-6"> Email és jelszó használatával</span>
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

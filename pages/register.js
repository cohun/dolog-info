import styles from '../styles/Home.module.css';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import Navbar from '../components/Navbar';
import SignUpForm from '../components/SignUpForm';
import CreateUsername from '../components/CreateUsername';

import { useState } from 'react';

const Register = () => {
  const [isName, setName] = useState(false);
  const onSetName = () => setName(!isName);
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
            {!isName ? (
              <Navbar></Navbar>
            ) : (
              <button
                className="button is-large is-success is-outlined m-5"
                style={{ background: 'black' }}
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
            <article className="message is-warning">
              <div className="message-header is-justify-content-center">
                <p className="has-text-black title">Figyelem!</p>
              </div>
              <div className="message-body has-background-dark has-text-light">
                Amennyiben még nem regisztráltál, hozz létre egy új fiókot email
                címmelel és jelszóval, majd adj meg egy
                <strong className="has-text-warning">
                  {' '}
                  felhasználó nevet{' '}
                </strong>
                , amellyel azonosítod a bejegyzéseidet.
              </div>
            </article>
          </div>

          <div className="hero-body">
            <div className="container">
              <div className="columns is-justify-content-center">
                <div className="column is-6-tablet is-5-desktop is-4-widescreen is-3-fullh">
                  <div className="panel-heading has-background-black mb-3">
                    <h1 className="title has-text-warning">Fiók létrehozása</h1>
                  </div>
                  <SignUpForm></SignUpForm>
                  {isName ? (
                    <CreateUsername></CreateUsername>
                  ) : (
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
                  )}
                  <button
                    className="button is-warning is-outlined is-large mt-3"
                    onClick={onSetName}
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

export default Register;

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

const Navbar = () => {
  return (
    <nav
      className="navbar is-spaced"
      role="navigation"
      aria-label="main navigation"
    >
      <button className="button is-success is-outlined is-large">
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
            <Link href="/register">
              <a className="button has-background-warning">
                <strong>Regisztráció</strong>
              </a>
            </Link>
            <Link href="/login">
              <a className="button has-background-primary-dark">
                Bejelentkezés
              </a>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

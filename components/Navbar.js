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
      <div class="navbar-brand">
        <Image
          className=""
          src="/DologInfo.png"
          alt="logo"
          width="78"
          height="40"
        />
      </div>

      <div id="navbarBasicExample" className="navbar-menu">
        <div className="navbar-start">
          <Link className="navbar-item" href="/">
            <a className="">
              <Image
                className="mt-1"
                src="/dolog.png"
                alt="Dolog"
                width="180"
                height="72"
              />
            </a>
          </Link>
        </div>
      </div>

      <div className="navbar-end">
        <div className="navbar-item">
          <div className="buttons">
            <Link href="/register">
              <a className="button has-background-warning">
                <strong>Sign up</strong>
              </a>
            </Link>

            <a className="button has-background-primary-dark">Log in</a>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

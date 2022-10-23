import Head from 'next/head';
import Image from 'next/image';
import styles from '../styles/Home.module.css';
import Link from 'next/link';
import Loader from '../components/Loader';
import Navbar from '../components/Navbar';

export default function Home() {
  return (
    <div>
      <Head>
        <title>DoLog Info</title>
        <meta name="description" content="Dolog Info leírása" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <section className="hero is-fullheight">
          <Image
            src="/dolog_background.jpg"
            className="is-fullwidth"
            alt="background"
            layout="fill"
          ></Image>
          <div className="hero-head">
            <Navbar></Navbar>
          </div>

          <div className="hero-body">
            <div className="tile is-ancestor">
              <div className="tile is-vertical is-8">
                <div className="tile">
                  <div className="tile is-parent is-vertical">
                    <article className="tile is-child notification is-warning">
                      <p className="title has-text-success-dark">
                        Azonosítás...
                      </p>
                      <p className="subtitle has-text-black-dark">
                        A dolgok egyedivé tétele
                      </p>
                      <div className="content has-text-black-dark">
                        A dolgok önmaguktól nem jók semmire. Attól vállnak
                        hasznosakká, hogy működtetjük őket. Ehhez kell
                        <ul>
                          <li>
                            egy <strong>adminisztrátor</strong> (rendelkező
                            személy), aki a használatukat illetően intézkedési
                            joggal bír és hozzáférést biztosíthat mások számára,
                          </li>
                          <li>
                            illetve kellenek olyan további releváns információk,
                            amelyek a használathoz nélkülözhetetlenk.
                          </li>
                        </ul>
                      </div>
                    </article>
                    <article className="tile is-child notification is-warning">
                      <p className="title has-text-success-dark">
                        ...felhasználói jogosultságok
                      </p>
                      <p className="subtitle">Használati szabályok</p>
                      <div className="content has-text-black-dark">
                        A dolgok használatát célszerű leszabályozni. Ehhez
                        szükség van egy <strong>adminisztrátorra</strong>{' '}
                        (rendelkező személy), aki a használatukat illetően
                        intézkedési joggal bír és hozzáférést biztosíthat mások
                        számára:
                        <ul>
                          <li>ki jogosult használni?</li>
                          <li>milyen minőségben?</li>
                          <li>hol?</li>
                          <li>mikor, mennyi ideig?</li>
                        </ul>
                      </div>
                    </article>
                  </div>
                  <div className="tile is-parent">
                    <article className="tile is-child notification has-background-black-ter">
                      <div className="content">
                        <p className="title has-text-warning">Értesítések...</p>
                        <p className="subtitle">
                          Azonnali infók minden felhasználónak
                        </p>
                        <div className="content">dhjsfhsdjfaj</div>
                      </div>
                    </article>
                  </div>
                </div>
                <div className="tile is-parent">
                  <article className="tile is-child notification is-danger">
                    <p className="title">...hibaüzenetek</p>
                    <p className="subtitle">...akkor és ahol keletkeznek</p>
                    <div className="content"></div>
                  </article>
                </div>
              </div>
              <div className="tile is-parent">
                <article className="tile is-child notification has-background-black-ter">
                  <div className="columns is-gapless is-multiline is-mobile">
                    <Image
                      className="column"
                      src="/DologInfo.png"
                      alt="logo"
                      width="44"
                      height="44"
                    />
                    <Image
                      className="column"
                      src="/dolog.png"
                      alt="logo"
                      width="110"
                      height="44"
                    />
                    <p className="title has-text-warning ml-5 column">Info</p>
                  </div>

                  <p className="subtitle">Használd és naplózz...</p>
                  <div className="content">
                    Dolog.info lehetővé teszi, hogy minden dolognak legyen egy
                    egyértelmű, mindenki által látható rendelkezője. A
                    rendelkező aki jogosultságokat rendelhet emberekhez, akik
                    információkat csatolhatnak, mely információk a dolgok életét
                    végigkísérik és azoknak elválaszthatatlan részét képezik.
                    kellenek olyan további releváns információk, amelyek a
                    használathoz nélkülözhetetlenk.
                  </div>
                </article>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

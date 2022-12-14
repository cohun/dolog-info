import Head from 'next/head';
import Image from 'next/image';
import styles from '../styles/Home.module.css';
import Link from 'next/link';
import Loader from '../components/Loader';
import Navbar from '../components/Navbar';
import { useContext, useEffect, useState } from 'react';
import { UserContext } from '../lib/context';
import UserProfile from '../components/UserProfile';
import { collection, query, where, onSnapshot } from 'firebase/firestore';
import { db } from '../lib/firebaseConfig';

export default function Home() {
  const { user, username } = useContext(UserContext);
  const [companies, setCompanies] = useState([]);
  const [address, setAddress] = useState([]);

  useEffect(() => {
    const companiesRef = collection(db, 'companies');
    const q = query(companiesRef, where('users', 'array-contains', username));

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const comp = [];
      const addr = [];
      querySnapshot.forEach((doc) => {
        comp.push(doc.id);
        addr.push(doc.data().address);
      });
      setCompanies(comp);
      setAddress(addr);

      return unsubscribe;
    });
  }, [username]);

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
            priority={true}
          ></Image>

          <div className="hero-head">
            <Navbar></Navbar>
          </div>
          {username ? (
            <UserProfile
              username={username}
              companies={companies}
              address={address}
            />
          ) : (
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
                          NFC chip-el vagy QR kóddal beazonosított dolgok a
                          rájuk egyedileg jellemző információkat is hordozzák.
                        </div>
                      </article>
                      <article className="tile is-child notification is-warning">
                        <p className="title has-text-success-dark">
                          ...felhasználói jogosultságok
                        </p>
                        <p className="subtitle">Használati szabályok</p>
                        <div className="content has-text-black-dark">
                          Az egyedi dolgok felelőse az{' '}
                          <strong>adminisztrátor</strong> (rendelkező személy),
                          aki a használatot illetően intézkedési joggal bír és
                          hozzáférést biztosít mások számára arról, hogy:
                          <ul>
                            <li>ki és milyen minőségben jogosult használni?</li>
                            <li>hol, mikor, mennyi ideig?</li>
                          </ul>
                        </div>
                      </article>
                    </div>
                    <div className="tile is-parent">
                      <article className="tile is-child notification has-background-black-ter">
                        <div className="content">
                          <p className="title has-text-warning">
                            Értesítések...
                          </p>
                          <p className="subtitle has-text-warning-dark">
                            Azonnali infók minden felhasználónak
                          </p>
                          <div className="content has-text-warning">
                            A dolog egyedi azonosítója alapján
                            <ul>
                              <li>
                                a <strong>tulajdonos</strong> naprakész
                                informácókat tud kapni a dolog állapotáról.
                              </li>
                              <li>
                                az <strong>üzemeltető</strong> naprakész
                                információkat tud kapni a használattal
                                összefüggésben.
                              </li>
                            </ul>
                            <div></div>
                            Természetesen archív adatok is elérhetőek.
                          </div>
                        </div>
                      </article>
                    </div>
                  </div>
                  <div className="tile is-parent">
                    <article className="tile is-child notification has-background-danger-dark">
                      <p className="title has-text-black">...hibaüzenetek</p>
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
                        width="40"
                        height="40"
                      />
                      <Image
                        className="column"
                        src="/dolog.png"
                        alt="logo"
                        width="120"
                        height="40"
                      />
                      <p className="title has-text-warning ml-5 column">Info</p>
                    </div>

                    <p className="subtitle has-text-warning-dark">
                      Használd és naplózz...
                    </p>
                    <div className="content has-text-warning">
                      Használata lehetővé teszi, hogy minden dolog egyértelműen
                      beazonosítható legyen és mindenki, akinek dolga van vele
                      egyértelmű jogosultságok mentén tudjon információkat
                      feltölteni, amelyek a dolog elválaszhatatlan részeivé
                      válnak.
                      <div>
                        A felhelyezett chip, vagy QR kód segítségével a
                        jogosultsággal rendelkező a mobiltelefonjával tud
                        kommunikációt kezdeményezni. Ilyenkor létrejön egy
                        naplóbejegyzés pontos időponttal és a mobiltelefonra
                        küldött kóddal. Később a kód birtokában lehet további
                        bejegyzéseket, fájlokat feltölteni az adott időponthoz.
                        Ezek a feltöltött információk mindenki számára azonnal
                        olvashatóvá válnak.
                      </div>
                      <div>
                        Általános nem időpobthoz kötött információk a
                        jogosultság függvényében szintén bármikor feltölthetőek.
                      </div>
                    </div>
                  </article>
                </div>
              </div>
            </div>
          )}
          <div className="container"></div>
          <div className="hero-foot"></div>
        </section>
      </main>
    </div>
  );
}

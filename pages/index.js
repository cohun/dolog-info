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
                        <p className="title has-text-success-dark">Dolog...</p>
                        <p className="subtitle has-text-black-dark has-text-weight-bold">
                          Az anyagi világ bármely önálló része, ami
                          meghatározott tulajdonságokkal rendelkezik és így
                          elkülöníthető egy másik hasonlótól.
                        </p>
                        <div className="content has-text-black-dark">
                          A dolgok hasznosságát fizikai valóságuk és a hozzájuk
                          kapcsolt információk határozzák meg. A dolgok
                          beazonosítását, információk gyűjtését, megörzését,
                          elérhetőségét biztosítja a DoLog Info.
                        </div>
                      </article>
                      <article className="tile is-child notification is-warning">
                        <p className="title has-text-success-dark">
                          ...felhasználói jogosultságok
                        </p>
                        <div className="content has-text-black-dark">
                          A dolog tulajdonosa vagy a tulajdonos képviselője az
                          <strong> adminisztrátor</strong> (rendelkező személy),
                          aki a dolog használatát illetve a dologhoz kapcsolt
                          információ-folyam elérhetőségét biztosítja mások
                          számára.
                        </div>
                      </article>
                    </div>
                    <div className="tile is-parent">
                      <article className="tile is-child notification has-background-black-ter">
                        <div className="content">
                          <p className="title has-text-warning">
                            Információ a dolog fizikai tulajdonságain túl...
                          </p>
                          <p className="subtitle has-text-warning-dark">
                            Azonnali infók minden felhasználónak
                          </p>
                          <div className="content has-text-warning">
                            A dolog QR-kódja alapján minden jogosult felhasználó
                            képes információkat feltölteni, illetve kiolvasni az
                            adott dologgal kapcsolatban. Így
                            <ul>
                              <li>
                                a <strong>tulajdonos</strong> naprakész
                                informácókat tud kapni a dolog állapotáról,
                              </li>
                              <li>
                                a <strong>felhasználók</strong> a biztonságos és
                                hatékony használathoz nélkülözhetetlen
                                információkat kapnak folyamatosan
                              </li>
                            </ul>
                            <div></div>
                            Továbbá minden fontos adat archíválódik és szükség
                            esetén könnyen elérhető.
                          </div>
                        </div>
                      </article>
                    </div>
                  </div>
                  <div className="tile is-parent">
                    <article className="tile is-child notification has-background-danger-dark">
                      <p className="title has-text-black">
                        ...figyelmeztetések, hibaüzenetek
                      </p>
                      <p className="subtitle">
                        ...azonnal, minden felhasználó részére elérhető
                        információ a dolog biztonságos használatával
                        kapcsolatban
                      </p>
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
                      <div className="block">
                        Használata lehetővé teszi, hogy minden dolog
                        egyértelműen beazonosítható legyen és mindenki, akinek
                        dolga van vele információkat (bejegyzések, fájlok)
                        tudjon feltölteni hozzá.
                      </div>

                      <div className="block">
                        Nem csak az informácó, hanem annak forrása és időpontja
                        is a dolog elválaszhatatlan részeivé válnak.
                      </div>
                      <div className="block">
                        A dolog egyedi azonosítója révén (felhelyezett chip,
                        vagy QR kód) a jogosultsággal rendelkezők webes
                        kapcsolatba léphetnek a dologgal és valamennyi
                        feltöltött információt azonnal kiolvashatnak.
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

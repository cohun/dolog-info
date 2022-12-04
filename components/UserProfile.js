import { query, where } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { getHashWhereAdmin } from '../lib/firebaseConfig';
import CompanyAdmin from './CompanyAdmin';
import HashingForm from './hashing';

const UserProfile = ({ username, companies, address }) => {
  const [isActive, setIsactive] = useState(false);
  const [adminHash, setAdminHash] = useState([]);
  const [target, setTarget] = useState('');
  const [hash, setHash] = useState('');

  const getCompany = (comp, addr) => {
    let compa = '';
    let addre = '';
    let content = [];
    for (let i = 0; i < comp.length; i++) {
      compa = comp[i];
      addre = addr[i];
      let hash = '';

      if (adminHash.length >= 1) {
        adminHash.forEach((element) => {
          if (element.company === compa) {
            hash = element.hash;
          }
        });
      }

      content.push(
        <div className="column mx-1" key={i}>
          <div
            className={
              isActive
                ? 'button is-large is-one-fifth is-primary is-outlined mt-5 is-focused'
                : 'columns button is-large is-one-fifth  is-primary has-text-warning is-outlined mt-5'
            }
            onClick={(i) => {
              setTarget(i.target.innerHTML);
              setHash(hash);
            }}
          >
            <div className="tile has-text-centered">{compa}</div>
          </div>

          {hash === '' ? (
            <div className="">
              <div className="card subtitle is-6 has-text-white has-background-danger-dark p-1">
                Cím: {addre}
                <div className="navbar-divider"></div>
                <div>Jelenleg elbírálás alatt...</div>
              </div>
            </div>
          ) : (
            <div className="card subtitle is-6 has-text-white has-background-info-dark p-1">
              Cím: {addre}
              <div className="navbar-divider"></div>
              <div>
                Belépési kód:{' '}
                <strong className="has-text-warning-light">{hash}</strong>{' '}
              </div>
            </div>
          )}
        </div>
      );
    }
    content.push(
      <div className="column">
        <button
          className="button is-large is-one-fifth has-background-primary-dark is-outlined mt-5"
          onClick={onHashingForm}
        >
          Új cég felvétel
        </button>
      </div>
    );

    return content;
  };

  function onHashingForm() {
    setIsactive(true);

    return HashingForm;
  }

  function AddNewCompany(username) {
    return (
      <button
        onClick={onHashingForm}
        className="button is-medium is-primary is-outlined"
      >
        Új cég felvétel
      </button>
    );
  }

  async function AdminHash() {
    const admin = await getHashWhereAdmin(username);

    setAdminHash(admin);
    return adminHash;
  }

  useEffect(() => {
    AdminHash();
  }, [username, companies]);

  useEffect(() => {
    setIsactive(false);
  }, [companies.length]);

  return (
    <div>
      {target != '' ? (
        <CompanyAdmin
          username={username}
          target={target}
          hash={hash}
          setTarget={setTarget}
        ></CompanyAdmin>
      ) : (
        <div>
          {!isActive ? (
            <div>
              <div className="section is-info">
                <div className="columns is-centered ">
                  <h3 className="card column is-half title has-text-centered has-background-primary-dark">
                    <strong className="is-capitalized has-text-darker">
                      Helló{' '}
                    </strong>
                    <strong className="is-capitalized has-text-warning">
                      {username}!{' '}
                    </strong>
                    {companies.length != 0 ? (
                      <div className="subtitle has-text-dark">
                        az alábbi tulajdonosok dolgaihoz van hozzáférésed:{' '}
                        <div className="is-5 has-text-dark">
                          (ahol kód megjelenik, ott admin vagy.)
                        </div>
                      </div>
                    ) : (
                      <div className="subtitle">
                        Még nincs hozzáférésed egyetlen céghez sem.{' '}
                      </div>
                    )}
                  </h3>
                </div>
              </div>
              <div className="section mx-6">
                <div className="box mx-6">
                  <div className="columns is-desktop is-centered is-12 ">
                    {companies.length != 0
                      ? getCompany(companies, address)
                      : AddNewCompany(username)}
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <HashingForm username={username} setIsactive={setIsactive} />
          )}
        </div>
      )}
    </div>
  );
};

export default UserProfile;

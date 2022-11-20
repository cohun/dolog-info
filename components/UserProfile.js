import { query, where } from 'firebase/firestore';
import { useEffect, useState } from 'react';

const UserProfile = ({ username, companies }) => {
  console.log(companies);
  const [isActive, setIsactive] = useState(false);

  const getCompany = (comp) => {
    console.log('length', comp.length);
    let compa = '';
    let content = [];
    for (let i = 0; i < comp.length; i++) {
      compa = comp[i];
      content.push(
        <div
          className={
            isActive
              ? 'button is-large is-info is-outlined mr-6 is-focused'
              : 'button is-large is-info is-outlined mr-6 '
          }
          onClick={(i) => console.log(i.target)}
        >
          {console.log(compa)}
          {compa}
        </div>
      );
    }
    return content;
  };

  function AddNewCompany(username) {
    console.log('ttttttttt');
    return (
      <button className="button is-medium is-primary is-outlined">
        Új cég felvétel
      </button>
    );
  }

  useEffect(() => {
    console.log('wwwww', companies);
  }, [companies.length]);

  return (
    <div>
      <div className="section is-info">
        <div className="columns is-centered ">
          <h3 className="card column is-half title has-text-centered has-background-primary">
            <strong className="is-capitalized">Helló {username}! </strong>
            {companies.length != 0 ? (
              <div className="subtitle">
                az alábbi tulajdonosok dolgaihoz van hozzáférésed:{' '}
              </div>
            ) : (
              <div className="subtitle">
                Még nincs hozááférésed egyetlen céghez sem{' '}
              </div>
            )}
          </h3>
        </div>
      </div>
      <div className="section">
        <div className="">
          <div className="columns is-centered is-8">
            {companies.length != 0
              ? getCompany(companies)
              : AddNewCompany(username)}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;

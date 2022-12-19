import React, { useEffect, useState } from 'react';
import { getAllThingsForACompany } from '../lib/firebaseConfig';

const AddThingsToUser = ({ setUserMarked, who, target }) => {
  const [allThings, setAllThings] = useState([]);

  const getThings = async () => {
    const all = await getAllThingsForACompany(target);
    setAllThings(all);
  };

  useEffect(() => {
    getThings();
  }, [allThings.length]);

  function things() {
    let thingsArray = [''];
    for (let index = 0; index < allThings.length; index++) {
      thingsArray.push(
        <div key={index}>
          <strong className="">{allThings[index].id}</strong>
          <span> - </span>
          <span className="has-text-link-dark">
            {allThings[index].description}
          </span>
          <span>
            <label className="checkbox">
              <input name="tos" value="yes" type="checkbox" required />
              Remember me
            </label>
          </span>

          <div className="box has-background-warning py-1"></div>
        </div>
      );
    }
    return thingsArray;
  }

  return (
    <div className="section is-info">
      <div className="columns is-centered ">
        <form>
          <div className="modal-card">
            <header className="modal-card-head">
              <p className="modal-card-title">
                {' '}
                {who} felhasználót választottad. :
              </p>
              <button
                onClick={() => setUserMarked(false)}
                className="delete"
                aria-label="close"
              ></button>
            </header>
            <section className="modal-card-body">{things()}</section>
            <footer className="modal-card-foot">
              <button type="submit" className="button is-success">
                Mentés
              </button>
              <button className="button">Vissza</button>
              <button type="submit" className="button is-danger is-outlined">
                Felhasználó törlése
              </button>
            </footer>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddThingsToUser;

import React, { useEffect, useState } from 'react';
import {
  getAllThingsForACompany,
  getThingsId,
  updateThingsId,
} from '../lib/firebaseConfig';

const AddThingsToUser = ({ setUserMarked, who, target }) => {
  const [allThings, setAllThings] = useState([]);
  const [thingsId, setThingsId] = useState([]);

  const getThings = async () => {
    const all = await getAllThingsForACompany(target);
    setAllThings(all);
  };
  const getIds = async () => {
    const ids = await getThingsId(target, who);
    setThingsId(ids.thingsId);
  };

  const updateThings = async (id, checked) => {
    await updateThingsId(target, who, checked, id);
    await getIds();
  };

  useEffect(() => {
    getThings();
    getIds();
  }, [allThings.length]);

  function things() {
    let thingsArray = [''];
    let checkedArray = [];
    allThings.forEach(() => checkedArray.push(false));
    for (let index = 0; index < allThings.length; index++) {
      if (thingsId?.includes(allThings[index].id)) {
        checkedArray[index] = true;
      } else {
        checkedArray[index] = false;
      }

      thingsArray.push(
        <tr key={index}>
          <td>{allThings[index].id}</td>
          <td>{allThings[index].description}</td>
          <td>
            <label className="checkbox">
              <input
                name="tos"
                value={allThings[index].id}
                type="checkbox"
                checked={checkedArray[index]}
                onClick={(e) => {
                  e.preventDefault();
                  updateThings(allThings[index].id, e.target.checked);
                }}
              />
            </label>
            {checkedArray[index] ? <span> igen</span> : <span> nem</span>}
          </td>
        </tr>
      );
    }

    return (
      <div class="table-container">
        <table class="table is-bordered is-striped is-narrow is-hoverable is-fullwidth">
          <table class="table">
            <thead>
              <tr>
                <th>Azonosító</th>
                <th>Megnevezés</th>
                <th>Hozzáférés</th>
              </tr>
            </thead>
            <tbody>{thingsArray}</tbody>
          </table>
        </table>
      </div>
    );
  }

  return (
    <div className="section is-info">
      <div className="columns is-centered ">
        <form>
          <div className="modal-card">
            <header className="modal-card-head">
              <p className="modal-card-title">
                {' '}
                <span className="has-background-warning-dark has-text-white">
                  {who}
                </span>
                <span> </span>
                felhasználó hozzáférései:
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
              <button className="button" onClick={() => setUserMarked(false)}>
                Vissza
              </button>
              <button type="submit" className="button is-danger is-outlined">
                Összes hozzáférés törlése
              </button>
            </footer>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddThingsToUser;

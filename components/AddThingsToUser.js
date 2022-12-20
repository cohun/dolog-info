import React, { useEffect, useState } from "react";
import { getAllThingsForACompany } from "../lib/firebaseConfig";

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
    let thingsArray = [""];
    for (let index = 0; index < allThings.length; index++) {
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
                required
                onClick={(e) => console.log(e.target.value)}
              />
            </label>
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
                {" "}
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

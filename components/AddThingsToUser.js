import React from 'react';

const AddThingsToUser = ({ setUserMarked }) => {
  return (
    <div className="section is-info">
      <div className="columns is-centered ">
        <form>
          <div className="modal-card">
            <header className="modal-card-head">
              <p className="modal-card-title">
                {' '}
                {chosen} felhasználót választottad. Az alábbi dolgokhoz férhet
                hozzá:
              </p>
              <button
                onClick={() => setUserMarked(false)}
                className="delete"
                aria-label="close"
              ></button>
            </header>
            <section className="modal-card-body">
              <input
                className="input is-primary"
                type="text"
                placeholder="Felhasználó név"
                name="role"
              />
            </section>
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

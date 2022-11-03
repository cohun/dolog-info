import { useState } from 'react';

const CreateUsername = () => {
  const [isActive, setIsActive] = useState('is-active');
  const show = () => {
    setIsActive('');
  };
  return (
    <div className={`modal ${isActive}`}>
      <div className="modal-background"></div>
      <div className="modal-card">
        <header className="modal-card-head">
          <p className="modal-card-title">Kérem a felhasználó nevet</p>
          <button
            onClick={() => setIsActive('')}
            className="delete"
            aria-label="close"
          ></button>
        </header>
        <section className="modal-card-body">
          <input
            className="input is-primary"
            type="text"
            placeholder="Felhasználó név"
          />
        </section>
        <footer className="modal-card-foot">
          <button onClick={show} className="button is-success">
            Mentés
          </button>
          <button onClick={show} className="button">
            Vissza
          </button>
        </footer>
      </div>
    </div>
  );
};

export default CreateUsername;

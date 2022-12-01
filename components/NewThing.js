import React, { useState } from 'react';

const NewThing = ({ target, setIsNew }) => {
  const [name, setName] = useState('');

  const show = () => {
    setIsNew(false);
  };
  const onChange = (e) => {
    const val = e.target.value.toLowerCase();

    setName(val);
  };
  const onSubmit = () => {
    console.log('sss');
  };

  return (
    <div>
      <div className="section is-info">
        <div className="columns is-centered ">
          <form onSubmit={onSubmit}>
            <div className="modal-card">
              <header className="modal-card-head">
                <p className="modal-card-title">
                  <span className="ml-3 has-text-info">{target} </span>
                  <span> cégbe új dolog bevitel</span>
                </p>
                <button
                  onClick={() => setIsNew(false)}
                  className="delete"
                  aria-label="close"
                ></button>
              </header>
              <section className="modal-card-body">
                <div className="field">
                  <label className="label">Megnevezés</label>
                  <div className="control">
                    <input
                      className="input is-info"
                      type="text"
                      placeholder="dolog megnevezése"
                      name="role"
                      value={name}
                      onChange={onChange}
                    />
                  </div>
                </div>
              </section>
              <footer className="modal-card-foot">
                <button type="submit" onClick={show} className="button is-info">
                  Mentés
                </button>
                <button onClick={show} className="button">
                  Vissza
                </button>
              </footer>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default NewThing;

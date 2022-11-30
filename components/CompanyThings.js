import React from 'react';

const CompanyThings = ({ target }) => {
  function things() {
    let thingsArray = [''];
    for (let index = 0; index <= 18; index++) {
      thingsArray.push(
        <a className="">
          <div className="tabs is-toggle is-fullwidth">
            <ul className="columns is-gapless">
              <li className="has-background-link-light column">
                <a>
                  <p className="has-text-dark">{index}. Azonosító számsor</p>
                </a>
              </li>
              <li className="has-background-primary-light column is-4">
                <a>
                  <p className="has-text-dark">
                    Megnevezés jgdjslkklsll skldgklfdlkfds lkmskfj
                  </p>
                </a>
              </li>
              <li className="has-background-success-light column is-4">
                <a>
                  <p className="has-text-dark">felhasználás helyszíne</p>
                </a>
              </li>
              <li className="has-background-warning-light column is-3">
                <a>
                  <p className="has-text-dark">
                    Lorem ipsum dolor sit amet consectetur.
                  </p>
                </a>
              </li>
            </ul>
          </div>
        </a>
      );
    }
    return thingsArray;
  }

  return (
    <div className="">
      <div className="section is-info">
        <div className="columns is-centered ">
          <h3 className="card column is-one-third is-size-4 has-text-centered has-background-grey-darker has-text-warning">
            <span>{target} </span>
            <span className="ml-3 has-text-danger-light"> dolgai:</span>
          </h3>
        </div>
      </div>

      <div className="section">
        <div className="card ">
          <div className="">
            <article className="panel is-warning">
              <p className="panel-heading">Dolgok listája</p>
              <p className="panel-tabs">
                <a className="is-active">Mind</a>
                <a>Public</a>
                <a>Private</a>
                <a>Sources</a>
                <a>Forks</a>
              </p>
              <div className="panel-block">
                <p className="control has-icons-left">
                  <input
                    className="input is-warning"
                    type="text"
                    placeholder="Keresés"
                  />
                  <span className="icon is-left">
                    <i className="fas fa-search" aria-hidden="true"></i>
                  </span>
                </p>
              </div>

              <a className="">
                <div className="tabs is-toggle is-fullwidth">
                  <ul className="columns is-gapless">
                    <li className="has-background-link-light column">
                      <a>
                        <strong className="has-text-dark">Azonosító</strong>
                      </a>
                    </li>
                    <li className="has-background-primary-light column is-4">
                      <a>
                        <strong className="has-text-dark has-text-centered">
                          Megnevezés
                        </strong>
                      </a>
                    </li>
                    <li className="has-background-success-light column is-4">
                      <a>
                        <strong className="has-text-dark">
                          felhasználás helyszíne
                        </strong>
                      </a>
                    </li>
                    <li className="has-background-warning-light column is-3">
                      <a>
                        <strong className="has-text-dark">Megjegyzés</strong>
                      </a>
                    </li>
                  </ul>
                </div>
              </a>

              {things()}
            </article>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompanyThings;

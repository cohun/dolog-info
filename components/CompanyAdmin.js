import React, { useEffect, useState } from 'react';
import { getAllUsersInCompany } from '../lib/firebaseConfig';

const CompanyAdmin = ({ username, target, setTarget }) => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    GetUsers();

    console.log('use', users);
  }, [users.length]);

  async function GetUsers() {
    const result = await getAllUsersInCompany(target);
    setUsers(result);
    console.log('use2', users);
  }

  function UsersList() {
    console.log('in: ', users);
    let cList = [];
    users.forEach((user) => {
      cList.push(
        <a className="panel-block is-active">
          <span className="panel-icon">
            <i className="fas fa-book" aria-hidden="true"></i>
          </span>
          {user}
        </a>
      );
    });
    return cList;
  }

  return (
    <div className="">
      <div className="section is-info">
        <div className="columns is-centered ">
          <h3 className="card column is-half title has-text-centered has-background-grey-dark has-text-white">
            <span>{target} </span>
            <span className="ml-3"> jogosultak:</span>
          </h3>
        </div>
      </div>

      <div className="section">
        <div className="container card columns">
          <div className="column is-6">
            <article className="card panel is-info">
              <p className="panel-heading">Felhasználó</p>

              <div className="panel-block"></div>
              {users != [] ? (
                UsersList()
              ) : (
                <a className="panel-block is-active">
                  <span className="panel-icon">
                    <i className="fas fa-book" aria-hidden="true"></i>
                  </span>
                  Nincs felhasználó
                </a>
              )}
            </article>
          </div>
          <div className="column is-6">
            <article className="card panel is-link">
              <p className="panel-heading">Beosztás</p>

              <div className="panel-block"></div>
              <a className="panel-block is-active">
                <span className="panel-icon">
                  <i className="fas fa-book" aria-hidden="true"></i>
                </span>
                bulma
              </a>
              <a className="panel-block">
                <span className="panel-icon">
                  <i className="fas fa-book" aria-hidden="true"></i>
                </span>
                marksheet
              </a>
              <a className="panel-block">
                <span className="panel-icon">
                  <i className="fas fa-book" aria-hidden="true"></i>
                </span>
                minireset.css
              </a>
            </article>
          </div>
        </div>
      </div>

      <div className="section is-info mb-2">
        <div className="columns is-centered ">
          <button
            className="button is-large is-outlined is-danger"
            onClick={() => setTarget('')}
          >
            Vissza
          </button>
        </div>
      </div>
    </div>
  );
};

export default CompanyAdmin;

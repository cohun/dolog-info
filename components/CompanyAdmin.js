import React, { useEffect, useState } from 'react';
import CompanyThings from './CompanyThings';
import Image from 'next/image';
import NewThing from './NewThing';
import toast from 'react-hot-toast';

import AllUsersInCompany from './AllUsersInCompany';
import RoleList from './RoleList';
import { deleteUserFromCompany, updateRole } from '../lib/firebaseConfig';

const CompanyAdmin = ({ username, target, hash, setTarget }) => {
  const [users, setUsers] = useState([]);
  const [roleChange, setRoleChange] = useState('');
  const [who, setWho] = useState('');
  const [isActive, setIsActive] = useState(false);
  const [isNew, setIsNew] = useState(false);
  const [del, setDel] = useState(false);

  const back = () => {
    setDel(false);
    setIsActive(false);
  };
  const show = async (e) => {
    e.preventDefault();
    try {
      await updateRole(target, who, roleChange);
    } catch (error) {
      console.log(error.message);
    }
    setIsActive(false);
  };

  const delUser = async (e) => {
    e.preventDefault();
    setDel(true);
  };
  const delUserFirebase = async (e) => {
    e.preventDefault();
    await deleteUserFromCompany(target, who);
    setDel(false);
  };

  const onSubmit = () => {
    e.preventDefault();
    setIsActive(true);
  };
  const onChange = (e) => {
    const val = e.target.value.toLowerCase();

    setRoleChange(val);
  };

  return (
    <div>
      {isNew ? (
        <NewThing target={target} setIsNew={setIsNew}></NewThing>
      ) : isActive ? (
        <div className="section is-info">
          <div className="columns is-centered ">
            <form onSubmit={onSubmit}>
              <div className="modal-card">
                <header className="modal-card-head">
                  <p className="modal-card-title">
                    {who} felhasználó beosztása
                  </p>
                  <button
                    onClick={() => setIsActive(false)}
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
                    value={roleChange}
                    onChange={onChange}
                  />
                </section>
                <footer className="modal-card-foot">
                  <button
                    type="submit"
                    onClick={(e) => show(e)}
                    className="button is-success"
                  >
                    Mentés
                  </button>
                  <button onClick={back} className="button">
                    Vissza
                  </button>
                  <button
                    type="submit"
                    onClick={(e) => delUser(e)}
                    className="button is-danger is-outlined"
                  >
                    Felhasználó törlése
                  </button>
                </footer>
                {del ? (
                  <footer className="modal-card-foot">
                    <button
                      onClick={(e) => delUserFirebase(e)}
                      className="button is-outlined has-background-danger-dark has-text-white"
                    >
                      Biztosan ki akarod törölni {who} felhasználót?
                    </button>
                  </footer>
                ) : null}
              </div>
            </form>
          </div>
        </div>
      ) : (
        <div className="card hero is-fullheight">
          <Image
            src="/dolog_background.jpg"
            className="is-fullwidth"
            alt="background"
            layout="fill"
            priority={true}
          ></Image>

          <div className="section is-info">
            <div className="columns is-centered ">
              <h3 className="card column is-one-third is-size-4 has-text-centered has-background-grey-darker has-text-warning">
                <span>{target} </span>
                <span className="ml-3 has-text-info-light"> jogosultak:</span>
              </h3>
            </div>
          </div>

          <div className="section">
            <div className="container card columns">
              <div className="column is-6">
                <article className="card panel is-info">
                  <p className="panel-heading">Felhasználó</p>

                  <div className="panel-block"></div>

                  <AllUsersInCompany
                    target={target}
                    setIsActive={setIsActive}
                    hash={hash}
                    setWho={setWho}
                    setUsers={setUsers}
                    username={username}
                  ></AllUsersInCompany>
                </article>
              </div>
              <div className="column is-6">
                <article className="card panel is-link">
                  <p className="panel-heading">Beosztás</p>

                  <div className="panel-block"></div>
                  {users.length != 0 ? (
                    <RoleList
                      users={users}
                      target={target}
                      setIsActive={setIsActive}
                      hash={hash}
                      setWho={setWho}
                      setRoleChange={setRoleChange}
                    ></RoleList>
                  ) : (
                    <a className="panel-block is-active">
                      <span className="panel-icon">
                        <i className="fas fa-book" aria-hidden="true"></i>
                      </span>
                      Nincs jogosoltság hozzárendelve!
                    </a>
                  )}
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
          <CompanyThings
            target={target}
            setIsNew={setIsNew}
            hash={hash}
          ></CompanyThings>
        </div>
      )}
    </div>
  );
};

export default CompanyAdmin;

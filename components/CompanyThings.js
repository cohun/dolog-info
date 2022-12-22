import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { getAllThingsForACompany, getThingsId } from '../lib/firebaseConfig';
import toast from 'react-hot-toast';

const CompanyThings = ({ target, setIsNew, hash, username }) => {
  const [allThings, setAllThings] = useState([]);
  const [thingsId, setThingsId] = useState([]);

  const getThings = async () => {
    const all = await getAllThingsForACompany(target);
    setAllThings(all);
  };
  const getIds = async () => {
    const ids = await getThingsId(target, username);
    if (ids) {
      setThingsId(ids.thingsId);
    } else {
      console.log('Adminisztrátor minden dologhoz hozzáfér');
    }
  };

  useEffect(() => {
    getThings();
    if (username != '') {
      getIds();
    }
  }, [allThings.length]);

  function things() {
    let thingsArray = [''];
    for (let index = 0; index < allThings.length; index++) {
      // if hash === "" if (thingsId?.includes(allThings[index].id))
      if (hash === '' && !thingsId?.includes(allThings[index].id)) {
        console.log(hash, thingsId);
        continue;
      }
      thingsArray.push(
        <div key={index}>
          <div className="box has-background-warning py-1"></div>
          <div className="panel-block">
            <div className="tile is-ancestor">
              <div className="tile is-vertical is-10">
                <div className="tile">
                  <div className="tile is-parent is-vertical is-3">
                    <article className="tile is-child box has-background-warning">
                      <p className="has-text-weight-bold">Azonosító:</p>
                      <p className="subtitle has-text-danger-dark">
                        {allThings[index].id}
                      </p>
                    </article>
                    <article className="tile is-child box">
                      <p className="has-text-weight-bold">Megnevezés:</p>
                      <p className="title has-text-link-dark">
                        {allThings[index].description}
                      </p>
                    </article>
                  </div>
                  <div className="tile is-parent is-vertical is-9">
                    <article className="tile is-child box">
                      <p className="has-text-weight-bold">Helyszín:</p>
                      <p className="subtitle">{allThings[index].site}</p>
                    </article>
                    <article className="tile is-child box">
                      <p className="has-text-weight-bold">Megjegyzés:</p>
                      <p className="subtitle">{allThings[index].remark}</p>
                    </article>
                  </div>
                </div>
              </div>
              <div className="tile is-parent">
                <article className="tile is-child box">
                  <figure className="columns is-centered">
                    <Image
                      src={allThings[index].qrc}
                      alt="qrCode"
                      width={180}
                      height={180}
                    />
                  </figure>
                </article>
              </div>
            </div>
          </div>
          <div className="box has-background-warning py-1"></div>
        </div>
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
          <article className="panel is-warning">
            <p className="panel-heading">Dolgok listája</p>
            <div className="panel-tabs">
              <a className="is-active">
                {hash !== '' ? (
                  <button
                    onClick={() => {
                      setIsNew(true);
                    }}
                    className="button is-focused is-medium is-link is-inverted "
                  >
                    + Új dolog +
                  </button>
                ) : (
                  <div></div>
                )}
              </a>

              <a className="is-active">
                {hash !== '' ? (
                  <button
                    onClick={() => {
                      setIsNew(true);
                    }}
                    className="button is-focused is-medium is-danger is-inverted "
                  >
                    - Dolog törlése -
                  </button>
                ) : (
                  <div></div>
                )}
              </a>
            </div>
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
            {things()}
          </article>
        </div>
      </div>
    </div>
  );
};

export default CompanyThings;

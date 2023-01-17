import React, { useEffect, useState } from "react";
import Image from "next/image";
import { getAllThingsForACompany, getThingsId } from "../lib/firebaseConfig";
import Link from "next/link";

const CompanyThings = ({ target, setIsNew, hash, username }) => {
  const [allThings, setAllThings] = useState([]);
  const [thingsId, setThingsId] = useState([]);
  const [delView, setDelView] = useState(false);

  const getThings = async () => {
    const all = await getAllThingsForACompany(target);
    setAllThings(all);
  };
  const getIds = async () => {
    const ids = await getThingsId(target, username);
    if (ids) {
      setThingsId(ids.thingsId);
    } else {
      console.log("Adminisztrátor minden dologhoz hozzáfér");
    }
  };

  useEffect(() => {
    getThings();
    if (username != "") {
      getIds();
    }
  }, [allThings.length]);

  function things() {
    let thingsArray = [""];
    for (let index = 0; index < allThings.length; index++) {
      // if hash === "" if (thingsId?.includes(allThings[index].id))
      if (hash === "" && !thingsId?.includes(allThings[index].id)) {
        continue;
      }
      thingsArray.push(
        <div key={index}>
          <div className="box has-background-warning py-1"></div>
          <Link
            href={`/${username}/${target}/${allThings[index].id}`}
            className="panel-block"
          >
            <div className="tile is-ancestor">
              <div className="tile is-vertical is-10">
                <div className="tile">
                  <div className="tile is-parent is-vertical is-3">
                    <article className="tile is-child box has-background-info-light">
                      <p className="has-text-weight-bold">Azonosító:</p>
                      <p className="subtitle has-text-danger-dark">
                        {allThings[index].id}
                      </p>
                    </article>
                    <article className="tile is-child box has-background-info-light">
                      <p className="has-text-weight-bold">Megnevezés:</p>
                      <p className="is-size-4 is-underlined has-text-link-dark">
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
          </Link>
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
          <div className="button is-medium has-background-warning has-text-dark has-text-weight-bold">
            {target}{" "}
          </div>
          <h3 className="card pr-3 pt-2 is-size-4 has-text-centered has-background-black has-text-warning">
            <div className="ml-3 has-text-danger-light"> dolgai:</div>
          </h3>
        </div>
      </div>

      <div className="section">
        <div className="card ">
          <article className="panel is-warning">
            <p className="panel-heading">Dolgok listája</p>
            {hash !== "" ? (
              <div className="panel-tabs">
                {delView ? (
                  <a className="is-active">
                    <button
                      onClick={() => {
                        setDelView(false);
                      }}
                      className="button is-focused is-medium is-danger "
                    >
                      Kattints a törlendő dologra!
                    </button>
                  </a>
                ) : (
                  <a className="is-active">
                    <button
                      onClick={() => {
                        setIsNew(true);
                      }}
                      className="button is-focused is-medium is-link is-inverted "
                    >
                      + Új dolog +
                    </button>
                    <span className="block mx-5"> </span>
                    <button
                      onClick={() => {
                        setDelView(true);
                      }}
                      className="button is-focused is-medium is-danger is-inverted "
                    >
                      - Dolog törlése -
                    </button>
                  </a>
                )}
              </div>
            ) : (
              <div></div>
            )}
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

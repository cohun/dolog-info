import React from 'react';
import Image from 'next/image';

const CompanyThings = ({ target, setIsNew }) => {
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
                <a className="is-active">
                  <button
                    onClick={() => {
                      setIsNew(true);
                    }}
                    className="button is-focused is-medium is-link is-inverted "
                  >
                    + Új dolog +
                  </button>
                </a>
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

              {/* <a className="">
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
              </a> */}
              <div className="box has-background-warning py-1"></div>
              <div className="panel-block">
                <div className="tile is-ancestor">
                  <div className="tile is-vertical is-10">
                    <div className="tile">
                      <div className="tile is-parent is-vertical is-4">
                        <article className="tile is-child box">
                          <p className="has-text-weight-bold">Azonosító:</p>
                          <p className="subtitle">DDA123456</p>
                        </article>
                        <article className="tile is-child box">
                          <p className="has-text-weight-bold">Megnevezés:</p>
                          <p className="subtitle">
                            Prosystem alacsony beépítésű konzoldaru
                          </p>
                        </article>
                      </div>
                      <div className="tile is-parent is-vertical is-8">
                        <article className="tile is-child box">
                          <p className="has-text-weight-bold">Helyszín:</p>
                          <p className="subtitle">
                            H-ITB telephelye 1119 Budapest Kelenvölgyi határsor
                            5
                          </p>
                        </article>
                        <article className="tile is-child box">
                          <p className="has-text-weight-bold">Megjegyzés:</p>
                          <p className="subtitle">
                            Lorem ipsum dolor sit amet consectetur adipisicing
                            elit. Natus harum dicta impedit dolor reprehenderit
                            mollitia omnis eos cum! Voluptates id odio commodi
                            eos! Ad, facere. Ipsam dolorum sunt assumenda quas.
                          </p>
                        </article>
                      </div>
                    </div>
                  </div>
                  <div className="tile is-parent">
                    <article className="tile is-child box">
                      <figure className="columns is-centered">
                        <Image
                          src={'/plus.png'}
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
              <div className="panel-block">
                <div className="tile is-ancestor">
                  <div className="tile is-vertical is-10">
                    <div className="tile">
                      <div className="tile is-parent is-vertical is-3">
                        <article className="tile is-child box">
                          <p className="has-text-weight-bold">Azonosító:</p>
                          <p className="subtitle">DDA123456</p>
                        </article>
                        <article className="tile is-child box">
                          <p className="has-text-weight-bold">Megnevezés:</p>
                          <p className="subtitle">
                            Prosystem alacsony beépítésű konzoldaru
                          </p>
                        </article>
                      </div>
                      <div className="tile is-parent is-vertical is-9">
                        <article className="tile is-child box">
                          <p className="has-text-weight-bold">Helyszín:</p>
                          <p className="subtitle">
                            H-ITB telephelye 1119 Budapest Kelenvölgyi határsor
                            5
                          </p>
                        </article>
                        <article className="tile is-child box">
                          <p className="has-text-weight-bold">Megjegyzés:</p>
                          <p className="subtitle">
                            Lorem ipsum dolor sit amet consectetur adipisicing
                            elit. Natus harum dicta impedit dolor reprehenderit
                            mollitia omnis eos cum! Voluptates id odio commodi
                            eos! Ad, facere. Ipsam dolorum sunt assumenda quas.
                          </p>
                        </article>
                      </div>
                    </div>
                  </div>
                  <div className="tile is-parent">
                    <article className="tile is-child box">
                      <figure className="columns is-centered">
                        <Image
                          src={
                            'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAHQAAAB0CAYAAABUmhYnAAAAAXNSR0IArs4c6QAABJZJREFUeF7tnEmOJDEMA7v+/+gaYG7pBDpA0K5FHXOVLUukKC9Z04/n8/n88d8YBB4SOobL/4lI6Cw+JXQYnxIqodMQGJaPe6iEDkNgWDoqVEKHITAsHRUqocMQGJaOCpXQYQgMS0eFSugwBIalUyv08Xi8FBL6fEvx0Pw1GfK3O/k0vlu87ffQT0uY4kkBI38SWiJAhBABNF+F2nLLEr1OTwvueMttAyKFkH9S6Oo/9UfjU3bXeFv/2w9FbUAS2v1mT0LhR4+7FdQWLHUACZXQa41QBbd7Wup/bfm0Pm0R6fqkIIqP4iH/xxVKgNIhJQWUAKP10pZ4Oj8i8OWn3NMJp4RLKJRICygBnPpXoWXTTgGnFkKEkJ38k538k323f/I3vuWmAOzuELQ+FUSpr/6X8yo0+9okoctbMQFCCiE7+Sf7bv/k78+1XGphaYeR0PBrDAFGdtoT23tmuj7FQwWlQhcEVGhYElRhr35YIEWo0PJhIayP2/C0YFpFpoSfzi/1f/wtNw0oBZQIT/2149N80/jJv4T6+exaI7srLFVIuv7p8aSgNL/Y37f/jJMI2m1PAU7H0xmA/G1vubRga6d74Gl7Gz/Nl9DwabAlnAhp7RIqoZcaqltuW5Ht/HaPbNf/tPkS+mmMlPFIaAngp02X0E9jpIynJjTdw8p4f+gU2H4MoIv/6fhb/xIaPv21gFNBtv4lVEKzt9y0BVKFUoWn6+3218ZP88m+XaHrggQYBdjuafQylK6f5pOeMVL/N3xOP863AUpoVnIqNMMLT9lUgNQxWgFIqIRmh6K2YmlPpkMQVXy6x1E8lG86P6y38/8VghKkFkQASOgisN2HolcrQkIl9IKALTds6gRY25KpZZM9TCc+5ab5pfFsv4dSABLaHSIJXwkN//MUHcpiwOEnM6k/CZXQ32smbam0p7QVSvNpT919Sm/Xo3y2K1RCr3+bj/Age0qghC7fP1OAaXxrl9AQgbYFtoTR/DCd2/D6cb4NoJ3fApTOp/HpyxX5S/GR0PAaQQRIaFqCy3gCmNyn82m8hBLiYCeAyX06n8Z/PaGUAAGa2umeSP5SQmg98kfx7LbXe6iEXv80HBXAbgKP30NPB9wCRooiO710tfG1+KnQww8NLUHp/O2E7q5QUkxrjwGDx316uKD1WvwklBCGa9I6XULLa4kKvQKoQlXoUhHhH60g/Khltfa0RdKeRh2C8t1tP67Q9J7aEkbzJXTzHkcVSYS0dgmV0F8RsOVCgexWIHWE1v5pe+y4PbQlKJ0voSo0rZlovAqN4LoPVqEvVmgLOF27aM+nU3VZT7fp4xUqoWHJ0LGdKpwquPUvoRJ6QYAK8s+13LA+7ntC+TPLdn2aT4S2HYLWX+3H99A0oFuAEhpBKKERXHxtoT2/LVgKV0IJoc3XrK8jtMQHp9OeRafmFtB3K5AA2q5QWrC1S+jvCEpoeeh69SmWBCGhEko1ov2dCNQKfWfwrn1HQEKHVYWESugwBIalo0IldBgCw9JRoRI6DIFh6ahQCR2GwLB0VKiEDkNgWDoqVEKHITAsHRU6jNB/rYM/Dr0+5AUAAAAASUVORK5CYII='
                          }
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
            </article>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompanyThings;

import React, { useState, useEffect, useRef } from "react";
import QRCode from "qrcode";
import toast from "react-hot-toast";

const NewThing = ({ target, setIsNew }) => {
  const [name, setName] = useState("");
  const [id, setId] = useState("");
  const [site, setSite] = useState("");
  const [remark, setRemark] = useState("");
  const [qrText, setQRText] = useState("");
  const [isDisabled, setIsDisabled] = useState(true);

  const show = () => {
    if (name === "") {
      toast.error("Megnevezés nem lehet üres!");
      return;
    }
    setIsNew(false);
  };

  const GenerateQRCode = (event) => {
    event.preventDefault();
    if (id === "") {
      toast.error("Azonosító nem lehet üres!");
      return;
    }
    setQRText(id);
    setIsDisabled(false);
  };
  const canvasRef = useRef();

  useEffect(() => {
    QRCode.toCanvas(
      canvasRef.current,
      qrText || "",
      (error) => error && console.error(error)
    );

    console.log(canvasRef.current);
  }, [qrText]);

  const onSubmit = () => {
    console.log("sss");
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
                      onChange={(event) => {
                        event.preventDefault();
                        setName(event.target.value);
                      }}
                    />
                  </div>
                </div>
                <div className="field">
                  <label className="label">Azonosító</label>
                  <div className="control">
                    <input
                      className="input is-info"
                      type="text"
                      placeholder="dolog egyedi azonosítója"
                      name="role"
                      value={id}
                      onChange={(event) => {
                        event.preventDefault();
                        setId(event.target.value);
                      }}
                    />
                  </div>
                </div>
                <div className="field">
                  <label className="label">Helyszín</label>
                  <div className="control">
                    <input
                      className="input is-info"
                      type="text"
                      placeholder="dolog felhasználásanak helyszíne"
                      name="role"
                      value={site}
                      onChange={(event) => {
                        event.preventDefault();
                        setSite(event.target.value);
                      }}
                    />
                  </div>
                </div>
                <div className="field">
                  <label className="label">Megjegyzés</label>
                  <div className="control">
                    <input
                      className="input is-info"
                      type="text"
                      placeholder="egyéb info"
                      name="role"
                      value={remark}
                      onChange={(event) => {
                        event.preventDefault();
                        setRemark(event.target.value);
                      }}
                    />
                  </div>
                </div>
              </section>
              <footer className="modal-card-foot">
                <button
                  type="submit"
                  onClick={show}
                  className="button is-info"
                  disabled={isDisabled}
                >
                  Mentés
                </button>
                <button onClick={show} className="button">
                  Vissza
                </button>
                <button
                  className="button is-outlined is-danger"
                  onClick={GenerateQRCode}
                >
                  QR-kód generálás
                </button>
              </footer>
            </div>
          </form>
        </div>
        <br />
        <br />
        {isDisabled ? (
          <div>
            <canvas ref={canvasRef} />
          </div>
        ) : (
          <div className="columns is-one-fifth is-centered ">
            <div className="card ">
              <div className="column ">
                <canvas ref={canvasRef} />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default NewThing;

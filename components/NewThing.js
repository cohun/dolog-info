import React, { useState, useEffect } from 'react';
import QRCode from 'qrcode';
import toast from 'react-hot-toast';
import Image from 'next/image';
import { getId, setThing } from '../lib/firebaseConfig';

const NewThing = ({ target, setIsNew }) => {
  const [name, setName] = useState('');
  const [id, setId] = useState('');
  const [site, setSite] = useState('');
  const [remark, setRemark] = useState('');
  const [qrText, setQRText] = useState('');
  const [isDisabled, setIsDisabled] = useState(true);
  const [qrc, setQrc] = useState('');

  const show = () => {
    setIsNew(false);
  };

  const submit = async (event) => {
    event.preventDefault();

    if (name != '' && id != '') {
      const isAlready = await getId(target, id);
      if (isAlready) {
        toast.error('Már ezzel az azonosítóval van bevitt dolog');
        setId('');
        setQrc('');
        setIsDisabled(true);
        return;
      }
      await setThing(target, name, id, remark, site, qrc);
      setIsNew(false);
    } else {
      toast.error('Megnevezés vagy azonosító nem lehet üres!!!');
    }
  };

  const GenerateQRCode = (event) => {
    event.preventDefault();
    if (id === '') {
      toast.error('Azonosító nem lehet üres!');
      return;
    }
    setQRText(id);
    setIsDisabled(false);
  };

  useEffect(() => {
    QRCode.toDataURL(qrText, (error, url) => {
      if (error) return console.error(error);
      setQrc(url);
    });
  }, [qrText]);

  const onSubmit = () => {
    console.log('sss');
  };

  return (
    <div>
      <div className="section is-info">
        <div className="columns is-centered ">
          <form>
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
                      onKeyUpCapture={(e) => {
                        if (e.key === '/') {
                          toast.error(
                            '/ karakter használata nem megengedett. - karakter behelyettesítve!'
                          );

                          setId(id.substring(0, id.length - 1) + '-');
                        }
                      }}
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
                  onClick={submit}
                  className="button is-info"
                  disabled={isDisabled}
                >
                  Mentés
                </button>
                <button onClick={show} className="button">
                  Vissza
                </button>
                <button
                  className="button is-outlined is-link"
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
          <div></div>
        ) : (
          <div>
            <div className="columns is-one-fifth is-centered ">
              <div className="card ">
                <div className="column ">
                  <Image src={qrc} alt="qrCode" width={120} height={120} />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default NewThing;

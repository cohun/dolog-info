import debounce from "lodash.debounce";
import { doc, getDoc, writeBatch } from "firebase/firestore";
import { useCallback, useContext, useEffect, useState } from "react";
import { UserContext } from "../lib/context";
import { db } from "../lib/firebaseConfig";
import { useRouter } from "next/router";

const CreateUsername = () => {
  const [formValue, setFormValue] = useState("");
  const [isValid, setIsValid] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { user } = useContext(UserContext);

  const onSubmit = async (e) => {
    e.preventDefault();
    const userDoc = doc(db, "users", user.uid);
    const usernameDoc = doc(db, "usernames", formValue);
    const batch = writeBatch(db);
    batch.set(userDoc, {
      username: formValue,
      photoURL: user.photoURL,
      displayName: user.displayName,
    });
    batch.set(usernameDoc, { uid: user.uid });

    await batch.commit();

    router.push("/home");
  };

  const onChange = (e) => {
    const val = e.target.value.toLowerCase();
    const re = /^(?=[a-zA-Z0-9._]{3,15}$)(?!.*[_.]{2})[^_.].*[^_.]$/;

    if (val.length < 3) {
      setFormValue(val);
      setLoading(false);
      setIsValid(false);
    }

    if (re.test(val)) {
      setFormValue(val);
      setLoading(true);
      setIsValid(false);
    }
  };

  useEffect(() => {
    checkUsername(formValue);
  }, [formValue]);

  const checkUsername = useCallback(
    debounce(async (username) => {
      if (username.length >= 3) {
        const docRef = doc(db, "usernames", username);
        const docSnap = await getDoc(docRef);
        console.log("Firestore read executed!" + `${docSnap.exists()}`);

        docSnap.exists() ? setIsValid(false) : setIsValid(true);
        setLoading(false);
      }
    }, 500),
    []
  );

  function UsernameMessage({ username, isValid, loading }) {
    if (loading) {
      return <p>Checking...</p>;
    } else if (isValid) {
      return <p className="text-success">{username} még elérhető!</p>;
    } else if (username && !isValid) {
      return <p className="text-danger">Ilyen néven már van felhasználó!</p>;
    } else {
      return <p></p>;
    }
  }

  const [isActive, setIsActive] = useState("is-active");
  const show = () => {
    setIsActive("");
  };
  return (
    <div className={`modal ${isActive}`}>
      <div className="modal-background"></div>
      <form onSubmit={onSubmit}>
        <div className="modal-card">
          <header className="modal-card-head">
            <p className="modal-card-title">Kérem a felhasználó nevet</p>
            <button
              onClick={() => setIsActive("")}
              className="delete"
              aria-label="close"
            ></button>
          </header>
          <section className="modal-card-body">
            <input
              className="input is-primary"
              type="text"
              placeholder="Felhasználó név"
              name="username"
              value={formValue}
              onChange={onChange}
            />
            <UsernameMessage
              username={formValue}
              isValid={isValid}
              loading={loading}
            />
          </section>
          <footer className="modal-card-foot">
            <button
              type="submit"
              disabled={!isValid}
              onClick={show}
              className="button is-success"
            >
              Mentés
            </button>
            <button onClick={show} className="button">
              Vissza
            </button>
          </footer>
          <h3>Debug state</h3>
          <div>
            Username: {formValue}
            <br />
            Loading: {loading.toString()}
            <br />
            Username Valid: {isValid.toString()}
          </div>
        </div>
      </form>
    </div>
  );
};

export default CreateUsername;

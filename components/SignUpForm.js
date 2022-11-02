import { useState } from "react";
import Router from "next/router";
import { auth } from "../lib/firebaseConfig";
import { createUserWithEmailAndPassword } from "firebase/auth";
import toast from "react-hot-toast";

const SignUpForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isDisabled, setIsDisabled] = useState(true);
  const [checked, setChecked] = useState(false);

  const dataSubmit = () => {
    return checked ? setIsDisabled(true) : setIsDisabled(false);
  };

  const onCheckboxClick = (e) => {
    setChecked(!checked);
    return dataSubmit();
  };
  const signUp = (e) => {
    e.preventDefault();
    createUserWithEmailAndPassword(auth, email, password)
      .then(() => {
        // Signed in
        Router.push("/home");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        // ..
        switch (errorCode) {
          case "auth/weak-password":
            toast.error(
              "Gyenge jelszó. Legalább 6 karakter hosszúságú legyen!"
            );
            break;
          case "auth/email-already-in-use":
            toast.error("Ilyen email címen már regisztráltak.");
            break;
          case "auth/invalid-email":
            toast.error("Érvénytelen email cím.");
            break;

          default:
            break;
        }
      });
  };

  return (
    <form
      method="POST"
      action=""
      className="box p-5 has-background-dark has-text-grey-light"
      encType="multipart/form-data"
    >
      <label className="is-block mb-4">
        <span className="is-block mb-2">Email cím</span>
        <input
          required
          name="email"
          type="email"
          className="input has-background-dark has-text-light"
          placeholder="joe.bloggs@example.com"
          onChange={(event) => {
            event.preventDefault();
            console.log(event.target.value);
            setEmail(event.target.value);
          }}
          value={email}
        />
      </label>

      <label className="is-block mb-4">
        <span className="is-block mb-2">Jelszó</span>
        <input
          autoComplete="current-password webauthn"
          name="password"
          type="password"
          className="input has-background-dark has-text-light"
          minLength="6"
          placeholder="(must be 6+ chars)"
          required
          onChange={(event) => {
            event.preventDefault();
            setPassword(event.target.value);
          }}
          value={password}
        />
      </label>

      <div className="mb-4">
        <label>
          <input
            name="tos"
            value="yes"
            type="checkbox"
            required
            onChange={(e) => onCheckboxClick(e)}
          />
          <span> Használati Feltételeket elfogadom.</span>
        </label>
      </div>

      <div className="mb-4">
        <button
          type="submit"
          className="button is-warning px-4"
          disabled={isDisabled}
          onClick={(e) => signUp(e)}
        >
          Regisztrálj
        </button>
      </div>

      <div>
        <div className="is-size-7 has-text-right">
          by
          <span> </span>
          <a href="https://h-itb.hu" className="has-text-grey-light">
            H-ITB
          </a>
        </div>
      </div>
    </form>
  );
};

export default SignUpForm;

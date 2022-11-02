import { useState } from 'react';
import Router from 'next/router';
import { auth } from '../lib/firebaseConfig';
import { signInWithEmailAndPassword } from 'firebase/auth';
import toast from 'react-hot-toast';

const LogInForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [checked, setChecked] = useState(false);

  const dataSubmit = () => {};

  const onCheckboxClick = (e) => {
    setChecked(!checked);
    return dataSubmit();
  };
  const LogIn = (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
      .then(() => {
        // Signed in
        Router.push('/home');
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        switch (errorCode) {
          case 'auth/wrong-password':
            toast.error('Hibás jelszó');
            break;
          case 'auth/user-not-found':
            toast.error('Ilyen email címen nincs regisztrált felhasználó.');
            break;
          case 'auth/invalid-email':
            toast.error('Érvénytelen email cím.');
            break;

          default:
            break;
        }
        // ..
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
          onChange={(event) => setEmail(event.target.value)}
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
          onChange={(event) => setPassword(event.target.value)}
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
            onClick={onCheckboxClick}
          />
          <span> Emlékezz rám!</span>
        </label>
      </div>

      <div className="mb-4">
        <button
          type="submit"
          className="button is-success has-text-black px-4"
          onClick={LogIn}
        >
          Bejelentkezés
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

export default LogInForm;

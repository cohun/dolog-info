import { useEffect, useState } from 'react';
import { sha256 } from 'crypto-hash';
import { doc, setDoc } from 'firebase/firestore';
import { db } from '../lib/firebaseConfig';
import { useRouter } from 'next/router';
import toast from 'react-hot-toast';

const HashingForm = ({ username, setIsactive }) => {
  const [algorithms] = useState('sha256');
  let [text_input, setTextInput] = useState('');
  let [file_input, setFileInput] = useState('');
  let [algorithm, setAlgorithm] = useState('');
  let [output, setOutput] = useState('');
  const router = useRouter();

  const [isDisabled, setIsDisabled] = useState(true);
  const [checked, setChecked] = useState(false);

  // For handling text input
  const handleTextInput = (e) => {
    e.preventDefault();
    let value = e.target.value;
    setTextInput(value);
  };
  const onCheckboxClick = (e) => {
    setChecked(!checked);
    setIsDisabled(!isDisabled);
  };

  // For handling file input
  const handleFileInput = (e) => {};

  // For handling algorithm change
  const handleAlgorithmChange = (e) => {
    e.preventDefault();
    let value = e.target.value;
    setAlgorithm(value);
  };

  const generateHash = async (e) => {
    e.preventDefault();
    let result = await sha256(text_input + algorithm);
    setOutput(result.substring(0, 8));
    console.log(output);
  };

  useEffect(() => {
    console.log('here', output);
    if (output) {
      if (text_input && algorithm) {
        dataSubmit();
      } else {
        toast.error(
          'Töltsd ki a cégnevet és a címet is!!! Próbáld meg mégegyszer! '
        );
      }

      setIsactive(false);
      router.push('/');
    }
  }, [output]);

  const dataSubmit = async (e) => {
    await setDoc(doc(db, 'companies', text_input), {
      businessName: text_input,
      address: algorithm,
      admin: username,
      hash: output,
      users: [username],
    });
  };

  return (
    <div className="section ">
      <div className="columns is-centered ">
        <div className="card column is-half title has-text-centered has-background-primary-dark">
          <form
            onKeyDown={(event) => {
              if (event.key === 'Enter') {
                toast.error(
                  'Csak a Mehet gomb lenyomásával lehet adatot bevinni!! Próbáld meg újra !'
                );
              }

              return event.key != 'Enter';
            }}
          >
            <div className="form">
              <label className="is-block mb-4">
                <span className="is-block mb-2">Cégnév</span>
                <input
                  required
                  name="company"
                  type="text"
                  className="input has-background-grey-lighter has-text-black-bis"
                  placeholder="Write some text"
                  value={text_input}
                  onChange={(e) => handleTextInput(e)}
                />
              </label>

              <label className="is-block mb-4">
                <span className="is-block mb-2">Cím</span>
                <input
                  type="text"
                  className="input has-background-grey-lighter has-text-black-bis"
                  id="text-input"
                  placeholder="Write some text"
                  value={algorithm}
                  onChange={handleAlgorithmChange}
                />
              </label>
            </div>
            <div className="">
              <div className="mb-4">
                <label className="checkbox">
                  <input
                    className="is-danger"
                    name="tos"
                    checked={checked}
                    value="yes"
                    type="checkbox"
                    required
                    onChange={(e) => onCheckboxClick(e)}
                  />
                  <span className="is-size-6">
                    {' '}
                    Ha helyesek az adatok, kattints ide, majd a 'Mehet' gombra!
                  </span>
                </label>
              </div>
              <button
                type="submit"
                className="button is-warning mr-5"
                onClick={() => {
                  setIsactive(false);
                }}
              >
                Mégse
              </button>

              <button
                type="submit"
                disabled={isDisabled}
                className="button is-success"
                onClick={generateHash}
              >
                Mehet
              </button>
              <p className="hashed-algorithm-text">{output}</p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default HashingForm;

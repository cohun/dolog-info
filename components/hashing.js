import { useEffect, useState } from "react";
import { sha256 } from "crypto-hash";
import { doc, setDoc } from "firebase/firestore";
import { db, getCompanyFromHash } from "../lib/firebaseConfig";
import { useRouter } from "next/router";
import toast from "react-hot-toast";

const HashingForm = ({ username, setIsactive }) => {
  const [algorithms] = useState("sha256");
  let [text_input, setTextInput] = useState("");
  let [file_input, setFileInput] = useState("");
  let [algorithm, setAlgorithm] = useState("");
  let [output, setOutput] = useState("");
  const router = useRouter();

  const [isDisabled, setIsDisabled] = useState(true);
  const [checked, setChecked] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

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

  const checkHash = async (e) => {
    e.preventDefault();
    const c = await getCompanyFromHash(text_input);
    if (c) {
      console.log("iinn:", c);
    } else {
      console.log("Nincs");
    }
  };

  const changeAdmin = (e) => {
    setIsAdmin(true);
  };

  useEffect(() => {
    console.log("here", output);
    if (output) {
      if (text_input && algorithm) {
        dataSubmit();
      } else {
        toast.error(
          "Töltsd ki a cégnevet és a címet is!!! Próbáld meg mégegyszer!"
        );
      }

      setIsactive(false);
      router.push("/");
    }
  }, [output]);

  const dataSubmit = async (e) => {
    await setDoc(doc(db, "companies", text_input), {
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
        {!isAdmin ? (
          <div>
            <div className="section is-info mb-2">
              <div className="columns is-centered ">
                <h3 className="card column is-half title has-text-centered has-background-primary-dark">
                  <strong className="is-capitalized">{username}! </strong>
                  <div className="subtitle">
                    Válassz, hogy adminként kívánsz egy új céget felvenni, vagy
                    a rendelkezésedre bocsájtott belépési kóddal szeretnél
                    hozzáférést kapni?{" "}
                  </div>
                </h3>
              </div>
            </div>
            <div className="section">
              <div className="columns">
                <div className="card column is-5 title has-text-centered has-background-warning">
                  <form
                    onKeyDown={(event) => {
                      if (event.key === "Enter") {
                        toast.error(
                          "Csak a Mehet gomb lenyomásával lehet adatot bevinni!! Próbáld meg újra !"
                        );
                      }

                      return event.key != "Enter";
                    }}
                  >
                    <div>
                      <div className="column is-12">
                        <label className="is-block mb-4">
                          <span className="is-block mb-2">Hozzáférési kód</span>
                          <input
                            required
                            name="company"
                            type="text"
                            className="input has-background-grey-lighter has-text-black-bis"
                            placeholder="Figyelj a nagy és kis betűkre!!"
                            value={text_input}
                            onChange={(e) => handleTextInput(e)}
                          />
                        </label>
                        <button
                          type="submit"
                          className="button is-success is-outlined"
                          onClick={checkHash}
                        >
                          Kód bevitel
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
                <div className="column"></div>
                <div className="card column is-5 title has-text-centered has-background-success mb-5">
                  <div>
                    <div className="column is-12">
                      <label className="is-block mb-6">
                        <span className="is-block mb-4">
                          Cégbevitel adminként
                        </span>
                      </label>
                      <button
                        type="submit"
                        className="button is-warning is-outlined"
                        onClick={changeAdmin}
                      >
                        Bevitel
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="card column is-half title has-text-centered has-background-primary-dark">
            <form
              onKeyDown={(event) => {
                if (event.key === "Enter") {
                  toast.error(
                    "Csak a Mehet gomb lenyomásával lehet adatot bevinni!! Próbáld meg újra !"
                  );
                }

                return event.key != "Enter";
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
                    placeholder="A dolog tulajdonosának neve"
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
                    placeholder="...és címe"
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
                      {" "}
                      Ha helyesek az adatok, kattints ide, majd a Mehet gombra!
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
        )}
      </div>
    </div>
  );
};

export default HashingForm;

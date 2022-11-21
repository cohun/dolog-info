import { useState } from "react";
import { sha256 } from "crypto-hash";

const HashingForm = () => {
  const [algorithms] = useState("sha256");
  let [text_input, setTextInput] = useState("");
  let [file_input, setFileInput] = useState("");
  let [algorithm, setAlgorithm] = useState("");
  let [output, setOutput] = useState("");

  // For handling text input
  const handleTextInput = (e) => {
    e.preventDefault();
    let value = e.target.value;
    setTextInput(value);
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
  };

  return (
    <div className="section is-info">
      <div className="columns is-centered ">
        <div className="card column is-half title has-text-centered has-background-primary-dark">
          <form>
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
            <div className="form-group">
              <label htmlFor="file-input">Generálj kódot</label>
              <button className="button" onClick={generateHash}>
                Hash
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

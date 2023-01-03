import { useEffect, useState } from "react";
import {
  collection,
  query,
  where,
  onSnapshot,
  limit,
} from "firebase/firestore";
import { db } from "../lib/firebaseConfig";
import toast from "react-hot-toast";

const WhichCompany = ({ username, setChosen, setCompany }) => {
  const [companies, setCompanies] = useState([]);
  const [address, setAddress] = useState([]);
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    const companiesRef = collection(db, "companies");
    const q = query(
      companiesRef,
      where("users", "array-contains", username, limit(1))
    );

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const comp = [];
      const addr = [];
      querySnapshot.forEach((doc) => {
        comp.push(doc.data().businessName);
        addr.push(doc.data().address);
      });
      setCompanies(comp);
      setAddress(addr);
      unsubscribe();
      return unsubscribe;
    });
  }, []);

  function companyList() {
    let addr = "";
    let company = "";
    let companiesArray = [];

    for (let index = 0; index < companies.length; index++) {
      company = companies[index];
      addr = address[index];

      companiesArray.push(
        <tr key={index}>
          <td>{company}</td>
          <td>{addr}</td>
          <td>
            <label className="control">
              <input
                className="is-success has-background-color"
                name="tos"
                value={company}
                type="radio"
                onChange={(e) => {
                  setCompany(e.target.value);
                  setChecked(true);
                }}
              />
            </label>
          </td>
        </tr>
      );
    }

    return (
      <div className="table-container">
        <table className="table is-bordered is-striped is-narrow is-hoverable is-fullwidth">
          <table className="table">
            <thead>
              <tr>
                <th>Tulajdonos neve</th>
                <th>Címe</th>
                <th>Választ</th>
              </tr>
            </thead>
            <tbody>{companiesArray}</tbody>
          </table>
        </table>
      </div>
    );
  }

  return (
    <div className="section is-info">
      <div className="columns is-centered ">
        <form>
          <div className="modal-card">
            <header className="modal-card-head">
              <p className="modal-card-title">
                {" "}
                <span className="has-background-warning-dark has-text-white px-3">
                  {username}
                </span>
                <span> </span>
                felhasználó hozzáférései:
              </p>
              <button
                onClick={(e) => {
                  e.preventDefault();
                  toast.error(
                    "Válassz ki egy céget, vagy nyomj a DoLog logóra!"
                  );
                }}
                className="delete"
                aria-label="close"
              ></button>
            </header>
            <section className="modal-card-body">{companyList()}</section>
            <footer className="modal-card-foot">
              <button
                type="submit"
                className="button is-success"
                onClick={() => setChosen(true)}
                disabled={!checked}
              >
                Rendben
              </button>
            </footer>
          </div>
        </form>
      </div>
    </div>
  );
};

export default WhichCompany;

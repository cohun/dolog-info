import { query, where } from "firebase/firestore";
import { useEffect, useState } from "react";
import HashingForm from "./hashing";

const UserProfile = ({ username, companies }) => {
  console.log(companies);
  const [isActive, setIsactive] = useState(false);

  useEffect(() => {
    console.log(isActive);
  }, [isActive]);

  const getCompany = (comp) => {
    let compa = "";
    let content = [];
    for (let i = 0; i < comp.length; i++) {
      compa = comp[i];
      content.push(
        <div
          className={
            isActive
              ? "button is-large is-info is-outlined m-6 is-focused"
              : "button is-large is-info is-outlined m-6 "
          }
          onClick={(i) => console.log(i.target)}
        >
          {compa}
        </div>
      );
    }
    content.push(
      <div className="section">
        <button
          className="button is-large is-primary is-outlined"
          onClick={onHashingForm}
        >
          Új cég felvétel
        </button>
      </div>
    );

    return content;
  };

  function onHashingForm() {
    setIsactive(true);
    return HashingForm;
  }

  function AddNewCompany(username) {
    return (
      <button className="button is-medium is-primary is-outlined">
        Új cég felvétel
      </button>
    );
  }

  useEffect(() => {
    console.log("wwwww", companies.length);
  }, [companies.length]);

  return (
    <div>
      {!isActive ? (
        <div>
          <div className="section is-info">
            <div className="columns is-centered ">
              <h3 className="card column is-half title has-text-centered has-background-primary">
                <strong className="is-capitalized">Helló {username}! </strong>
                {companies.length != 0 ? (
                  <div className="subtitle">
                    az alábbi tulajdonosok dolgaihoz van hozzáférésed:{" "}
                  </div>
                ) : (
                  <div className="subtitle">
                    Még nincs hozzáférésed egyetlen céghez sem.{" "}
                  </div>
                )}
              </h3>
            </div>
          </div>
          <div className="section">
            <div className="">
              <div className="columns is-centered is-8">
                {companies.length != 0
                  ? getCompany(companies)
                  : AddNewCompany(username)}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <HashingForm />
      )}
    </div>
  );
};

export default UserProfile;

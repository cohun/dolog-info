import { query, where } from "firebase/firestore";
import { useState } from "react";

const UserProfile = ({ username, companies }) => {
  console.log(companies);
  const [isActive, setIsactive] = useState(false);

  const getCompany = (comp) => {
    let company = "";
    let content = [];
    for (let i = 0; i < comp.length; i++) {
      company = comp[i];
      content.push(
        <div
          className={
            isActive
              ? "button is-large is-info is-outlined mr-6 is-focused"
              : "button is-large is-info is-outlined mr-6 "
          }
          onClick={(i) => console.log(i.target)}
        >
          {console.log(company)}
          {company}
        </div>
      );
    }
    return content;
  };

  return (
    <div>
      <div className="section is-info">
        <div className="columns is-centered ">
          <h3 className="card column is-half title has-text-centered has-background-primary">
            <strong className="is-capitalized">{username} </strong>
            az alábbi tulajdonosok dolgaihoz fér hozzá:
          </h3>
        </div>
      </div>
      <div className="section">
        <div className="">
          <div className="columns is-centered is-8">
            {getCompany(companies)}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;

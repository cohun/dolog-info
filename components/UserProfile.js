import { query, where } from 'firebase/firestore';

const UserProfile = ({ username, companies }) => {
  console.log(companies);
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
            {companies.map((company) => (
              <div
                key={company.id}
                className=" button is-large is-info is-outlined mr-6"
              >
                {company}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;

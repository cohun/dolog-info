import { query, where } from 'firebase/firestore';

const UserProfile = ({ username, companies }) => {
  console.log(companies);
  return (
    <div>
      <div className="section">
        <div className="card">
          <h3 className="title">
            {username} az alábbi tulajdonosok dolgaihoz fér hozzá:
          </h3>
        </div>
      </div>
      <div className="section">
        <div className="">
          <div className="columns is-centered is-8">
            <div className=" button is-large is-info is-outlined">
              {companies[1]}
            </div>

            <div className="box"></div>

            <div className="button is-large is-focused is-info is-outlined">
              Second column
            </div>

            <div className="box"></div>

            <div className="button is-large is-info is-outlined">
              Third column
            </div>

            <div className="box"></div>

            <div className="button is-large is-info is-outlined">
              Fourth column
            </div>
          </div>
          <div className="">I am in a box. {companies[1]}</div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;

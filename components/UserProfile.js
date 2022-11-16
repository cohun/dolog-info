import { query, where } from "firebase/firestore";

const UserProfile = ({ username }) => {
  return (
    <div>
      <div className="container"></div>
      <div className="container"></div>
      <div className="container"></div>
      <div className="section">
        <div className="card">
          <div>UserProfile {username}</div>
          <div className="box">I am in a box. {username}</div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;

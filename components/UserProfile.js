const UserProfile = ({ uid, username }) => {
  return (
    <div>
      <div>UserProfile {uid}</div>
      <div className="box">I am in a box. {username}</div>
    </div>
  );
};

export default UserProfile;

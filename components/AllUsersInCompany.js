import React from "react";

const AllUsersInCompany = () => {
  const [users, setUsers] = useState([]);

  function UsersList() {
    let cList = [];

    users.forEach((user) => {
      cList.push(
        <div>
          {hash != "" ? (
            <a
              onClick={() => {
                setIsActive(true);
                setWho(user);
                console.log(user);
              }}
              className="panel-block is-active"
            >
              <span className="panel-icon">
                <i className="fas fa-book" aria-hidden="true"></i>
              </span>
              {user}
            </a>
          ) : (
            <a
              onClick={() =>
                toast.error("Csak adminisztrátor jogosult megváltoztatni")
              }
              className="panel-block is-active"
            >
              <span className="panel-icon">
                <i className="fas fa-book" aria-hidden="true"></i>
              </span>
              {user}
            </a>
          )}
        </div>
      );
    });
    return cList;
  }
  return <div>{UsersList()}</div>;
};

export default AllUsersInCompany;

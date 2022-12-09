import React, { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../lib/firebaseConfig";

const AllUsersInCompany = ({ target, setIsActive, hash, setWho, setUsers }) => {
  const [usern, setUsern] = useState([]);

  useEffect(() => {
    console.log("In here");
    getAllUsersInCompany(target);
  }, [usern.length]);

  async function getAllUsersInCompany(target) {
    const docRef = doc(db, "companies", target);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      const use = docSnap.data().users;
      setUsern(use);
      setUsers(usern);
    } else {
      // doc.data() will be undefined in this case
      console.log("No such document!");
    }
  }

  function UsersList() {
    let cList = [];
    usern?.forEach((user) => {
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

  return (
    <div>
      {usern !== [] ? (
        UsersList()
      ) : (
        <a className="panel-block is-active">
          <span className="panel-icon">
            <i className="fas fa-book" aria-hidden="true"></i>
          </span>
          Nincs felhasználó
        </a>
      )}
    </div>
  );
};

export default AllUsersInCompany;

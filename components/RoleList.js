import React, { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../lib/firebaseConfig";

const RoleList = ({
  users,
  target,
  setIsActive,
  hash,
  setWho,
  setRoleChange,
}) => {
  const [roles, setRoles] = useState([""]);

  useEffect(() => {
    console.log(" :", users);
    getUsersRole(target, users);
  }, [users, roles.length]);

  async function getUsersRole(target, users) {
    users?.forEach(async (user) => {
      const docRef = doc(db, `companies/${target}/${user}`, "what");
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        console.log("admitted: ", docSnap.data().admittedAs);
        if (hash === "") {
          setRoles([docSnap.data().admittedAs]);
          return;
        }
        let rol = roles;
        console.log("ussssss", roles);
        rol.push(docSnap.data().admittedAs);
        console.log("uuuuuuu", rol);
        setRoles(rol);
      } else {
        // doc.data() will be undefined in this case
        console.log("No such document!");
      }
    });
  }

  function RolesList() {
    let rList = [];
    let role;
    for (let index = 0; index < users.length; index++) {
      const element = users[index];
      role = roles[index];
      console.log("role", role);

      rList.push(
        <div>
          {hash != "" ? (
            <a
              className="panel-block is-active"
              onClick={() => {
                setIsActive(true);
                setRoleChange(role ? role : "adminisztrátor");
                setWho(element);
              }}
            >
              <span className="panel-icon">
                <i className="fas fa-book" aria-hidden="true"></i>
              </span>

              {role === "" ? "adminisztrátor" : role}
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
              {role}
            </a>
          )}
        </div>
      );
    }
    return rList;
  }

  return (
    <div>
      {roles.length > 0 ? (
        RolesList()
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

export default RoleList;

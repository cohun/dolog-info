import React, { useEffect, useState } from "react";
import { getAllUsersInCompany, getUsersRole } from "../lib/firebaseConfig";
import CompanyThings from "./CompanyThings";
import Image from "next/image";
import NewThing from "./NewThing";
import toast from "react-hot-toast";
import { db } from "../lib/firebaseConfig";
import {
  getFirestore,
  limit,
  query,
  where,
  collection,
  getDocs,
  setDoc,
  doc,
  updateDoc,
  arrayUnion,
  arrayRemove,
  getDoc,
  onSnapshot,
} from "firebase/firestore";

const CompanyAdmin = ({ username, target, hash, setTarget }) => {
  const [users, setUsers] = useState([]);
  const [roles, setRoles] = useState([""]);
  const [roleChange, setRoleChange] = useState("");
  const [who, setWho] = useState("");
  const [isActive, setIsActive] = useState(false);
  const [isNew, setIsNew] = useState(false);

  const show = () => {
    setIsActive(false);
  };

  const onSubmit = () => {
    console.log("sss");
  };
  const onChange = (e) => {
    const val = e.target.value.toLowerCase();

    setRoleChange(val);
  };

  async function getUsersRole(target, usern, roles) {
    const docRef = doc(db, `companies/${target}/${usern}`, "what");
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
      console.log("ussssss", rol);
      setRoles(rol);
    } else {
      // doc.data() will be undefined in this case
      console.log("No such document!");
    }
  }

  useEffect(() => {
    if (hash === "") {
      console.log("Username", username);
      setUsers([username]);
      getUsersRole(target, username);
      return;
    } else {
      GetUsers();
    }
    console.log("Roles", roles);
  }, [roles.length]);

  async function getAllUsersInComp(target) {
    console.log("Here");
    const docRef = doc(db, "companies", target);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      console.log("------", docSnap.data().users);
      setUsers(docSnap.data().users);
    } else {
      // doc.data() will be undefined in this case
      console.log("No such document!");
    }
  }

  async function GetUsers() {
    if (users !== []) {
      try {
        await getAllUsersInComp(target);
        console.log("Inside try:", users);
        toast.success(
          "Data was successfully fetched from cloud firestore! Close this alert and check console for output."
        );
      } catch (error) {
        console.log(error);
        alert(error);
      }
    }

    console.log("USERS: ", users);
    if (users !== []) {
      users.forEach(async (usern) => {
        console.log("usern", usern);
        try {
          await getUsersRole(target, usern, roles);
          toast.success(
            "Roles successfully fetched from cloud firestore! Close this alert and check console for output."
          );
        } catch (error) {
          console.log(error);
          alert(error);
        }

        console.log("after usern", usern);
      });
    }
  }

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

              {!role ? "adminisztrátor" : role}
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

  return isNew ? (
    <NewThing target={target} setIsNew={setIsNew}></NewThing>
  ) : isActive ? (
    <div className="section is-info">
      <div className="columns is-centered ">
        <form onSubmit={onSubmit}>
          <div className="modal-card">
            <header className="modal-card-head">
              <p className="modal-card-title">{who} felhasználó beosztása</p>
              <button
                onClick={() => setIsActive(false)}
                className="delete"
                aria-label="close"
              ></button>
            </header>
            <section className="modal-card-body">
              <input
                className="input is-primary"
                type="text"
                placeholder="Felhasználó név"
                name="role"
                value={roleChange}
                onChange={onChange}
              />
            </section>
            <footer className="modal-card-foot">
              <button
                type="submit"
                onClick={show}
                className="button is-success"
              >
                Mentés
              </button>
              <button onClick={show} className="button">
                Vissza
              </button>
            </footer>
          </div>
        </form>
      </div>
    </div>
  ) : (
    <div className="card hero is-fullheight">
      <Image
        src="/dolog_background.jpg"
        className="is-fullwidth"
        alt="background"
        layout="fill"
      ></Image>

      <div className="section is-info">
        <div className="columns is-centered ">
          <h3 className="card column is-one-third is-size-4 has-text-centered has-background-grey-darker has-text-warning">
            <span>{target} </span>
            <span className="ml-3 has-text-info-light"> jogosultak:</span>
          </h3>
        </div>
      </div>

      <div className="section">
        <div className="container card columns">
          <div className="column is-6">
            <article className="card panel is-info">
              <p className="panel-heading">Felhasználó</p>

              <div className="panel-block"></div>
              {users != [] ? (
                UsersList()
              ) : (
                <a className="panel-block is-active">
                  <span className="panel-icon">
                    <i className="fas fa-book" aria-hidden="true"></i>
                  </span>
                  Nincs felhasználó
                </a>
              )}
            </article>
          </div>
          <div className="column is-6">
            <article className="card panel is-link">
              <p className="panel-heading">Beosztás</p>

              <div className="panel-block"></div>
              {roles != [""] ? (
                RolesList()
              ) : (
                <a className="panel-block is-active">
                  <span className="panel-icon">
                    <i className="fas fa-book" aria-hidden="true"></i>
                  </span>
                  Nincs felhasználó
                </a>
              )}
            </article>
          </div>
        </div>
      </div>

      <div className="section is-info mb-2">
        <div className="columns is-centered ">
          <button
            className="button is-large is-outlined is-danger"
            onClick={() => setTarget("")}
          >
            Vissza
          </button>
        </div>
      </div>
      <CompanyThings
        target={target}
        setIsNew={setIsNew}
        hash={hash}
      ></CompanyThings>
    </div>
  );
};

export default CompanyAdmin;

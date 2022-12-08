import React, { useEffect, useState } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../lib/firebaseConfig';

const AllUsersInCompany = ({ target, setIsActive, hash }) => {
  const [users, setUsers] = useState([]);
  const [roles, setRoles] = useState(['']);
  const [roleChange, setRoleChange] = useState('');

  useEffect(() => {
    getAllUsersInCompany(target);
  }, [users]);

  async function getAllUsersInCompany(target) {
    const docRef = doc(db, 'companies', target);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      const use = docSnap.data().users;
      setUsers(use);
    } else {
      // doc.data() will be undefined in this case
      console.log('No such document!');
    }
  }

  function RolesList() {
    let rList = [];
    let role;
    for (let index = 0; index < users.length; index++) {
      const element = users[index];
      role = roles[index];
      console.log('role', role);
      rList.push(
        <div>
          {hash != '' ? (
            <a
              className="panel-block is-active"
              onClick={() => {
                setIsActive(true);
                setRoleChange(role ? role : 'adminisztrátor');
                setWho(element);
              }}
            >
              <span className="panel-icon">
                <i className="fas fa-book" aria-hidden="true"></i>
              </span>

              {!role ? 'adminisztrátor' : role}
            </a>
          ) : (
            <a
              onClick={() =>
                toast.error('Csak adminisztrátor jogosult megváltoztatni')
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
      {users !== [] ? (
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

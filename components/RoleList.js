import React, { useEffect, useState } from 'react';
import { doc, getDoc, onSnapshot } from 'firebase/firestore';
import { db } from '../lib/firebaseConfig';
import toast from 'react-hot-toast';

const RoleList = ({
  users,
  target,
  setIsActive,
  hash,
  setWho,
  setRoleChange,
}) => {
  const [roles, setRoles] = useState(['']);

  useEffect(() => {
    console.log('In here roles');
    getUsersRole(target, users).then(() => {
      console.log('RRRR: ', roles);
      RolesList();
    });
  }, [roles.length]);

  async function getUsersRole(target, users) {
    const role = [''];
    users?.forEach(async (user) => {
      const unsubscribe = onSnapshot(
        doc(db, `companies/${target}/${user}`, 'what'),
        (doc) => {
          if (doc.data()) {
            role.push(doc.data().admittedAs);
          }

          console.log('Current role in CA: ', role.join(', '));
          setRoles(role);
        }
      );
    });

    console.log('End', roles);
    return RolesList();
  }

  function RolesList() {
    let cList = [];
    let index = 0;

    roles?.forEach((role) => {
      const element = users[index];
      let danger = '';
      if (role === 'elbírálás alatt') {
        danger = 'has-text-danger';
      }
      cList.push(
        <div>
          {hash != '' ? (
            <a
              className={`panel-block is-active ${danger}`}
              onClick={() => {
                setIsActive(true);
                setRoleChange(role ? role : 'adminisztrátor');
                setWho(element);
              }}
            >
              <span className="panel-icon">
                <i className="fas fa-book" aria-hidden="true"></i>
              </span>

              {role === '' ? 'adminisztrátor' : role}
            </a>
          ) : (
            <a
              onClick={() =>
                toast.error('Csak adminisztrátor jogosult megváltoztatni')
              }
              className={`panel-block is-active ${danger}`}
            >
              <span className="panel-icon">
                <i className="fas fa-book" aria-hidden="true"></i>
              </span>
              {role === '' ? 'adminisztrátor' : role}
            </a>
          )}
        </div>
      );
      index++;
    });
    return cList;
  }

  return <div>{RolesList()}</div>;
};

export default RoleList;

import React, { useEffect, useState } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../lib/firebaseConfig';

const AllUsersInCompany = ({
  target,
  hash,
  setUsers,
  username,
  setUserMarked,
  setWho,
}) => {
  const [usern, setUsern] = useState([]);
  const [marked, setMarked] = useState(false);
  const [chosen, setChosen] = useState('');

  useEffect(() => {
    getAllUsersInCompany(target);
  }, [usern.length]);

  useEffect(() => {
    if (chosen != '' && marked) {
      console.log('both true');
      console.log(chosen);
    } else {
      console.log('not true');
      console.log(chosen);
    }
  }, [chosen, marked]);

  const handleUserClick = (user) => {
    setMarked(!marked);

    setChosen(user);
    setWho(user);
    setUserMarked(!marked);
  };

  async function getAllUsersInCompany(target) {
    const docRef = doc(db, 'companies', target);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      const use = docSnap.data().users;
      setUsern(use);
      setUsers(usern);
    } else {
      // doc.data() will be undefined in this case
      console.log('No such document!');
    }
  }

  function UsersList() {
    let cList = [];
    usern?.forEach((user) => {
      cList.push(
        <div key={user}>
          {hash != '' ? (
            <a
              className="panel-block is-active"
              onClick={() => {
                handleUserClick(user);
              }}
            >
              <span className="panel-icon">
                <i className="fas fa-book" aria-hidden="true"></i>
              </span>
              {user === username ? (
                <div className="has-text-white has-background-success-dark px-4">
                  {user}
                </div>
              ) : marked === true && chosen === user ? (
                <div className="has-text-white has-background-warning-dark px-4">
                  {user}
                </div>
              ) : (
                user
              )}
            </a>
          ) : (
            <div className="panel-block is-active">
              <span className="panel-icon">
                <i className="fas fa-book" aria-hidden="true"></i>
              </span>
              {user === username ? (
                <div className="has-text-white has-background-success-dark px-4">
                  {user}
                </div>
              ) : (
                user
              )}
            </div>
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

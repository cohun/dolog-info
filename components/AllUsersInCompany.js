import React, { useEffect, useState } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../lib/firebaseConfig';
import toast from 'react-hot-toast';

const AllUsersInCompany = ({ target, hash, setUsers, username }) => {
  const [usern, setUsern] = useState([]);

  useEffect(() => {
    console.log('In here');
    getAllUsersInCompany(target);
  }, [usern.length]);

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
        <div>
          {hash != '' ? (
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

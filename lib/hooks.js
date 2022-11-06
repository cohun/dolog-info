import { useState, useEffect } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, db } from '../lib/firebaseConfig';
import { doc, onSnapshot } from 'firebase/firestore';

const useUserData = () => {
  const [user] = useAuthState(auth);
  const [blogName1, setBlogName1] = useState(null);

  useEffect(() => {
    let unsubscribe;
    if (user) {
      unsubscribe = onSnapshot(doc(db, 'users', user.uid), (doc) => {
        setBlogName1(doc.data()?.username);
      });
    } else {
      setBlogName1(null);
    }
    return unsubscribe;
  }, [user]);

  return { user, blogName1 };
};

export default useUserData;

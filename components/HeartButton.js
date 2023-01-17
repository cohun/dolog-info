import { auth } from '../lib/firebaseConfig';
import { useEffect } from 'react';
import { useState } from 'react';
import {
  getDoc,
  doc,
  setDoc,
  updateDoc,
  getDocs,
  collection,
  getCountFromServer,
  query,
} from 'firebase/firestore';
import { db } from '../lib/firebaseConfig';

// Allows user to heart or like a post
export default function Heart({ uid, company, id, slug }) {
  const [count, setCount] = useState(0);

  async function heartCount() {
    const coll = collection(
      db,
      `users/${uid}/${company}/${id}/posts/${slug}/hearts`
    );
    const snapshot = await getCountFromServer(coll);
    console.log('count: ', snapshot.data().count);
    setCount(snapshot.data().count);
  }
  async function UpdateHeartCount() {
    const Ref = doc(db, `users/${uid}/${company}/${id}/posts`, slug);
    await updateDoc(Ref, {
      heartCount: count,
    });
  }

  useEffect(() => {
    heartCount();
    UpdateHeartCount();
  }, [count]);

  const addHeart = async () => {
    console.log('add');
    const uidCurrent = auth.currentUser.uid;
    // Add a new document in collection "cities"
    await setDoc(
      doc(db, `users/${uid}/${company}/${id}/posts/${slug}/hearts`, uidCurrent),
      {
        uid: uidCurrent,
      }
    );
  };

  // Remove a user-to-post relationship
  const removeHeart = async () => {
    console.log('remove');
  };

  return count > 0 ? (
    <button
      className="button has-background-warning-light mt-4"
      onClick={removeHeart}
    >
      💔 Népszerűségi szavazat visszavétel
    </button>
  ) : (
    <button
      className="button has-background-warning-light mt-4"
      onClick={addHeart}
    >
      💗 Népszerűségi szavazat hozzáadás
    </button>
  );
}

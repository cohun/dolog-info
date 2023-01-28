import { auth } from '../lib/firebaseConfig';
import { useEffect } from 'react';
import { useState } from 'react';
import {
  getDoc,
  doc,
  setDoc,
  updateDoc,
  deleteDoc,
  collection,
  getCountFromServer,
} from 'firebase/firestore';
import { db } from '../lib/firebaseConfig';

// Allows user to heart or like a post
export default function Heart({ uid, company, id, slug, hearted, setHearted }) {
  const [count, setCount] = useState(0);
  const [exists, setExists] = useState(false);

  async function heartCount() {
    const coll = collection(
      db,
      `users/${uid}/${company}/${id}/posts/${slug}/hearts`
    );
    const snapshot = await getCountFromServer(coll);
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
    userData();
  }, [count, hearted]);

  useEffect(() => {
    setHearted(!hearted);
  }, [exists]);

  const userData = async () => {
    const uidCurrent = auth.currentUser.uid;
    const docRef = doc(
      db,
      `users/${uid}/${company}/${id}/posts/${slug}/hearts`,
      uidCurrent
    );
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      setExists(true);
    } else {
      setExists(false);
      // doc.data() will be undefined in this case
      console.log('No such document!');
    }
  };

  const addHeart = async () => {
    const uidCurrent = auth.currentUser.uid;
    // Add a new document in collection "cities"
    await setDoc(
      doc(db, `users/${uid}/${company}/${id}/posts/${slug}/hearts`, uidCurrent),
      {
        uid: uidCurrent,
      }
    );
    setHearted(!hearted);
  };

  // Remove a user-to-post relationship
  const removeHeart = async () => {
    const uidCurrent = auth.currentUser.uid;
    // Add a new document in collection "cities"
    await deleteDoc(
      doc(db, `users/${uid}/${company}/${id}/posts/${slug}/hearts`, uidCurrent)
    );
    setHearted(!hearted);
  };

  return exists ? (
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

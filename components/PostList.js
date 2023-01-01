import toast from 'react-hot-toast';
import AuthCheck from './AuthCheck';
import kebabCase from 'lodash.kebabcase';
import { auth, db } from '../lib/firebaseConfig';
import { collection, query, where, getDocs, orderBy } from 'firebase/firestore';
import { postToJson, fromMillis } from '../lib/firebaseConfig';
import PostFeed from './PostFeed';
import { useEffect, useState } from 'react';

const PostList = () => {
  const uid = auth.currentUser.uid;
  const [post, setPost] = useState([]);
  async function GetList(uid) {
    console.log('UID:', uid);

    const querySnapshot = await getDocs(
      collection(db, `users/${uid}/posts`),
      orderBy('createdAt')
    );
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      console.log(doc.id, ' => ', doc.data());
    });
    const posts = querySnapshot?.docs.map(postToJson);
    setPost(posts);
  }
  useEffect(() => {
    GetList(uid);
  }, []);

  console.log(`users/${uid}/posts`);

  return (
    <>
      <h1 className="title has-text-centered has-text-grey-light is-underlined">
        Szerkezd posztjaidat
      </h1>
      <PostFeed posts={post} admin />
    </>
  );
};

export default PostList;

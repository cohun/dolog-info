import toast from "react-hot-toast";
import AuthCheck from "./AuthCheck";
import kebabCase from "lodash.kebabcase";
import { auth, db } from "../lib/firebaseConfig";
import { collection, query, where, getDocs, orderBy } from "firebase/firestore";
import { postToJson, fromMillis } from "../lib/firebaseConfig";
import PostFeed from "./PostFeed";
import { useEffect, useState } from "react";

const PostList = ({ username, company, id }) => {
  const uid = auth.currentUser?.uid;
  const [post, setPost] = useState([]);
  async function GetList(uid) {
    const querySnapshot = await getDocs(
      collection(db, `users/${uid}/${company}/${id}/posts`),
      orderBy("createdAt")
    );
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
    });
    const posts = querySnapshot?.docs.map(postToJson);

    if (posts) {
      const filteredPosts = posts.filter((post) => post.company === company);
      setPost(filteredPosts);
    }
  }
  useEffect(() => {
    GetList(uid);
  }, [company, id]);

  return (
    <>
      <h1 className="my-4 is-size-4 has-text-weight-semibold has-text-centered has-text-info-light">
        Szerkeszd posztjaidat
      </h1>
      <PostFeed posts={post} username={username} company={company} />
    </>
  );
};

export default PostList;

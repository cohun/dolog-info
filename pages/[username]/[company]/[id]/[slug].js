import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useContext } from "react";
import { UserContext } from "../../../../lib/context";

import ReactMarkdown from "react-markdown";
import { useForm } from "react-hook-form";
import Link from "next/link";
import toast from "react-hot-toast";
import AuthCheck from "../../../../components/AuthCheck";
import PostContent from "../../../../components/PostContent";
import Navbar from "../../../../components/Navbar";

import { getDoc, doc } from "firebase/firestore";
import { db } from "../../../../lib/firebaseConfig";

const PostPage = () => {
  const { user, username } = useContext(UserContext);
  const uid = user?.uid;

  const [post, setPost] = useState("");
  const router = useRouter();
  const { company, id, slug } = router.query;
  console.log(uid, company, id, slug);

  // getPost(uid, company, id, slug, setPost);

  return (
    <main className="container">
      <section>
        <PostContent post={post} />
      </section>

      <aside className="card">
        <p>
          <strong>{post.heartCount || 0} 🤍</strong>
        </p>

        <AuthCheck
          fallback={
            <Link href="/enter">
              <button>💗 Sign Up</button>
            </Link>
          }
        >
          {/* <HeartButton postRef={postRef} /> */}
        </AuthCheck>

        {username?.uid === post.username && (
          <Link href={`/admin/${company}/${id}/${slug}`}>
            <button className="btn-blue">Edit Post</button>
          </Link>
        )}
      </aside>
    </main>
  );
};

async function getPost(uid, company, id, slug, setPost) {
  const docRef = doc(db, `users/${uid}/${company}/${id}/posts`, slug);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    setPost(docSnap.data());
    console.log(post);
  } else {
    // doc.data() will be undefined in this case
    console.log("No such document!");
  }
}

export default PostPage;

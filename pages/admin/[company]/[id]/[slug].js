import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { useRouter } from 'next/router';
import { useContext } from 'react';
import { UserContext } from '../../../../lib/context';

import { useDocumentDataOnce } from 'react-firebase-hooks/firestore';
import reactMarkdown from 'react-markdown';
import Link from 'next/link';
import toast from 'react-hot-toast';
import AuthCheck from '../../../../components/AuthCheck';

import { getDoc, doc } from 'firebase/firestore';
import { db } from '../../../../lib/firebaseConfig';

const AdminPostEdit = () => {
  const { user, username } = useContext(UserContext);
  const uid = user?.uid;
  return (
    <AuthCheck>
      <PostManager uid={uid} />
    </AuthCheck>
  );
};

function PostManager({ uid }) {
  const [preview, setPreview] = useState(false);
  const [post, setPost] = useState('');
  const router = useRouter();
  const { company, id, slug } = router.query;
  console.log(company, id, slug);

  async function getPost(uid, company, id, slug) {
    const docRef = doc(db, `users/${uid}/${company}/${id}/posts`, slug);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      if (post === '') {
        setPost(docSnap.data());
      }
    } else {
      // doc.data() will be undefined in this case
      console.log('No such document!');
    }
  }
  getPost(uid, company, id, slug);

  return (
    <main className="section">
      {post && (
        <>
          <section>
            <h1>{post.title}</h1>
            <p>ID: {post.slug}</p>

            {/* <PostForm postRef={postRef} defaultValues={post} preview={preview} /> */}
          </section>

          <aside>
            <h3>Tools</h3>
            <button>{preview ? 'Edit' : 'Preview'}</button>
            <Link href={`/${post.username}/${post.slug}`}>
              <button className="btn-blue">Live view</button>
            </Link>
            {/* <DeletePostButton postRef={postRef} /> */}
          </aside>
        </>
      )}
    </main>
  );
}

export default AdminPostEdit;

import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useContext } from 'react';
import { UserContext } from '../../../../lib/context';

import Link from 'next/link';
import AuthCheck from '../../../../components/AuthCheck';
import PostContent from '../../../../components/PostContent';
import Navbar from '../../../../components/Navbar';
import HeartButton from '../../../../components/HeartButton';

import {
  getDoc,
  doc,
  getDocs,
  collection,
  where,
  query,
} from 'firebase/firestore';
import { db } from '../../../../lib/firebaseConfig';

const PostPage = () => {
  const { username } = useContext(UserContext);

  const [uid, setUid] = useState('');
  const [post, setPost] = useState([]);
  const [hearted, setHearted] = useState(false);
  const router = useRouter();
  const { username: un, company, id, slug } = router.query;

  async function getPost(uid, company, id, slug) {
    const docRef = doc(db, `users/${uid}/${company}/${id}/posts`, slug);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const po = docSnap.data();

      const date = po.createdAt.toDate().toLocaleString('hu-HU');
      const upDate = po.updatedAt.toDate().toLocaleString('hu-HU');
      po.createdAt = date;
      po.updatedAt = upDate;
      return po;
    } else {
      // doc.data() will be undefined in this case
      console.log('No such document!');
    }
  }

  const getPos = async () => {
    const q = query(collection(db, 'users'), where('username', '==', un));

    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots

      setUid(doc.id);
    });
    if (uid) {
      const pos = await getPost(uid, company, id, slug);
      if (pos) {
        setPost(pos);
      } else {
        console.log('Nincs poszt');
      }
    }
  };

  useEffect(() => {
    if (username) {
      getPos();
    }
  }, [uid, username, post.username, hearted]);

  return (
    <main className="">
      <Navbar />
      <aside className="hero has-background-warning-light">
        <nav class="level mt-4">
          <div class="level-item has-text-centered">
            <div className="mt-3">
              <p class="heading has-text-black">Tulajdonos</p>
              <p class="subtitle">{post.company}</p>
            </div>
          </div>
          <div class="level-item has-text-centered">
            <div className="mt-3">
              <p class="heading has-text-black">dolog azonosító</p>
              <p class="subtitle">{post.id}</p>
            </div>
          </div>
          <div class="level-item has-text-centered">
            <div>
              {username === post?.username && (
                <Link href={`/admin/${company}/${id}/${slug}`} className="">
                  <button className="button is-primary mt-2">
                    Szerkeszd posztodat
                  </button>
                </Link>
              )}
            </div>
          </div>
        </nav>
      </aside>
      <section className="hero has-background-warning-light">
        <AuthCheck
          fallback={
            <Link href="/">
              <button>Regisztrálj egy fiókot</button>
            </Link>
          }
        >
          {uid !== '' && (
            <HeartButton
              uid={uid}
              company={company}
              id={id}
              slug={slug}
              hearted={hearted}
              setHearted={setHearted}
            />
          )}
        </AuthCheck>
        <PostContent post={post} />
      </section>
    </main>
  );
};

export default PostPage;

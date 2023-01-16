import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/router';
import {
  collectionGroup,
  query,
  where,
  getDocs,
  doc,
  getDoc,
  limit,
  orderBy,
  startAfter,
  collection,
  deleteDoc,
} from 'firebase/firestore';
import { useEffect, useState } from 'react';
import Navbar from '../../../../components/Navbar';
import { useContext } from 'react';
import { UserContext } from '../../../../lib/context';
import PostFeed from '../../../../components/PostFeed';
import {
  postToJson,
  fromMillis,
  db,
  delThing,
} from '../../../../lib/firebaseConfig';
import AuthCheck from '../../../../components/AuthCheck';

const LIMIT = 5;

const ComingFromQRCode = () => {
  const [imageURL, setImageURL] = useState(
    'https://bulma.io/images/placeholders/128x128.png'
  );
  const [loading, setLoading] = useState(false);
  const [postsEnd, setPostsEnd] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isAdmitted, setIsAdmitted] = useState(false);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [users, setUsers] = useState([]);
  const [things, setThings] = useState([]);
  const { user } = useContext(UserContext);
  const router = useRouter();
  const { username, company, id } = router.query;

  useEffect(() => {
    if (user) {
      nameAdmin(company, username);
      getPosts(company);
      setPostsEnd(false);
      user.photoURL && setImageURL(user.photoURL);
    }
  }, [company, id]);
  useEffect(() => {
    if (user) {
      nameAdmin(company, username);
      if (isAdmitted) {
        thingsIdincluded(company, username);
      }
    }
  }, [filteredPosts]);

  const thingsIdincluded = async function (target, who) {
    const docRef = doc(db, `companies/${target}/${who}`, 'what');

    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      setThings(docSnap.data().thingsId);
      if (things.includes(id)) {
        setIsAdmitted(true);
      } else {
        setIsAdmitted(false);
      }
    } else {
      // doc.data() will be undefined in this case
      console.log('No such document!');
    }
  };

  const nameAdmin = async function (target, who) {
    const docRef = doc(db, `companies`, target);

    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const admin = docSnap.data().admin;
      setUsers(docSnap.data().users);
      if (admin === who) {
        setIsAdmin(true);
      }
      if (docSnap.data().users.includes(who)) {
        setIsAdmitted(true);
      }
      console.log(who);
      console.log(users);
      console.log('isAdmitted:', isAdmitted);
    } else {
      // doc.data() will be undefined in this case
      console.log('No such document!');
    }
  };

  const delPosts = async function () {
    delThing(company, id);
    users.forEach((user) => {
      getUID(user);
    });
  };

  async function delPost(uid, title) {
    await deleteDoc(doc(db, `users/${uid}/${company}/${id}/posts`, title));
  }

  const getUID = async function (user) {
    const docRef = doc(db, 'usernames', user);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      console.log('Document data:', docSnap.data());
      const uid = docSnap.data().uid;
      const querySnapshot = await getDocs(
        collection(db, `users/${uid}/${company}/${id}/posts`)
      );
      querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        console.log(doc.id, ' => ', doc.data());
        delPost(uid, doc.id);
      });
      router.push('/');
    } else {
      // doc.data() will be undefined in this case
      console.log('No such document!');
    }
  };

  const getPosts = async function (company) {
    const postsQuery = query(
      collectionGroup(db, 'posts'),
      where('published', '==', true),
      where('company', '==', company),
      where('id', '==', id),
      orderBy('createdAt', 'desc'),
      limit(LIMIT)
    );
    const posts = (await getDocs(postsQuery)).docs.map(postToJson);
    setFilteredPosts(posts);
    return posts;
  };
  const getMorePosts = async function () {
    setLoading(true);
    const last = filteredPosts[filteredPosts.length - 1];
    const cursor =
      typeof last.createdAt === 'number'
        ? fromMillis(last.createdAt)
        : last.createdAt;
    const postsQuery = query(
      collectionGroup(db, 'posts'),
      where('published', '==', true),
      where('company', '==', company),
      where('id', '==', id),
      orderBy('createdAt', 'desc'),
      startAfter(cursor),
      limit(LIMIT)
    );
    const newPosts = (await getDocs(postsQuery)).docs.map(postToJson);
    setFilteredPosts(filteredPosts.concat(newPosts));
    setLoading(false);
    if (newPosts.length < LIMIT) {
      setPostsEnd(true);
    }
    return newPosts;
  };

  return (
    <div>
      <Navbar></Navbar>
      <div className="">
        <div className="hero is-fullheight has-background-grey-darker ">
          {!isAdmitted ? (
            <div className="section">
              <Link href="/login">
                <div className="columns">
                  <button className="button m-2">
                    Ehhez kérj hozzáférést az adminisztrátortól!
                  </button>
                  <button className="button is-primary m-2">
                    Bejelentkezés
                  </button>
                </div>
              </Link>
            </div>
          ) : (
            <AuthCheck>
              <div className="section">
                <div className="notification is-warning is-light">
                  <nav className="level">
                    <div className="level-item has-text-centered">
                      <div>
                        <p className="heading">Tulajdonos</p>
                        <div className="title">
                          <strong className="has-text-warning-dark is-capitalized is-size-3-desktop is-size-4-tablet">
                            {company}
                          </strong>
                        </div>
                      </div>
                    </div>
                    <div className="level-item has-text-centered">
                      <div>
                        <p className="heading">dolog azonosító</p>
                        <div className="">
                          <strong className="has-text-warning-dark is-capitalized is-size-3-desktop is-size-4-tablet">
                            {id}
                          </strong>
                        </div>
                      </div>
                    </div>

                    {isAdmin && (
                      <div className="level-item has-text-centered">
                        <div>
                          <p className="heading">
                            dolog és valamennyi hozzátartozó poszt törlése
                          </p>
                          <div className="">
                            <button
                              className="button is-danger is-light"
                              onClick={(event) => {
                                delPosts();
                              }}
                            >
                              Törlés
                            </button>
                          </div>
                        </div>
                      </div>
                    )}
                  </nav>
                </div>

                <PostFeed
                  posts={filteredPosts}
                  username={username}
                  company={company}
                ></PostFeed>

                <hr />
                {!loading && !postsEnd && (
                  <div className=" columns is-mobile">
                    <div className="column is-half is-offset-5">
                      {filteredPosts.length >= 1 && (
                        <button
                          className="button has-background-warning-light"
                          onClick={getMorePosts}
                        >
                          További posztok
                        </button>
                      )}
                    </div>
                  </div>
                )}
                {postsEnd && (
                  <div className=" columns is-mobile">
                    <div className="column is-half is-offset-5">
                      Nincs további poszt
                    </div>
                  </div>
                )}
                <article className="media">
                  <figure className="media-left">
                    <div className="image is-64x64">
                      <Image src={imageURL} alt="4" width={48} height={48} />
                    </div>
                  </figure>
                  <div className="media-content">
                    <div className="content">
                      <div className="">
                        <strong className="has-text-primary is-capitalized mr-2">
                          {username}{' '}
                        </strong>
                        <span className="">
                          <Link href="/admin">
                            <a className="button is-primary is-outlined">
                              <strong>Új poszt írás</strong>
                            </a>
                          </Link>
                        </span>
                      </div>
                    </div>
                    <div className="field"></div>
                  </div>
                </article>
              </div>
            </AuthCheck>
          )}
        </div>
      </div>
    </div>
  );
};

export default ComingFromQRCode;

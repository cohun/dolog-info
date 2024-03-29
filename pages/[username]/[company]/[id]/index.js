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
  const [isAdmitted2, setIsAdmitted2] = useState(false);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [users, setUsers] = useState([]);
  const [things, setThings] = useState([]);
  const [del, setDel] = useState(false);
  const { user, username } = useContext(UserContext);
  const router = useRouter();
  const { username: un, company, id } = router.query;

  useEffect(() => {
    if (user) {
      getPosts(company);
      setPostsEnd(false);
      user.photoURL && setImageURL(user.photoURL);
    }
  }, [company, id, isAdmitted2]);

  useEffect(() => {
    if (user) {
      nameAdmin(company, username);
    }
  }, [filteredPosts, username, users.length]);

  useEffect(() => {
    if (isAdmitted) {
      thingsIdincluded(company, username);
    }
    if (things.includes(id)) {
      console.log('here');
      setIsAdmitted(true);
    } else {
      if (isAdmin) {
        setIsAdmitted(true);
      } else {
        setIsAdmitted(false);
      }
    }
  }, [isAdmitted, things.length, username, company, isAdmitted2]);

  const thingsIdincluded = async function (target, who) {
    const docRef = doc(db, `companies/${target}/${who}`, 'what');

    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      console.log('things', docSnap.data().thingsId, id);
      setThings(docSnap.data().thingsId);
      console.log('th', things, '+', id);

      console.log('isAdmitted2:', isAdmitted);
      setIsAdmitted2(isAdmitted);
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
      console.log('un.', un);
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

  async function delHeart(uid, title, docId) {
    await deleteDoc(
      doc(db, `users/${uid}/${company}/${id}/posts/${title}/hearts`, docId)
    );
  }

  async function delHearts(uid, title) {
    const querySnapshot = await getDocs(
      collection(db, `users/${uid}/${company}/${id}/posts/${title}/hearts`)
    );
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      console.log(doc.id, ' => ', doc.data());
      delHeart(uid, title, doc.id);
    });
    delPost(uid, title);
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
        delHearts(uid, doc.id);
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
                        {del ? (
                          <div className="card has-background-link">
                            <div className="modal is-active">
                              <div className="modal-background"></div>
                              <div className="modal-card">
                                <header className="modal-card-head">
                                  <p className="modal-card-title has-text-danger">
                                    A dolog és a hozzátartozó valamennyi poszt
                                    törlése
                                  </p>
                                  <button
                                    className="delete"
                                    aria-label="close"
                                    onClick={() => setDel(false)}
                                  ></button>
                                </header>
                                <section className="modal-card-body">
                                  <p className="title">Biztos vagy benne?</p>
                                </section>
                                <footer className="modal-card-foot">
                                  <button
                                    onClick={() => delPosts()}
                                    className="button is-danger"
                                  >
                                    Igen, töröld
                                  </button>
                                  <button
                                    onClick={() => setDel(false)}
                                    className="button is-primary"
                                  >
                                    Vissza
                                  </button>
                                </footer>
                              </div>
                            </div>
                          </div>
                        ) : null}
                        <div>
                          <p className="heading">
                            dolog és valamennyi hozzátartozó poszt törlése
                          </p>
                          <div className="">
                            <button
                              className="button is-danger is-light"
                              onClick={(event) => {
                                setDel(!del);
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

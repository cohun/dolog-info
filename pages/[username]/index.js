import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import {
  collectionGroup,
  query,
  where,
  getDocs,
  limit,
  orderBy,
  startAfter,
} from 'firebase/firestore';
import { useEffect, useState } from 'react';
import Navbar from '../../components/Navbar';
import { useContext } from 'react';
import { UserContext } from '../../lib/context';
import UserProfile from '../../components/UserProfile';
import PostFeed from '../../components/PostFeed';
import { postToJson, fromMillis } from '../../lib/firebaseConfig';
import { db } from '../../lib/firebaseConfig';
import WhichCompany from '../../components/WhichCompany';
import AdminPostsPage from '../admin';

const LIMIT = 5;

const UserProfilePage = () => {
  const [imageURL, setImageURL] = useState(
    'https://bulma.io/images/placeholders/128x128.png'
  );
  const [loading, setLoading] = useState(false);
  const [postsEnd, setPostsEnd] = useState(false);
  const [chosen, setChosen] = useState(false);
  const [admin, setAdmin] = useState(false);
  const [company, setCompany] = useState('');
  const [filteredPosts, setFilteredPosts] = useState([]);
  const { user, username } = useContext(UserContext);
  useEffect(() => {
    if (company !== '') {
      getPosts(company);
      setPostsEnd(false);
      user.photoURL && setImageURL(user.photoURL);
    }
  }, [company]);

  const getPosts = async function (company) {
    const postsQuery = query(
      collectionGroup(db, 'posts'),
      where('published', '==', true),
      where('company', '==', company),
      orderBy('createdAt', 'desc'),
      limit(LIMIT)
    );
    const posts = (await getDocs(postsQuery)).docs.map(postToJson);

    console.log(posts);
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
          {!chosen ? (
            <WhichCompany
              username={username}
              setChosen={setChosen}
              setCompany={setCompany}
            >
              {' '}
            </WhichCompany>
          ) : (
            <div className="section">
              <div className="notification is-warning is-light">
                <nav className="level">
                  <div className="level-left">
                    <div className="level-item">
                      <p className="subtitle is-size-6">
                        <strong className="has-text-primary-dark is-capitalized">
                          {username}
                        </strong>
                        {'  '}
                        felhasználó
                        {'  '}
                        <strong className="has-text-warning-dark is-capitalized is-underlined">
                          {company}
                        </strong>{' '}
                        cégben az alábbi posztokat olvashatja:
                      </p>
                    </div>
                  </div>

                  <div className="" onClick={() => setChosen(false)}>
                    <p className="level-item">
                      <a className="button has-background-warning-dark has-text-warning-light">
                        Másik cég választása
                      </a>
                    </p>
                  </div>
                </nav>
              </div>
              <br />
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
                  <p className="image is-64x64">
                    <Image src={imageURL} alt="4" width={48} height={48} />
                  </p>
                </figure>
                <div className="media-content">
                  <div className="content">
                    <p>
                      <strong className="has-text-primary is-capitalized">
                        {username}{' '}
                      </strong>
                    </p>
                  </div>

                  <div className="field has-background-warning-light">
                    <p className="control ">
                      <textarea
                        rows={1}
                        className="textarea has-background-warning-light is-size-3"
                        placeholder="Add meg új posztod címét..."
                      ></textarea>
                    </p>
                  </div>
                  <div className="field">
                    <p className="control">
                      <Link href="/admin">
                        <a className="button is-primary">
                          <strong>Poszt írás</strong>
                        </a>
                      </Link>
                    </p>
                  </div>
                </div>
              </article>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserProfilePage;

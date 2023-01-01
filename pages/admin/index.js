import React, { useState } from 'react';
import toast from 'react-hot-toast';
import AuthCheck from '../../components/AuthCheck';
import kebabCase from 'lodash.kebabcase';
import { useContext } from 'react';
import { UserContext } from '../../lib/context';
import {
  collection,
  query,
  where,
  getDocs,
  orderBy,
  db,
} from 'firebase/firestore';
import PostFeed from '../../components/PostFeed';
import { postToJson, fromMillis } from '../../lib/firebaseConfig';
import PostList from '../../components/PostList';
import Navbar from '../../components/Navbar';
import { useRouter } from 'next/router';
import Image from 'next/image';

const AdminPostsPage = () => {
  const { user, username } = useContext(UserContext);
  return (
    <main>
      <AuthCheck>
        <Navbar />
        <div className="section">
          <h1 className="title has-text-centered has-text-grey-light is-underlined">
            Új poszt írás
          </h1>
          <article className="media">
            <figure className="media-left">
              <p className="image is-64x64">
                <Image
                  src={
                    user.photoURL
                      ? user.photoURL
                      : 'https://bulma.io/images/placeholders/128x128.png'
                  }
                  alt="4"
                  width={48}
                  height={48}
                />
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
                  <a className="button is-primary">
                    <strong>Poszt írás</strong>
                  </a>
                </p>
              </div>
            </div>
          </article>
          <PostList />
          <CreateNewPost />
        </div>
        <div className="section is-large"></div>
      </AuthCheck>
    </main>
  );
};

function CreateNewPost() {
  const router = useRouter();
  const { username } = useContext(UserContext);
  const [title, setTitle] = useState('');
  const slug = encodeURI(kebabCase(title));
  const isValid = title.length > 3 && title.length < 100;
}

export default AdminPostsPage;

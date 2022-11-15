import Head from "next/head";
import Image from "next/image";
import {
  collectionGroup,
  query,
  where,
  getDocs,
  limit,
} from "firebase/firestore";
import { useState } from "react";
import Navbar from "../../components/Navbar";
import { useContext } from "react";
import { UserContext } from "../../lib/context";
import UserProfile from "../../components/UserProfile";
import PostFeed from "../../components/PostFeed";
import { postToJson } from "../../lib/firebaseConfig";
import { orderBy } from "firebase/firestore";
import { db } from "../../lib/firebaseConfig";

const LIMIT = 1;

export async function getServerSideProps(context) {
  const postsQuery = query(
    collectionGroup(db, "posts"),
    where("published", "==", true, orderBy("createdAt", "desc"), limit(LIMIT))
  );
  const posts = (await getDocs(postsQuery)).docs.map(postToJson);
  console.log("getServerside_ " + posts[0]);
  return {
    props: { posts }, // will be passed to the page component as props
  };
}

const UserProfilePage = ({ posts }) => {
  const [imageURL, setImageURL] = useState(
    "https://bulma.io/images/placeholders/128x128.png"
  );

  const { user, username } = useContext(UserContext);

  return (
    <div>
      <Navbar></Navbar>
      <div className="">
        <div className="hero is-fullheight has-background-grey-darker ">
          <div className="section">
            <div className="notification is-warning is-light">
              <nav className="level">
                <div className="level-left">
                  <div className="level-item">
                    <p className="subtitle is-5">
                      <strong className="has-text-warning-dark is-capitalized">
                        {username}
                      </strong>{" "}
                      posztjaiban:
                    </p>
                  </div>
                  <div className="level-item">
                    <div className="field has-addons">
                      <p className="control">
                        <input className="input" type="text" placeholder="" />
                      </p>
                      <p className="control">
                        <button className="button">keresés</button>
                      </p>
                    </div>
                  </div>
                </div>

                <div className="level-right">
                  <p className="level-item">
                    <strong>All</strong>
                  </p>
                  <p className="level-item">
                    <a>Published</a>
                  </p>
                  <p className="level-item">
                    <a>Drafts</a>
                  </p>
                  <p className="level-item">
                    <a>Deleted</a>
                  </p>
                  <p className="level-item">
                    <a className="button is-success">New</a>
                  </p>
                </div>
              </nav>
            </div>
            <br />
            <PostFeed posts={posts}></PostFeed>

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
                      {username}{" "}
                    </strong>
                  </p>
                </div>

                <div className="field has-background-warning-light">
                  <p className="control">
                    <textarea
                      className="textarea has-background-warning-light"
                      placeholder="Add a comment..."
                    ></textarea>
                  </p>
                </div>
                <div className="field">
                  <p className="control">
                    <button className="button is-primary">Post comment</button>
                  </p>
                </div>
              </div>
            </article>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfilePage;

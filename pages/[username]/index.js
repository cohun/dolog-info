import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import {
  collectionGroup,
  query,
  where,
  getDocs,
  limit,
  orderBy,
  startAfter,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import { useContext } from "react";
import { UserContext } from "../../lib/context";
import UserProfile from "../../components/UserProfile";
import PostFeed from "../../components/PostFeed";
import {
  postToJson,
  fromMillis,
  getAllThingsForACompany,
} from "../../lib/firebaseConfig";
import { db } from "../../lib/firebaseConfig";
import WhichCompany from "../../components/WhichCompany";
import AdminPostsPage from "../admin";

const LIMIT = 5;

const UserProfilePage = () => {
  const [imageURL, setImageURL] = useState(
    "https://bulma.io/images/placeholders/128x128.png"
  );
  const [loading, setLoading] = useState(false);
  const [postsEnd, setPostsEnd] = useState(false);
  const [chosen, setChosen] = useState(false);
  const [admin, setAdmin] = useState(false);
  const [company, setCompany] = useState("");
  const [filteredPosts, setFilteredPosts] = useState([]);
  const { user, username } = useContext(UserContext);

  const [isActive2, setIsActive2] = useState("");
  const [things, setThings] = useState([]);
  const [chosen2, setChosen2] = useState("");
  const [desc, setDesc] = useState("");

  async function getAllThings() {
    if (company !== "") {
      const thin = await getAllThingsForACompany(company);
      setThings(thin);
    }
  }
  useEffect(() => {
    getAllThings();
  }, [isActive2]);

  useEffect(() => {
    if (company !== "") {
      getPosts(company);
      setPostsEnd(false);
      user.photoURL && setImageURL(user.photoURL);
    }
  }, [company]);

  const getPosts = async function (company) {
    const postsQuery = query(
      collectionGroup(db, "posts"),
      where("published", "==", true),
      where("company", "==", company),
      orderBy("createdAt", "desc"),
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
      typeof last.createdAt === "number"
        ? fromMillis(last.createdAt)
        : last.createdAt;
    const postsQuery = query(
      collectionGroup(db, "posts"),
      where("published", "==", true),
      where("company", "==", company),
      orderBy("createdAt", "desc"),
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

  function DropDown2() {
    const list2 = [];
    things.forEach((thing) => {
      list2.push(
        <div key={thing.id}>
          <a
            href="#"
            className="dropdown-item"
            onClick={() => {
              setChosen2(thing.id);
              setDesc(thing.description);
            }}
          >
            {thing.description} - {thing.id}
          </a>
          <hr className="dropdown-divider" />
        </div>
      );
    });
    return list2;
  }

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
              {" "}
            </WhichCompany>
          ) : (
            <div className="section">
              <div className="notification is-warning is-light">
                <nav className="level">
                  <div className="level-left">
                    <div className="level-item">
                      <div className="subtitle is-size-6">
                        <strong className="has-text-warning-dark is-capitalized is-underlined is-size-3">
                          {company}
                        </strong>{" "}
                        <strong className="has-text-warning-dark ml-4">
                          dolgaihoz írt posztok:
                        </strong>
                      </div>
                    </div>
                  </div>

                  <div
                    className={`dropdown ${isActive2}`}
                    onClick={(e) => {
                      e.preventDefault();
                      isActive2 === ""
                        ? setIsActive2("is-active")
                        : setIsActive2("");
                    }}
                  >
                    <div className="dropdown-trigger">
                      <button
                        className={
                          chosen2 === ""
                            ? "button has-background-warning-light has-text-warning-dark"
                            : "button is-warning-dark is-outlined"
                        }
                        aria-haspopup="true"
                        aria-controls="dropdown-menu"
                      >
                        <span className="has-text-warning-dark">
                          {chosen2 === ""
                            ? "Dolog kiválasztása"
                            : `${chosen2} - ${desc}`}
                        </span>
                        <span className="icon is-small">
                          <i
                            className="fas fa-angle-down"
                            aria-hidden="true"
                          ></i>
                        </span>
                      </button>
                    </div>
                    <div
                      className="dropdown-menu"
                      id="dropdown-menu"
                      role="menu"
                    >
                      <div className="dropdown-content">{DropDown2()}</div>
                    </div>
                  </div>

                  <div
                    className=""
                    onClick={() => {
                      setChosen2("");
                      setChosen(false);
                    }}
                  >
                    <div className="level-item">
                      <a className="button has-background-warning-dark has-text-warning-light">
                        Másik cég választása
                      </a>
                    </div>
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
                  <div className="image is-64x64">
                    <Image src={imageURL} alt="4" width={48} height={48} />
                  </div>
                </figure>
                <div className="media-content">
                  <div className="content">
                    <div className="">
                      <strong className="has-text-primary is-capitalized mr-2">
                        {username}{" "}
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
          )}
        </div>
      </div>
    </div>
  );
};

export default UserProfilePage;

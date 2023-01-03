import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import AuthCheck from "../../components/AuthCheck";
import kebabCase from "lodash.kebabcase";
import { useContext } from "react";
import { UserContext } from "../../lib/context";
import {
  collection,
  query,
  where,
  getDocs,
  orderBy,
  db,
} from "firebase/firestore";
import PostFeed from "../../components/PostFeed";
import {
  postToJson,
  fromMillis,
  getAllCompaniesForAUser,
  getAllThingsForACompany,
} from "../../lib/firebaseConfig";
import PostList from "../../components/PostList";
import Navbar from "../../components/Navbar";
import { useRouter } from "next/router";
import Image from "next/image";

const AdminPostsPage = () => {
  const { user, username } = useContext(UserContext);
  const [isActive, setIsActive] = useState("");
  const [companies, setCompanies] = useState([]);
  const [chosen, setChosen] = useState("");

  const [isActive2, setIsActive2] = useState("");
  const [things, setThings] = useState([]);
  const [chosen2, setChosen2] = useState("");
  const [desc, setDesc] = useState("");

  async function getAllCompanies() {
    const comp = await getAllCompaniesForAUser(username);
    setCompanies(comp);
  }

  async function getAllThings() {
    if (chosen !== "") {
      const thin = await getAllThingsForACompany(chosen);
      setThings(thin);
    }
  }

  useEffect(() => {
    getAllCompanies();
    DropDown();
  }, [isActive]);

  useEffect(() => {
    getAllThings();
  }, [isActive2]);

  function DropDown() {
    const list = [];
    companies.forEach((comp) => {
      list.push(
        <div key={comp.hash}>
          <a
            href="#"
            className="dropdown-item"
            onClick={() => {
              setChosen(comp.businessName);
              setChosen2("");
              setDesc("");
            }}
          >
            {comp.businessName} - {comp.address}
          </a>
          <hr className="dropdown-divider" />
        </div>
      );
    });
    return list;
  }

  function DropDown2(chosen) {
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
    <main>
      <AuthCheck>
        <Navbar />
        <div className="section has-background-black-ter">
          <div
            className={`dropdown ${isActive}`}
            onClick={(e) => {
              e.preventDefault();
              isActive === "" ? setIsActive("is-active") : setIsActive("");
            }}
          >
            <div className="dropdown-trigger">
              <button
                className={
                  chosen === "" ? "button" : "button is-primary is-outlined"
                }
                aria-haspopup="true"
                aria-controls="dropdown-menu"
              >
                <span className="has-text--primary">
                  {chosen === "" ? "Cég kiválasztása" : chosen}
                </span>
                <span className="icon is-small">
                  <i className="fas fa-angle-down" aria-hidden="true"></i>
                </span>
              </button>
            </div>
            <div className="dropdown-menu" id="dropdown-menu" role="menu">
              <div className="dropdown-content">{DropDown()}</div>
            </div>
          </div>
          {"  "}
          <div
            className={`dropdown ${isActive2}`}
            onClick={(e) => {
              e.preventDefault();
              isActive2 === "" ? setIsActive2("is-active") : setIsActive2("");
            }}
          >
            <div className="dropdown-trigger">
              <button
                className={
                  chosen2 === "" ? "button" : "button is-primary is-outlined"
                }
                aria-haspopup="true"
                aria-controls="dropdown-menu"
              >
                <span className="has-text--primary">
                  {chosen2 === ""
                    ? "Dolog kiválasztása"
                    : `${chosen2} - ${desc}`}
                </span>
                <span className="icon is-small">
                  <i className="fas fa-angle-down" aria-hidden="true"></i>
                </span>
              </button>
            </div>
            <div className="dropdown-menu" id="dropdown-menu" role="menu">
              <div className="dropdown-content">{DropDown2()}</div>
            </div>
          </div>

          <h1 className="is-size-4 has-text-weight-semibold has-text-centered has-text-info-light mt-2">
            Új poszt írás
          </h1>
          <article className="media">
            <figure className="media-left">
              <div className="image is-64x64">
                <Image
                  src={
                    user?.photoURL
                      ? user.photoURL
                      : "https://bulma.io/images/placeholders/128x128.png"
                  }
                  alt="4"
                  width={48}
                  height={48}
                />
              </div>
            </figure>
            <div className="media-content">
              <div className="content">
                <strong className="has-text-primary is-capitalized">
                  {username}{" "}
                </strong>
              </div>

              <div className="field has-background-warning-light">
                <div className="control ">
                  <textarea
                    rows={1}
                    className="textarea has-background-warning-light is-size-4"
                    placeholder="Add meg új posztod címét..."
                  ></textarea>
                </div>
              </div>
              <div className="field">
                <div className="control">
                  <a
                    className="button is-primary"
                    onClick={() => {
                      chosen === "" ? toast.error("Válassz egy céget") : null;
                    }}
                  >
                    <strong>Poszt írás</strong>
                  </a>
                </div>
              </div>
            </div>
          </article>
          <PostList username={username} company={chosen} />
          <hr />
          <CreateNewPost />
        </div>

        <div className="section has-background-black-ter is-large"></div>
      </AuthCheck>
    </main>
  );
};

function CreateNewPost() {
  const router = useRouter();
  const { username } = useContext(UserContext);
  const [title, setTitle] = useState("");
  const slug = encodeURI(kebabCase(title));
  const isValid = title.length > 3 && title.length < 100;
}

export default AdminPostsPage;

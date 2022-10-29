import Head from "next/head";
import Image from "next/image";
import { auth, provider } from "../../lib/firebaseConfig";
import { useState } from "react";
import { signOut } from "firebase/auth";
import { onAuthStateChanged } from "firebase/auth";
import { useRouter } from "next/router";
import Navbar from "../../components/Navbar";

const UserProfilePage = () => {
  const router = useRouter();

  const [name, setName] = useState(null);
  onAuthStateChanged(auth, (user) => {
    if (user) {
      setName(user.email);
      console.log(user);
    } else {
      setName(null);
    }
  });

  const SignOutButton = () =>
    signOut(auth)
      .then(() => {
        console.log("Signed out");
        user = {};
        router.push("/login");
        // Sign-out successful.
      })
      .catch((error) => {
        // An error happened.
      });
  return (
    <div>
      <Navbar></Navbar>
      <div className="section has-background-grey-darker">
        <article className="media">
          <figure className="media-left">
            <p className="image is-64x64">
              <Image
                src="https://bulma.io/images/placeholders/128x128.png"
                alt="1"
                width={64}
                height={64}
              />
            </p>
          </figure>
          <div className="media-content">
            <div className="content">
              <p className="has-text-white">
                <strong className="has-text-warning">Barbara Middleton</strong>
                <br />
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis
                porta eros lacus, nec ultricies elit blandit non. Suspendisse
                pellentesque mauris sit amet dolor blandit rutrum. Nunc in
                tempus turpis.
                <br />
                <small>
                  <a>Like</a> · <a>Reply</a> · 3 hrs
                </small>
              </p>
            </div>

            <article className="media">
              <figure className="media-left">
                <p className="image is-48x48">
                  <Image
                    src="https://bulma.io/images/placeholders/96x96.png"
                    alt="2"
                    width={48}
                    height={48}
                  />
                </p>
              </figure>
              <div className="media-content">
                <div className="content">
                  <p>
                    <strong className="has-text-warning">Sean Brown</strong>
                    <br />
                    Donec sollicitudin urna eget eros malesuada sagittis.
                    Pellentesque habitant morbi tristique senectus et netus et
                    malesuada fames ac turpis egestas. Aliquam blandit nisl a
                    nulla sagittis, a lobortis leo feugiat.
                    <br />
                    <small>
                      <a>Like</a> · <a>Reply</a> · 2 hrs
                    </small>
                  </p>
                </div>

                <article className="media">
                  Vivamus quis semper metus, non tincidunt dolor. Vivamus in mi
                  eu lorem cursus ullamcorper sit amet nec massa.
                </article>

                <article className="media">
                  Morbi vitae diam et purus tincidunt porttitor vel vitae augue.
                  Praesent malesuada metus sed pharetra euismod. Cras tellus
                  odio, tincidunt iaculis diam non, porta aliquet tortor.
                </article>
              </div>
            </article>

            <article className="media">
              <figure className="media-left">
                <p className="image is-48x48">
                  <Image
                    src="https://bulma.io/images/placeholders/96x96.png"
                    alt="3"
                    width={48}
                    height={48}
                  />
                </p>
              </figure>
              <div className="media-content">
                <div className="content">
                  <p>
                    <strong className="has-text-warning">Kayli Eunice </strong>
                    <br />
                    Sed convallis scelerisque mauris, non pulvinar nunc mattis
                    vel. Maecenas varius felis sit amet magna vestibulum euismod
                    malesuada cursus libero. Vestibulum ante ipsum primis in
                    faucibus orci luctus et ultrices posuere cubilia Curae;
                    Phasellus lacinia non nisl id feugiat.
                    <br />
                    <small>
                      <a>Like</a> · <a>Reply</a> · 2 hrs
                    </small>
                  </p>
                </div>
              </div>
            </article>
          </div>
        </article>

        <article className="media">
          <figure className="media-left">
            <p className="image is-64x64">
              <Image
                src="https://bulma.io/images/placeholders/128x128.png"
                alt="4"
                width={48}
                height={48}
              />
            </p>
          </figure>
          <div className="media-content">
            <div className="content">
              <p>
                <strong className="has-text-primary">{name} </strong>
              </p>
            </div>

            <div className="field">
              <p className="control">
                <textarea
                  className="textarea"
                  placeholder="Add a comment..."
                ></textarea>
              </p>
            </div>
            <div className="field">
              <p className="control">
                <button className="button">Post comment</button>
              </p>
            </div>
          </div>
        </article>
      </div>
    </div>
  );
};

export default UserProfilePage;

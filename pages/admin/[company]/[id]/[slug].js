import { useState } from 'react';
import { useRouter } from 'next/router';
import { useContext } from 'react';
import { UserContext } from '../../../../lib/context';

import ReactMarkdown from 'react-markdown';
import { useForm } from 'react-hook-form';
import Link from 'next/link';
import toast from 'react-hot-toast';
import AuthCheck from '../../../../components/AuthCheck';
import Navbar from '../../../../components/Navbar';
import ImageUploader from '../../../../components/ImageUploader';

import {
  getDoc,
  doc,
  updateDoc,
  deleteDoc,
  serverTimestamp,
} from 'firebase/firestore';
import { db } from '../../../../lib/firebaseConfig';

const AdminPostEdit = () => {
  const { user } = useContext(UserContext);
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

  const docRef = doc(db, `users/${uid}/${company}/${id}/posts`, slug);
  async function getPost() {
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
  getPost();

  return (
    <main className="">
      <div>
        <Navbar />

        {post && (
          <div className="section has-background-success-light has-text-black has-text-weight-strong">
            <div className="">
              <nav class="level">
                <div class="level-item has-text-centered">
                  <div>
                    <p class="heading">Tulajdonos</p>
                    <p class="subtitle">{post.company}</p>
                  </div>
                </div>
                <div class="level-item has-text-centered">
                  <div>
                    <p class="heading">dolog azonosító</p>
                    <p class="subtitle">{post.id}</p>
                  </div>
                </div>
              </nav>
              <nav class="level">
                <div class="level-item has-text-centered">
                  <div>
                    <p class="heading">Poszt címe</p>
                    <p class="title">{post.title}</p>
                  </div>
                </div>
              </nav>

              <PostForm
                postRef={docRef}
                defaultValues={post}
                preview={preview}
              />
            </div>

            <aside className="section level">
              <div className="level-item has-text-centered">
                <button
                  className="button "
                  onClick={() => setPreview(!preview)}
                >
                  {preview ? 'Szerkesztés' : 'Előnézet'}
                </button>
              </div>
              <div className="level-item has-text-centered">
                <Link
                  href={`/${post.username}/${company}/${post.id}/${post.slug}`}
                >
                  <button className="button is-link">Valós nézet</button>
                </Link>
              </div>
              <div className="level-item has-text-centered">
                <DeletePostButton postRef={docRef} />
              </div>
              <div className="level-item has-text-centered"></div>
              <div className="level-item has-text-centered"></div>
              <div className="level-item has-text-centered"></div>
              <div className="level-item has-text-centered"></div>
              <div className="level-item has-text-centered"></div>
            </aside>
          </div>
        )}

        <div className="section has-background-success-light is-large"></div>
        <div className="section has-background-success-light is-large"></div>
      </div>
    </main>
  );
}

function PostForm({ postRef, defaultValues, preview }) {
  const { register, errors, handleSubmit, formState, reset, watch } = useForm({
    defaultValues,
    mode: 'onChange',
  });

  const { isValid, isDirty } = formState;

  const updatePost = async ({ content, published }) => {
    await updateDoc(postRef, {
      content,
      published,
      updatedAt: serverTimestamp(),
    });

    reset({ content, published });

    toast.success('Post updated successfully!');
  };

  return (
    <form onSubmit={handleSubmit(updatePost)}>
      {preview ? (
        <div className="card">
          <div className="card-content">
            <div className="content">
              <ReactMarkdown>{watch('content')}</ReactMarkdown>
            </div>
          </div>
        </div>
      ) : (
        <div className="block">
          <ImageUploader
            company={defaultValues.company}
            id={defaultValues.id}
          />

          <textarea
            rows={15}
            className="textarea is-large is-primary"
            name="content"
            {...register('content', {
              maxLength: { value: 20000, message: 'túl hosszú a tartalom' },
              minLength: { value: 10, message: 'túl rövid a tartalom' },
              required: { value: true, message: 'írj valamit' },
            })}
          ></textarea>

          {errors && (
            <p className="has-text-danger">{errors.content.message}</p>
          )}

          <fieldset>
            <input
              className="checkbox mt-2"
              name="published"
              type="checkbox"
              {...register('published')}
            />
            <label>Publikálva</label>
          </fieldset>

          <button
            type="submit"
            className="button is-success mt-3"
            disabled={!isDirty || !isValid}
          >
            Változások mentése
          </button>
        </div>
      )}
    </form>
  );
}

function DeletePostButton({ postRef }) {
  const router = useRouter();

  const deletePost = async () => {
    const doIt = confirm('Biztos vagy benne?');
    if (doIt) {
      await deleteDoc(postRef);
      router.push('/admin');
      toast('poszt törölve ', { icon: '🗑️' });
    }
  };

  return (
    <button className="button is-danger" onClick={deletePost}>
      Törlés
    </button>
  );
}

export default AdminPostEdit;

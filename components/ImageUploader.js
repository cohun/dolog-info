import { useState } from 'react';
import { auth, storage } from '../lib/firebaseConfig';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';

import Loader from './Loader';

// Uploads images to Firebase Storage
export default function ImageUploader({ company, id }) {
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [downloadURL, setDownloadURL] = useState(null);

  // Creates a Firebase Upload Task
  const uploadFile = async (e) => {
    // Get the file
    const file = Array.from(e.target.files)[0];
    const extension = file.type.split('/')[1];

    // Makes reference to the storage bucket location

    const storageRef = ref(
      storage,
      `uploads/${auth.currentUser.uid}/${Date.now()}.${extension}`
    );
    setUploading(true);
    // Starts the upload
    const uploadTask = uploadBytesResumable(storageRef, file);

    // Listen to updates to upload task

    // Listen for state changes, errors, and completion of the upload.
    uploadTask.on(
      'state_changed',
      (snapshot) => {
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log('Upload is ' + progress + '% done');
        setProgress(progress);
        switch (snapshot.state) {
          case 'paused':
            console.log('Upload is paused');
            break;
          case 'running':
            console.log('Upload is running');
            break;
        }
      },
      (error) => {
        // A full list of error codes is available at
        // https://firebase.google.com/docs/storage/web/handle-errors
        switch (error.code) {
          case 'storage/unauthorized':
            // User doesn't have permission to access the object
            break;
          case 'storage/canceled':
            // User canceled the upload
            break;

          // ...

          case 'storage/unknown':
            // Unknown error occurred, inspect error.serverResponse
            break;
        }
      },
      () => {
        // Upload completed successfully, now we can get the download URL
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          console.log('File available at', downloadURL);
          setDownloadURL(downloadURL);
          setUploading(false);
        });
      }
    );
  };

  return (
    <div className="box">
      <Loader show={uploading} />
      {uploading && <h3>{progress}%</h3>}

      {!uploading && (
        <>
          <div className="file is-info">
            <label className="file-label">
              <input
                className="file-input"
                type="file"
                name="resume"
                onChange={uploadFile}
                accept="image/x-png,image/gif,image/jpeg, .pdf"
              />
              <span className="file-cta">
                <span className="file-icon">
                  <i className="fas fa-upload"></i>
                </span>
                <span className="file-label">📸 Válassz egy képet…</span>
              </span>

              <span className="mx-3">{'   '}</span>
              <span className="is-italic mt-2">
                a megjelenő letöltési linket másold be a szövegbe, ahol
                szeretnéd, hogy megjelenjen.
              </span>
            </label>
          </div>
        </>
      )}

      {downloadURL && (
        <code className="is-family-code">{`![alt](${downloadURL})`}</code>
      )}
    </div>
  );
}

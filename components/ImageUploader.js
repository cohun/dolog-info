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
    // const ref = storage.ref(`uploads/${auth.currentUser.uid}/${Date.now()}.${extension}`);

    const storageRef = ref(
      storage,
      `uploads/${
        auth.currentUser.uid
      }/${company}/${id}/${Date.now()}.${extension}`
    );
    setUploading(true);

    // Starts the upload
    // const task = ref.put(file);
    const uploadTask = uploadBytesResumable(storageRef, file);

    // Listen to updates to upload task
    /* task.on(STATE_CHANGED, (snapshot) => {
      const pct = ((snapshot.bytesTransferred / snapshot.totalBytes) * 100).toFixed(0);
      setProgress(pct);
    });
    // Get downloadURL AFTER task resolves (Note: this is not a native Promise)
    task
      .then((d) => ref.getDownloadURL())
      .then((url) => {
        setDownloadURL(url);
        setUploading(false);
      }); */

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
          <label className="btn">
            📸 Upload Img
            <input
              type="file"
              onChange={uploadFile}
              accept="image/x-png,image/gif,image/jpeg"
            />
          </label>
        </>
      )}

      {downloadURL && (
        <code className="upload-snippet">{`![alt](${downloadURL})`}</code>
      )}
    </div>
  );
}

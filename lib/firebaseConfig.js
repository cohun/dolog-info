// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import {
  getFirestore,
  limit,
  query,
  where,
  collection,
  getDocs,
  setDoc,
  doc,
  updateDoc,
  arrayUnion,
  arrayRemove,
  getDoc,
  onSnapshot,
} from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { getStorage } from 'firebase/storage';
import { GoogleAuthProvider } from 'firebase/auth';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
provider.setCustomParameters({
  prompt: 'select_account',
});

export const storage = getStorage(app);

export async function getUserWithUsername(username) {
  const q = query(
    collection(db, 'users'),
    where('username', '==', username, limit(1))
  );
  const userDoc = await getDocs(q);
  userDoc.forEach((doc) => {
    // doc.data() is never undefined for query doc snapshots
    console.log(doc.id, ' => ', doc.data());
  });
  console.log('Get: ' + userDoc[0]);
  return userDoc[0];
}

export function postToJson(doc) {
  const data = doc.data();
  return {
    ...data,
    createdAt: data.createdAt.toMillis(),
    updatedAt: data.updatedAt.toMillis(),
  };
}

export async function getCompanyFromHash(hash) {
  const companiesRef = collection(db, 'companies');
  const q = query(companiesRef, where('hash', '==', hash));

  const docSnap = await getDocs(q);
  let company = '';
  docSnap.forEach((doc) => {
    // doc.data() is never undefined for query doc snapshots
    if (doc.id) {
      company = doc.id;
    } else {
      // doc.data() will be undefined in this case
      console.log('No such document!');
    }
  });

  return company;
}

export async function getHashWhereAdmin(username) {
  const companiesRef = collection(db, 'companies');
  const q = query(companiesRef, where('admin', '==', username));

  const docSnap = await getDocs(q);
  let admin = [];

  docSnap.forEach((doc) => {
    // doc.data() is never undefined for query doc snapshots
    admin.push({ company: doc.id, hash: doc.data().hash });
    if (doc.id) {
    } else {
      // doc.data() will be undefined in this case
      console.log(docSnap[0]);
      console.log('No such document!');
    }
  });
  return admin;
}

export async function setUserToCompany(
  company,
  username,
  role = 'elbírálás alatt'
) {
  // Add a new document in collection "username"
  await setDoc(doc(db, `companies/${company}/${username}`, 'what'), {
    admittedAs: role,
  });
  const usersRef = doc(db, 'companies', company);
  await updateDoc(usersRef, { users: arrayUnion(username) });
}

export async function getAllUsersInCompany(target) {
  const docRef = doc(db, 'companies', target);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    return docSnap.data().users;
  } else {
    // doc.data() will be undefined in this case
    console.log('No such document!');
  }
}

export async function getUsersRole(target, username) {
  const docRef = doc(db, `companies/${target}/${username}`, 'what');
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    return docSnap.data().admittedAs;
  } else {
    // doc.data() will be undefined in this case
    console.log('No such document!');
  }
}

export async function updateRole(target, who, changeRole) {
  const roleRef = doc(db, `companies/${target}/${who}`, 'what');

  await updateDoc(roleRef, {
    admittedAs: changeRole,
  });
}

export async function setThing(company, description, id, remark, site, qrc) {
  await setDoc(doc(db, 'things', `${company} - ${id}`), {
    company: company,
    description: description,
    id: id,
    remark: remark,
    site: site,
    qrc: qrc,
  });
}

export async function getId(company, id) {
  const docRef = doc(db, 'things', `${company} - ${id}`);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    return true;
  } else {
    // doc.data() will be undefined in this case
    console.log('No such document!');
    return false;
  }
}

export async function getAllThingsForACompany(target) {
  const companiesRef = collection(db, 'things');
  const q = query(companiesRef, where('company', '==', target));

  const docSnap = await getDocs(q);
  let things = [];

  docSnap.forEach((doc) => {
    // doc.data() is never undefined for query doc snapshots
    things.push(doc.data());
    if (doc.data()) {
    } else {
      // doc.data() will be undefined in this case
      console.log('No such document!');
    }
  });
  return things;
}

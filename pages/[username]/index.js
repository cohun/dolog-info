import Head from 'next/head';
import Image from 'next/image';
import { auth, provider } from '../../lib/firebaseConfig';
import { useState } from 'react';
import { signOut } from 'firebase/auth';
import { useRouter } from 'next/router';
import Navbar from '../../components/Navbar';

const UserProfilePage = () => {
  const router = useRouter();

  const SignOutButton = () =>
    signOut(auth)
      .then(() => {
        console.log('Signed out');
        user = {};
        router.push('/login');
        // Sign-out successful.
      })
      .catch((error) => {
        // An error happened.
      });
  return (
    <div>
      <Navbar></Navbar>
      <div>UserProfilePage </div>;
      <button onClick={SignOutButton}>Kijelentkezés</button>
    </div>
  );
};

export default UserProfilePage;

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

const AdminPostsPage = () => {
  return (
    <main>
      <AuthCheck>
        <Navbar />
        <div className="section">
          <div>Admin posztok</div>
          <PostList />
          {/* <CreateNewPost /> */}
        </div>
      </AuthCheck>
    </main>
  );
};

function CreateNewPost() {
  console.log('create');
}

export default AdminPostsPage;

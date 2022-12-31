import React from 'react';
import toast from 'react-hot-toast';
import AuthCheck from '../../components/AuthCheck';

const AdminPostsPage = () => {
  return (
    <main>
      <AuthCheck>
        <div className="section">
          <div>AdminPostsPage</div>
          <button onClick={() => toast.success('Hello toast')}>
            Make me a toast
          </button>
        </div>
      </AuthCheck>
    </main>
  );
};

export default AdminPostsPage;

import React from 'react';
import toast from 'react-hot-toast';

const AdminPostsPage = () => {
  return (
    <div className="section">
      <div>AdminPostsPage</div>
      <button onClick={() => toast.success('Hello toast')}>
        Make me a toast
      </button>
    </div>
  );
};

export default AdminPostsPage;

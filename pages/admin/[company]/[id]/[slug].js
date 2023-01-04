import { useForm } from "react-hook-form";
import { useState } from "react";
import { useRouter } from "next/router";

import { useDocumentDataOnce } from "react-firebase-hooks/firestore";
import reactMarkdown from "react-markdown";
import Link from "next/link";
import toast from "react-hot-toast";
import AuthCheck from "../../../../components/AuthCheck";

const AdminPostEdit = () => {
  return (
    <AuthCheck>
      <PostManager />
    </AuthCheck>
  );
};

function PostManager() {
  const [preview, setPreview] = useState(false);

  const router = useRouter();
  const { slug } = router.query;

  return <div>AdminPostEdit</div>;
}

export default AdminPostEdit;

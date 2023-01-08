import { useState } from 'react';
import { useRouter } from 'next/router';
import { useContext } from 'react';
import { UserContext } from '../lib/context';

import ReactMarkdown from 'react-markdown';
import { useForm } from 'react-hook-form';
import Link from 'next/link';
import toast from 'react-hot-toast';
import Navbar from './Navbar';

const PostContent = ({ post }) => {
  const createdAt =
    typeof post?.createdAt === 'number'
      ? new Date(post?.createdAt)
      : post?.createdAt;

  return (
    <main className="">
      <div className="hero is-fullheight has-background-warning-light">
        <div className="section has-background-warning-light has-text-black has-text-weight-strong">
          <div className="">
            <span className="has-text-info">
              <span className="m-2">
                Írta:{' '}
                <Link href={`/${post.username}/`}>
                  <a className="text-info">@{post.username}</a>
                </Link>
              </span>
              {'     '}
              <span className="m-2">Az írás dátuma: {createdAt}</span>
            </span>
            <div className="card">
              <div className="card-content">
                <div className="content">
                  <h1 className="is-size-2 is-underlined">{post?.title}</h1>
                </div>
                <div className="content">
                  <ReactMarkdown>{post?.content}</ReactMarkdown>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default PostContent;

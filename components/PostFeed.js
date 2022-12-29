import Link from 'next/link';
import Image from 'next/image';

const PostFeed = ({ posts, admin }) => {
  return posts
    ? posts.map((post) => {
        return <PostItem post={post} key={post.slug} admin={admin} />;
      })
    : null;
};

function PostItem({ post, admin = false }) {
  // Naive method to calc word count and read time
  const wordCount = post?.content.trim().split(/\s+/g).length;
  const minutesToRead = (wordCount / 100 + 1).toFixed(0);

  return (
    <article className="media">
      <figure className="media-left">
        <p className="image is-64x64">
          <Image
            src="https://bulma.io/images/placeholders/128x128.png"
            alt="1"
            width={64}
            height={64}
          />
        </p>
      </figure>
      <div className="media-content">
        <div className="content">
          <p className="has-text-white">
            <Link href={`/${post.username}`}>
              <a>
                <strong className="has-text-warning">
                  Írta: @{post.username}
                </strong>
              </a>
            </Link>

            <br />
            <Link href={`/${post.username}/${post.slug}`}>
              <span className="has-text-white title">
                <a>{post.title}</a>
              </span>
            </Link>

            <br />
            <small>
              {wordCount} words · {minutesToRead} min read ·
              <span className="push-left">
                💗 {post.heartCount || 0} Hearts
              </span>
            </small>
            <br />
          </p>
        </div>

        {/* If admin view, show extra controls for user */}
        {admin && (
          <>
            <Link href={`/admin/${post.slug}`}>
              <h3>
                <button className="btn-blue">Edit</button>
              </h3>
            </Link>

            {post.published ? (
              <p className="text-success">Live</p>
            ) : (
              <p className="text-danger">Unpublished</p>
            )}
          </>
        )}
      </div>
    </article>
  );
}

export default PostFeed;

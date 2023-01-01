import Link from 'next/link';
import Image from 'next/image';

const PostFeed = ({ posts, username, company }) => {
  return posts
    ? posts.map((post) => {
        return (
          <PostItem
            post={post}
            key={post.slug}
            username={username}
            company={company}
          />
        );
      })
    : null;
};

function PostItem({ post, username, company }) {
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
            <Link href={`/${post.username}/${company}/${post.slug}`}>
              <a>
                {post.username === username ? (
                  <strong className="has-text-primary is-capitalized">
                    Írta: @{post.username} {'  '}{' '}
                  </strong>
                ) : (
                  <strong className="has-text-warning is-capitalized">
                    Írta: @{post.username} {'  '}{' '}
                  </strong>
                )}

                <span className="block m-3"></span>
                <span className="has-text-info">
                  {'  « '} Létrehozva:{' '}
                  {new Date(post.createdAt).toLocaleString('hu-HU')}
                  {' » '}
                </span>
                <span className="block m-3"></span>
                <span className="has-text-info">
                  {'  « '} Módosítva:{' '}
                  {new Date(post.updatedAt).toLocaleString('hu-HU')}
                  {' » '}
                </span>
              </a>
            </Link>

            <br />
            <Link href={`/${post.username}/${company}/${post.slug}`}>
              <span className="has-text-white title">
                <a>{post.title}</a>
              </span>
            </Link>

            <br />
            <small>
              {wordCount} szó · {minutesToRead} perc olvasás ·
              <span className="block ml-3">
                💗 {post.heartCount || 0} népszerűségi pont
              </span>
            </small>
            <br />
          </p>
        </div>

        {/* If admin view, show extra controls for user */}
        {username === post.username && (
          <>
            <Link href={`/admin/${post.slug}`}>
              <h3>
                <button className="button is-small is-primary">Edit</button>
              </h3>
            </Link>
          </>
        )}
      </div>
    </article>
  );
}

export default PostFeed;

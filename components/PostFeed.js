import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/router';

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
  const router = useRouter();
  // Naive method to calc word count and read time
  const wordCount = post?.content.trim().split(/\s+/g).length;
  const minutesToRead = (wordCount / 100 + 1).toFixed(0);

  function gotoSlug() {
    router.push({
      pathname: `/${post.username}/${company}/${post.id}/${post.slug}`,
    });
  }

  return (
    <article className="media">
      <figure className="media-left">
        <div className="image is-64x64">
          <Image
            src="https://bulma.io/images/placeholders/128x128.png"
            alt="1"
            width={64}
            height={64}
          />
        </div>
      </figure>
      <div className="media-content">
        <div className="content">
          <div className="has-text-white">
            <Link href={`/${post.username}/${company}/${post.id}/${post.slug}`}>
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
            <div onClick={gotoSlug}>
              <span className="has-text-white title">
                <a>{post.title}</a>
              </span>
            </div>

            <br />
            {post.published ? (
              <small>
                {wordCount} szó · {minutesToRead} perc olvasás ·
                <span className="block ml-3">
                  💗 {post.heartCount || 0} népszerűségi pont
                </span>
              </small>
            ) : (
              <span className="has-text-warning">
                {'  « '} Nem publikus még {' » '}
              </span>
            )}

            <br />
          </div>
        </div>

        {/* If admin view, show extra controls for user */}
        {username === post.username && (
          <>
            <Link href={`/admin/${company}/${post.id}/${post.slug}`}>
              <div>
                {post.published ? (
                  <button className="button is-small is-primary">Edit</button>
                ) : (
                  <button className="button is-small is-warning">Edit</button>
                )}
              </div>
            </Link>
          </>
        )}
      </div>
    </article>
  );
}

export default PostFeed;

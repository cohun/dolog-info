const PostFeed = ({ posts, admin }) => {
  return posts
    ? posts.map((post) => <div post={post} key={post.slug} admin={admin} />)
    : null;
};

export default PostFeed;

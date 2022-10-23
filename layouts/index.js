import Link from 'next/link';

const Layout = (props) => {
  return (
    <div>
      <Link href="/home">Home</Link>
      <Link href="/register">Register</Link>
      <Link href="/login">Login</Link>
    </div>
  );
};

export default Layout;

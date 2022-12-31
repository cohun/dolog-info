import Link from 'next/link';
import { useContext } from 'react';
import { UserContext } from '../lib/context';

// Component's children only shown to logged-in users
export default function AuthCheck(props) {
  const { username } = useContext(UserContext);

  return username
    ? props.children
    : props.fallback || (
        <div className="section">
          <Link href="/login">
            <div className="columns">
              <button className="button mr-2">
                Ehhez előbb be kell jelnetkezned!
              </button>
              <button className="button is-primary">Bejelentkezés</button>
            </div>
          </Link>
        </div>
      );
}

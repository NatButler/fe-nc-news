import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../contexts/UserContext';
import MainNav from './MainNav';
import './Header.css';

function Header() {
  const { currentUser } = useContext(UserContext);

  return (
    <header className="main-header">
      <section className="user-bar">
        <p>
          <strong>User:</strong> {currentUser.username}
        </p>
      </section>
      <h1>
        <Link to="/" className="heading-link">
          <span style={{ color: 'var(--red)' }}>NC</span>
          <br /> News
        </Link>
      </h1>
      <MainNav />
    </header>
  );
}

export default Header;

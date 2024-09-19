import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../contexts/UserContext';
import MainNav from './MainNav';
import './Header.css';

function Header() {
  const { currentUser } = useContext(UserContext);

  return (
    <header>
      <section className="user-bar">
        <p>
          <strong>Active user:</strong> {currentUser.username}
        </p>
      </section>
      <h1>
        <Link to="/" className="heading-link">
          NC News
        </Link>
      </h1>
      <MainNav />
    </header>
  );
}

export default Header;

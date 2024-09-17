import { NavLink } from 'react-router-dom';
import './MainNav.css';

function MainNav() {
  return (
    <nav className="main-nav">
      <NavLink to="/articles">Articles</NavLink>
    </nav>
  );
}

export default MainNav;

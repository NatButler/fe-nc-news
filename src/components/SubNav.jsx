import { NavLink } from 'react-router-dom';
import './SubNav.css';

function SubNav({ topics, currentTopic }) {
  return (
    <nav className="sub-nav">
      <ul className="sub-nav-list">
        {topics.map((topic) => (
          <li key={topic.slug}>
            <NavLink
              to={`/articles?topic=${topic.slug}`}
              className={({ isActive }) =>
                isActive && currentTopic === topic.slug ? 'active' : ''
              }
            >
              {topic.slug}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default SubNav;

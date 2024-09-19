import { Link } from 'react-router-dom';

function HomeScreen() {
  return (
    <>
      <p>Welcome to NC News!</p>
      <p>
        Please be aware, the initial load time when navigating to &quot;
        <Link to="/articles">Articles</Link>&quot; can be lengthy due to
        inactivity on the API.
      </p>
    </>
  );
}

export default HomeScreen;

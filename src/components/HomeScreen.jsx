import { Link } from 'react-router-dom';

function HomeScreen() {
  return (
    <section style={{ padding: '15px 10px 0' }}>
      <p>Welcome to NC News!</p>
      <p>
        Please be aware, the initial load time when navigating to &quot;
        <Link to="/articles">Articles</Link>&quot; can be lengthy due to
        inactivity on the API.
      </p>
    </section>
  );
}

export default HomeScreen;

import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import HomeScreen from './components/HomeScreen';
import Articles from './components/Articles';
import Article from './components/Article';
import NotFound from './components/NotFound';
import './App.css';

function App() {
  return (
    <>
      <a className="skip-to-content-link" href="#main">
        Skip to content
      </a>
      <Header />
      <main id="main">
        <Routes>
          <Route path="*" element={<NotFound />}></Route>
          <Route path="/" element={<HomeScreen />}></Route>
          <Route path="/articles" element={<Articles />}></Route>
          <Route path="/articles/:article_id" element={<Article />}></Route>
        </Routes>
      </main>
      <footer>
        <p>&copy; NC News 2024</p>
      </footer>
    </>
  );
}

export default App;

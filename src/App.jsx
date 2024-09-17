import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Articles from './components/Articles';
import Article from './components/Article';
import NotFound from './components/NotFound';
import './App.css';

function App() {
  return (
    <>
      <Header />
      <main>
        <Routes>
          <Route path="*" element={<NotFound />}></Route>
          <Route path="/" element={<Articles />}></Route>
          <Route path="/articles" element={<Articles />}></Route>
          <Route path="/articles/:article_id" element={<Article />}></Route>
        </Routes>
      </main>
    </>
  );
}

export default App;

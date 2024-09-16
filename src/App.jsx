import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Articles from './components/Articles';
import './App.css';

function App() {
  return (
    <>
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<Articles />}></Route>
          <Route path="/articles" element={<Articles />}></Route>
        </Routes>
      </main>
    </>
  );
}

export default App;

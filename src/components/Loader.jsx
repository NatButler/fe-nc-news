import './Loader.css';

function Loader({ children }) {
  return (
    <section>
      <p className="loader">Loading...</p>
      {children}
    </section>
  );
}

export default Loader;

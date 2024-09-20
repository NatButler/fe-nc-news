import './Loader.css';

function Loader({ children }) {
  return (
    <section>
      <p className="loader">
        Loading<span className="elipses">.</span>
      </p>
      {children}
    </section>
  );
}

export default Loader;

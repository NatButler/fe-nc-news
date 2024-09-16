import { useEffect, useState } from 'react';
import { getArticles } from '../utils/api';
import Loader from './Loader';
import './Articles.css';
import { Link } from 'react-router-dom';

function Articles() {
  const [articles, setArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    getArticles()
      .then((articlesData) => {
        setArticles(articlesData.articles);
        setIsLoading(false);
      })
      .catch((err) => console.log(err));
  }, []);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <>
      <h2>Articles</h2>
      <ul className="articles-list">
        {articles.map((article) => (
          <li key={article.article_id}>
            <Link to={`/articles/${article.article_id}`}>
              <article>
                <img src={article.article_img_url} alt={article.topic} />
                <h3>{article.title}</h3>
                <p>By {article.author}</p>
                <p>
                  <span className="topic">{article.topic}</span>
                </p>
              </article>
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
}

export default Articles;

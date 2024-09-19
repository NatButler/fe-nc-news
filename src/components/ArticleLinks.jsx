import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getArticles } from '../utils/api';
import Loader from './Loader';
import './ArticleLinks.css';

function ArticleLinks({ topic, article_id }) {
  const [articles, setArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getArticles(topic).then((articlesData) => {
      setArticles(articlesData.articles);
      setIsLoading(false);
    });
  }, [topic]);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <section className="article-links-wrapper">
      <h3>Links</h3>
      <ul>
        {articles.reduce((acc, article) => {
          if (+article_id !== article.article_id) {
            acc.push(
              <li key={article.article_id}>
                <h4>
                  <Link to={`/articles/${article.article_id}`}>
                    {article.title}
                  </Link>
                </h4>
              </li>
            );
          }
          return acc;
        }, [])}
      </ul>
    </section>
  );
}

export default ArticleLinks;

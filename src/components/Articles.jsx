import { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { getArticles, getTopics } from '../utils/api';
import SubNav from './SubNav';
import Loader from './Loader';
import './Articles.css';

function Articles() {
  const [articles, setArticles] = useState([]);
  const [topics, setTopics] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchParams, setSearchParams] = useSearchParams();

  const topic = searchParams.get('topic') || undefined;

  useEffect(() => {
    setIsLoading(true);
    Promise.all([getTopics(), getArticles(topic)])
      .then(([topicsData, articlesData]) => {
        setTopics(topicsData.topics);
        setArticles(articlesData.articles);
        setIsLoading(false);
      })
      .catch((err) => console.log(err));
  }, [topic]);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <>
      <SubNav topics={topics} currentTopic={topic} />
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

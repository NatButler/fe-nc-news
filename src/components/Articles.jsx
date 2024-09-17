import { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { getArticles, getTopics } from '../utils/api';
import { formatDateTimeString } from '../utils/helpers';
import SubNav from './SubNav';
import Loader from './Loader';
import NotFound from './NotFound';
import './Articles.css';

function Articles() {
  const [articles, setArticles] = useState([]);
  const [topics, setTopics] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchParams, setSearchParams] = useSearchParams();

  const topic = searchParams.get('topic') || undefined;
  const sort = searchParams.get('sort_by') || 'created_at';
  const order = searchParams.get('order') || 'DESC';

  const [sorting, setSorting] = useState(sort);
  const [ordering, setOrdering] = useState(order);

  useEffect(() => {
    setError('');
    setIsLoading(true);

    if (topic) {
      setSearchParams({ topic, sort_by: sorting, order: ordering });
    } else {
      setSearchParams({ sort_by: sorting, order: ordering });
    }

    Promise.all([getTopics(), getArticles(topic, sorting, ordering)])
      .then(([topicsData, articlesData]) => {
        setTopics(topicsData.topics);
        setArticles(articlesData.articles);
      })
      .catch((err) => {
        setError(err.response.data.msg);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [topic, sorting, ordering, setSearchParams]);

  const handleSortingSelected = (ev) => {
    setSorting(ev.target.value);
  };

  const handleOrderingSelected = (ev) => {
    setOrdering(ev.target.value);
  };

  if (isLoading) {
    return <Loader />;
  }

  if (error) {
    return <NotFound errorMsg={error} />;
  }

  return (
    <>
      <SubNav topics={topics} currentTopic={topic} />
      <h2>Articles</h2>
      <div className="sorting">
        <label htmlFor="sorting">Sort by:</label>
        <select id="sorting" onChange={handleSortingSelected} value={sorting}>
          <option value="created_at">Date</option>
          <option value="comment_count">Comment count</option>
          <option value="votes">Votes</option>
        </select>
        <label htmlFor="ordering">Order:</label>
        <select
          id="ordering"
          onChange={handleOrderingSelected}
          value={ordering}
        >
          <option value="DESC">Desc</option>
          <option value="ASC">Asc</option>
        </select>
      </div>
      <ul className="articles-list">
        {articles.map((article) => (
          <li key={article.article_id}>
            <Link to={`/articles/${article.article_id}`}>
              <article>
                <img src={article.article_img_url} alt={article.topic} />
                <h3>{article.title}</h3>
                <p className="created">
                  Created: {formatDateTimeString(article.created_at)}
                </p>
                <p className="author">By: {article.author}</p>
                <p className="votes">Votes: {article.votes}</p>
                <p className="comments">
                  Comment count: {article.comment_count}
                </p>
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

import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getArticle } from '../utils/api';
import { formatDateTimeString } from '../utils/helpers';
import Loader from './Loader';
import './Article.css';

function Article() {
  const { article_id } = useParams();
  const [article, setArticle] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getArticle(article_id).then((articleData) => {
      setArticle(articleData.article);
      setIsLoading(false);
    });
  }, [article_id]);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <article className="article">
      <h2>
        {article.title} <span className="heading-topic">{article.topic}</span>
      </h2>
      <p>Created: {formatDateTimeString(article.created_at)}</p>
      <img src={article.article_img_url} />
      <div className="votes">
        <p>
          <strong>Votes:</strong> {article.votes}
        </p>
      </div>
      <p>{article.body}</p>
      <p className="author">By {article.author}</p>
    </article>
  );
}

export default Article;

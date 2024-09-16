import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getArticle, incrementArticleVotes } from '../utils/api';
import { formatDateTimeString } from '../utils/helpers';
import Loader from './Loader';
import Comments from './Comments';
import './Article.css';

function Article() {
  const { article_id } = useParams();
  const [article, setArticle] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [votes, setVotes] = useState();
  const [error, setError] = useState('');

  useEffect(() => {
    getArticle(article_id).then((articleData) => {
      setArticle(articleData.article);
      setVotes(articleData.article.votes);
      setIsLoading(false);
    });
  }, [article_id]);

  const handleVoting = (vote) => {
    setError('');
    setVotes((currentVotes) => currentVotes + vote);
    incrementArticleVotes(article_id, vote).catch((err) => {
      setError('Voting unsuccessful!');
      if (vote < 0) {
        setVotes((currentVotes) => currentVotes + 1);
      } else {
        setVotes((currentVotes) => currentVotes - 1);
      }
    });
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <>
      <article className="article">
        <h2>
          {article.title} <span className="heading-topic">{article.topic}</span>
        </h2>
        <p>Created: {formatDateTimeString(article.created_at)}</p>
        <img src={article.article_img_url} />
        <div className="votes">
          <p>
            <strong>Votes:</strong> {votes}
            {error && <span className="error-msg">{error}</span>}
          </p>
          <div className="voting-buttons">
            <button type="button" onClick={() => handleVoting(1)}>
              Up vote
            </button>
            <button type="button" onClick={() => handleVoting(-1)}>
              Down vote
            </button>
          </div>
        </div>
        <p>{article.body}</p>
        <p className="author">By {article.author}</p>
        <div className="clearfix"></div>
      </article>
      <Comments article_id={article_id} />
    </>
  );
}

export default Article;

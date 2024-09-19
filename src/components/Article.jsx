import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getArticle, incrementArticleVotes } from '../utils/api';
import { formatDateTimeString } from '../utils/helpers';
import Loader from './Loader';
import Comments from './Comments';
import NotFound from './NotFound';
import './Article.css';

function Article() {
  const { article_id } = useParams();
  const [article, setArticle] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [votes, setVotes] = useState();
  const [error, setError] = useState('');
  const [votingError, setVotingError] = useState('');

  useEffect(() => {
    setError('');
    getArticle(article_id)
      .then((articleData) => {
        setArticle(articleData.article);
        setVotes(articleData.article.votes);
      })
      .catch((err) => {
        setError(err.response.data.msg);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [article_id]);

  const handleVoting = (vote) => {
    setVotingError('');
    setVotes((currentVotes) => currentVotes + vote);
    incrementArticleVotes(article_id, vote).catch((err) => {
      setVotingError('Voting unsuccessful!');
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

  if (error) {
    return <NotFound errorMsg={error} />;
  }

  return (
    <>
      <article className="article">
        <h2>
          {article.title} <span className="heading-topic">{article.topic}</span>
        </h2>
        <p>Created: {formatDateTimeString(article.created_at)}</p>
        <img
          src={article.article_img_url}
          alt={`article image on topic ${article.topic}`}
        />
        <div className="votes">
          <p>
            <strong>Votes:</strong> {votes}
            {votingError && <span className="error-msg">{votingError}</span>}
          </p>
          <div className="voting-buttons">
            <button
              type="button"
              className="up-vote"
              onClick={() => handleVoting(1)}
            >
              Up vote
            </button>
            <button
              type="button"
              className="down-vote"
              onClick={() => handleVoting(-1)}
            >
              Down vote
            </button>
          </div>
        </div>
        <div className="content">
          <p className="body">{article.body}</p>
          <p className="author">
            <em>By {article.author}</em>
          </p>
        </div>
        <div className="clearfix"></div>
      </article>
      <Comments article_id={article_id} />
    </>
  );
}

export default Article;

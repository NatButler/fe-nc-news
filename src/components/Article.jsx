import { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { getArticle, incrementArticleVotes } from '../utils/api';
import { UserContext } from '../contexts/UserContext';
import { formatDateTimeString } from '../utils/helpers';
import Loader from './Loader';
import Comments from './Comments';
import ArticleLinks from './ArticleLinks';
import NotFound from './NotFound';
import UpVoteSvg from './UpVoteSvg';
import DownVoteSvg from './DownVoteSvg';
import './Article.css';

function Article() {
  const { article_id } = useParams();
  const { currentUser } = useContext(UserContext);
  const [article, setArticle] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [votes, setVotes] = useState();
  const [error, setError] = useState('');
  const [votingError, setVotingError] = useState('');

  useEffect(() => {
    window.scrollTo(0, 0);
    setError('');
    setIsLoading(true);
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
            <strong>Likes:</strong> {votes}
            {votingError && <span className="error-msg">{votingError}</span>}
          </p>
          <div className="voting-buttons">
            <button
              type="button"
              className="up-vote"
              onClick={() => handleVoting(1)}
              disabled={article.author === currentUser.username}
            >
              <UpVoteSvg />
            </button>
            <button
              type="button"
              className="down-vote"
              onClick={() => handleVoting(-1)}
              disabled={article.author === currentUser.username}
            >
              <DownVoteSvg />
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
      <section className="layout-row">
        <div className="layout-column _75">
          <Comments article_id={article_id} />
        </div>
        <aside className="layout-column _25">
          <ArticleLinks topic={article.topic} article_id={article_id} />
        </aside>
      </section>
    </>
  );
}

export default Article;

import { useEffect, useState } from 'react';
import { getArticleComments } from '../utils/api';
import Loader from './Loader';
import './Comments.css';

function Comments({ article_id }) {
  const [comments, setComments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    getArticleComments(article_id)
      .then((commentsData) => {
        setComments(commentsData.comments);
        setIsLoading(false);
      })
      .catch((err) => console.log(err));
  }, [article_id]);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <section className="clearfix comments-wrapper">
      <h3>Comments</h3>
      <ul className="comments-list">
        {comments.map((comment) => (
          <li key={comment.comment_id}>
            <article>
              <p className="author">
                {comment.author} <span className="votes">{comment.votes}</span>
              </p>
              <p>{comment.body}</p>
            </article>
          </li>
        ))}
      </ul>
    </section>
  );
}

export default Comments;

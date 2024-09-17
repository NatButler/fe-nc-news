import { useEffect, useState, useContext } from 'react';
import { UserContext } from '../contexts/UserContext';
import { deleteComment, getArticleComments } from '../utils/api';
import Loader from './Loader';
import CommentForm from './CommentForm';
import './Comments.css';

function Comments({ article_id }) {
  const { currentUser } = useContext(UserContext);
  const [comments, setComments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingComment, setIsLoadingComment] = useState(false);
  const [isDeletingCommentId, setIsDeletingCommentId] = useState(false);
  const [deleteError, setDeleteError] = useState('');

  useEffect(() => {
    getArticleComments(article_id)
      .then((commentsData) => {
        setComments(commentsData.comments);
        setIsLoading(false);
      })
      .catch((err) => console.log(err));
  }, [article_id]);

  const handleDeleteComment = (comment_id) => {
    setDeleteError('');
    setIsDeletingCommentId(comment_id);
    deleteComment(comment_id)
      .then(() => {
        setComments(
          comments.filter((comment) => comment.comment_id !== comment_id)
        );
      })
      .catch((err) => {
        setDeleteError('It was not possible to delete the comment');
      })
      .finally(() => {
        setIsDeletingCommentId(false);
      });
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <section className="clearfix comments-wrapper">
      <h3>Comments ({comments.length})</h3>
      {isLoadingComment && <Loader />}
      {deleteError && <p className="error-msg">{deleteError}</p>}
      <ul className="comments-list">
        {comments.map((comment) => (
          <li key={comment.comment_id}>
            <article>
              <p className="author">
                {comment.author} <span className="votes">{comment.votes}</span>
              </p>
              <p>{comment.body}</p>
              {comment.author === currentUser.username && (
                <button
                  type="button"
                  className="delete-comment-button"
                  onClick={() => handleDeleteComment(comment.comment_id)}
                  disabled={isDeletingCommentId === comment.comment_id}
                >
                  {isDeletingCommentId === comment.comment_id
                    ? 'Deleting comment...'
                    : 'Delete comment'}
                </button>
              )}
            </article>
          </li>
        ))}
      </ul>
      <CommentForm
        article_id={article_id}
        setComments={setComments}
        setIsLoadingComment={setIsLoadingComment}
        currentUser={currentUser}
      />
    </section>
  );
}

export default Comments;

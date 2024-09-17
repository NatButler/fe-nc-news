import { useState } from 'react';
import { addComment } from '../utils/api';
import './CommentForm.css';

const initFormState = { body: '' };

function CommentForm({
  article_id,
  setComments,
  setIsLoadingComment,
  currentUser,
}) {
  const [formData, setFormData] = useState(initFormState);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (ev) => {
    ev.preventDefault();
    setIsSubmitting(true);
    setIsLoadingComment(true);
    setError('');
    addComment(article_id, formData, currentUser.username)
      .then((commentData) => {
        setComments((currentComments) => [
          commentData.comment,
          ...currentComments,
        ]);
        setFormData(initFormState);
      })
      .catch((err) => {
        setError("It wasn't possible to post your comment");
      })
      .finally(() => {
        setIsLoadingComment(false);
        setIsSubmitting(false);
      });
  };

  const handleInput = (ev) => {
    setFormData({
      ...formData,
      [ev.target.name]: ev.target.value,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="comment-form">
      <h4>Add a comment</h4>
      {error && <span className="error-msg">{error}</span>}
      <label htmlFor="comment">Comment:</label>
      <textarea
        name="body"
        id="comment"
        rows="6"
        onChange={handleInput}
        value={formData.body}
        required
      ></textarea>
      <button type="submit" disabled={isSubmitting}>
        Submit
      </button>
    </form>
  );
}

export default CommentForm;

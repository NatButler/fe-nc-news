import axios from 'axios';

const newsApi = axios.create({
  baseURL: 'https://nc-news-xo72.onrender.com/api',
});

export const getArticles = (topic, sorting, ordering) => {
  return newsApi
    .get('/articles', {
      params: {
        topic,
        sort_by: sorting,
        order: ordering,
      },
    })
    .then((response) => response.data);
};

export const getArticle = (articleId) => {
  return newsApi
    .get(`/articles/${articleId}`)
    .then((response) => response.data);
};

export const getArticleComments = (articleId) => {
  return newsApi
    .get(`/articles/${articleId}/comments`)
    .then((response) => response.data);
};

export const incrementArticleVotes = (articleId, vote) => {
  const voteBody = {
    inc_votes: vote,
  };
  return newsApi
    .patch(`/articles/${articleId}`, voteBody)
    .then((response) => response.data);
};

export const addComment = (articleId, formData, username) => {
  const postBody = {
    ...formData,
    username,
  };
  return newsApi
    .post(`/articles/${articleId}/comments`, postBody)
    .then((response) => response.data);
};

export const deleteComment = (commentId) => {
  return newsApi
    .delete(`/comments/${commentId}`)
    .then((response) => response.data);
};

export const getTopics = () => {
  return newsApi.get('/topics').then((response) => response.data);
};

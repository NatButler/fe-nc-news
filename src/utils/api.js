import axios from 'axios';

const newsApi = axios.create({
  baseURL: 'https://nc-news-xo72.onrender.com/api',
});

export const getArticles = () => {
  return newsApi.get('/articles').then((response) => response.data);
};

export const getArticle = (articleId) => {
  return newsApi
    .get(`/articles/${articleId}`)
    .then((response) => response.data);
};

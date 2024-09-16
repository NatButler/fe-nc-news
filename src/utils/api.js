import axios from 'axios';

const newsApi = axios.create({
  baseURL: 'https://nc-news-xo72.onrender.com/api',
});

export const getArticles = () => {
  return newsApi.get('/articles').then((response) => response.data);
};

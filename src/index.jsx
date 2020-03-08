import React from 'react';
import ReactDom from 'react-dom';
import axios from 'axios';

import App from 'components/Editor/Editor';
import AppHelmet from 'components/Helmet';

if (process.env.NODE_ENV === 'development') {
  axios.defaults.baseURL = process.env.APP_API_DEVELOPMENT;
} else axios.defaults.baseURL = process.env.APP_API_PRODUCTION;

ReactDom.render(
  <>
    <AppHelmet />
    <App />
  </>,
  document.getElementById('root')
);

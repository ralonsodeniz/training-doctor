import React from 'react';
import { Helmet } from 'react-helmet';

const AppHelmet = () => (
  <Helmet>
    <meta charSet="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta name="theme-color" content="#000000" />
    <meta name="description" content="Training Doctor" />
    <title>Training Doctor</title>
  </Helmet>
);

export default AppHelmet;

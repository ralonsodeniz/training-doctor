const functions = require('firebase-functions');
const app = require('express')();
const cors = require('cors');

const { db } = require('./helpers/admin');
const { FBAuth } = require('./helpers/middlewares');
const {
  signUp,
  login,
  googleLogin,
} = require('./handlers/userHandlers');

const {
  getAllCategories,
  getCategory,
  getPathology,
  postTest,
} = require('./handlers/dataHandlers');

app.use(cors());

// user routes
app.post('/signup', signUp);
app.post('/login', login);
app.post('/googlelogin', googleLogin);

// data routes
app.get('/categories/:category', getCategory);
app.get('/categories', getAllCategories);
app.get('/categories/:category/:pathology', getPathology);
app.post('/categories/cardiology/zAMkcZdM9xrSCeoIpTpU', postTest);

exports.api = functions.region('europe-west1').https.onRequest(app);

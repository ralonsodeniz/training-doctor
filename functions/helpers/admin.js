const admin = require('firebase-admin');

const serviceAccount = require('../config/training-doctor-firebase-adminsdk-jvc5r-a1152064b0.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://training-doctor.firebaseio.com',
  storageBucket: 'training-doctor.appspot.com',
  projectId: 'training-doctor',
});

const db = admin.firestore();
const storage = admin.storage();

module.exports = {
  admin,
  db,
  storage,
};

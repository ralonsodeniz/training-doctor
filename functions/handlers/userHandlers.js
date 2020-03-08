const firebase = require('firebase');
const BusBoy = require('busboy');
const path = require('path');
const os = require('os');
const fs = require('fs');

const { db, storage } = require('../helpers/admin');
const {
  validateSignupData,
  validateLoginData,
  reduceUserDetails,
} = require('../helpers/helpers');
const { firebaseConfig } = require('../config/config');

firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();

exports.signUp = async (req, res) => {
  const signUpData = {
    email: req.body.email,
    password: req.body.password,
    confirmPassword: req.body.confirmPassword,
    handle: req.body.handle,
  };

  const { errors, valid } = validateSignupData(signUpData);
  if (!valid) return res.status(400).json(errors);

  const noImg = 'defaults/no-image.webp';

  try {
    const userQuerySnaphot = await db
      .collection('users')
      .where('handle', '==', req.body.handle)
      .get();

    if (userQuerySnaphot.docs.length > 0)
      return res
        .status(400)
        .json({ handle: 'this user name is already taken' });

    const { user } = await auth.createUserWithEmailAndPassword(
      signUpData.email,
      signUpData.password
    );

    const userIdToken = await user.getIdToken();
    const userCredentials = {
      handle: signUpData.handle,
      email: signUpData.email,
      createdAt: new Date().toISOString(),
      imageUrl: `https://firebasestorage.googleapis.com/v0/b/${
        firebaseConfig.storageBucket
      }/o/${encodeURIComponent(noImg)}?alt=media`,
      userId: user.uid,
      providerId: user.providerData[0].providerId,
      emailVerified: user.emailVerified,
    };

    const userRef = db.doc(`users/${user.uid}`);
    await userRef.set(userCredentials);
    return res.status(201).json({ token: userIdToken });
  } catch (error) {
    if (error.code === 'auth/email-already-in-use')
      return res.status(400).json({ email: 'email is alredyin use' });
    return res
      .status(500)
      .json({ general: 'something went wrong, pelease try again' });
  }
};

exports.login = async (req, res) => {
  const loginData = {
    email: req.body.email,
    password: req.body.password,
  };

  const { errors, valid } = validateLoginData(loginData);
  if (!valid) return res.status(400).json(errors);

  try {
    const { user } = await auth.signInWithEmailAndPassword(
      loginData.email,
      loginData.password
    );
    const userIdToken = await user.getIdToken();
    return res.json({ token: userIdToken });
  } catch (error) {
    return res
      .status(403)
      .json({ general: 'wrong credentials, please try again' });
  }
};

exports.googleLogin = async (req, res) => {
  const { idToken } = req.body;
  try {
    const googleCredential = firebase.auth.GoogleAuthProvider.credential(
      idToken
    );

    const { user } = await auth.signInWithCredential(
      googleCredential
    );

    const userQuerySnapshot = await db
      .collection('users')
      .where('handle', '==', user.displayName)
      .get();

    const userRef = db.doc(`users/${user.uid}`);
    const userSnapshot = await userRef.get();
    if (!userSnapshot.exists) {
      const userCredentials = {
        handle:
          userQuerySnapshot.docs.length > 0
            ? `${user.displayName} ${userQuerySnapshot.docs.length}`
            : user.displayName,
        email: user.email,
        createdAt: new Date().toISOString(),
        imageUrl: user.photoURL,
        userId: user.uid,
        providerId: user.providerData[0].providerId,
        emailVerified: user.emailVerified,
      };
      await userRef.set(userCredentials);
    }
    const userIdToken = await user.getIdToken();
    return res.status(201).json({ token: userIdToken });
  } catch (error) {
    return res
      .status(500)
      .json({ general: 'something went wrong, pelease try again' });
  }
};

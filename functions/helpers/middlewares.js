const { db, admin } = require('../helpers/admin');

exports.FBAuth = async (req, res, next) => {
  const IdToken =
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer ')
      ? req.headers.authorization.split('Bearer ')[1]
      : null;

  if (IdToken === null)
    return res.status(403).json({ error: 'unauthorized' });

  try {
    const decodedToken = await admin.auth().verifyIdToken(IdToken);
    const userSnapshotQueryObj = await db
      .collection('users')
      .where('userId', '==', req.user.uid)
      .limit(1)
      .get();
    const userSnapshot = userSnapshotQueryObj[0];
    req.user = decodedToken;
    req.user.handle = userSnapshot.data().handle;
    req.user.imageUrl = userSnapshot.data().imageUrl;
    return next();
  } catch (error) {
    return res.status(404).json(error);
  }
};

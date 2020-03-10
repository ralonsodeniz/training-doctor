const { db } = require('../helpers/admin');

exports.getCategory = async (req, res) => {
  const { category } = req.params;
  try {
    const collectionRef = db.collection(`${category}`).orderBy('pathology', 'asc');
    const collectionSnapshot = await collectionRef.get();
    const categoryArray = collectionSnapshot.docs.map(doc => ({
      pathology: doc.data().pathology,
      id: doc.data().id,
    }));
    return res.json({ categoryArray });
  } catch (error) {
    return res.status(500).json({ general: 'something went wrong, please try again' });
  }
};

exports.getAllCategories = async (req, res) => {
  try {
    const collectionsList = await db.listCollections();
    // we need the await Promise.all because in each iteration of the map there is a promise that has to be resolved and then the data returned is procesed
    const collectionsArray = await Promise.all(
      collectionsList.map(async collectionRef => {
        const collectionSnapshot = await collectionRef.get();
        const categoryDocs = collectionSnapshot.docs.map(doc => ({
          pathology: doc.data().pathology,
          id: doc.data().id,
        }));
        const categoryObj = {
          category: collectionRef.id,
          categoryDocs,
        };
        return categoryObj;
      })
    );
    const categories = collectionsArray.filter(categoryObj => categoryObj.category !== 'users');
    return res.json({ categories });
  } catch (error) {
    return res.status(500).json({ general: 'something went wrong, please try again' });
  }
};

exports.getPathology = async (req, res) => {
  const { category, pathology } = req.params;
  try {
    const pathologyRef = db.doc(`/${category}/${pathology}`);
    const pathologySnapshot = await pathologyRef.get();
    const pathologyData = pathologySnapshot.data();
    return res.json({ pathologyData });
  } catch (error) {
    return res.status(500).json({ general: 'something went wrong, please try again' });
  }
};

exports.postPathology = async (req, res) => {
  const { data } = req.body;
  const { category, pathology, section } = req.params;
  try {
    const pathologyRef = db.doc(`${category.toLowerCase()}/${pathology.toLowerCase()}`);
    await pathologyRef.set(
      {
        pathology,
        [section]: data,
      },
      { merge: true }
    );
    const pathologyData = (await pathologyRef.get()).data();
    return res.json({ pathologyData });
  } catch (error) {
    return res.status(500).json({ general: 'something went wrong, please try again' });
  }
};

exports.postTest = async (req, res) => {
  if (req.body.text.trim() === '') {
    return res.status(400).json({ body: ' must not be empty' });
  }
  try {
    const docRef = db.doc('cardiology/zAMkcZdM9xrSCeoIpTpU');
    await docRef.update({ test: req.body.text });
    return res.json({ message: 'updated' });
  } catch (error) {
    return res.status(500).json({ general: 'something went wrong, please try again' });
  }
};

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
    const pathologyQueryObj = await db
      .collection(`${category}`)
      .where('pathology', '==', pathology)
      .limit(1)
      .get();
    const pathologyData = pathologyQueryObj.docs[0].data();
    return res.json({ pathologyData });
  } catch (error) {
    return res.status(500).json({ general: 'something went wrong, please try again' });
  }
};

exports.postPathology = async (req, res) => {
  const { data } = req.body;
  const { category, pathology, section } = req.params;
  try {
    const pathologyQueryObj = await db
      .collection(`${category}`)
      .where('pathology', '==', pathology)
      .limit(1)
      .get();

    let pathologyRef = null;

    if (!pathologyQueryObj.empty) {
      pathologyRef = db.doc(`${category.toLowerCase()}/${pathologyQueryObj.docs[0].id}`);
    } else pathologyRef = db.collection(`${category}`).doc();

    await pathologyRef.set(
      {
        pathology,
        category,
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

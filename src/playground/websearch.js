export default (searchField, db) => {
  const matches = db.filter(website => website.includes(searchField));
  return matches.length > 3 ? matches.slice(0, 3) : matches;
};

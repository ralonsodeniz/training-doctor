export default (id, source, callback) => {
  // we get the first script element of the document
  const element = document.getElementsByTagName('scripts')[0];
  const fjs = element;
  let js = element;
  js = document.createElement('script');
  js.id = id;
  js.src = source;
  if (fjs && fjs.parentNode) {
    fjs.parentNode.insertBefore(js, fjs);
  } else {
    document.head.appendChild(js);
  }
  js.onload = callback;
};

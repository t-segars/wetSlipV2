import Hoodie from '@hoodie/client';
const hoodieInstance = new Hoodie({
  url: 'https://hireaboat.herokuapp.com',
  PouchDB: require('pouchdb-browser').default
});
const hoodie = () => hoodieInstance;

// For browser console debugging purposes
window.hoodie = hoodieInstance;
window.account = hoodieInstance.account;
window.store = hoodieInstance.store;

export default hoodie;

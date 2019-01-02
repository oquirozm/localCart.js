const cartStorage = {
  save(data) {
    // save data to local storage.
    let json = JSON.stringify(data);
    localStorage.setItem('tcbCart', json);
  },
  get() {
    // get data from local storage.
    return localStorage.getItem('tcbCart') !== null
      ? JSON.parse(localStorage.getItem('tcbCart'))
      : [];
  },
  // clear data in local storage
  clear() {
    localStorage.setItem('tcbCart', '{}');
  },
};

module.exports = cartStorage;

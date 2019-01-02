/*
 * Check if an object with an id qual to the one provided exists in a given array
 */
function idExistsInArray(array, id) {
  return array.some(el => el.id === id);
}

/*
 * Generate a random int inside the range of min and max
 */
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

/*
 * Extract the expected data attributes from the NodeElement
 */
function getDataAttributes(element) {
  let randomId = getRandomInt(100, 500);
  return {
    id: element.dataset.numberId || randomId,
    name: element.dataset.name || 'Product',
    slug: element.dataset.slug || 'product' + randomId.toString(),
    type: element.dataset.type || 'undefined',
  };
}

/*
 * Wait for the dom and elements to the fully loaded before executing the function passed
 */
function ready(fn) {
  if (
    document.attachEvent
      ? document.readyState === 'complete'
      : document.readyState !== 'loading'
  ) {
    fn();
  } else {
    document.addEventListener('DOMContentLoaded', fn);
  }
}

module.exports = {
  idExistsInArray,
  getDataAttributes,
  ready,
};

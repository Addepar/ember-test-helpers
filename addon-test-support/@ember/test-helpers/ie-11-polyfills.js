// @ts-nocheck
/**
 * Polyfills Array.prototype.find for ie11 without mocking the app during test execution
 * @param {array} array to find an element
 * @param {predicate} predicate function to find the element
 * @returns {(number | string | array | function)} found element inside the array
 */
export function find(array, predicate) {
  return Array.prototype.find ? array.find(predicate) : array.filter(predicate)[0];
}

/**
 * Polyfills Array.from for ie11 without mocking the app during test execution
 * @param {array} nodeList like data structure(e.g. NodeList)
 * @returns {array} parameter converted to a JS array
 */
export function toArray(nodeList) {
  return Array.from ? Array.from(nodeList) : toArrayPolyfill(nodeList);
}

/**
 * @private
 * Polyfills Array.from for ie11 without mocking the app during test execution
 * @param {array} nodeList like data structure(e.g. NodeList)
 * @returns {array} parameter converted to a JS array
 */
function toArrayPolyfill(nodeList) {
  let array = new Array(nodeList.length);
  for (let i = 0; i < nodeList.length; i++) {
    array[i] = nodeList[i];
  }
  return array;
}
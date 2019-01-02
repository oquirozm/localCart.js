/*
|--------------------------------------------------------------------------
| localCart.js
|--------------------------------------------------------------------------
|
| JS implementation of a shopping cart. Easily connectable to any kind of storage.
|
| Instructions:
|
| To get started require the cart and initialize it with new passing to it
| the storage method that you want to use. Defaults to localStorage.
|
| To use any other storage you must pass an object with the follwoing three methods:
| save (saves the cart items array to the storage), get (gets an array with all the cart items from the storage), clear (emptties the cart on the storage)
|
| For most cases you'll probably have to write your own conenctor to translate between localCart.js
| and your storage method.

| The current implementation of the cart doesn't allow for quantities, only unique items in the cart.
*/

let Cart = require("./lib/cart.js");

module.exports = Cart;

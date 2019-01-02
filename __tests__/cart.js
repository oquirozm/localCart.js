/*
|--------------------------------------------------------------------------
| Cart API test
|--------------------------------------------------------------------------
*/

const Cart = require('../src/scripts/lib/cart');

const demoCartItems = [
  {
    id: 1,
    name: 'Item 1',
    slug: 'item-1',
  },
  {
    id: 2,
    name: 'Item 2',
    slug: 'item-2',
  },
  {
    id: 3,
    name: 'Item 3',
    slug: 'item-3',
  },
];

const itemToAdd = {
  id: 4,
  name: 'Item 4',
  slug: 'item-4',
};

/*
 * Tests for the Cart's initialization.
 */
test('after initializing newCart an object is returned', () => {
  expect(typeof new Cart()).toBe('object');
});

/*
 * Tests for the .getAllItems method.
 */
test('getAllItems should return an array of items', () => {
  let cart = new Cart(null, demoCartItems);
  expect(Array.isArray(cart.getAllItems())).toBe(true);
});
test('getAllItems should return an array equal to the array that was passed on initialization', () => {
  let cart = new Cart(null, demoCartItems);
  expect(cart.getAllItems()).toEqual(demoCartItems);
});

/*
 * Tests for the .addItem method.
 */
test('addItem should add an item to the cart', () => {
  let cart = new Cart(null, demoCartItems);
  cart.addItem(itemToAdd);
  let cartItems = cart.getAllItems();
  expect(cartItems.length).toBe(4);
  expect(cartItems[cartItems.length - 1]).toEqual(itemToAdd);
});

/*
 * Tests for the .getItem method.
 */
test('getItem should return a single item object.', () => {
  let cart = new Cart(null, demoCartItems);
  let item = cart.getItem(2);
  expect(item.id).toBe(2);
  expect(item).toEqual(demoCartItems[2 - 1]);
});

/*
 * Tests for the .removeItem method.
 */
test('removeItem should remove an item from the cart.', () => {
  let cart = new Cart(null, demoCartItems);
  cart.removeItem(2);
  let items = cart.getAllItems();
  expect(items.length).toBe(2);
  expect(items).toEqual(
    expect.not.arrayContaining(demoCartItems.filter(item => item.id === 2))
  );
});

/*
 * Tests for .updateItem method.
 */
test('updateItem should update correctly an item', () => {
  let cart = new Cart(null, demoCartItems);
  cart.updateItem(2, { name: 'Neil Young Concert' });
  let item = cart.getItem(2);
  expect(item.name).toBe('Neil Young Concert');
});

/*
 * Tests for .clear method
 */
test('clear should set the items to an empty array.', () => {
  let cart = new Cart(null, demoCartItems);
  cart.clear();
  expect(cart.getAllItems()).toEqual([]);
});

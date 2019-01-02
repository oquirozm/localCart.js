/*
|--------------------------------------------------------------------------
| Cart API test
|--------------------------------------------------------------------------
*/

const { Cart, newCart } = require('../src/scripts/lib/cart');

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

test('after initializing Cart an object is returned', () => {
  expect(typeof new Cart()).toBe('object');
});
test('after initializing newCart an object is returned', () => {
  expect(typeof new newCart()).toBe('object');
});

/*
 * Cart initializes correctly with passed down items.
 */
test('getAllItems should return an array of items', () => {
  let Cart = new newCart(null, demoCartItems);
  expect(Array.isArray(Cart.getAllItems())).toBe(true);
});
test('getAllItems should return an array equal to the array that was passed on initialization', () => {
  let Cart = new newCart(null, demoCartItems);
  expect(Cart.getAllItems()).toEqual(demoCartItems);
});

test('addItem should add an item to the cart', () => {
  let Cart = new newCart(null, demoCartItems);
  Cart.addItem(itemToAdd);
  let cartItems = Cart.getAllItems();
  expect(cartItems.length).toBe(4);
  expect(cartItems[cartItems.length - 1]).toEqual(itemToAdd);
});

test('getItem should return a single item object.', () => {
  let Cart = new newCart(null, demoCartItems);
  let item = Cart.getItem(2);
  expect(item.id).toBe(2);
  expect(item).toEqual(demoCartItems[2 - 1]);
});

test('removeItem should remove an item from the cart.', () => {
  let Cart = new newCart(null, demoCartItems);
  Cart.removeItem(2);
  let items = Cart.getAllItems();
  expect(items.length).toBe(2);
  expect(items).toEqual(
    expect.not.arrayContaining(demoCartItems.filter(item => item.id === 2))
  );
});

test('updateItem should update correctly an item', () => {
  let Cart = new newCart(null, demoCartItems);
  Cart.updateItem(2, { name: 'Neil Young Concert' });
  let item = Cart.getItem(2);
  expect(item.name).toBe('Neil Young Concert');
});
test('clear should set the items to an empty array.', () => {
  let Cart = new newCart(null, demoCartItems);
  Cart.clear();
  expect(Cart.getAllItems()).toEqual([]);
});

# localCart.js

localCart.js is a tiny library written in JavaScript that provides the backbones of a shopping cart. Look mom, no dependencies!

## Getting Started

```js
const localCart = require('localCart');
const storage = localStorage;

// initialize with a storage
let Cart = new localCart(storage);

// default to local storage
let Cart = new localCart();

// initialize with a cart
let Cart = new localCart(null, [{ id: 1, name: 'item 1', slug: 'item-1' }]);
```

## FAQs

- What's the storage argument for?

  Is just so you can use the cart with whatever storage method you want (basically opening it to be used with Redux or a backend if that's your thing). But remmeber to pass a connector object that matches `get`, `save`, and `clear` methods to you storage's API.

  Something like this:

  ```js
  const storage = {
    save() {
      // saves to your storage method.
    },
    get() {
      // retrives the whole cart from your storage mehtod.
      // Should return an array of item objects so make any required
      // data conversion here.
    },
    clear() {
      // set your storage method to an empty array.
    },
  };
  ```

- How does the cart keeps track of the items?

  It stores them as an array of objects in an internal property called `_items`. It also updates the storage method every time there's a change in the `_items` property that is tracking the cart.

- Does it keeps track of quantites and prices and totals and taxes and discounts?

  No. No. No. No. No.

- Wait. Why doesn't this thing keep track of quantities and prices? What's this cart for, then!?

  Hold up cowboy/girl. I made this cart for a project that didn't required to keep track of quantities nor prices (basically every item was unique in the cart and the cart was just to send an email with whatever items you were interested in). But adding quantities and prices is defintely in an hypothetical todo list that a hypothetical cat is keeping track of.

- Ok, cool. What should the structure of the item objects be?

  Yeah, that 'cool' sounded angry but whatever. The object should have at least an id. The rest is up to you (though I would recommend using a name at least, you freak).

## TODO

- Make this docs waaay more useful.
- Add TS' typechecking.
- Upload the library to npm.
- Add support for item quantities.
- Add support for prices.
- Add support for discount codes.
- Add support for taxesand subtotal and total.
- Add an ID generator that returns the greatest id + 1. That way an item could be added without having to pass an id.
- Add more checks to make sure that items with the same IDs are not being added (not with the addItem method nor at initialization).
- Code the testing suite to check if the storage methods are working correctly.
- Create some hooks so people can save callbacks to be called when some methods are invoked (like adding callbacks to addItem. This is super useful if you want to add a notification system).

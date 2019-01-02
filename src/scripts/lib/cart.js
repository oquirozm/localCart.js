/*
|--------------------------------------------------------------------------
| Cart
|--------------------------------------------------------------------------
|
| Returns an object. Has one private property and several methods.
| Must be instantiated with the new keyword.
| An item of the cart should be an object with the following properties:
| item.id:int, item.name:str, item.slug:str, item.type:str
*/
function newCart(storage, initItems) {
  this._items = [];

  this.saveItems = (cartItems = []) => {
    this._items = cartItems;
    storage.save(this._items);
  };

  this.getAllItems = () => {
    return [...this._items];
  };

  this.getItem = itemId => {
    let item = this.getAllItems().filter(it => it.id === itemId);
    if (item.length > 0) {
      return item[0];
    } else {
      throw new Error("There isn't an item with the passed id.");
    }
  };

  this.addItem = item => {
    let items = this.getAllItems();
    let isItemInCart = items.some(it => it.id === item.id);
    /*
     * Current implementation is only for carts that don't allow an item more than once in it. This cart doesn't keep track of quantities.
     */
    if (!isItemInCart) {
      this.saveItems(items.concat(item));
    } else {
      throw new Error('Item is already in the cart.');
    }
  };

  this.removeItem = itemId => {
    let items = this.getAllItems();
    // let itemIndex = items.filter(it => it.id === itemId).map(it => it.id);
    let itemIndex = items.reduce((acc, it, index) => {
      if (it.id === itemId) {
        acc += index;
      }
      return acc;
    }, 0);
    if (itemIndex !== undefined) {
      console.log(items.slice(0, itemIndex));
      let updatedCart = [
        ...items.slice(0, itemIndex),
        ...items.slice(itemIndex + 1),
      ];
      this.saveItems(updatedCart);
    } else {
      throw new Error("There isn't an item with the passed id.");
    }
  };

  this.updateItem = (itemId, itemData) => {
    let items = this.getAllItems();
    if (typeof itemData === 'object') {
      if (itemData.hasOwnProperty('id')) {
        throw new Error('Please passed a data object without an id.');
      }

      let propertiesToUpdate = Object.keys(itemData);
      let itemToUpdate = items.filter(it => it.id === itemId);

      if (itemToUpdate.length > 0) {
        let [item] = itemToUpdate;

        propertiesToUpdate.forEach(prop => {
          if (item[prop] !== undefined) {
            item[prop] = itemData[prop];
          }
        });
      } else {
        throw new Error("Couldn't find an item with this id.");
      }
    } else {
      throw new Error('Passed data is not an object.');
    }
  };

  this.clear = () => {
    this.saveItems([]);
    storage.clear();
  };

  /*
   * If no storage connector is passed default to localStorage.
   */
  if (storage === undefined || storage === null) {
    storage = {
      save(data) {
        localStorage.setItem('localCartjs', JSON.stringify(data));
      },
      get() {
        let output = localStorage.getItem('localCartjs');
        return output !== null ? output : [];
      },
      clear() {
        localStorage.setItem('localCartjs', '{}');
      },
    };
  }

  /*
   * Initialize cart with passed items on initialization.
   */
  if (initItems !== undefined || initItems !== null) {
    this.saveItems(initItems);
  } else {
    this.saveItems(storage.get());
  }
}

const Cart = function(storage) {
  return {
    /*
     * Properties
     */
    // Private property that holds the cart items.
    _items: [],
    /*
     * Methods
     */
    // Getter of the cart items.
    getItems() {
      return this._items;
    },
    // Setter of the cart items.
    setItems(cartItems = []) {
      if (Array.isArray(cartItems)) {
        this._items = cartItems;
        storage.save(this._items);
        publish('updated-counter', { cartCount: this._items.length });
      }
    },
    // Initialize the new cart object.
    init() {
      // Gets the cartItems from the storage and stored them into the instance's private property.
      let storedItems = storage.get();
      this.setItems(storedItems);

      // we have to set a global variable called cart pointing to out cart instance so we can let the preact
      // component use the exact same instance and the same _items array to keep track
      // of the current cart session.
      window.cart = this;

      // update the cart counter with the current count
      document.querySelector(
        '.cart-counter'
      ).textContent = this.getItems().length;
    },
    // Add an item to the cart.
    addItem(itemObject) {
      // Array from because we have to avoid direct mutation of our
      // cart items array.
      let items = Array.from(this.getItems());

      if (!idExistsInArray(items, itemObject.id)) {
        items.push(itemObject);
        this.setItems(items);
        publish('success', {
          type: 'success',
          message: itemObject.name + ' has been succesfully added to the cart.',
        });
      } else {
        publish('error', {
          type: 'error',
          message: itemObject.name + ' is already in the cart.',
        });
        throw new Error('item already exists');
      }
    },
    removeItem(itemId) {
      // Array from because we have to avoid direct mutation of our
      // cart items array.
      let items = Array.from(this.getItems());
      let itemIndex, itemName;
      for (let i = 0; i < items.length; i++) {
        if (items[i].id === itemId) {
          itemIndex = i;
          itemName = items[i].name;
        }
      }
      if (itemIndex !== undefined) {
        items.splice(itemIndex, 1);
        console.log('items before deleting', this.getItems());
        this.setItems(items);
        console.log('items after deleting', this.getItems());
        publish('success', {
          type: 'success',
          message: itemName + ' has been removed.',
        });
      } else {
        return new Error("there isn't any item with that id ");
      }
    },
    clear() {
      this.setItems([]);
      storage.clear();
      publish('success', {
        type: 'warning',
        message: 'Cart has been cleared out.',
      });
    },
    getItem(itemId) {
      for (let i = 0; i < this.currentItems.length; i++) {
        if (this.currentItems[i].id === itemId) {
          return this.currentItems[i];
        } else {
          return new Error('there isnt any item with that id');
        }
      }
    },
    updateItem(itemId, data) {
      let currentItems = this.getItems();
      if (typeof data === 'object') {
        if (data.hasOwnProperty('id')) {
          throw new Error("there shoul'd be a id property in the data object");
          // delete data.id;
        }
        // Check if there's any other property existing there.
        if (
          data.name !== undefined ||
          data.slug !== undefined ||
          data.type !== undefined
        ) {
          for (let i = 0; i < currentItems.length; i++) {
            // Find the actual item.
            if (currentItems[i].id === itemId) {
              // Overwrite the item data.
              Object.assign(currentItems[i], data);
              // Save the data to the global cart.
              this.setItems(currentItems);
              publish('success', {
                type: 'success',
                message: currentItems[id].name + ' has been updated',
              });
            }
          }
        } else {
          throw new Error('not item found with that id');
        }
      } else {
        throw new Error('the data passed is not an object');
      }
    },
  };
};

module.exports = { Cart, newCart };

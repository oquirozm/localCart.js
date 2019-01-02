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
function Cart(storage, initItems) {
  // Private property that stores the item objects in an array.
  this._items = [];

  // Save items to the storage method.
  this.saveItems = (cartItems = []) => {
    this._items = cartItems;
    storage.save(this._items);
  };

  // Retrieve all the cart items.
  this.getAllItems = () => {
    return [...this._items];
  };

  // Retrieve a single item by id.
  this.getItem = itemId => {
    let items = this.getAllItems();
    let itemIndex = items.map(item => item.id).indexOf(itemId);
    if (itemId !== -1) {
      return items[itemIndex];
    } else {
      throw new Error("There isn't an item with the passed id.");
    }
  };

  // Add item to the cart.
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

  // Remove item by id.
  this.removeItem = itemId => {
    let items = this.getAllItems();
    // let itemIndex = items.filter(it => it.id === itemId).map(it => it.id);
    let itemIndex = items.map(item => item.id).indexOf(itemId);
    if (itemIndex !== -1) {
      let updatedCart = [
        ...items.slice(0, itemIndex),
        ...items.slice(itemIndex + 1),
      ];
      this.saveItems(updatedCart);
    } else {
      throw new Error("There isn't an item with the passed id.");
    }
  };

  // Update an item.
  this.updateItem = (itemId, itemData) => {
    let items = this.getAllItems();
    if (typeof itemData === 'object') {
      if (itemData.hasOwnProperty('id')) {
        throw new Error('Please pass a data object without id.');
      }

      let itemToUpdateIndex = items.map(item => item.id).indexOf(itemId);
      let propertiesToUpdate = Object.keys(itemData);

      if (itemToUpdateIndex !== -1) {
        propertiesToUpdate.forEach(prop => {
          items[itemToUpdateIndex][prop] = itemData[prop];
        });
        this.saveItems(items);
      } else {
        throw new Error("Couldn't find an item with this id.");
      }
    } else {
      throw new Error('Passed data is not an object.');
    }
  };

  // Clear the cart
  this.clear = () => {
    this.saveItems([]);
    storage.clear();
  };

  /*
   * If no storage connector is passed on new, default to localStorage.
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
   * Initialize cart with items inside passed as parameters.
   */
  if (initItems !== undefined || initItems !== null) {
    this.saveItems(initItems);
  } else {
    this.saveItems(storage.get());
  }
}

module.exports = Cart;

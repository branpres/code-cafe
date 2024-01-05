export const initialCartState = [];

export const CartTypes = {
  ADD: 'add',
  REMOVE: 'remove',
  DECREASE: 'decrease',
  SET: 'set',
  EMPTY: 'empty',
};

const findItem = (cart, itemId) => cart.find((item) => item.itemId === itemId);
const removeItem = (cart, itemId) => cart.filter((item) => item.itemId !== itemId);

export const cartReducer = (state, action) => {
  switch (action.type) {
    case CartTypes.ADD:
      if (findItem(state, action.itemId)) {
        return state.map((item) => (
          item.itemId === action.itemId
            ? { ...item, quantity: item.quantity + 1 }
            : item
        ));
      }

      return [...state, { itemId: action.itemId, quantity: 1 }];
    case CartTypes.REMOVE:
      return removeItem(state, action.itemId);
    case CartTypes.DECREASE:
      if (findItem(state, action.itemId).quantity === 1) {
        return removeItem(state, action.itemId);
      }

      return state.map((item) => (
        item.itemId === action.itemId
          ? { ...item, quantity: item.quantity - 1 }
          : item
      ));
    case CartTypes.SET:
      if (action.quantity === 0) {
        return removeItem(state, action.itemId);
      }

      return state.map((item) => (
        item.itemId === action.itemId
          ? { ...item, quantity: action.quantity }
          : item
      ));
    case CartTypes.EMPTY:
      return [];
    default:
      throw new Error(`Invalid action type ${action.type}`);
  }
};

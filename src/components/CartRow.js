import { useContext } from 'react';
import PropTypes from 'prop-types';
import { CartTypes } from '../reducers/cartReducer';
import ItemsContext from '../contexts/ItemsContext';

function CartRow({ cartItem, dispatch }) {
  const { items } = useContext(ItemsContext);
  const item = items.find((i) => i.itemId === cartItem.itemId);

  const increaseItemQuantityInCart = () => dispatch({ type: CartTypes.ADD, itemId: item.itemId });
  const decreaseItemQuantityInCart = () => dispatch({ type: CartTypes.DECREASE, itemId: item.itemId });
  const removeItemFromCart = () => dispatch({ type: CartTypes.REMOVE, itemId: item.itemId });
  const setItemQuantityInCart = (e) => dispatch({ type: CartTypes.SET, itemId: item.itemId, quantity: Number(e.target.value) });

  return (
    <tr>
      <td>
        <input type="number" aria-labelledby="qty-lbl" min="0" value={cartItem.quantity} onChange={setItemQuantityInCart} />
      </td>
      <td>{item.title}</td>
      <td>
        $
        {((item.salePrice ?? item.price) * cartItem.quantity).toFixed(2)}
      </td>
      <td><button type="button" onClick={increaseItemQuantityInCart}>+</button></td>
      <td><button type="button" onClick={decreaseItemQuantityInCart}>-</button></td>
      <td><button type="button" onClick={removeItemFromCart}>X</button></td>
    </tr>
  );
}

CartRow.propTypes = {
  cartItem: PropTypes.shape({
    itemId: PropTypes.string.isRequired,
    quantity: PropTypes.number.isRequired,
  }).isRequired,
  dispatch: PropTypes.func.isRequired,
};

export default CartRow;

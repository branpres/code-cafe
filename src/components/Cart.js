import PropTypes from 'prop-types';
import ItemType from '../types/item';
import './Cart.css';
import CartRow from './CartRow';

function Cart({ cart, items, dispatch }) {
  return (
    <div className="cart-component">
      <h2>Your Cart</h2>
      {cart.length === 0
        ? <div>Your cart is empty.</div>
        : (
          <table>
            <thead>
              <tr>
                <th>Quantity</th>
                <th>Item</th>
                <th>Price</th>
              </tr>
            </thead>
            <tbody>
              {
                cart.map((item) => (
                  <CartRow key={item.itemId} cartItem={item} items={items} dispatch={dispatch} />
                ))
              }
            </tbody>
          </table>
        )}
    </div>
  );
}

Cart.propTypes = {
  cart: PropTypes.arrayOf(PropTypes.shape({
    itemId: PropTypes.string.isRequired,
    quantity: PropTypes.number.isRequired,
  })).isRequired,
  items: PropTypes.arrayOf(ItemType).isRequired,
  dispatch: PropTypes.func.isRequired,
};

export default Cart;

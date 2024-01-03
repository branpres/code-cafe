import PropTypes from 'prop-types';
import { useState } from 'react';
import ItemType from '../types/item';
import './Cart.css';
import CartRow from './CartRow';

function Cart({ cart, items, dispatch }) {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [zipcode, setZipcode] = useState('');
  const [couponCode, setCouponCode] = useState('');

  const setFormattedPhone = (newPhone) => {
    const digits = newPhone.replace(/\D/g, '');
    let formatted = digits.substring(0, 3);
    if (digits.length === 3 && newPhone[3] === '-') {
      formatted = `${formatted}-`;
    } else if (digits.length > 3) {
      formatted = `${formatted}-${digits.substring(3, 6)}`;
    }
    if (digits.length === 6 && newPhone[7] === '-') {
      formatted = `${formatted}-`;
    } else if (digits.length > 6) {
      formatted = `${formatted}-${digits.substring(6, 10)}`;
    }
    setPhone(formatted);
  };

  const setFormattedCouponCode = (newCouponCode) => {
    setCouponCode(newCouponCode.toUpperCase());
  };

  const subTotal = cart.reduce((acc, item) => {
    const detailItem = items.find((i) => i.itemId === item.itemId);
    const itemPrice = detailItem.salePrice ?? detailItem.price;
    return item.quantity * itemPrice + acc;
  }, 0);
  const kentuckyStateTax = 0.06 * subTotal;
  const total = kentuckyStateTax + subTotal;
  const isOrderSubmittable = zipcode.length === 5 && name.trim();

  const submitOrder = (e) => {
    e.preventDefault();
    console.log('name:', name);
    console.log('phone', phone);
    console.log('zipcode:', zipcode);
  };

  return (
    <div className="cart-component">
      <h2>Your Cart</h2>
      {cart.length === 0
        ? <div>Your cart is empty.</div>
        : (
          <>
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
            <div>
              Subtotal: $
              {subTotal.toFixed(2)}
            </div>
            {zipcode.length === 5
              ? (
                <>
                  <div>
                    Tax: $
                    {kentuckyStateTax.toFixed(2)}
                  </div>
                  <div>
                    Total: $
                    {total}
                  </div>
                </>
              )
              : <div className="warning">Enter ZIP Code to get total</div>}
            <h2>Checkout</h2>
            <form onSubmit={submitOrder}>
              <label htmlFor="name">
                Name
                <input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} required />
              </label>
              <label htmlFor="phone">
                Phone Number
                <input type="tel" id="phone" value={phone} onChange={(e) => setFormattedPhone(e.target.value)} />
              </label>
              <label htmlFor="zipcode">
                ZIP Code
                <input type="text" id="zipcode" maxLength="5" inputMode="numeric" value={zipcode} onChange={(e) => setZipcode(e.target.value)} required />
              </label>
              <label htmlFor="couponCode">
                Coupon Code
                <input type="text" id="couponCode" value={couponCode} onChange={(e) => setFormattedCouponCode(e.target.value)} />
              </label>
              <button id="submitButton" type="submit" disabled={!isOrderSubmittable}>Order Now</button>
            </form>
          </>
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

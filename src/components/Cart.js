import PropTypes from 'prop-types';
import { useState, useRef, useMemo } from 'react';
import { PatternFormat } from 'react-number-format';
import axios from 'axios';
import ItemType from '../types/item';
import './Cart.css';
import CartRow from './CartRow';
import { CartTypes } from '../reducers/cartReducer';
import Alert from './Alert';
import CloseableAlert from './CloseableAlert';

function Cart({ cart, items, dispatch }) {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [zipcode, setZipcode] = useState('');
  const [couponCode, setCouponCode] = useState('');
  const [isEmployeeOfTheMonth, setIsEmployeeOfTheMonth] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const [apiError, setApiError] = useState('');

  const debounceRef = useRef(null);
  const zipcodeRef = useRef(null);
  const nameRef = useRef(null);

  const onPhoneChange = (newPhone) => {
    setPhone(newPhone);

    const phoneDigits = newPhone.trim().replaceAll('-', '').replaceAll(' ', '');
    if (phoneDigits.length === 10) {
      zipcodeRef.current.focus();
    }
  };

  const onCouponCodeChange = (newCouponCode) => {
    setCouponCode(newCouponCode.toUpperCase());
  };

  const onNameChange = (newName) => {
    setName(newName);

    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }

    debounceRef.current = setTimeout(() => {
      axios
        .get(`/api/employees/isEmployeeOfTheMonth?name=${newName}`)
        .then((response) => setIsEmployeeOfTheMonth(response?.data?.isEmployeeOfTheMonth))
        .catch(console.error);
    }, 300);
  };

  const onZipcodeChange = (newZipcode) => {
    setZipcode(newZipcode);

    if (newZipcode.length === 5 && !name.trim()) {
      nameRef.current.focus();
    }
  };

  const subTotal = useMemo(() => (isEmployeeOfTheMonth
    ? 0
    : cart.reduce((acc, item) => {
      const detailItem = items.find((i) => i.itemId === item.itemId);
      const itemPrice = detailItem.salePrice ?? detailItem.price;
      return item.quantity * itemPrice + acc;
    }, 0)), [isEmployeeOfTheMonth, cart, items]);
  const kentuckyStateTax = useMemo(() => 0.06 * subTotal, [subTotal]);
  const total = useMemo(() => kentuckyStateTax + subTotal, [kentuckyStateTax, subTotal]);

  const isOrderSubmittable = zipcode.length === 5 && name.trim() && !isSubmitting;

  const submitOrder = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setApiError('');
    try {
      await axios.post('/api/orders', {
        items: cart,
        name,
        phone,
        zipCode: zipcode,
      });
      setShowSuccessAlert(true);
      dispatch({ type: CartTypes.EMPTY });
      setName('');
      setPhone('');
      setZipcode('');

      try {
        const result = await axios.get('/api/orders');
        console.log('Place in line: ', result.data.length);
      } catch (error) {
        console.log('Error getting orders', error);
        setApiError(error?.response?.data?.error || 'Unknown Error');
      }
    } catch (error) {
      console.log('Error submitting the order', error);
      setApiError(error?.response?.data?.error || 'Unknown Error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="cart-component">
      <Alert visible={showSuccessAlert} type="success">Thank you for your order.</Alert>
      <CloseableAlert visible={!!apiError} type="error" onClose={() => setApiError('')}>
        <p>There was an error submitting your order.</p>
        <p>{apiError}</p>
        <p>Please try again.</p>
      </CloseableAlert>
      <h2>Your Cart</h2>
      {cart.length === 0
        ? <div>Your cart is empty.</div>
        : (
          <>
            <table>
              <thead>
                <tr>
                  <th id="qty-lbl">Quantity</th>
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
                <input type="text" id="name" value={name} onChange={(e) => onNameChange(e.target.value)} ref={nameRef} required />
              </label>
              <label htmlFor="phone">
                Phone Number
                <PatternFormat
                  id="phone"
                  displayType="input"
                  type="tel"
                  format="###-###-####"
                  value={phone}
                  onValueChange={(values) => onPhoneChange(values.formattedValue)}
                  aria-label="Enter your phone number. After it is entered, you will automatically be moved to the next field."
                />
              </label>
              <label htmlFor="zipcode">
                ZIP Code
                <input type="text" id="zipcode" maxLength="5" inputMode="numeric" value={zipcode} onChange={(e) => onZipcodeChange(e.target.value)} ref={zipcodeRef} required />
              </label>
              <label htmlFor="couponCode">
                Coupon Code
                <input type="text" id="couponCode" value={couponCode} onChange={(e) => onCouponCodeChange(e.target.value)} />
              </label>
              <button type="submit" disabled={!isOrderSubmittable}>Order Now</button>
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

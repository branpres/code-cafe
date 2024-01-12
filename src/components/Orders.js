import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import ItemType from '../types/item';
import CloseableAlert from './CloseableAlert';
import './Orders.css';
import { useCurrentUserContext } from '../contexts/CurrentUserContext';

function Orders({ items }) {
  const [orders, setOrders] = useState([]);
  const [deleteOrderError, setDeleteOrderError] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const { currentUser } = useCurrentUserContext();

  useEffect(() => {
    if (currentUser.access === 'associate') {
      const protocol = window.location.protocol === 'https:' ? 'wss://' : 'ws://';
      const ws = new WebSocket(`${(protocol)}${window.location.host}/ws-cafe`);
      ws.onopen = () => {
        console.log('connected');
      };
      ws.onerror = (event) => {
        console.error(event);
      };
      ws.onmessage = (message) => {
        const newOrders = JSON.parse(message.data);
        setOrders(newOrders);
        setIsLoading(false);
      };
      ws.onclose = () => {
        console.log('disconnected');
      };

      return () => {
        ws.close();
        setOrders([]);
      };
    }
    return () => {};
  }, [currentUser]);

  const deleteOrder = async (orderId) => {
    try {
      axios.delete(`/api/orders/${orderId}`);
    } catch (error) {
      console.error(error);
      setDeleteOrderError(error?.response?.data?.error || 'Unknown Error');
    }
  };

  let orderLengthZeroText = 'Access denied';
  if (currentUser.access === 'associate') {
    if (isLoading) {
      orderLengthZeroText = 'Loading...';
    } else {
      orderLengthZeroText = 'No Orders';
    }
  }

  return (
    <div className="orders-component">
      <h2>Orders</h2>
      <CloseableAlert visible={!!deleteOrderError} type="error" onClose={() => setDeleteOrderError('')}>
        <p>There was an error deleting the order.</p>
        <p>{deleteOrderError}</p>
        <p>Please try again.</p>
      </CloseableAlert>
      {orders.length === 0
        ? (
          <div>{orderLengthZeroText}</div>
        )
        : orders.map((order) => (
          <div className="order" key={order.id}>
            <table>
              <thead>
                <tr>
                  <th>Customer</th>
                  <th>ZIP Code</th>
                  {order.phone && <th>Phone</th>}
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{order.name}</td>
                  <td>{order.zipCode}</td>
                  {order.phone && <td>{order.phone}</td>}
                </tr>
              </tbody>
              <thead>
                <tr>
                  <th>Quantity</th>
                  <th>Item</th>
                </tr>
              </thead>
              <tbody>
                {order.items.map((item) => (
                  <tr key={item.itemId}>
                    <td>{item.quantity}</td>
                    <td>{items.find((i) => i.itemId === item.itemId)?.title}</td>
                  </tr>
                ))}
              </tbody>
              <button type="button" onClick={() => deleteOrder(order.id)}>Delete Order</button>
            </table>
          </div>
        ))}
    </div>
  );
}

export default Orders;

Orders.propTypes = {
  items: PropTypes.arrayOf(ItemType).isRequired,
};

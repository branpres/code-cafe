import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import ItemType from '../types/item';
import './Orders.css';

function Orders({ items }) {
  const [orders, setOrders] = useState([]);

  const loadOrders = () => {
    axios.get('/api/orders')
      .then((result) => setOrders(result.data))
      .catch(console.error);
  };

  useEffect(() => {
    loadOrders();
  }, []);

  const deleteOrder = async (orderId) => {
    try {
      axios.delete(`/api/orders/${orderId}`);
      loadOrders();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="orders-component">
      <h2>Orders</h2>
      {orders.length === 0
        ? <div>No orders</div>
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

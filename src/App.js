import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import axios from 'axios';
import { useEffect, useState, useReducer } from 'react';
import Header from './components/Header';
import Home from './components/Home';
import NotFound from './components/NotFound';
import Details from './components/Details';
import DetailItem from './components/DetailItem';
import Rewards from './components/Rewards';
import RewardsItem from './components/RewardsItem';
import RewardsLink from './components/RewardsLink';
import { initialCartState, cartReducer, CartTypes } from './reducers/cartReducer';

function App() {
  const [items, setItems] = useState([]);
  const [cart, dispatch] = useReducer(cartReducer, initialCartState);
  const addToCart = (itemId) => dispatch({ type: CartTypes.ADD, itemId });

  useEffect(() => {
    axios.get('/api/items')
      .then((result) => setItems(result.data))
      .catch(console.error);
  }, []);

  return (
    <Router>
      <Header title="Brandon's Code Cafe" cart={cart} />
      <RewardsLink />
      {items.length === 0
        ? <div>Loading...</div>
        : (
          <Routes>
            <Route path="/" element={<Home items={items} />} />
            <Route path="*" element={<NotFound />} />
            <Route path="/details" element={<Details items={items} />}>
              <Route path=":id" element={<DetailItem items={items} addToCart={addToCart} />} />
              <Route index element={<div>No Item Selected</div>} />
            </Route>
            <Route path="/rewards" element={<Rewards />}>
              <Route path=":tier" element={<RewardsItem />} />
            </Route>
          </Routes>
        )}
    </Router>
  );
}

export default App;

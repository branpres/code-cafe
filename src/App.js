import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import axios from 'axios';
import {
  useEffect, useState, useReducer, useMemo,
} from 'react';
import Header from './components/Header';
import Home from './components/Home';
import NotFound from './components/NotFound';
import Details from './components/Details';
import DetailItem from './components/DetailItem';
import Rewards from './components/Rewards';
import RewardsItem from './components/RewardsItem';
import Cart from './components/Cart';
import { initialCartState, cartReducer, CartTypes } from './reducers/cartReducer';
import CurrentUserContext from './contexts/CurrentUserContext';
import Login from './components/Login';
import ItemsContext from './contexts/ItemsContext';

const cartStorageKey = 'cart';

function App() {
  const [items, setItems] = useState([]);
  const [currentUser, setCurrentUser] = useState({});
  const [cart, dispatch] = useReducer(
    cartReducer,
    initialCartState,
    (initialState) => {
      const storedCartJson = localStorage.getItem(cartStorageKey);
      if (storedCartJson !== null) {
        try {
          return JSON.parse(storedCartJson);
        } catch (error) {
          console.log('Error parsing cart', error);
        }
      }
      return initialState;
    },
  );
  const addToCart = (itemId) => dispatch({ type: CartTypes.ADD, itemId });

  useEffect(() => {
    axios.get('/api/items')
      .then((result) => setItems(result.data))
      .catch(console.error);
  }, []);

  useEffect(() => {
    axios.get('/api/auth/current-user')
      .then((result) => setCurrentUser(result.data))
      .catch(console.error);
  }, []);

  useEffect(() => {
    localStorage.setItem(cartStorageKey, JSON.stringify(cart));
  }, [cart]);

  const currentUserContextValue = useMemo(() => ({ currentUser, setCurrentUser }), [currentUser]);
  const itemsContextValue = useMemo(() => ({ items }), [items]);

  return (
    <Router>
      <CurrentUserContext.Provider value={currentUserContextValue}>
        <Header title="Brandon's Code Cafe" cart={cart} />
        <ItemsContext.Provider value={itemsContextValue}>
          {itemsContextValue.items.length === 0
            ? <div>Loading...</div>
            : (
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="*" element={<NotFound />} />
                <Route path="/details" element={<Details />}>
                  <Route path=":id" element={<DetailItem addToCart={addToCart} />} />
                  <Route index element={<div>No Item Selected</div>} />
                </Route>
                <Route path="/rewards" element={<Rewards />}>
                  <Route path=":tier" element={<RewardsItem />} />
                </Route>
                <Route path="/cart" element={<Cart cart={cart} dispatch={dispatch} />} />
              </Routes>
            )}
        </ItemsContext.Provider>
      </CurrentUserContext.Provider>
    </Router>
  );
}

export default App;

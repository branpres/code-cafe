import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Logo from '../images/logo.svg';
import CartIcon from '../images/cart.svg';
import './Header.css';
import UserDetails from './UserDetails';

function Header({ title, cart }) {
  const cartQuantity = cart.reduce((accumulator, item) => accumulator + item.quantity, 0);

  return (
    <header className="header-component">
      <Link to="/">
        <img src={Logo} alt="logo" />
        <h1>{title}</h1>
      </Link>
      <div className="menu">
        <Link to="/cart">
          <img src={CartIcon} alt="Cart" />
          <div className="badge">{cartQuantity}</div>
        </Link>
        <UserDetails />
      </div>
    </header>
  );
}

Header.propTypes = {
  title: PropTypes.string.isRequired,
  cart: PropTypes.arrayOf(PropTypes.shape({
    itemId: PropTypes.string.isRequired,
    quantity: PropTypes.number.isRequired,
  })).isRequired,
};

export default Header;

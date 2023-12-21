import Logo from '../images/logo.svg';
import './Header.css';

function Header() {
  return (
    <header className="header-component">
      <img src={Logo} alt="logo" />
      <h1>Code Cafe</h1>
    </header>
  );
}

export default Header;

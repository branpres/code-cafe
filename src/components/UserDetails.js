import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Profile from '../images/profile.svg';
import './UserDetails.css';
import { useCurrentUserContext } from '../contexts/CurrentUserContext';

function UserDetails() {
  const { currentUser, setCurrentUser } = useCurrentUserContext();

  const navigate = useNavigate();

  const logout = async () => {
    try {
      await axios.post('/api/auth/logout', {});
      setCurrentUser({});
      navigate('/');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="user-details-component">
      <Link to="/rewards">Rewards</Link>
      {currentUser.username
        ? (
          <div>
            {currentUser.access === 'associate' && <Link to="/orders">Orders</Link>}
            <img src={Profile} alt="profile" />
            <p>{currentUser.username}</p>
            <button type="button" onClick={logout}>Logout</button>
          </div>
        )
        : <Link to="/login">Login</Link> }
    </div>
  );
}

export default UserDetails;

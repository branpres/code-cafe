import { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Profile from '../images/profile.svg';
import './UserDetails.css';
import CurrentUserContext from '../contexts/CurrentUserContext';

function UserDetails() {
  const { currentUser, setCurrentUser } = useContext(CurrentUserContext);

  const navigate = useNavigate();

  const logout = async () => {
    try {
      await axios.post('/api/auth/logout', {});
      setCurrentUser({});
      navigate('/login');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="user-details-component">
      {currentUser.username
        ? (
          <div>
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

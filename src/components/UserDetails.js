import { Link } from 'react-router-dom';
import Profile from '../images/profile.svg';
import './UserDetails.css';

function UserDetails() {
  const currentUser = {};

  return (
    <div className="user-details-component">
      {currentUser.username
        ? (
          <div>
            <img src={Profile} alt="profile" />
            <p>currentUser.username</p>
          </div>
        )
        : <Link to="/login">Login</Link> }
    </div>
  );
}

export default UserDetails;

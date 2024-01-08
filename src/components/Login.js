import { useState, useContext } from 'react';
import axios from 'axios';
import './Login.css';
import { useNavigate } from 'react-router-dom';
import CurrentUserContext from '../contexts/CurrentUserContext';
import CloseableAlert from './CloseableAlert';
import './Alert.css';

function Login() {
  const { setCurrentUser } = useContext(CurrentUserContext);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [apiError, setApiError] = useState('');

  const navigate = useNavigate();

  const login = async (e) => {
    e.preventDefault();
    try {
      const result = await axios.post('/api/auth/login', { username, password });
      setCurrentUser(result.data);
      navigate('/');
    } catch (error) {
      console.error(error);
      setApiError(error?.response?.data?.error || 'Unknown Error');
    }
  };

  return (
    <div className="login-component">
      <CloseableAlert visible={!!apiError} type="error" onClose={() => setApiError('')}>
        <p>There was an error logging in.</p>
        <p>{apiError}</p>
        <p>Please try again.</p>
      </CloseableAlert>
      <h2>Login</h2>
      <form onSubmit={login}>
        <label htmlFor="username">
          Username
          <input type="text" id="username" value={username} autoComplete="username" onChange={(e) => setUsername(e.target.value)} required />
        </label>
        <label htmlFor="password">
          Username
          <input type="password" id="password" value={password} autoComplete="current-password" onChange={(e) => setPassword(e.target.value)} required />
        </label>
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default Login;

import { useState, useEffect } from 'react';
import { createContainer } from 'unstated-next';
import Axios from '../axios/axios';

function useAuth() {
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);

  async function loginFacebook({ accessToken }) {
    if (accessToken) {
      try {
        setLoading(true);
        const foundUser = await Axios.post(`/api/auth/facebook`, {
          access_token: accessToken,
        });
        setUser(foundUser.data.user);
        localStorage.setItem('auth-token', foundUser.data.token);
        setLoading(false);
      } catch (err) {
        setUser(null);
        setError(err);
        setLoading(false);
        localStorage.removeItem('auth-token');
      }
    }
  }

  function logout() {
    localStorage.removeItem('auth-token');
    window.location.reload();
  }
  async function loadUser() {
    const token = localStorage.getItem('auth-token');
    if (!token) {
      setUser(null);
      return;
    }
    try {
      setLoading(true);
      // const header = `Authorization: Bearer ${token}`;
      const foundUser = await Axios.get('api/user/auth/me', { headers: { Authorization: `Bearer ${token}` } });
      setLoading(false);
      setUser(foundUser.data);
    } catch (err) {
      setLoading(false);
      setUser(null);
      setError(err);
    }
  }
  useEffect(() => {
    loadUser();
  }, []);
  return { loginFacebook, logout, loadUser, loading, error, user };
}

const AuthContainer = createContainer(useAuth);
export { AuthContainer };

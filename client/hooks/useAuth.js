import { useState, useEffect } from 'react';
import { createContainer } from 'unstated-next';
import { parseCookies, setCookie, destroyCookie } from 'nookies';
import Axios from '../axios/axios';

function useAuth() {
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const [token, setToken] = useState(null);

  async function loginFacebook({ accessToken }) {
    if (accessToken) {
      try {
        setLoading(true);
        const foundUser = await Axios.post(`/api/auth/facebook`, {
          access_token: accessToken,
        });
        setUser(foundUser.data.user);
        setToken(foundUser.data.token);
        setCookie({}, 'token', foundUser.data.token, {
          maxAge: 30 * 24 * 60 * 60,
        });
        setLoading(false);
      } catch (err) {
        setUser(false);
        setError(err);
        setLoading(false);
        setToken(null);
      }
    }
  }

  function logout() {
    // localStorage.removeItem('auth-token');
    destroyCookie({}, 'token');
    window.location.reload();
  }
  async function loadUser(loadedUser) {
    if (loadedUser && loadedUser._id) {
      const loadedToken = parseCookies().token;
      setToken(loadedToken);
      return setUser(loadedUser);
    }
    setUser(false);
  }
  // useEffect(() => {
  //   loadUser();
  // }, []);
  return { loginFacebook, logout, loadUser, loading, error, token, user };
}

const AuthContainer = createContainer(useAuth);
export { AuthContainer };

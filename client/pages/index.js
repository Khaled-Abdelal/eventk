import React, { useEffect } from 'react';
import fetch from 'isomorphic-unfetch';
import dynamic from 'next/dynamic';
import { parseCookies } from 'nookies';
import { toast } from 'react-toastify';
import Layout from '../src/Layout';
import { BaseURL } from '../constants';
import { AuthContainer } from '../hooks/useAuth';

const Map = dynamic(() => import('../src/Map'), { ssr: false });

export default function Index({ events, user, error, initialMapTheme }) {
  const { loadUser } = AuthContainer.useContainer();

  useEffect(() => {
    loadUser(user);
    if (error) {
      toast.error(error.message);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <Layout user={user}>
      <Map initialMapTheme={initialMapTheme} events={events} />
    </Layout>
  );
}

Index.getInitialProps = async function(ctx) {
  try {
    const { token, mapTheme } = parseCookies(ctx);

    const [eventData, userData] = await Promise.all([
      fetch(`${BaseURL}api/event`).then(r => r.json()),
      fetch(`${BaseURL}api/user/auth/me`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }).then(r => r.json()),
    ]);

    return {
      events: eventData,
      user: userData,
      initialMapTheme: mapTheme,
    };
  } catch (error) {
    return {
      error,
      events: [],
    };
  }
};

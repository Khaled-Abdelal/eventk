import React from 'react';
import fetch from 'isomorphic-unfetch';
import Layout from '../src/Layout';
import GoogleMap from '../src/Map';
import { BaseURL } from '../constants';

export default function Index({ events }) {
  return (
    <Layout>
      <GoogleMap events={events} />
    </Layout>
  );
}

Index.getInitialProps = async function() {
  const res = await fetch(`${BaseURL}api/event`);
  const data = await res.json();
  return {
    events: data,
  };
};

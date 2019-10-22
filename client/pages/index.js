import React from 'react';
import fetch from 'isomorphic-unfetch';
import dynamic from 'next/dynamic';
import Layout from '../src/Layout';
import { BaseURL } from '../constants';

const Map = dynamic(() => import('../src/Map'), { ssr: false });

export default function Index({ events }) {
  return (
    <Layout>
      <Map events={events} />
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

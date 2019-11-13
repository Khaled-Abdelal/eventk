import React from 'react';
import Head from 'next/head';
import Nav from './Nav';

function Layout({ children }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <Head>
        <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap" />
      </Head>
      <Nav />
      {children}
    </div>
  );
}

export default Layout;

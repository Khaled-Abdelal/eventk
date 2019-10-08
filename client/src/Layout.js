import React from 'react';
import Head from 'next/head';
import Nav from './Nav';

function Layout({ children }) {
  return (
    <div>
      <Head>
        <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap" />
        <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" />
      </Head>
      <Nav />
      {children}
    </div>
  );
}

export default Layout;

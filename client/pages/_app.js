import React from 'react';
import App from 'next/app';
import Head from 'next/head';
import { ThemeProvider } from '@material-ui/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import { ToastContainer, toast } from 'react-toastify';
import theme from '../src/theme';
import { AuthContainer } from '../hooks/useAuth';
import 'react-toastify/dist/ReactToastify.min.css';

toast.configure({
  autoClose: 3500,
  draggable: false,
});

export default class MyApp extends App {
  componentDidMount() {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles.parentNode.removeChild(jssStyles);
    }
  }

  render() {
    const { Component, pageProps } = this.props;

    return (
      <React.Fragment>
        <AuthContainer.Provider>
          <ToastContainer />
          <Head>
            <title>Eventk</title>
            <link rel="shortcut icon" href="/eventk.ico" />
          </Head>
          <ThemeProvider theme={theme}>
            {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
            <CssBaseline />
            <Component {...pageProps} />
          </ThemeProvider>
        </AuthContainer.Provider>
      </React.Fragment>
    );
  }
}

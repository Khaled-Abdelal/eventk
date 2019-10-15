import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props';
import { AuthContainer } from '../hooks/useAuth';
import Link from './Link';

export default function Nav() {
  // eslint-disable-next-line no-use-before-define
  const classes = useStyles();
  const { loginFacebook, logout, user } = AuthContainer.useContainer();

  return (
    <div className={classes.root}>
      <AppBar position="sticky" className={classes.Nav}>
        <Toolbar>
          <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
            <MenuIcon />
          </IconButton>
          <div style={{ flexGrow: 1, display: 'flex' }}>
            <Link href="/" className={classes.title}>
              <Button className={classes.title}>Home</Button>
            </Link>
          </div>
          {user ? (
            <button type="button" onClick={logout}>
              {user.name}
            </button>
          ) : (
            <FacebookLogin
              appId="934603710237663"
              autoLoad={false}
              callback={loginFacebook}
              render={renderProps => (
                <Button className={classes.facebookButton} type="button" onClick={renderProps.onClick}>
                  Login with Facebook
                </Button>
              )}
            />
          )}
        </Toolbar>
      </AppBar>
    </div>
  );
}

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    position: 'sticky',
    zIndex: 999,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  Nav: {
    backgroundColor: '#424242',
  },
  title: {
    color: '#fff',
    textDecoration: 'none',
    fontWeight: 'bold',
    fontSize: '16px',
    '&:hover': {
      textDecoration: 'none',
    },
  },
  facebookButton: {
    color: '#fff',
    backgroundColor: '#3b5998',
    opacity: 0.9,
    padding: '11px',
    '&:hover': {
      opacity: 1,
      backgroundColor: '#3b5998',
    },
  },
}));

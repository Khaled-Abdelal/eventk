import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';
import IconButton from '@material-ui/core/IconButton';
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props';
import { AuthContainer } from '../hooks/useAuth';
import Link from './Link';

export default function Nav() {
  // eslint-disable-next-line no-use-before-define
  const classes = useStyles();
  const { loginFacebook, logout, user } = AuthContainer.useContainer();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleMenu = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  function renderUserState() {
    switch (user) {
      case null:
        return <p>loading...</p>;
      case false:
        return (
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
        );
      default:
        return (
          <div>
            <IconButton
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleMenu}
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={open}
              onClose={handleClose}
            >
              <MenuItem onClick={logout}>Logout</MenuItem>
            </Menu>
          </div>
        );
    }
  }
  return (
    <AppBar position="static" className={classes.Nav}>
      <Toolbar>
        <div style={{ flexGrow: 1, display: 'flex' }}>
          <Link href="/" className={classes.title}>
            <img src="/eventk" className={classes.logo} alt="eventk logo" />
          </Link>
        </div>
        {renderUserState()}
      </Toolbar>
    </AppBar>
  );
}

const useStyles = makeStyles(theme => ({
  menuButton: {
    marginRight: theme.spacing(2),
  },
  Nav: {
    backgroundColor: '#424242',
    flexGrow: 1,
    position: 'static',
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
      fontWeight: 'bold',
    },
  },
  logo: {
    width: '6rem',
  },
}));

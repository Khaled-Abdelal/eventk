import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  exit: {
    position: 'absolute',
    top: '0px',
    right: '11px',
    cursor: 'pointer',
    fontSize: '1.1rem',
  },
}));

function Settings({ mapTheme, setMapTheme, handleClose }) {
  const classes = useStyles();

  const handleChange = e => {
    setMapTheme(e.target.value);
  };
  return (
    <div>
      <FormControl className={classes.formControl}>
        <InputLabel htmlFor="map-theme">Map Theme</InputLabel>
        <Select
          value={mapTheme}
          onChange={handleChange}
          inputProps={{
            name: 'mapTheme',
            id: 'map-theme',
          }}
        >
          <MenuItem value="streets">streets</MenuItem>
          <MenuItem value="light">light</MenuItem>
          <MenuItem value="dark">dark</MenuItem>
          <MenuItem value="wheatpaste">wheatpaste</MenuItem>
          <MenuItem value="comic">comic</MenuItem>
          <MenuItem value="run-bike-hike">run-bike-hike</MenuItem>
          <MenuItem value="pencil">pencil</MenuItem>
          <MenuItem value="pirates">pirates</MenuItem>
          <MenuItem value="emerald">emerald</MenuItem>
          <MenuItem value="high-contrast">high-contrast</MenuItem>
        </Select>
      </FormControl>

      <div tabIndex={0} role="button" onKeyDown={handleClose} onClick={handleClose} className={classes.exit}>
        x
      </div>
    </div>
  );
}

export default Settings;

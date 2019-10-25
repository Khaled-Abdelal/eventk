import React, { useState, useEffect, useRef } from 'react';
// import usePosition from '../hooks/usePosition';
import io from 'socket.io-client';
import { Map as LeafMap, TileLayer, Popup } from 'react-leaflet';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import Fab from '@material-ui/core/Fab';
import Settings from '@material-ui/icons/Settings';
import { toast } from 'react-toastify';
import { setCookie } from 'nookies';
// import L from 'leaflet';
import { EventMarker } from './EventMarker';
import Modal from './Modal';
import useModal from '../hooks/useModal';
import EventForm from './EventForm';
import MapSettings from './Settings';
import { BaseURL } from '../constants';
import { AuthContainer } from '../hooks/useAuth';
import AddEventMarker from './AddEventMarker';

const useStyles = makeStyles(() => ({
  fab: {
    zIndex: 999,
    position: 'absolute',
    bottom: '15px',
    right: '15px',
    backgroundColor: '#57366F',
    '&:hover': {
      backgroundColor: '#3e2750',
    },
  },
}));

function Map({ events, initialMapTheme }) {
  // const { latitude, longitude, error } = usePosition();
  const classes = useStyles();
  const [open, eventFormModalClose, eventFormModalOpen] = useModal();
  const [openSettingsState, settingsModalClose, settingsModalOpen] = useModal();
  const [mapTheme, setMapTheme] = useState(() => initialMapTheme || 'light');
  const { user, token } = AuthContainer.useContainer();
  const [stateEvents, setStateEvents] = useState(events);
  const [cardActiveIndex, setCardActiveIndex] = useState('');
  const [coords, setCoords] = useState({ lat: null, lng: null });
  const { current: socket } = useRef(io(BaseURL));

  function handleCardToggle(e) {
    setCoords({ lat: null, lng: null });
    setCardActiveIndex('');
    if (cardActiveIndex === e.target._popup.options.children.props.event._id) return;
    setCardActiveIndex(e.target._popup.options.children.props.event._id);
  }

  useEffect(() => {
    setCookie({}, 'mapTheme', mapTheme);
  }, [mapTheme]);

  useEffect(() => {
    try {
      socket.open();
      socket.on('connect', function() {
        console.log('client connected');
      });
      socket.on('new-event', function(newEvent) {
        setStateEvents([...events, newEvent]);
      });
    } catch (err) {
      console.log(err);
    }

    // Return a callback to be run before unmount-ing.
    return () => {
      socket.close();
    };
  }, [events, socket]);
  // useEffect(() => {
  //   // fixes a leaflet bug that make the map bigger on zoom change
  //   L.Control.include({
  //     _refocusOnMap: L.Util.falseFn, // Do nothing.
  //   });
  // }, []);
  const uploadEvent = data => {
    if (user && token) {
      try {
        socket.emit('add-new-event', token, { coordinates: [coords.lng, coords.lat], ...data }, error => {
          if (error) {
            return toast.error(error.message);
          }
          toast.success('event added');
          eventFormModalClose();
          setCoords({ lat: null, lng: null });
        });
      } catch (err) {
        toast.error(err.message);
      }
    } else {
      toast.error('you need to login first');
    }
  };

  function toggleSettingsModal(e) {
    e.stopPropagation();
    settingsModalOpen(e);
  }
  const mapClicked = e => {
    setCardActiveIndex('');
    const { lat, lng } = e.latlng;
    setCoords({ lat, lng });
  };
  return (
    <React.Fragment>
      <Fab color="secondary" aria-label="edit" className={classes.fab} onClick={toggleSettingsModal}>
        <Settings />
      </Fab>
      <LeafMap
        style={{ width: '100vw', height: 'calc(100% - 65px )', position: 'fixed', bottom: 0 }}
        zoom={6}
        center={[29.924526, 31.205753]}
        onClick={mapClicked}
      >
        {coords.lat && coords.lng && cardActiveIndex === '' && (
          <AddEventMarker position={[coords.lat, coords.lng]}>
            <Popup>
              <Button
                className="openButton"
                size="small"
                onClick={eventFormModalOpen}
                variant="contained"
                color="default"
              >
                Add Event Here
              </Button>
            </Popup>
          </AddEventMarker>
        )}

        {stateEvents.map(event => (
          <EventMarker
            key={event._id}
            handleCardToggle={handleCardToggle}
            event={event}
            cardActiveIndex={cardActiveIndex}
          />
        ))}
        <TileLayer
          url={`https://api.mapbox.com/v4/mapbox.${mapTheme}/{z}/{x}/{y}.jpg90?access_token=${process.env.MAPBOX_API_KEY}`}
        />
      </LeafMap>
      <Modal handleClose={eventFormModalClose} handleOpen={eventFormModalOpen} open={open}>
        <EventForm handleClose={eventFormModalClose} onSubmit={uploadEvent} />
      </Modal>
      <Modal handleClose={settingsModalClose} handleOpen={settingsModalOpen} open={openSettingsState}>
        <MapSettings handleClose={settingsModalClose} mapTheme={mapTheme} setMapTheme={setMapTheme} />
      </Modal>
      <style jsx global>{`
        .leaflet-popup-content-wrapper {
          padding: 0px;
        }
      `}</style>
    </React.Fragment>
  );
}

export default Map;

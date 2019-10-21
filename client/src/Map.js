import React, { useState, useEffect, useRef } from 'react';
import GoogleMapReact from 'google-map-react';
// import usePosition from '../hooks/usePosition';
import io from 'socket.io-client';
import Modal from './Modal';
import Event from './Event';
import useModal from '../hooks/useModal';
import EventForm from './EventForm';
import ClickMarker from './ClickMarker';
import { BaseURL } from '../constants';
import { AuthContainer } from '../hooks/useAuth';

function Map({ events }) {
  // const { latitude, longitude, error } = usePosition();
  const { open, handleClose, handleOpen } = useModal();
  // const [mapObjects, setMapObjects] = useState({});
  const { user, token } = AuthContainer.useContainer();
  const [stateEvents, setStateEvents] = useState(events);
  const [cardActiveIndex, setCardActiveIndex] = useState('');
  const [show, setShow] = useState(false);
  const [coords, setCoords] = useState({ lat: null, lng: null });
  const { current: socket } = useRef(io(BaseURL));

  // const handleApiLoaded = (map, maps) => {
  //   // use map and maps objects
  //   setMapObjects({ map, maps });
  // };
  function handleCardToggle(e) {
    setCardActiveIndex('');
    if (cardActiveIndex === e.currentTarget.getAttribute('value')) return;
    setCardActiveIndex(e.currentTarget.getAttribute('value'));
  }
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

  const uploadEvent = data => {
    if (user && token) {
      try {
        socket.emit('add-new-event', token, { coordinates: [coords.lng, coords.lat], ...data }, error => {
          if (error) {
            console.log(error);
          }
          console.log('event added');
        });
      } catch (err) {
        console.log(err);
      }
    } else {
      console.log('no auth user');
    }
  };

  const mapClicked = ({ lat, lng }) => {
    setCoords({ lat, lng });
    setShow(true);
    console.log(coords);
  };
  return (
    <div style={{ height: '100%', width: '100%' }}>
      <GoogleMapReact
        // bootstrapURLKeys={{ key: '/* YOUR KEY HERE */' }}
        onClick={mapClicked}
        defaultCenter={{
          lat: 31.205753,
          lng: 29.924526,
        }}
        defaultZoom={6}
        yesIWantToUseGoogleMapApiInternals
        // onGoogleApiLoaded={({ map, maps }) => handleApiLoaded(map, maps)}
        style={{ cursor: 'pointer' }}
      >
        <ClickMarker setShow={setShow} show={show} lat={coords.lat} lng={coords.lng} onClick={handleOpen} />
        {stateEvents.map(event => (
          <Event
            key={event._id}
            event={event}
            lat={event.location.coordinates[1]}
            lng={event.location.coordinates[0]}
            cardActiveIndex={cardActiveIndex}
            handleCardToggle={handleCardToggle}
          />
        ))}
      </GoogleMapReact>
      <Modal handleClose={handleClose} handleOpen={handleOpen} open={open}>
        <EventForm onSubmit={uploadEvent} />
      </Modal>
    </div>
  );
}

export default Map;

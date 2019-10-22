import React, { useState, useEffect, useRef } from 'react';
// import usePosition from '../hooks/usePosition';
import io from 'socket.io-client';
import { Map as LeafMap, TileLayer, Marker, Popup } from 'react-leaflet';
import { Button } from '@material-ui/core';
import L from 'leaflet';
import Modal from './Modal';
import Event from './Event';
import useModal from '../hooks/useModal';
import EventForm from './EventForm';
import { BaseURL } from '../constants';
import { AuthContainer } from '../hooks/useAuth';
import AddEventMarker from './AddEventMarker';

function Map({ events }) {
  // const { latitude, longitude, error } = usePosition();
  const { open, handleClose, handleOpen } = useModal();
  const { user, token } = AuthContainer.useContainer();
  const [stateEvents, setStateEvents] = useState(events);
  const [cardActiveIndex, setCardActiveIndex] = useState('');
  const [coords, setCoords] = useState({ lat: null, lng: null });
  const { current: socket } = useRef(io(BaseURL));

  const myCustomColour = '#583470';

  const markerHtmlStyles = `
  background-color: ${myCustomColour};
  width: 2rem;
  height: 2rem;
  display: block;
  left: -.9rem;
  top: -.9rem;
  position: relative;
  border-radius: 2rem 2rem 0;
  transform: rotate(45deg);
  border: 1px solid #FFFFFF`;

  const icon = L.divIcon({
    className: 'my-custom-pin',
    iconAnchor: [0, 24],
    labelAnchor: [-6, 0],
    popupAnchor: [0, -36],
    html: `<span style="${markerHtmlStyles}" />`,
  });
  function handleCardToggle(e) {
    setCoords({ lat: null, lng: null });
    setCardActiveIndex('');
    if (cardActiveIndex === e.target._popup.options.children.props.event._id) return;
    setCardActiveIndex(e.target._popup.options.children.props.event._id);
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

  const mapClicked = e => {
    setCardActiveIndex('');
    const { lat, lng } = e.latlng;
    setCoords({ lat, lng });
  };
  return (
    <React.Fragment>
      <LeafMap
        style={{ width: '100vw', height: 'calc(100vh - 65px)' }}
        zoom={6}
        center={[29.924526, 31.205753]}
        onClick={mapClicked}
      >
        {coords.lat && coords.lng && cardActiveIndex === '' && (
          <AddEventMarker position={[coords.lat, coords.lng]}>
            <Popup>
              <Button className="openButton" size="small" onClick={handleOpen} variant="contained" color="default">
                Add Event Here
              </Button>
            </Popup>
          </AddEventMarker>
        )}

        {stateEvents.map(event => (
          <Marker
            onClick={handleCardToggle}
            key={event._id}
            position={[event.location.coordinates[1], event.location.coordinates[0]]}
            icon={icon}
          >
            <Popup style={{ padding: 0 }}>
              <Event event={event} cardActiveIndex={cardActiveIndex} handleCardToggle={handleCardToggle} />
            </Popup>
          </Marker>
        ))}
        <TileLayer
          url={`https://api.mapbox.com/v4/mapbox.streets/{z}/{x}/{y}.jpg90?access_token=${process.env.MAPBOX_API_KEY}`}
        />
      </LeafMap>
      <Modal handleClose={handleClose} handleOpen={handleOpen} open={open}>
        <EventForm onSubmit={uploadEvent} />
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

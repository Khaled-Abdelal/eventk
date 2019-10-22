import React, { useState, useEffect, useRef } from 'react';
// import usePosition from '../hooks/usePosition';
import io from 'socket.io-client';
import { Map as LeafMap, TileLayer, Popup } from 'react-leaflet';
import { Button } from '@material-ui/core';
import { toast } from 'react-toastify';
import { EventMarker } from './EventMarker';
import Modal from './Modal';
import useModal from '../hooks/useModal';
import EventForm from './EventForm';
import { BaseURL } from '../constants';
import { AuthContainer } from '../hooks/useAuth';
import AddEventMarker from './AddEventMarker';

function Map({ events }) {
  // const { latitude, longitude, error } = usePosition();
  const { open, handleModalClose, handleModalOpen } = useModal();
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
            return toast.error(error.message);
          }
          toast.success('event added');
          handleModalClose();
          setCoords({ lat: null, lng: null });
        });
      } catch (err) {
        toast.error(err.message);
      }
    } else {
      toast.error('you need to login first');
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
              <Button className="openButton" size="small" onClick={handleModalOpen} variant="contained" color="default">
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
          url={`https://api.mapbox.com/v4/mapbox.light/{z}/{x}/{y}.jpg90?access_token=${process.env.MAPBOX_API_KEY}`}
        />
      </LeafMap>
      <Modal handleClose={handleModalClose} handleOpen={handleModalOpen} open={open}>
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

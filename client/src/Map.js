import React, { useState } from 'react';
import GoogleMapReact from 'google-map-react';
// import usePosition from '../hooks/usePosition';
import Modal from './Modal';
import useModal from '../hooks/useModal';
import EventForm from './EventForm';
import ClickMarker from './ClickMarker';

function Map() {
  // const { latitude, longitude, error } = usePosition();
  const { open, handleClose, handleOpen } = useModal();
  // const [mapObjects, setMapObjects] = useState({});
  const [show, setShow] = useState(false);
  const [coords, setCoords] = useState({ lat: null, lng: null });

  // const handleApiLoaded = (map, maps) => {
  //   // use map and maps objects
  //   setMapObjects({ map, maps });
  // };

  const mapClicked = ({ lat, lng }) => {
    setCoords({ lat, lng });
    setShow(true);
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
        <ClickMarker show={show} lat={coords.lat} lng={coords.lng} onClick={handleOpen} />
      </GoogleMapReact>
      <Modal handleClose={handleClose} handleOpen={handleOpen} open={open}>
        <EventForm />
      </Modal>
    </div>
  );
}

export default Map;

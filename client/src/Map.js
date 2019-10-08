import React from 'react';
import GoogleMapReact from 'google-map-react';
import SvgIcon from '@material-ui/core/SvgIcon';
import usePosition from '../hooks/usePosition';

const CameraMarker = () => (
  <SvgIcon fontSize="large">
    <path d="M9 3L7.17 5H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2h-3.17L15 3H9zm3 15c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-1l1.25-2.75L16 13l-2.75-1.25L12 9l-1.25 2.75L8 13l2.75 1.25z" />
  </SvgIcon>
);

function Map() {
  const { latitude, longitude, error } = usePosition();
  return (
    <div style={{ height: '100vh', width: '100%' }}>
      <GoogleMapReact
        // bootstrapURLKeys={{ key: '/* YOUR KEY HERE */' }}
        defaultCenter={{
          lat: latitude,
          lng: longitude,
        }}
        defaultZoom={13}
      >
        <CameraMarker lat={latitude} lng={longitude} />
      </GoogleMapReact>
    </div>
  );
}

export default Map;

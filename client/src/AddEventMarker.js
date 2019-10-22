import React from 'react';
import { Marker } from 'react-leaflet';

const AddEventMarker = props => {
  const initMarker = ref => {
    if (ref) {
      ref.leafletElement.openPopup();
    }
  };

  return <Marker icon={icon} ref={initMarker} {...props} />;
};

export default AddEventMarker;

const markerHtmlStyles = `
      background-color: ${'#57366F'};
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

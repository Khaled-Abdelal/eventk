import React from 'react';
import { Marker } from 'react-leaflet';

const AddEventMarker = props => {
  const initMarker = ref => {
    if (ref) {
      ref.leafletElement.openPopup();
    }
  };

  return <Marker ref={initMarker} {...props} />;
};

export default AddEventMarker;

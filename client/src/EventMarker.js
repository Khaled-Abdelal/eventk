import React, { useEffect, useState } from 'react';
import { Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import moment from 'moment';
import EventCard from './EventCard';

export function EventMarker({ handleCardToggle, event, cardActiveIndex }) {
  const [markerColor, setMarkerColor] = useState();

  useEffect(() => {
    // eslint-disable-next-line no-unused-expressions
    moment() > moment(event.startTime) ? setMarkerColor('#FC0D1B') : setMarkerColor('#46E166');
  }, [event.startTime]);

  const markerHtmlStyles = `
      background-color: ${markerColor};
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
  return (
    <Marker
      onClick={handleCardToggle}
      key={event._id}
      position={[event.location.coordinates[1], event.location.coordinates[0]]}
      icon={icon}
    >
      <Popup
        style={{
          padding: 0,
        }}
      >
        <EventCard event={event} cardActiveIndex={cardActiveIndex} handleCardToggle={handleCardToggle} />
      </Popup>
    </Marker>
  );
}

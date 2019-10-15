import React from 'react';
import Button from '@material-ui/core/Button';

function ClickMarker({ show, onClick }) {
  return (
    <React.Fragment>
      <div className="pin1" />
      {/* Below is info window component */}
      {show && (
        <div className="infoWindow">
          <Button size="small" onClick={onClick} variant="contained" color="default">
            Add Event Here
          </Button>
        </div>
      )}
      <style jsx>{`
        .pin1 {
          position: absolute;
          top: 40%;
          left: 50%;

          border-radius: 50% 50% 50% 0;
          border: 4px solid pink;
          width: 20px;
          height: 20px;
          transform: rotate(-45deg);
          margin: -23px 99px 20px -7px;
        }

        .pin1::after {
          position: absolute;
          content: '';
          width: 10px;
          height: 10px;
          border-radius: 50%;
          top: 50%;
          left: 50%;
          margin-left: -5px;
          margin-top: -5px;
          background-color: pink;
        }
        .infoWindow {
          width: 100px;
          height: 80px;
          background-color: transparent;
          margin: -108px 0px 0px -47px;
          border-radius: 5px;
          padding: 5px;
        }
      `}</style>
    </React.Fragment>
  );
}

export default ClickMarker;

import React from "react";

interface Props {
  lat: number;
  lng: number;
}

const CurrentLocation: React.FC<Props> = ({ lat, lng }) => {
  return (
    <div
      style={{
        position: "absolute",
        top: `${lat}px`,
        left: `${lng}px`,
        transform: "translate(-50%, -50%)",
        width: "20px",
        height: "20px",
        borderRadius: "50%",
        backgroundColor: "#28a745",
        border: "2px solid white",
        boxShadow: "0 0 5px rgba(0,0,0,0.3)",
        zIndex: 999,
      }}
      title="현재 위치"
    ></div>
  );
};

export default CurrentLocation;

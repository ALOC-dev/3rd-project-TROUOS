import React from "react";

interface IrumaeProps {
  name: string;
  lat: number;
  lng: number;
  onClick?: () => void;
}

const Irumae: React.FC<IrumaeProps> = ({ name, lat, lng, onClick }) => {
  return (
    <div
      onClick={onClick}
      title={name}
      style={{
        position: "absolute",
        top: `${lat}px`,
        left: `${lng}px`,
        cursor: "pointer",
        transform: "translate(-50%, -100%)",
      }}
    >
      <img
        src="/irumae.jpg"
        alt="이루매"
        style={{ width: "30px", height: "30px" }}
      />
    </div>
  );
};

export default Irumae;

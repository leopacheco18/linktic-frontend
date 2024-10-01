import React, { useState } from "react";
import "./Option.css";
import { Link } from "react-router-dom";

const Option = ({ to, text, image }) => {
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const containerStyle = {
    position: "relative",
    backgroundImage: `url("${image}")`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    overflow: "hidden",
  };

  const gradientOverlayStyle = {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: "linear-gradient(rgba(0,0,0), rgba(0,0,0))",
    opacity: isHovered ? 0.2 : 0.5,
    transition: "opacity 0.5s ease-in-out",
  };

  return (
    <Link
      className="option-card"
      to={to}
      style={containerStyle}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div style={gradientOverlayStyle}></div>
      <p className="option-text">{text}</p>
    </Link>
  );
};

export default Option;

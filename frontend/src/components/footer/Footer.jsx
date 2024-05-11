import React from "react";
import { AiFillTwitterCircle, AiFillLinkedin } from "react-icons/ai";
import { BsFacebook } from "react-icons/bs";
import { RiInstagramFill } from "react-icons/ri";
import "./footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container flex">
        <p>Cartsy Medicine - All rights reserved - Designed & Developed by RedQ, Inc</p>
        <div className="social">
          <BsFacebook className="icon" />
          <RiInstagramFill className="icon" />
          <AiFillTwitterCircle className="icon" />
          <AiFillLinkedin className="icon" />
        </div>
      </div>
    </footer>
  );
};

export default Footer;

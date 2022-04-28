import React from "react";
import Image from "next/image";

const Footer = (props) => {
  return (
    <div id="footer" className="pt-3 pb-3" style={{ backgroundColor: props.backgroundColor }}>
      <div style={{ color: props.color }}>© 2022 DeCharity </div>
    </div>
  );
};

export default Footer;

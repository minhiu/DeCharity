import PropTypes from "prop-types";
import { Slide } from "pure-react-carousel";
import React from "react";
import { Card } from "semantic-ui-react";

const CardSlide = ({ index, ...cardProps }) => (
  <Slide index={index}>
    <div style={{ padding: 10 }}>
      <Card fluid {...cardProps} />
    </div>
  </Slide>
);

CardSlide.propTypes = {
  index: PropTypes.number.isRequired
};

export default CardSlide;
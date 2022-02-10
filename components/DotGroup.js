import PropTypes from "prop-types";
import { Dot } from "pure-react-carousel";
import React from "react";
import { Button, Container } from "semantic-ui-react";

const DotGroup = ({ slides, size }) => (
  <Container textAlign="center">
    <Button.Group size={size}>
      {[...Array(slides).keys()].map(slide => (
        <Button as={Dot} key={slide} icon="circle" slide={slide} />
      ))}
    </Button.Group>
  </Container>
);

DotGroup.defaultProps = {
  size: "mini"
};

DotGroup.propTypes = {
  slides: PropTypes.number.isRequired,
  size: PropTypes.string
};

export default DotGroup;
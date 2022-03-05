import PropTypes from "prop-types";
import { Dot } from "pure-react-carousel";
import React from "react";
import { Button, Container } from "semantic-ui-react";


// Dot indexing of cards for the carousel.
const DotGroup = ({ slides, size }) => (
  //Simple JSX pure-react-carousel frontend and semantic ui call to create the dots from index to index.
  <Container textAlign="center">
    //Create the dots and map them to the indices to show which slide in the carousel you are at.
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
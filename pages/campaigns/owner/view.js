
import React from "react";
import ReactDOM from "react-dom";
import { Container, Header, Message, Segment } from "semantic-ui-react";

// Heads up!
// Don't forget to setyp required CSS!
import "pure-react-carousel/dist/react-carousel.es.css";

import CardCarousel from "../../../carousels/CardCarousel";


export default () => {
    return(
        <Container>
            <CardCarousel />
        </Container>

    );
};
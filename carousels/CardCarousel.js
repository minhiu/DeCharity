import { CarouselProvider, Image, Slide, Slider } from "pure-react-carousel";
import { Divider } from "semantic-ui-react";
import React from "react";

import CustomDotGroup from "../components/DotGroup";

const CardCarousel = () => (
   
  <CarouselProvider
    naturalSlideWidth={1}
    naturalSlideHeight={1}
    totalSlides={3}
  >
    <Slider>
      <Slide tag="a" index={0}>
        <Image src="https://discountseries.com/wp-content/uploads/2017/09/default.jpg" />
      </Slide>
      <Slide tag="a" index={1}>
        <Image src="" />
      </Slide>
      <Slide tag="a" index={2}>
        <Image src="" />
      </Slide>
    </Slider>

    <Divider />
    <CustomDotGroup slides={3} />
  </CarouselProvider>
);


export default CardCarousel;
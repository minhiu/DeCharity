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
        <Image src="https://v8fuoirhamw1.usemoralis.com:2053/server/files/oiT6sgUAkVpbXNHatAuoB0r9dpwjK0qR5rfFVF4z/9c0fd0cdf9e23b8e1cfef6f2ec88ee5b_upload.png" />
      </Slide>
      <Slide tag="a" index={1}>
        <Image src="https://lorempixel.com/800/800/cats/1" />
      </Slide>
      <Slide tag="a" index={2}>
        <Image src="https://lorempixel.com/800/800/cats/2" />
      </Slide>
    </Slider>

    <Divider />
    <CustomDotGroup slides={3} />
  </CarouselProvider>
);


export default CardCarousel;
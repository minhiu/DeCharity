import { CarouselProvider, Image, Slide, Slider } from "pure-react-carousel";
import { Divider } from "semantic-ui-react";
import React from "react";
// import { View, StyleSheet } from 'react-native';

import CustomDotGroup from "../components/DotGroup";

// const styles = StyleSheet.create({
//   image:{
//     width: "100%",
//     height: "300px",
//   },
// });

const ImageCarousel = () => (
  <CarouselProvider
    naturalSlideWidth={1}
    naturalSlideHeight={1}
    interval={5000}
    totalSlides={4}
  >
    <Slider>
      <Slide tag="a" index={0}>
        <Image src="https://www.unocha.org/sites/unocha/files/05-03-2019%209-15-28%20AM.png" />
      </Slide>
      <Slide tag="a" index={1}>
        <Image src="https://asia.oxfam.org/sites/asia.oxfam.org/files/styles/full-width-670x335-2_1/public/Oxfam-in-Asia-Humanitarian-Aid-and-Disaster-Response.jpg?itok=0MqAemLy" />
      </Slide>
      <Slide tag="a" index={2}>
        <Image src="https://csis-website-prod.s3.amazonaws.com/s3fs-public/styles/csis_banner/public/topic/171016_humanitarian_assistance_agenda.jpg?itok=CnVhvn5z" />
      </Slide>
      <Slide tag="a" index={3}>
        <Image src="https://res.cloudinary.com/devex/image/fetch/c_scale,f_auto,q_auto,w_720/http://neo-assets.s3.amazonaws.com/assets/0003/3360/Humanitarian-Relief-ICRC-Chad_448x252.jpg" />
      </Slide>
    </Slider>

    <Divider />
    <CustomDotGroup slides={4} />
  </CarouselProvider>
);

export default ImageCarousel;
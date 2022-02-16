import type { BoxProps } from '@chakra-ui/react';
import { Box } from '@chakra-ui/react';
import Airtable from 'airtable';
import type { AirtableBase } from 'airtable/lib/airtable_base';
import dotenv from 'dotenv';
import type { FC } from 'react';
import React from 'react';
import type { Settings } from 'react-slick';
import Slider from 'react-slick';

import type { DogResponse, Fields as DogFields } from '../types/db/dog';

dotenv.config();
Airtable.configure({
  apiKey: process.env.AIRTABLE_API_KEY,
});

interface CarouselProps {
  images: string[];
  wrapperProps?: BoxProps;
  settings?: Settings;
}
const base = new Airtable().base(process.env.AIRTABLE_BASE_ID);

export const Carousel: FC<CarouselProps> = ({
  images,
  wrapperProps,
  settings,
}) => {
  const [slider, setSlider] = React.useState<Slider | null>(null);

  return (
    <Box
      position={'relative'}
      overflow={'hidden'}
      height={'600px'}
      {...wrapperProps}
      // width={'full'}
    >
      {/* CSS files for react-slick */}
      <link
        rel="stylesheet"
        type="text/css"
        charSet="UTF-8"
        href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.min.css"
      />
      <link
        rel="stylesheet"
        type="text/css"
        href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick-theme.min.css"
      />

      <Slider {...settings} ref={(slider) => setSlider(slider)}>
        {images?.map((url, index) => (
          <Box
            key={index}
            height={'6xl'}
            position="relative"
            backgroundPosition="center"
            backgroundRepeat="no-repeat"
            backgroundSize="cover"
            backgroundImage={`url(${url})`}
          />
        ))}
      </Slider>
    </Box>
  );
};

Carousel.defaultProps = {
  settings: {
    dots: false,
    arrows: false,
    fade: false,
    infinite: true,
    autoplay: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  },
};
// const top = useBreakpointValue({ base: '90%', md: '50%' });
// const side = useBreakpointValue({ base: '30%', md: '10px' });

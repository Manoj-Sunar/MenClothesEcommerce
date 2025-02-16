import React from 'react';
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';
import { HomeCarouseImage } from './HomeCarouselImage';



const items =HomeCarouseImage.map((item)=> <img className='cursor-pointer ' role='presentation' src={item.image}/>) 
    

 const HomeCarousel = () => (
    <AliceCarousel
        items={items}
        controlsStrategy="alternate"
        disableButtonsControls
        autoPlay
        autoPlayInterval={1000}
        infinite
        
    />
);

export default HomeCarousel
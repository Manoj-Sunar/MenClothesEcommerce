import React, { useEffect, useState } from 'react';
import AliceCarousel from 'react-alice-carousel';
import HomeSectionCard from '../HomeSectionCard/HomeSectionCard';
import Button from '@mui/material/Button';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';




const HomeSectionCarouselCard = ({data,sectionName}) => {
    const [activeIndex, setActiveIndex] = useState(0);

    const responsive = {
        0: { items: 1 },
        720: { items: 3 },
        1024: { items: 5 },
    }


    const PrevSlide = () => {
        if (activeIndex > 0) setActiveIndex(activeIndex - 1);
    }


    const NextSlide = () => {
        if (activeIndex < items.length - responsive[1024].items) setActiveIndex(activeIndex + 1);
    }


    const syncActiveIndex = ({ item }) => setActiveIndex(item);

    const items = data&&data.slice(0,8).map((item,index) => <HomeSectionCard key={index} items={item}/>)

  

    return (

        <div className='mt-8  shadow px-2'>
            <h2 className="text-2xl font-extrabold text-gray-800 py-5">{sectionName}</h2>

            <div className='relative p-5 border-5'>
                <AliceCarousel
                    items={items}
                    disableDotsControls
                    disableButtonsControls
                    responsive={responsive}
                    activeIndex={activeIndex}
                    onSlideChanged={syncActiveIndex}
                    autoPlay
                    autoPlayInterval={1000}
                    infinite

                />
                {
                     activeIndex < items.length - responsive[1024].items&&<Button variant='contained' className='z-50' onClick={NextSlide} sx={{ position: "absolute", top: "8rem", right: "0", transform: "translateX(20%) rotate(90deg)", }} aria-label='next'>
                        <KeyboardArrowLeftIcon sx={{ transform: "rotate(90deg)" }} />
                    </Button>
                }

                {
                    activeIndex!==0&&
                    <Button variant='contained' className='z-50' onClick={PrevSlide} sx={{ position: "absolute", top: "8rem", left: "0", transform: "translateX(10%) rotate(90deg)", }} aria-label='next'>
                        <KeyboardArrowLeftIcon sx={{ transform: "rotate(-90deg)" }} />
                    </Button>
                }
            </div>



        </div>
    )
}

export default HomeSectionCarouselCard
import React from 'react'
import HomeCarousel from '../components/Carousel/HomeCarousel'
import HomeSectionCarouselCard from '../components/Carousel/HomeSectionCarouselCard'
import { mens_kurta } from '../../Data/MenCurta'


const HomePages = () => {
    return (
        <>
            <div>
                <HomeCarousel />
                <div className='space-y-10 py-20 flex flex-col justify-center px-5 lg:px-10'>
                <HomeSectionCarouselCard data={mens_kurta} sectionName={"Men's Kurta"}/>
                <HomeSectionCarouselCard data={mens_kurta} sectionName={"Men's Shoes"}/>
                <HomeSectionCarouselCard data={mens_kurta} sectionName={"Men's Shirt"}/>
                </div>
            </div>

        </>
    )
}

export default HomePages
import React from 'react'
import { NavLink } from 'react-router-dom'

const HomeSectionCard = ({items}) => {
    return (
        <>
            <NavLink to="/:levelOne/:levelTwo/:levelThre">
            <div className="cursor-pointer flex flex-col items-center bg-white rounded-lg shadow-lg overflow-hidden mx-3 w-[15rem]">

                <div className='h-[15rem] w-[10rem]'>
                    <img src={items.imageUrl} className='h-full w-full object-cover object-top'/>
                </div>
                <div className='mb-2 px-2'>
                    <h1 className='text-lg mt-3.5'>{items.brand}</h1>
                    <p className='text-md  text-gray-600'>{items.title}</p>
                </div>
            </div>
            
            </NavLink>

        </>
    )
}

export default HomeSectionCard
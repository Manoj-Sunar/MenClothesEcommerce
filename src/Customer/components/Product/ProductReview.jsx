import { Avatar, Grid, Rating } from '@mui/material';
import ProgressBar from "@ramonak/react-progress-bar";
import React from 'react'

const ProductReview = () => {
    return (
        <Grid container spacing={2} columnGap={2} px={8}  sx={{borderTop:"1px solid #ccc",paddingTop:"1rem"}}>
            <Grid item xs={5} className=' mx-auto'>
                <h1 className='text-2xl font-bold text-gray-800'>Customer Review</h1>
                
                <div className="mt-2">
                    <div className='flex flex-col justify-center gap-x-2'>
                        <div className='flex items-center gap-x-2'>
                        <Rating value={4.5} precision={.5} readOnly />
                        <p className='text-xl text-gray-900'>3.8 out of 5</p>
                        </div>
                        <p className='text-gray-700'>336 global rating</p>
                    </div>
                    <div className='mt-3'>

                        <div className='flex flex-col justify-center items-start gap-y-6'>
                            <a className="flex items-center gap-x-4" href='#'>
                                <p className='text-xs text-gray-700 w-[3.5rem]'>Excellent</p>
                                <ProgressBar completed={25} animateOnRender={true} width='15rem' height='18px' borderRadius='1.6px' bgColor='#DE7921' />
                            </a>
                            <a className="flex items-center gap-x-4" href='#'>
                                <p className='text-xs text-gray-700 w-[3.5rem]'>Very Good</p>
                                <ProgressBar completed={55} animateOnRender={true} width='15rem' height='18px' borderRadius='1.6px' bgColor='#DE7921' />
                            </a>
                            <a className="flex items-center gap-x-4" href='#'>
                                <p className='text-xs text-gray-700 w-[3.5rem]'>Good</p>
                                <ProgressBar completed={85} animateOnRender={true} width='15rem' height='18px' borderRadius='1.6px' bgColor='#DE7921' />
                            </a>
                            <a className="flex items-center gap-x-4" href='#'>
                                <p className='text-xs text-gray-700 w-[3.5rem]'>Average</p>
                                <ProgressBar completed={45} animateOnRender={true} width='15rem' height='18px' borderRadius='1.6px' bgColor='#DE7921' />
                            </a>
                            <a className="flex items-center gap-x-4" href='#'>
                                <p className='text-xs text-gray-700 w-[3.5rem]'>Excellent</p>
                                <ProgressBar completed={45} animateOnRender={true} width='15rem' height='18px' borderRadius='1.6' bgColor='#DE7921' />
                            </a>

                        </div>

                    </div>
                </div>
            </Grid>


            <Grid item xs={6} className=''>
                <h1 className='text-xl font-bold text-gray-800'>Customers say</h1>
                <div className='mt-5 flex flex-col justify-center gap-y-3'>
                    <div className='flex flex-col justify-center gap-x-2 py-2'>
                        <div className='flex justify-start items-center gap-x-2 mb-2'>
                            <Avatar>M</Avatar>
                            <p className='text-gray-500 text-medium '>Manoj Sunar</p>
                        </div>
                        <div className='flex items-center gap-x-4'>
                            <Rating value={4.5} precision={.5} readOnly />
                            <p className='text-lg font-medium'>Product was very good</p>
                        </div>
                        <div style={{ lineHeight: "1.26rem" }}>
                            <p className='text-gray-600 '>Reviewed in India on 20 August 2024</p>
                            <p className='text-gray-600'>See size and take great looking superb colour value for money</p>
                        </div>

                    </div>








                </div>
            </Grid>

        </Grid>
    )
}

export default ProductReview
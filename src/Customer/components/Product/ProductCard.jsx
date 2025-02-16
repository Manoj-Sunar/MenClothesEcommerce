import React, { useState,memo } from 'react'
import Box from '@mui/material/Box';
import Rating from '@mui/material/Rating';
import { Button } from '@mui/material';
import "./ProductCard.css"
import { NavLink } from 'react-router-dom';



const ProductCard = ({items,width,height}) => {



    const [value, setValue] = useState(2);
    const [hover,setHover]=useState(false);

    const handleMouseEnter=()=>setHover(true);
    const handleMouseLeave=()=>setHover(false);

    const buttonStyle={
        backgroundColor:hover?"#f8fe85":"yellow",
        color:hover?"#0e2431":"#000"
    }


    

   


    return (
        <div className="productCard w-[19rem] transition-all cursor-pointer my-2" style={{width:width&&width}}>

            <div className='h-[24rem]' style={{height:height&&height}}>
                <img src={items.imageUrl} alt="" className='w-full h-full object-cover object-left-top'/>
            </div>

            <div className="flex flex-col justify-center items-center text-part bg-white p-3">

                <div className='text-center'>
                    <p className="font-bold opacity-75">{items.brand}</p>
                    <p className='text-md text-gray-900 des'>{items.description.slice(0, 57)}...</p>

                    <Box
                        sx={{
                            '& > legend': { mt: 5 },
                        }}
                        className="mt-2"
                    >
                        <Rating
                            name="simple-controlled"
                            value={value}
                            onChange={(event, newValue) => {
                                setValue(newValue);
                            }}
                        />
                    </Box>

                </div>


                <div className="flex justify-center items-end gap-x-1">
                    <p className='flex justify-center items-top'>₹<span className='text-3xl font-semibold'>{items.price}</span></p>
                    <p className=' text-sm font-semibold flex justify-center items-center gap-x-2'><span className=' opacity-75'>M.R.P: <span className='line-through'>₹{items.price + items.discountPrice} </span> </span>  ({items.discountPercent}% off)</p>
                </div>

                <div className='mt-2 flex flex-col '>
                    <p className='text-center'>FREE Delivery</p>
                    {
                        items.quantity===0?<p className='text-red-700 text-center font-bold'>Out of Stock</p>:items.quantity<5?<p className='text-sm  p-1 text-center'>only {items.quantity} items is available</p>:""
                    }

                    {
                        items.quantity>0?<NavLink to={`/product/details/${items._id}`}>
                        <Button variant='contained' sx={{borderRadius:"50px",mt:1,textTransform:"capitalize",}} style={buttonStyle} onMouseOver={handleMouseEnter} onMouseLeave={handleMouseLeave}>Add to Cart</Button>
                        </NavLink>:""
                    }
                   
                </div>
            </div>
        </div>

    )
}

export default ProductCard
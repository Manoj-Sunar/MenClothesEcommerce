import { FormControl, MenuItem, Select } from '@mui/material'
import React from 'react'

import { useDispatch } from 'react-redux';
import { updateCartItemsSizeAndQuantity, DeleteCartItemsAPI } from '../../../Store/Slice/CartSlice';


const CartItem = ({ cartItems }) => {

   
    const dispatch=useDispatch();

    console.log(cartItems.product)

    const increment = () => {
        
        const data = {
            id: cartItems._id,
            quantity:cartItems.quantity + 1,
        }

        dispatch(updateCartItemsSizeAndQuantity(data));


    }


    const decrement = () => {
       
        const data = {
            id: cartItems._id,
            quantity: cartItems.quantity - 1,
        };

        if (cartItems.quantity > 1) {
            dispatch(updateCartItemsSizeAndQuantity(data));
        } else {
            dispatch(DeleteCartItemsAPI(cartItems._id));
        }

        
    }

    const DeleteCartItems = (id) => {
        dispatch(DeleteCartItemsAPI(id));
    }




    return (






        <div className='flex items-start justify-start p-1' style={{ borderBottom: "1px solid #ccc", paddingBottom: "3rem" }}>


            <div className=' flex justify-start items-start' >
                <div className="image w-[15rem] h-[15rem]">
                    <img src={cartItems?.product?.imageUrl} className='w-full h-full  object-contain' alt="" />
                </div>

                <div className="content w-[25rem]">
                    <div className='flex flex-col gap-y-1 px-2 '>
                        <h1 className='' style={{ fontSize: "1rem" }}>{cartItems?.product?.title}</h1>
                        <p className='text-xs  text-green-600'>In stock</p>
                        <p className='font-bold text-gray-800' style={{ fontSize: "0.8rem" }}>Size: <span className='font-normal text-gray-800'>{cartItems?.size}</span></p>
                        <p className='font-bold text-gray-800' style={{ fontSize: "0.8rem" }}>Colour: <span className='font-normal text-gray-800'>{cartItems?.product?.color}</span></p>
                        <p className='text-normal font-bold text-gray-900'>₹{cartItems?.discountedPrice}<span className='line-through  text-xs text-gray-700'> ₹{cartItems?.price}</span> <span className='text-xs font-bold text-gray-700'>({cartItems?.product?.discountPercent}% off)</span></p>

                    </div>

                    <div className="flex items-center mt-2 gap-x-5">
                        <div className="flex gap-x-2 items-center">
                            <button className=" px-2 text-gray-700" onClick={decrement} style={{ border: '1px solid #0001', textAlign: 'center', fontSize: "1.1rem", borderRadius: "4px" }}>
                                -
                            </button>
                            <span className="   px-4 text-gray-700" style={{ border: '1px solid #0001', textAlign: 'center', fontSize: "1.1rem", borderRadius: "4px" }}>{cartItems?.quantity}</span>
                            <button className="  px-2 text-gray-700" style={{ border: '1px solid #0001', textAlign: 'center', fontSize: "1.1rem", borderRadius: "4px" }} onClick={increment}>
                                +
                            </button>
                        </div>

                        <button className="text-red-900 italic text-xs hover:underline" onClick={() => DeleteCartItems(cartItems?._id)}>Delete</button>
                    </div>

                </div>
            </div>

          

        </div>







    )
}

export default CartItem
import React, { useEffect } from 'react'
import CartItem from './CartItem'
import { Button } from '@mui/material'
import { NavLink, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { GetUsersCart } from '../../../Store/Slice/CartSlice'
import LoadingComponent from '../LoadingPage/LoadingComponent'
import { GetUsersOrders } from '../../../Store/Slice/MakeOrderSlice'
import EmptyCart from './EmptyCart'

const Cart = () => {

  const {Cart,isLoading}=useSelector(state=>state.AddToCart);
  const Dispatch=useDispatch();
  

  
  useEffect(()=>{
      Dispatch(GetUsersCart({}));
     
  },[Cart?.UpdatedCartItems,Cart?.removeCart]);
 



  return (
    <>
      {
        Cart?.userCart?.totalItems<1?<EmptyCart/>:isLoading?<LoadingComponent/>: <div className='flex items-start mt-8 justify-around'>
        <div className=' max-w-[50rem] px-2 '>

          <div className='flex justify-between cart-items'>
            <h1 className="mb-3 text-gray-900" style={{ fontSize: "1.6rem", fontWeight: "600" }}>Shopping Cart</h1>
            <p className='text-gray-600 price-heading'>Price</p>
          </div>


          <div className='flex flex-col gap-y-2'>
            {
              Cart?.userCart?.cartItems.map((item, index) => <CartItem  cartItems={item}/>)
            }

            <div className='flex items-center justify-center gap-x-1  ms-auto p-1' style={{ width: "fit-content" }}>
              <span className='text-xl'>Subtotal({Cart?.userCart?.totalItems}items):</span>
              <p className='text-lg font-bold'>₹{Cart?.userCart?.totalPrice}</p>
            </div>
          </div>

        </div>

        <div className="subtotal flex flex-col gap-y-4 p-4" style={{ width: "20rem", height: "fit-content", background: "#ccc3", borderRadius: "2px", boxShadow: "0px 0px 2px #ccc" }}>
          <div className='flex flex-col items-start gap-y-2'>
            <div className='flex w-full justify-between'>
              <h1 className="text-xl">Subtotal({Cart?.userCart?.totalItems} items):</h1>
              <p className='text-lg font-bold'>₹{Cart?.userCart?.totalPrice}</p>
            </div>
            <div className='flex justify-between  w-full'>
              <p className='text-gray-700'>Total Discount</p>
              <span className='text-green-700'>₹{Cart?.userCart?.totalDiscountPrice}</span>

            </div>
            <div className='flex justify-between w-full'>
              <p className='text-gray-900'>Delivery Charge</p>
              <span className='text-lg  text-green-700'>free</span>
            </div>

            <div className='flex justify-between  w-full total-price'>
              <p className='text-gray-900'>Total</p>
              <span className='text-xl font-bold  text-green-700'>₹{Cart?.userCart?.totalPrice - Cart?.userCart?.totalDiscountPrice}</span>
            </div>
          </div>

          <NavLink to="/checkout?step=2">
            <Button size='small' color='warning' className='w-full' variant='contained' sx={{ textTransform: "capitalize", color: "black" }}>Proceed to Buy</Button>
          </NavLink>
        </div>

      </div>
      }

  
      

      
      
    </>
  )
}

export default Cart
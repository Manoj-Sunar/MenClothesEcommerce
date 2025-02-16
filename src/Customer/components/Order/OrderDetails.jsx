import React from 'react'
import AddressCard from '../Checkout/AddressCard'
import OrderTracker from './OrderTracker'
import OrderCard from './OrderCard'



const OrderDetails = () => {
  return (

    <>
      
      <div className='px-5 lg:px-20  items-start mt-2 flex flex-col gap-y-3 w-[85rem] mx-auto'>
        <div className='w-full'>
          <h1 className="font-bold text-xl py-10">Delivery Address</h1>
          <AddressCard />
        </div>

        <div className='p-5 h-[7rem] flex justify-center items-center w-full' style={{ boxShadow: "0px 0px 3px #ccc" }}>
          <OrderTracker activeStep={3} />
        </div>

        <div className='flex flex-col justify-center gap-y-2 w-full mt-20'>
          {
            [1, 4, 5, 6, 9].map((item, index) => <OrderCard  key={index} />)
          }
        </div>

      </div>

      

    </>
  )
}

export default OrderDetails
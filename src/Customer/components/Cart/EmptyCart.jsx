import { Typography } from '@mui/material'
import React from 'react'

const EmptyCart = () => {
  return (
    <div className='flex flex-col items-center justify-center'>
        <div style={{width:'20rem'}}>
            <img src="./empty.jpg" alt="" />
        </div>

        <div className='flex flex-col items-center'>
            <Typography variant='h6'>Your cart is empty</Typography>
            <p>Looks like you haven't made your choice yet...</p>
        </div>

    </div>
  )
}

export default EmptyCart
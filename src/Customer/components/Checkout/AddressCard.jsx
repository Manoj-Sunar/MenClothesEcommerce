import React from 'react'

const AddressCard = ({address}) => {
  return (
    <div className='mb-4'>
        <div className='flex  items-start flex-col gap-y-2'>
            <p className='text-gray-900 font-bold'>{address?.firstName} {address?.lastName}</p>
            <div className='flex gap-x-1'>
                <p className='text-gray-700'>{address?.city},</p>
                <p className='text-gray-700'>{address?.state},</p>
                <p>{address?.ZipCode}</p>
            </div>
            <div>
                <h3 className='text-lg text-gray-900'>Phone Number</h3>
                <span>{address?.phone}</span>
            </div>
        </div>
    </div>
  )
}

export default AddressCard
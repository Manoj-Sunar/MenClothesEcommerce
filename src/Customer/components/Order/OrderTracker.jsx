import { Step, StepLabel, Stepper } from '@mui/material'
import React from 'react'

const OrderTracker = ({ activeStep }) => {

    const steps = ["Placed", "Order Confirmed", "Shipped", "Out for Delivery", "Delivered"]

    return (
        <div className='w-full'>
            <Stepper activeStep={activeStep} alternativeLabel>
                {
                    steps.map((label) => <Step>
                        <StepLabel sx={{ fontSize: "44px", color: "#9155fd" }}>{label}</StepLabel>
                    </Step>)
                }
            </Stepper>

        </div>
    )
}

export default OrderTracker
import { Box, Button, Grid, TextField } from '@mui/material'
import React, { useEffect } from 'react'
import AddressCard from './AddressCard'
import { useDispatch, useSelector } from 'react-redux'
import { CreateOrders } from '../../../Store/Slice/MakeOrderSlice'
import { useNavigate } from 'react-router-dom'


const DeliveryAddress = () => {
   
    const Navigate=useNavigate();
    const dispatch=useDispatch();
    const {OrderData}=useSelector(state=>state.MakeOrders);


    const handleForm = (e) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const address={
            firstName:formData.get("firstName"),
            lastName:formData.get("lastName"),
            address:formData.get('address'),
            city:formData.get('city'),
            state:formData.get('state'),
            ZipCode:formData.get("Zip"),
            phone:formData.get("phoneNumber"),
            


        }

        dispatch(CreateOrders(address));
    }

    

    useEffect(() => {
        if (OrderData?.status === true && OrderData?.OrderCreated?._id) {
            const newUrl = `?step=3&OrderId=${OrderData?.OrderCreated?._id}`;
            if (window.location.search !== newUrl) {
                Navigate(newUrl); // Ensure the URL stays consistent
            }
        }
    }, [OrderData?.status]);

 
   


    return (
        <div>
            <Grid spacing={4} container>
                <Grid item xs={4}>
                    <div className='flex flex-col justify-start items-start p-3 border h-[30.5rem] shadow-sd  overflow-y-scroll'>
                        <AddressCard address={OrderData?.Order?.shippingAddress}/>
                        <Button variant='contained' color='secondary' sx={{ textTransform: "capitalize" }} size='large' className='w-[15rem]'>Delivery here</Button>
                    </div>
                </Grid>

                <Grid item xs={12} lg={7} sm={7}>
                    <Box>
                        <form onSubmit={handleForm}>
                            <Grid container spacing={2}>


                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        required
                                        name='firstName'
                                        id="firstName"
                                        label="first name"
                                        fullWidth
                                    />

                                </Grid>


                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        required
                                        name='lastName'
                                        id="lastName"
                                        label="last name"
                                        fullWidth
                                    />
                                </Grid>

                                <Grid item xs={12} sm={6} lg={12}>
                                    <TextField
                                        required
                                        name='address'
                                        id="address"
                                        label="Address"
                                        fullWidth
                                        multiline
                                        rows={4}
                                        autoComplete='given-name'
                                    />
                                </Grid>

                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        required
                                        name='city'
                                        id="city"
                                        label="city"
                                        fullWidth
                                        autoComplete=''
                                    />
                                </Grid>


                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        required
                                        name='state'
                                        id="state"
                                        label="state/Province/region"
                                        fullWidth
                                        autoComplete=''
                                    />
                                </Grid>

                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        required
                                        name='Zip'
                                        id="Zip"
                                        label="Zip/postal"
                                        fullWidth
                                        autoComplete='shipping postal-code'
                                    />
                                </Grid>

                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        required
                                        type='number'
                                        name='phoneNumber'
                                        id="phoneNumber"
                                        label="phone number"
                                        fullWidth
                                        autoComplete='phone number'
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <Button type='submit' variant='contained' sx={{ bgcolor: "RGB(145 85 253 )" }}>Delevery here</Button>
                                </Grid>




                            </Grid>
                        </form>
                    </Box>

                </Grid>

            </Grid>
        </div>
    )
}

export default DeliveryAddress
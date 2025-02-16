import React, { useEffect, useRef } from 'react'
import { Button, Grid } from '@mui/material';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';

import OrderCard from './OrderCard';
import AddressCard from '../Checkout/AddressCard';
import CartItem from '../Cart/CartItem';
import { NavLink, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { GetUsersOrders } from '../../../Store/Slice/MakeOrderSlice';
import { createPayment } from '../../../Store/Slice/CreatePaymentSlice';




const Order = () => {
    //Order summary
    const dispatch = useDispatch();
    const location = useLocation();
    const formRef = useRef(null);

    const { OrderData } = useSelector(state => state.MakeOrders);
    const searchParams = new URLSearchParams(location.search);
    const OrderId = searchParams.get('OrderId');
    const { PaymentData } = useSelector(state => state.EsewaPayment);




    const HandleEsewaPayment = (e) => {
        e.preventDefault();
        const data = {
            OrderId: OrderId,
            totalPrice: OrderData?.Order?.ActualPrice,
        };

        dispatch(createPayment(data));
        console.log(`UUID: ${PaymentData?.purchasedItemData?._id}`)
        console.log(`Signature : ${PaymentData?.payment?.signature}`)

    }



    useEffect(() => {

        dispatch(GetUsersOrders(OrderId));


    }, [dispatch, OrderId])


    // Trigger form submission only after PaymentData is updated

    useEffect(() => {
        if (PaymentData?.payment?.signature) {
            formRef.current.submit();
        }

        
    }, [PaymentData]);


   



    return (
        <>



            <div className='mt-3'>
                <Grid container gap={3} sx={{ margin: "auto" }} justifyContent={'center'}>
                    <Grid item sm={11} sx={{ boxShadow: "0px 0px 3px #ccc" }} className='p-2' height={"fit-content"}>
                        <div className='flex flex-col gap-y-2'>
                            <AddressCard address={OrderData?.Order?.shippingAddress} />
                        </div>

                    </Grid>

                    <Grid container gap={25} justifyContent={'center'} className='mt-[3rem]'>
                        <Grid item sm={5} gap={10}>

                            {
                                OrderData?.Order?.orderItems.map((item, key) => <CartItem key={key} cartItems={item} />)
                            }


                        </Grid>
                        <Grid item sm={4}>
                            <div className="subtotal flex flex-col gap-y-4 p-4" style={{ width: '100%', height: "fit-content", background: "#ccc3", borderRadius: "2px", boxShadow: "0px 0px 2px #ccc" }}>
                                <div className='flex flex-col items-start gap-y-2'>
                                    <div className='flex w-full justify-between'>
                                        <h1 className="text-xl">Subtotal({OrderData?.Order?.totalItem} items):</h1>
                                        <p className='text-lg font-bold'>₹1000</p>
                                    </div>
                                    <div className='flex justify-between  w-full'>
                                        <p className='text-gray-700'>Total Discount</p>
                                        <span className='text-green-700'>₹{OrderData?.Order?.totaldiscountedPrice}</span>

                                    </div>
                                    <div className='flex justify-between w-full'>
                                        <p className='text-gray-900'>Delivery Charge</p>
                                        <span className='text-lg  text-green-700'>free</span>
                                    </div>

                                    <div className='flex justify-between  w-full total-price'>
                                        <p className='text-gray-900'>Total</p>
                                        <span className='text-xl font-bold  text-green-700'>₹{OrderData?.Order?.ActualPrice}</span>
                                    </div>
                                </div>

                                <div>
                                    <form ref={formRef} action="https://rc-epay.esewa.com.np/api/epay/main/v2/form" method="POST" target="_blank" className='max-w-sm mx-auto'>
                                        <input type="hidden" id="amount" name="amount"  value={PaymentData?.purchasedItemData?.totalPrice} className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" required />
                                        <input type="hidden" id="tax_amount" name="tax_amount" value="0"  className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" required />
                                        <input type="hidden" id="total_amount" name="total_amount" value={PaymentData?.purchasedItemData?.totalPrice} className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" required />
                                        <input type="hidden" id="transaction_uuid" name="transaction_uuid" value={`${PaymentData?.purchasedItemData?._id}`} className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" required />
                                        <input type="hidden" id="product_code" name="product_code" value="EPAYTEST" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" required />
                                        <input type="hidden" id="product_service_charge" name="product_service_charge" value="0" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" required />
                                        <input type="hidden" id="product_delivery_charge" name="product_delivery_charge" value="0" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" required />
                                        <input type="hidden" id="success_url" name="success_url" value={`http://localhost:3001/complete-payment/${OrderId}`} className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" required />
                                        <input type="hidden" id="failure_url" name="failure_url" value="https://developer.esewa.com.np/failure" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" required />
                                        <input type="hidden" id="signed_field_names" name="signed_field_names" value={`${PaymentData?.payment?.signed_field_names}`} className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" required />
                                        <input type="hidden" id="signature" name="signature" value={`${PaymentData?.payment?.signature}`} className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" required />
                                        <Button onClick={HandleEsewaPayment} type='submit' size='small' color='warning' className='w-full' variant='contained' sx={{ textTransform: "capitalize", color: "black" }}>Proceed to Buy</Button>

                                    </form>


                                </div>
                            </div>



                        </Grid>

                    </Grid>

                </Grid>
            </div>


        </>
    )
}

export default Order
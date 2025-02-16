import React, { useEffect } from 'react';
import Achievement from './Achievement';
import { Grid } from '@mui/material';
import MonthlyOverview from './MonthlyOverview';
import AdminOrders from './AdminOrders';
import AdminProducts from './AdminProducts';
import { useDispatch, useSelector } from 'react-redux';
import { GetAllOrdersAdmin } from '../../Store/Slice/MakeOrderSlice';

const AdminDashboard = () => {
    const dispatch = useDispatch();
    const { OrderData } = useSelector(state => state.MakeOrders);
   

    useEffect(() => {
        dispatch(GetAllOrdersAdmin({}))
        
    }, []);


    return (
        <div className='p-5 w-[85%]' style={{ boxSizing: 'border-box', marginLeft: 'auto' }}>
            <Grid container spacing={2} >
                <Grid item xs={12} md={12} >
                    <Achievement OrdersData={OrderData&&OrderData}/>
                </Grid>

                {
                    OrderData?.length > 0 ? <Grid item xs={12} md={12}>
                        <div className='w-full' >
                            <AdminOrders width={"100%"} />
                        </div>
                    </Grid> : ""
                }

                <Grid item xs={12} md={12}>

                    <div className='w-full'>
                        <AdminProducts width={"100%"} />
                    </div>

                </Grid>
            </Grid>
        </div>
    );
}

export default AdminDashboard;

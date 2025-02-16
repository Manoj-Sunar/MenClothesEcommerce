import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";


export const CreateOrders = createAsyncThunk('fethCreateOrderAPI', async (data, { rejectWithValue }) => {
    try {



        const response = await axios.post(`http://localhost:3001/order/create`, data, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            }
        })



        if (response.data.status === true) {
            return response.data;
        } else {
            return response.data.msg;
        }

    } catch (error) {
        return rejectWithValue(error.response?.data?.msg);
    }

});




//get users order by order id
export const GetUsersOrders = createAsyncThunk('fethfindUserOrderByIdAPI', async (id, { rejectWithValue }) => {
    try {




        const response = await axios.get(`http://localhost:3001/order/user/order/${id}`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        })



        if (response.data.status === true) {
            return response.data;
        } else {
            return response.data.msg;
        }

    } catch (error) {
        return rejectWithValue(error.response?.data?.msg);
    }

});



//get all orders it is only for admin
export const GetAllOrdersAdmin = createAsyncThunk('fetchGetAllOrdersAPI', async (_, { rejectWithValue }) => {
    try {
        const response = await axios.get(`http://localhost:3001/order/allOrder`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
        });

        if (response.data.status === true) {
            return response.data.allOrders;

        } else {
            return response.data.msg;
        }

    } catch (error) {
        rejectWithValue(error.response?.data?.msg);
    }
});







//Admin shipped Orders
export const AdminShippedOrders = createAsyncThunk('fetchShippedOrderAPI', async ({ orderId, status }, { rejectWithValue }) => {
    try {
        const response = await axios.put(`http://localhost:3001/order/admin/shipped/order/${orderId}`, status, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        })


        console.log(response);
        if (response.data.status === true) {
            return response.data;

        } else {
            return response.data.msg;
        }

    } catch (error) {
        rejectWithValue(error.response?.data?.msg);
    }
});


//admin placed order
export const AdminPlacedOrders = createAsyncThunk('fetchPlacedOrderAPI', async ({ orderId, status }, { rejectWithValue }) => {
    try {
        const response = await axios.put(`http://localhost:3001/order/admin/placed/order/${orderId}`, status, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        })


        console.log(response);
        if (response.data.status === true) {
            return response.data;

        } else {
            return response.data.msg;
        }

    } catch (error) {
        rejectWithValue(error.response?.data?.msg);
    }
});















const MakeOrderSlice = createSlice({
    name: "MakeOrder",
    initialState: {
        isError: false,
        isLoading: false,
        OrderData: [],
        errorMessage: null,

    },


    //create orders
    extraReducers: (builder) => {
        builder.addCase(CreateOrders.pending, (state) => {
            state.isError = false;
            state.isLoading = true;

            state.errorMessage = null;
        });

        builder.addCase(CreateOrders.rejected, (state, action) => {
            state.isError = true;
            state.isLoading = false;
            state.errorMessage = action.payload;


        });

        builder.addCase(CreateOrders.fulfilled, (state, action) => {
            state.isError = false;
            state.isLoading = false;

            state.OrderData = action.payload;
        });



        //getuserOrderbyId
        builder.addCase(GetUsersOrders.pending, (state) => {
            state.isError = false;
            state.isLoading = true;

            state.errorMessage = null;
        });

        builder.addCase(GetUsersOrders.rejected, (state, action) => {
            state.isError = true;
            state.isLoading = false;
            state.errorMessage = action.payload;


        });

        builder.addCase(GetUsersOrders.fulfilled, (state, action) => {
            state.isError = false;
            state.isLoading = false;
            state.errorMessage = null;
            state.OrderData = action.payload;
        });


        //get all orders only for admin
        builder.addCase(GetAllOrdersAdmin.pending, (state) => {
            state.isError = false;
            state.isLoading = true;

            state.errorMessage = null;
        });

        builder.addCase(GetAllOrdersAdmin.rejected, (state, action) => {
            state.isError = true;
            state.isLoading = false;
            state.errorMessage = action.payload;



        });

        builder.addCase(GetAllOrdersAdmin.fulfilled, (state, action) => {
            state.isError = false;
            state.isLoading = false;
            state.errorMessage = null;
            state.OrderData = Array.isArray(action.payload) ? action.payload : [];

        });







        

        



        //Shipped Order
        builder.addCase(AdminShippedOrders.pending, (state) => {
            state.isError = false;
            state.isLoading = true;
            state.errorMessage = null;
        });

        builder.addCase(AdminShippedOrders.rejected, (state, action) => {
            state.isError = true;
            state.isLoading = false;
            state.errorMessage = action.payload;


        });

        builder.addCase(AdminShippedOrders.fulfilled, (state, action) => {
            state.isError = false;
            state.isLoading = false;
            state.OrderData = action.payload;
        });



        //placed Order
        builder.addCase(AdminPlacedOrders.pending, (state) => {
            state.isError = false;
            state.isLoading = true;
            state.errorMessage = null;
        });

        builder.addCase(AdminPlacedOrders.rejected, (state, action) => {
            state.isError = true;
            state.isLoading = false;
            state.errorMessage = action.payload;


        });

        builder.addCase(AdminPlacedOrders.fulfilled, (state, action) => {
            state.isError = false;
            state.isLoading = false;
            state.OrderData = action.payload;
        });



    


    }
});

export default MakeOrderSlice.reducer;
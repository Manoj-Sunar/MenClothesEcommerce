import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const createPayment=createAsyncThunk('fetchInitialEsewaPaymentAPI',async(data,{rejectWithValue})=>{
    try {
        const response=await axios.post(`http://localhost:3001/initialize-esewa`,data,{
            headers:{
                Authorization:`Bearer ${localStorage.getItem('token')}`,
            }
        });

        console.log(response);
        if(response.data.success===true){
            return response.data
        }else{
            return response.error;
        }
        
    } catch (error) {
        return rejectWithValue(error.response?.data?.msg)
    }
});



const PaymentSlice=createSlice({
    name:'PaymentSlice',
    initialState:{
        isError: false,
        isLoading: false,
        PaymentData: null,
        errorMessage: null,
    },

    extraReducers:(builder)=>{
        builder.addCase(createPayment.pending,(state,action)=>{
            state.isLoading=true;
            state.isError=false;
            state.errorMessage=null;
            state.PaymentData=null;
        });

        builder.addCase(createPayment.rejected,(state,action)=>{
            state.isLoading=false;
            state.isError=true;
            state.errorMessage=action.payload;
            state.PaymentData=null;
        });

        builder.addCase(createPayment.fulfilled,(state,action)=>{
            state.isLoading=false;
            state.isError=false;
            state.errorMessage=null;
            state.PaymentData=action.payload;
        });
    }
});


export default PaymentSlice.reducer;
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
export const AdminNotification=createAsyncThunk("fethAdminMessage",async(_,{rejectWithValue})=>{
      try {
        const res=await axios.get("http://localhost:3001/admin-notification/get/notification",{
            headers:{
                Authorization:`Bearer ${localStorage.getItem("token")}`,
            }
           })

           console.log(res.data.notification);
           return res.data.notification;
        
      } catch (error) {
        return rejectWithValue(error.response?.data?.msg);
      }
});



export const AdminNotificationDelete=createAsyncThunk("fetchAdminNotificationDelete",async(id,{rejectWithValue})=>{
    try {
        const res=await axios.delete(`http://localhost:3001/admin-notification/delete/notification/${id}`,{
            headers:{
              Authorization:`Bearer ${localStorage.getItem('token')}`,
            },
           });
      
           if(res.data.status===true){
            return res.data
           }
        
    } catch (error) {
        return rejectWithValue()
    }
  
})






const createAdminNotificationSlice=createSlice({
    name: "Cart",
    initialState: {
        isError: false,
        isLoading: false,
        notification: null,
        errorMessage: null,
        
    },

    extraReducers:(builder)=>{
        builder.addCase(AdminNotification.pending,(state)=>{
            state.isError=false;
            state.isLoading=true;
            state.notification=null;
            state.errorMessage=null;
        });

        builder.addCase(AdminNotification.rejected,(state,action)=>{
            state.isError=true;
            state.isLoading=false;
            state.notification=null;
            state.errorMessage=action.payload;

        });

        builder.addCase(AdminNotification.fulfilled,(state,action)=>{
            state.isError=false;
            state.isLoading=false;
            state.notification=action.payload;
            state.errorMessage=false;
        })



        //admin notification delete
        builder.addCase(AdminNotificationDelete.pending,(state)=>{
            state.isError=false;
            state.isLoading=true;
            state.notification=null;
            state.errorMessage=null;
        });

        builder.addCase(AdminNotificationDelete.rejected,(state,action)=>{
            state.isError=true;
            state.isLoading=false;
            state.notification=null;
            state.errorMessage=action.payload;

        });

        builder.addCase(AdminNotificationDelete.fulfilled,(state,action)=>{
            state.isError=false;
            state.isLoading=false;
            state.notification=action.payload;
            state.errorMessage=false;
        })
    }
})

export default createAdminNotificationSlice.reducer;
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";


export const AddToCartItems = createAsyncThunk('fethAllAddToCartItemsAPI', async (data, { rejectWithValue }) => {
    try {


     
        const response = await axios.put(`http://localhost:3001/user/cart/add/cart/${data.id}`, data, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
                'Content-Type': 'application/json',
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




//get user Cart
export const GetUsersCart = createAsyncThunk('fethAllUserCartAPI', async (_,{ rejectWithValue }) => {
    try {

        const response=await axios.get(`http://localhost:3001/user/cart/find/user/cart`,{
            headers:{
                Authorization:`Bearer ${localStorage.getItem('token')}`,
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



//update cart items
export const updateCartItemsSizeAndQuantity=createAsyncThunk('fetchUpdateCartItemsAPI',async(data,{rejectWithValue})=>{
    try {
        
        const response=await axios.put(`http://localhost:3001/user/cart/cartItems/update/${data.id}`,data,{
            headers:{
                Authorization:`Bearer ${localStorage.getItem('token')}`,
            },
        });

        

        if(response.data.status===true){
            return response.data;
        }else{
            return response.data.msg;
        }

        

    } catch (error) {
        rejectWithValue(error.response?.data?.msg);
    }
});



//delete cart items
export const DeleteCartItemsAPI=createAsyncThunk('fetchDeleteCartItemsAPI',async(id,{rejectWithValue})=>{
     try{
        const response=await axios.delete(`http://localhost:3001/user/cart/delete/${id}`,{
            headers:{
                Authorization:`Bearer ${localStorage.getItem('token')}`,
            },
        });

     

        if(response.data.status===true){
            return response.data;
        }else{
            return response.data.msg;
        }

     }catch(error){
        rejectWithValue(error.response?.msg);
     }
})



const CartSlice = createSlice({
    name: "Cart",
    initialState: {
        isError: false,
        isLoading: false,
        Cart: null,
        errorMessage: null,
        
    },


    //get all products
    extraReducers: (builder) => {
        builder.addCase(AddToCartItems.pending, (state) => {
            state.isError = false;
            state.isLoading = true;
            state.Cart = null
            state.errorMessage = null;
        });

        builder.addCase(AddToCartItems.rejected, (state, action) => {
            state.isError = true;
            state.isLoading = false;
            state.errorMessage = action.payload;
            state.Cart = null;

        });

        builder.addCase(AddToCartItems.fulfilled, (state, action) => {
            state.isError = false;
            state.isLoading = false;
            state.errorMessage = null;
            state.Cart = action.payload;
        });


        //get users Cart
        builder.addCase(GetUsersCart.pending, (state) => {
            state.isError = false;
            state.isLoading = true;
            state.Cart = null
            state.errorMessage = null;
        });

        builder.addCase(GetUsersCart.rejected, (state, action) => {
            state.isError = true;
            state.isLoading = false;
            state.errorMessage = action.payload;
            state.Cart = null;

        });

        builder.addCase(GetUsersCart.fulfilled, (state, action) => {
            state.isError = false;
            state.isLoading = false;
            state.errorMessage = null;
            state.Cart = action.payload;
        });


        //update cart items
        builder.addCase(updateCartItemsSizeAndQuantity.pending, (state) => {
            state.isError = false;
            state.isLoading = true;
            state.Cart = null
            state.errorMessage = null;
        });

        builder.addCase(updateCartItemsSizeAndQuantity.rejected, (state, action) => {
            state.isError = true;
            state.isLoading = false;
            state.errorMessage = action.payload;
            state.Cart = null;

        });

        builder.addCase(updateCartItemsSizeAndQuantity.fulfilled, (state, action) => {
            state.isError = false;
            state.isLoading = false;
            state.errorMessage = null;
            state.Cart = action.payload;
        });


         //Remove  cart items
         builder.addCase(DeleteCartItemsAPI.pending, (state) => {
            state.isError = false;
            state.isLoading = true;
            state.Cart = null
            state.errorMessage = null;
        });

        builder.addCase(DeleteCartItemsAPI.rejected, (state, action) => {
            state.isError = true;
            state.isLoading = false;
            state.errorMessage = action.payload;
            state.Cart = null;

        });

        builder.addCase(DeleteCartItemsAPI.fulfilled, (state, action) => {
            state.isError = false;
            state.isLoading = false;
            state.errorMessage = null;
            state.Cart = action.payload;
        });



    }
});

export default CartSlice.reducer;
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";



//for admin add products
export const AdminAddProducts=createAsyncThunk('fetchAddProductsAPI',async(data,{rejectWithValue})=>{
    try {
       
        const response=await axios.post(`http://localhost:3001/products/create/product`,data,{
            headers:{
                Authorization:`Bearer ${localStorage.getItem('token')}`,
            }
        });

        
        if(response.data.status===true){
            return response.data;
        }else{
            return response.data.msg;
        }
        
    } catch (error) {
        return rejectWithValue(error.response?.data?.msg)
    }
});



export const getAllProducts = createAsyncThunk('fethAllProductsAPI', async (data, { rejectWithValue }) => {
    try {

        //category=${category}&color=${colors}&size=${sizes}&minPrice=${minPrice}&maxPrice=${maxPrice}&discount=${minDiscount}&sort=${sort}&stock=${stock}&pageNumber=${pageNumber}&pageSize=${pageSize}

        const response = await axios.get(`http://localhost:3001/products?&color=${data.color}&sort=${data.sort}&minPrice=${data.minPrice}&maxPrice=${data.maxPrice}&size=${data.sizes}&minDiscount=${data.minDiscount}&pageNumber=${data.pageNumber}&pageSize=${data.pageSize}`, {

            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        });

        
      

         

        if (response.data.status === true) {
            return response.data;
        } else {
            return response.data.msg;
        }

    } catch (error) {
        return rejectWithValue(error.response?.data?.msg);
    }

});








export const DeleteProducts=createAsyncThunk('fetchDeleteProductsAPI',async({productId},{rejectWithValue})=>{
    try {

        
        const response=await axios.delete(`http://localhost:3001/products/delete/${productId}`,{
            headers:{
                Authorization:`Bearer ${localStorage.getItem('token')}`,
            }
        });

        console.log(response);

        if(response.data.status===true){
            return response.data;
        }else{
            return response.data.msg;
        }

    } catch (error) {
        rejectWithValue(error.response?.data?.msg);
    }
});




const productSlice = createSlice({
    name: "Product",
    initialState: {
        isError: false,
        isLoading: false,
        productData: null,
        errorMessage: null,
    },


    //add products for admin
    extraReducers: (builder) => {
        builder.addCase(AdminAddProducts.pending, (state) => {
            state.isError = false;
            state.isLoading = true;
            state.productData = null;
            state.errorMessage = null;
        });

        builder.addCase(AdminAddProducts.rejected, (state, action) => {
            state.isError = true;
            state.isLoading = false;
            state.errorMessage = action.payload;
            state.productData = null;
        });

        builder.addCase(AdminAddProducts.fulfilled, (state, action) => {
            state.isError = false;
            state.isLoading = false;
            state.productData = action.payload;
            state.errorMessage = null;
        });


        //get all products
        builder.addCase(getAllProducts.pending, (state) => {
            state.isError = false;
            state.isLoading = true;
            state.productData = null;
            state.errorMessage = null;
        });

        builder.addCase(getAllProducts.rejected, (state, action) => {
            state.isError = true;
            state.isLoading = false;
            state.errorMessage = action.payload;
            state.productData = null;
        });

        builder.addCase(getAllProducts.fulfilled, (state, action) => {
            state.isError = false;
            state.isLoading = false;
            state.productData = action.payload;
            state.errorMessage = null;
        });



       



        //delete product by id
        builder.addCase(DeleteProducts.pending, (state) => {
            state.isError = false;
            state.isLoading = true;
            state.productData = null;
            state.errorMessage = null;
        });

        builder.addCase(DeleteProducts.rejected, (state, action) => {
            state.isError = true;
            state.isLoading = false;
            state.errorMessage = action.payload;
            state.productData = null;
        });

        builder.addCase(DeleteProducts.fulfilled, (state, action) => {
            state.isError = false;
            state.isLoading = false;
            state.productData = action.payload;
            state.errorMessage = null;
        })
    }
});

export default productSlice.reducer
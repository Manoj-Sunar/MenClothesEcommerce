import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from 'axios';




export const userRegister=createAsyncThunk("RegisterFetchApi",async(userRegisterData,{ rejectWithValue })=>{
    try {
        const response=await axios.post('http://localhost:3001/authentication/route/user/register',userRegisterData,{
            headers:{
                "Content-Type":"application/json",
            }
        });
      
        if(response.data.status===true){
            localStorage.setItem("token",response.data.token);
            return response.data;
        }else{
            return rejectWithValue(response.data.msg);
        }

        
    } catch (error) {
        return rejectWithValue(error.response?.data?.msg);
    }
});





//user login 
export const userLogin=createAsyncThunk("LoginFetchApi",async(user, { rejectWithValue })=>{
    try {
        const response=await axios.post("http://localhost:3001/authentication/route/user/login",user,{
            headers:{
                'Content-Type':"application/json",
            }
        });

        if(response.data.status===true){
            localStorage.setItem("token",response.data.token);
            return response.data;
        }else{
            return rejectWithValue(response.data.msg);
        }


    } catch (error) {
        return rejectWithValue(error.response?.data?.msg);
    }
})




//login user profile
export const LoginUserProfile=createAsyncThunk("LoginUserProfile",async()=>{
    try {
        const response=await axios.get("http://localhost:3001/auth/user/details/login/user/profile",{
            headers:{
                Authorization:`Bearer ${localStorage.getItem("token")}`
            }
        });

        if(response.data.status===true){
            return response.data;
        }else{
            return response.data.msg;
        }
        
    } catch (error) {
        console.log(error);
    }
});



//get all users
export const AllUsers=createAsyncThunk("fetchAllUsersAPI",async(_,{rejectWithValue})=>{
    try {
        const response=await axios.get(`http://localhost:3001/auth/user/details/all/users`,{
            headers:{
                Authorization:`Bearer ${localStorage.getItem('token')}`,
            },
        });

        

        if(response.data.status===true){
            return response.data.allUsers;
        }else{
            return response.data.msg;
        }
        
    } catch (error) {
        rejectWithValue(error.response?.data?.msg);
    }
});



// Admin can change user role
export const AdminCanChangeUserRole=createAsyncThunk("fetchAdminChangeRoleAPI",async({id,role},{rejectWithValue})=>{
    try {
        console.log(id,role);
        const response=await axios.put(`http://localhost:3001/auth/user/details/admin/change/role/${id}`,{role},{
            headers:{
                Authorization:`Bearer ${localStorage.getItem('token')}`,
            },
        });

       

        if(response.data.status===true){
            return response.data;
        }else{
            return response.data;
        }
        
    } catch (error) {
        rejectWithValue(error.response?.data?.msg);
    }
})


// Admin can change user role
export const AdminCanDeleteUser=createAsyncThunk("fetchAdminDeleteUserAPI",async({id},{rejectWithValue})=>{
    try {
       
        const response=await axios.delete(`http://localhost:3001/auth/user/details/Admin/user/delete/${id}`,{
            headers:{
                Authorization:`Bearer ${localStorage.getItem('token')}`,
            },
        });

       

        if(response.data.status===true){
            return response.data;
        }else{
            return response.data;
        }
        
    } catch (error) {
        rejectWithValue(error.response?.data?.msg);
    }
})





const AuthUserSlice=createSlice({
    name:'AuthUser',
    initialState:{
        isLoding:false,
        isError:false,
        userData:null,
        userProfile:[],
        errorMessage: null,
    },
    
    extraReducers:(builder)=>{
        builder.addCase(userRegister.pending,(state)=>{
            state.isError=false;
            state.isLoding=true;
            state.userData=null;
            state.errorMessage=null;
        });

        builder.addCase(userRegister.rejected,(state,action)=>{
            state.isError=true;
            state.isLoding=false;
            state.userData=action.payload;
            state.errorMessage=action.payload
        });

        builder.addCase(userRegister.fulfilled,(state,action)=>{
            state.isError=false;
            state.isLoding=false;
            state.userData=action.payload;
            state.errorMessage=null;
        });



        //user login
        builder.addCase(userLogin.pending,(state)=>{
            state.isError=false;
            state.isLoding=true;
            state.userData=null;
            state.errorMessage=null
        });

        builder.addCase(userLogin.rejected,(state,action)=>{
            state.isError=true;
            state.isLoding=false;
            state.errorMessage=action.payload;
        });

        builder.addCase(userLogin.fulfilled,(state,action)=>{
            state.isError=false;
            state.isLoding=false;
            state.userData=action.payload;
            state.errorMessage=null;
        });


        
        //login user profile
        builder.addCase(LoginUserProfile.pending,(state)=>{
            state.isError=false;
            state.isLoding=true;
            state.userProfile=null;
        });

        builder.addCase(LoginUserProfile.rejected,(state,action)=>{
            state.isError=true;
            state.isLoding=false;
            state.userProfile=action.payload;
        });

        builder.addCase(LoginUserProfile.fulfilled,(state,action)=>{
            state.isError=false;
            state.isLoding=false;
            state.userProfile=action.payload;
        });
        

        //All users
        builder.addCase(AllUsers.pending,(state)=>{
            state.isError=false;
            state.isLoding=true;
            state.userProfile=null;
        });

        builder.addCase(AllUsers.rejected,(state,action)=>{
            state.isError=true;
            state.isLoding=false;
            state.userProfile=action.payload;
        });

        builder.addCase(AllUsers.fulfilled,(state,action)=>{
            state.isError=false;
            state.isLoding=false;
            state.userProfile=action.payload;
        });


        //admin Change role
        builder.addCase(AdminCanChangeUserRole.pending,(state)=>{
            state.isError=false;
            state.isLoding=true;
            state.userProfile=null;
        });

        builder.addCase(AdminCanChangeUserRole.rejected,(state,action)=>{
            state.isError=true;
            state.isLoding=false;
            state.userProfile=action.payload;
        });

        builder.addCase(AdminCanChangeUserRole.fulfilled,(state,action)=>{
            state.isError=false;
            state.isLoding=false;
            state.userProfile=action.payload;
        });


        //admin can delete user
        builder.addCase(AdminCanDeleteUser.pending,(state)=>{
            state.isError=false;
            state.isLoding=true;
            state.userProfile=null;
        });

        builder.addCase(AdminCanDeleteUser.rejected,(state,action)=>{
            state.isError=true;
            state.isLoding=false;
            state.userProfile=action.payload;
        });

        builder.addCase(AdminCanDeleteUser.fulfilled,(state,action)=>{
            state.isError=false;
            state.isLoding=false;
            state.userProfile=action.payload;
        });
    }
});


export default AuthUserSlice.reducer;
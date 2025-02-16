import React, { useEffect, useState } from 'react'
import { Box, Button, Grid, TextField } from '@mui/material'
import { NavLink, useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from 'react-redux';
import { userLogin } from '../Store/Slice/userAuthSlice';
import ErrorIcon from '@mui/icons-material/Error';

const Login = () => {

    //token getting from localstorage
    const token = localStorage.getItem('token');


    //usenavigate
    const Navigate = useNavigate();

    //login user state
    const [loginUser, setUserLogin] = useState({
        email: "",
        password: "",
    });


    //dispatch
    const Dispatch = useDispatch();


    // handle login input 
    const HandleLoginInput = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setUserLogin({
            ...loginUser,
            [name]: value,
        });
    }


    const { isError, errorMessage } = useSelector(state => state.AuthUser);


    //handle login form
    const handleLoginForm = (e) => {
        e.preventDefault();
        Dispatch(userLogin(loginUser));
        if (token) {
            Navigate("/");
        }
    }



    useEffect(() => {
        if (token) {
            Navigate("/");
        }
    }, [token]);



    return (
        <div className='mt-10 login-page'>
            <Grid container spacing={5} gap={10} className='flex justify-center items-center'>

                <Grid item xs={12} lg={4} sm={7} >
                    <Box>
                        <div className='mb-7'>
                            <p className='text-gray-400'>Welcome back !!!</p>
                            <h1 className='text-3xl font-bold text-gray-700'>Login</h1>
                        </div>
                        <form onSubmit={handleLoginForm}>
                            <Grid container spacing={2} >






                                <Grid item xs={12} sm={10} >
                                    <TextField
                                        required
                                        name='email'
                                        id="email"
                                        label="email"
                                        value={loginUser.email}
                                        onChange={HandleLoginInput}
                                        fullWidth
                                        autoComplete=''
                                        size='small'
                                        error={isError && isError}
                                        

                                    />

                                    {
                                        isError && isError ? <div className='flex items-center mt-1 gap-1 justify-start'>
                                            <ErrorIcon className='text-red-600' sx={{ fontSize: "1rem" }} />
                                            <span className='text-red-600' style={{ fontSize: "0.8rem" }}>{errorMessage}</span>
                                        </div> : ""
                                    }




                                </Grid>


                                <Grid item xs={12} sm={10}>
                                    <TextField
                                        required
                                        type='password'
                                        name='password'
                                        id="password"
                                        label="password"
                                        value={loginUser.password}
                                        onChange={HandleLoginInput}
                                        fullWidth
                                        autoComplete=''
                                        size='small'
                                        error={isError && isError}

                                    />
                                    {
                                        isError && isError ? <div className='flex items-center mt-1 gap-1 justify-start'>
                                            <ErrorIcon className='text-red-600' sx={{ fontSize: "1rem" }} />
                                            <span className='text-red-600' style={{ fontSize: "0.8rem" }}>{errorMessage}</span>
                                        </div> : ""
                                    }
                                </Grid>




                                <Grid item xs={12} sm={10} textAlign={'center'} >
                                    <Button type='submit' variant='contained' sx={{ borderRadius: "50px", bgcolor: "#F1512E", textTransform: "capitalize" }} className='w-[50%]'>Sign In </Button>
                                    <div className='mt-1'>
                                        <span className='text-sm text-gray-600'>don't have an account? </span>
                                        <NavLink to="/signUp" className="italic hover:underline text-sm text-[#155e75]">Sign Up</NavLink>
                                    </div>
                                </Grid>





                            </Grid>
                        </form>
                    </Box>

                </Grid>


                <Grid item sm={4}>
                    <img src="./login.webp" alt="" className=' w-full mx-auto' style={{ backgroundSize: "cover", backgroundPosition: "center", objectFit: "cover", objectPosition: "center" }} />
                </Grid>
            </Grid>
        </div>
    )
}

export default Login
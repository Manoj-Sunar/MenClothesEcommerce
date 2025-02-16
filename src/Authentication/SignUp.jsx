import { Box, Button, Grid, TextField } from '@mui/material';
import { NavLink, useNavigate } from "react-router-dom";
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { userRegister } from '../Store/Slice/userAuthSlice';
import ErrorIcon from '@mui/icons-material/Error';

const SignUp = () => {

    const token = localStorage.getItem('token');

    const Navigate = useNavigate();


    //usestate
    const [Register, setRegister] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        phone: "",
    });




    const Dispatch = useDispatch();

    //handle 
    const handleInput = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setRegister({
            ...Register,
            [name]: value,
        })
    }

    const { isError, errorMessage } = useSelector(state => state.AuthUser);



    //handleFormSubmit
    const handleFormSubmit = (e) => {
        e.preventDefault();
        Dispatch(userRegister(Register));

    }



    //if user is already login then auth user can not get login or register page
    useEffect(() => {
        if (token) {
            Navigate('/');
        }
    }, [token]);



    return (
        <div className='sign-up  w-[22%] p-4'>
            <div className="container">
                <Grid item xs={12} lg={4} sm={7} >
                    <Box className="flex flex-col items-center w-[100%]">
                        <div className='mb-9 text-center'>
                            <p className='text-gray-700 text-xl'>Welcome to my shop</p>
                            <h1 className='text-2xl font-bold text-gray-700'>Sign Up now</h1>
                        </div>
                        <form onSubmit={handleFormSubmit}>
                            <Grid container spacing={1} sx={{ display: "flex", justifyContent: "center" }}>

                                <Grid item xs={12} sm={12} >
                                    <TextField
                                        required
                                        name='firstName'
                                        id="firstName"
                                        label="first name"
                                        value={Register.firstName}
                                        onChange={handleInput}
                                        fullWidth
                                        autoComplete=''
                                        size='small'
                                    />
                                </Grid>

                                <Grid item xs={12} sm={12} >
                                    <TextField
                                        required
                                        name='lastName'
                                        id="lastName"
                                        label="last name"
                                        value={Register.lastName}
                                        onChange={handleInput}
                                        fullWidth
                                        autoComplete=''
                                        size='small'

                                    />
                                </Grid>





                                <Grid item xs={12} sm={12} >
                                    <TextField
                                        required
                                        name='email'
                                        id="email"
                                        label="email"
                                        value={Register.email}
                                        onChange={handleInput}
                                        fullWidth
                                        autoComplete=''
                                        size='small'
                                        error={isError && isError}
                                    />

                                    {
                                        isError && isError ? <div className='flex items-center mt-1 mb-1 gap-1 justify-start'>
                                            <ErrorIcon className='text-red-600' sx={{ fontSize: "1rem" }} />
                                            <span className='text-red-600' style={{ fontSize: "0.8rem" }}>{errorMessage}</span>
                                        </div> : ""
                                    }
                                </Grid>


                                <Grid item xs={12} sm={12}>
                                    <TextField
                                        required
                                        type='password'
                                        name='password'
                                        id="password"
                                        label="password"
                                        value={Register.password}
                                        onChange={handleInput}
                                        fullWidth
                                        autoComplete=''
                                        size='small'


                                    />
                                </Grid>

                                <Grid item xs={12} sm={12} >
                                    <TextField
                                        required
                                        name='phone'
                                        id="phone"
                                        label="phone"
                                        value={Register.phone}
                                        onChange={handleInput}
                                        fullWidth
                                        autoComplete=''
                                        size='small'
                                    />
                                </Grid>




                                <Grid item xs={12} sm={12} textAlign={'center'} sx={{ mt: 3 }}>
                                    <Button type='submit' variant='contained' sx={{ borderRadius: "50px", bgcolor: "#F1512E", textTransform: "capitalize" }} className='w-[50%]'>Sign Up </Button>
                                    <div className='mt-1'>
                                        <span className='text-sm text-gray-600'>If already have an account? </span>
                                        <NavLink to="/login" className="italic hover:underline text-sm text-[#155e75]">Sign In</NavLink>
                                    </div>
                                </Grid>





                            </Grid>
                        </form>
                    </Box>

                </Grid>
            </div>

        </div>
    )
}

export default SignUp
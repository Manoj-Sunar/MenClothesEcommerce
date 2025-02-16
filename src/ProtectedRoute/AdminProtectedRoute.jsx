import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { LoginUserProfile } from '../Store/Slice/userAuthSlice';

const AdminProtectedRoute = (props) => {
    const { Component } = props;
    const Navigate = useNavigate();
    const token = localStorage.getItem("token");

    const Dispatch = useDispatch();

    //use selector for login user profile
    const { userProfile } = useSelector(state => state.AuthUser);
    const authUserData = userProfile && userProfile.userprofile;

    //dispatch 

    useEffect(() => {
        Dispatch(LoginUserProfile());
    }, [Dispatch])


    useEffect(() => {
        if (!token) {

            Navigate("/login");

        }

        if (authUserData?.role !== "ADMIN") {

            Navigate("/login");
        }
    }, [token])

    return (
        <>
            <Component />
        </>
    )
}

export default AdminProtectedRoute
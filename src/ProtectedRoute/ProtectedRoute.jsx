import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';

const ProtectedRoute = (props) => {

    const { Component } = props;
    const Navigate=useNavigate();
    const token=localStorage.getItem("token");

    useEffect(()=>{
         if(!token){
            Navigate("/login");
         }
    },[token])

    return (
        <>
            <Component />
        </>
    )
}

export default ProtectedRoute
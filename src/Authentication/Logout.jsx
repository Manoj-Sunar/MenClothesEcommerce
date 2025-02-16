import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const Logout = () => {
  const Navigate = useNavigate();
  const token = localStorage.getItem('token');

  useEffect(() => {
    if (token) {
      localStorage.removeItem('token');
      Navigate("/login")
    }
  }, [token])

}

export default Logout
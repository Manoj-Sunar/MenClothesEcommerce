import React from 'react'
import AdjustIcon from '@mui/icons-material/Adjust';
import { Grid } from '@mui/material';
import { NavLink, useNavigate } from 'react-router-dom';
import StarBorderIcon from '@mui/icons-material/StarBorder';

const OrderCard = () => {
 const Navigate=useNavigate();


    return (
       
            <Grid   container item gap={6} sx={{ boxShadow: "0px 0px 3px #ccc", mb: 2, p: 2, borderRadius: "2px" }} height="10rem" className={`orderCard`} >
                <Grid item sm={5} className='flex gap-x-10 h-[10rem]'>
                    <img src="https://a.media-amazon.com/images/I/71F4P1t80EL._AC_UL480_FMwebp_QL65_.jpg" alt="" className='w-[29%] h-[80%] ' style={{ backgroundSize: "cover", backgroundPosition: "center", objectFit: "cover", objectPosition: "center"}} />
                    <div className='flex flex-col gap-y-2 justify-start px-3' style={{ height: "fit-content" }} >
                        <p className='text-gray-900' style={{ fontSize: "0.9rem" }}>Men's Dri-Power Cotton Blend Short Sleeve Tees, Moisture Wicking, Odor Protection, UPF</p>
                        <p className='text-gray-600' style={{ fontSize: "0.9rem" }}>Size: M</p>
                    </div>
                </Grid>
              

                <Grid item sm={4}  height={"fit-content"}   >
                    
                        
                            <div className='flex items-center justify-center'>
                                <AdjustIcon sx={{ transform: "scale(0.55)", color: "green" }} />
                                <h2 className=" text-gray-800" style={{ fontSize: "0.9rem" }}>Expected delivery on August 30, 2024</h2>
                            </div>

                    
                </Grid>
            </Grid>
        
    )
}

export default OrderCard
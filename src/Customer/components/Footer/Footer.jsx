import { Button, Grid, Typography } from '@mui/material'
import React from 'react'

const Footer = () => {
    const footerItms = [
        {
            title: "Company",
            item1: "About",
            item2: "Blog",
            item3: "Jobs",
            item4: "Press",
            item5: "Partners",
        },
        {
            title: "Solutions",
            item1: "Marketing",
            item2: "Analytics",
            item3: "Commerce",
            item4: "Insights",
            item5: "Support",
        },
        {
            title: "Documentation",
            item1: "Guides",
            item2: "API Status",

        },
        {
            title: "Legal",
            item1: "Clalm",
            item2: "Privacy",
            item3: "Terms",
        },
    ]

    return (
        <>
            <div>
                <Grid className='bg-black text-white text-center mt-10' container sx={{ bgcolor: "#000", color: "#fff", py: 3 }}>
                    {
                        footerItms.map((items, index) => {
                            return (
                                <Grid xs={12} sm={6} md={3} key={index}>
                                    <Typography className='pb-5' variant='h6'>{items.title}</Typography>
                                    <div className='flex flex-col'>
                                        {items.item1&&<Button variant='h6' sx={{textTransform:"capitalize"}}>{items.item1}</Button>}
                                        {items.item2&&<Button variant='h6' sx={{textTransform:"capitalize"}}>{items.item2}</Button>}
                                        {items.item3&&<Button variant='h6' sx={{textTransform:"capitalize"}}>{items.item3}</Button>}
                                        {items.item4&&<Button variant='h6' sx={{textTransform:"capitalize"}}>{items.item4}</Button>}
                                        {items.item5&&<Button variant='h6' sx={{textTransform:"capitalize"}}>{items.item5}</Button>}
                                       
                                    </div>
                                </Grid>
                            )
                        })
                    }



                </Grid>
            </div>
        </>
    )
}

export default Footer
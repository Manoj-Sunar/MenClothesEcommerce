import React from 'react';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import SettingsCellOutlinedIcon from '@mui/icons-material/SettingsCellOutlined';
import AttachMoneyOutlinedIcon from '@mui/icons-material/AttachMoneyOutlined';
import TrendingUpOutlinedIcon from '@mui/icons-material/TrendingUpOutlined';
import { Avatar, Box, Card, CardContent, CardHeader, Grid, IconButton, Typography } from '@mui/material';
import MoreVertOutlinedIcon from '@mui/icons-material/MoreVertOutlined';
import { useTheme } from '@emotion/react';

const salesData=[
    {
        stats:"245K",
        title:"Sales",
        color:"#6AB04A",
        icon:<TrendingUpOutlinedIcon sx={{fontSize:"1.75rem"}}/>,
    },

    {
        stats:"12.5K",
        title:"Customers",
        color:"#F3B431",
        icon:<AccountCircleOutlinedIcon sx={{fontSize:"1.75rem"}}/>,
    },
    
    {
        stats:"1.54K",
        title:"Products",
        color:"#EA425C",
        icon:<SettingsCellOutlinedIcon sx={{fontSize:"1.75rem"}}/>,
    },

    {
        stats:"88K",
        title:"Revenue",
        color:"#3C40C6",
        icon:<AttachMoneyOutlinedIcon/>,
    },
]

const renderState=()=>{
    return salesData.map((item,index)=>
       
            <Grid key={index} xs={12} sm={3}>
            <Box sx={{display:'flex', alignItems:'center'}}>
                <Avatar variant='rounded' sx={{
                    mr:3,
                    width:44,
                    height:44,
                    color:'white',
                    backgroundColor:`${item.color}`
                }}>
                    {item.icon}
                </Avatar>

                <Box sx={{display:'flex',flexDirection:'column'}}>
                <Typography variant='caption'>{item.title}</Typography>
                <Typography variant='h6'>{item.stats}</Typography>
            </Box>
            </Box>
           
        </Grid>
        
    )
}



const MonthlyOverview = () => {
    const theme=useTheme();

  return (
    
        <Card sx={{backgroundColor:'#242b2e',color:"white", height:"100%"}}>
               <CardHeader 
               title='Monthly Overview'
               action={
                  <IconButton>
                    <MoreVertOutlinedIcon sx={{color:"white"}}/>
                  </IconButton>
               }

               subheader={
                <Typography variant='body2' >
                    <Box component='span' sx={{fontWeight:600,color:'white'}}>
                        total 48.5% Growth
                    </Box>
                    😎this month
                </Typography>
               }

               titleTypographyProps={{
                mb:1,
                lineHeight:'2rem !important',
                letterSpacing:'.15px !important'
               }}
               />

               <CardContent sx={{pt:theme=>`${theme.spacing(3)} !important`}}>
                <Grid container spacing={[0.5]}>
                    {
                       
                      renderState()      
                    }
                </Grid>
               </CardContent>
        </Card>

   
  )
}

export default MonthlyOverview
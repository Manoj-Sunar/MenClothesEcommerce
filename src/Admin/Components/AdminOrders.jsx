import * as React from 'react';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

import { useDispatch, useSelector } from 'react-redux';
import { Avatar, AvatarGroup, Button, Card, CardHeader, Pagination, Stack, } from '@mui/material';
import {   AdminPlacedOrders, GetAllOrdersAdmin } from '../../Store/Slice/MakeOrderSlice';
import { useState, useEffect } from 'react';
import LoadingComponent from "../../Customer/components/LoadingPage/LoadingComponent";
import DeleteIcon from '@mui/icons-material/Delete';
import axios from 'axios';



const AdminOrders = ({ width }) => {

  const [cancelOrder,setCancelOrder]=useState(null);
  const [deleteOrder,setDeleteOrder]=useState(null);
 const [orderShipped,setOrderShipped]=useState(null);

  const dispatch = useDispatch();


  const { OrderData, isLoading, errorMessage } = useSelector(state => state.MakeOrders);

  const [menuOpen, setMenuOpen] = useState(null);






 


  const HandleShippedOrder = async(orderId, status) => {
      try {
        const response = await axios.put(`http://localhost:3001/order/admin/shipped/order/${orderId}`, status, {
          headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`
          }
      });

      if(response.data.status===true){
          setOrderShipped(response.data);
      }

      } catch (error) {
        
      }
  }


  const HandlePlacedOrder = (orderId, status) => {
    dispatch(AdminPlacedOrders({ orderId, status }));
  }

  const HandleCancelledOrder = async(orderId, status) => {
      const res=await axios.put(`http://localhost:3001/order/admin/cancell/order/${orderId}`,status,{
        headers:{
          Authorization:`${localStorage.getItem("token")}`,
        }
      });

     if(res.data.status===true){
          setCancelOrder(res.data);
     }
  }


  
const handleAdminDeleteOrder=async(id)=>{
  const res=await axios.delete(`http://localhost:3001/order/order/delete/${id}`,{
    headers:{
      Authorization:`${localStorage.getItem("token")}`
    }
  });

  if(res.data.status===true){
      setDeleteOrder(res.data);
  }
}






  // Fetch orders initially
  useEffect(() => {
    dispatch(GetAllOrdersAdmin({}));
  }, [dispatch,  OrderData?.OrderPlaced, orderShipped?.OrderShipped, cancelOrder?.cancelOrder,deleteOrder?.deleteOrder]);






  return (

    <>


      {isLoading ? <LoadingComponent /> :OrderData?.length>0? <Card className={width ? `${width}` : "w-[85%]"} sx={{ marginLeft: 'auto', boxShadow: "0px 0px 3px #ccc" }}>
        <CardHeader title="All Orders" />

        <div className="table p-4 w-full">
          <TableContainer >
            <Table >
              <TableHead sx={{ backgroundColor: "#1866ee !important", color: "#fff8" }}>
                <TableRow >
                  <TableCell sx={{ color: "#fff !important", fontSize: "14px !important", fontWeight: "bold" }}>UID</TableCell>
                  <TableCell sx={{ color: "#fff !important", fontSize: "14px !important", fontWeight: "bold" }}>Image</TableCell>
                  <TableCell sx={{ color: "#fff !important", fontSize: "14px !important", fontWeight: "bold" }}>Title</TableCell>
                  <TableCell sx={{ color: "#fff !important", fontSize: "14px !important", fontWeight: "bold" }}>Price</TableCell>
                  <TableCell sx={{ color: "#fff !important", fontSize: "14px !important", fontWeight: "bold" }}>Order Status</TableCell>
                  <TableCell sx={{ color: "#fff !important", fontSize: "14px !important", fontWeight: "bold" }}>Update</TableCell>
                  <TableCell sx={{ color: "#fff !important", fontSize: "14px !important", fontWeight: "bold" }}>Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {Array.isArray(OrderData) && OrderData.map((item, index) =>
                  <TableRow key={index} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                    <TableCell># {index + 1}</TableCell>
                    <TableCell component="th" scope="row">
                      <AvatarGroup max={3} sx={{ display: 'flex', justifyContent: 'start', position: "static" }}>
                        {item?.orderItems?.map((orderItem, i) => (
                          <Avatar key={i} src={`${orderItem?.product?.imageUrl}`} sx={{ position: 'static' }} />
                        ))}
                      </AvatarGroup>
                    </TableCell>
                    <TableCell align="left">
                      {item?.orderItems?.map((orderItem, i) => (
                        <p style={{ width: '250px', textAlign: 'start' }} key={i}>{orderItem?.product?.title}</p>
                      ))}
                    </TableCell>
                    <TableCell align="left">{item.ActualPrice}</TableCell>
                    <TableCell align="left">
                      <span
                        
                        style={{
                          borderRadius: '5px',
                          backgroundColor:
                            item.orederStatus === 'PLACED'
                              ? '#BDF5D3'
                              : item.orederStatus === 'CONFIRMED'
                                ? '#329632'
                                : item.orederStatus === 'SHIPPED'
                                  ? '#C1E1FC' : item.orederStatus === 'CANCELLED' ? 'red'
                                    : 'gray',

                          color:item.orederStatus===item.orederStatus === 'PLACED'
                          ? '#329632'
                          : item.orederStatus === 'CONFIRMED'
                            ? '#329632'
                            : item.orederStatus === 'SHIPPED'
                              ? '#2564D4' : item.orederStatus === 'PENDING' ? '#BC3AD3'
                                : 'gray',

                                
                         textTransform:'capitalize',
                         textAlign:"center",
                         padding:"5px 8px",
                         fontWeight:"600"
                        }}
                      >
                        {item.orederStatus}
                      </span>
                    </TableCell>
                    <TableCell align="left">
                      <div style={{ position: 'relative' }}>
                        <button
                          style={{

                            fontWeight: '400',
                            fontSsize: '1rem',
                            lineHeight: '1.5',
                            letterSpacing: '0.00938em',
                            fontFamily: 'Roboto, Helvetica, Arial, sans-serif',
                            color: '#1976d2',
                            border: 'none',
                            borderRadius: '4px',
                            padding: '8px 16px',
                            cursor: 'pointer',
                          }}
                          onClick={() => setMenuOpen(menuOpen === index ? null : index)} // Toggle menu open
                        >
                          STATUS
                        </button>
                        {menuOpen === index && ( // Check if the current menu should be open
                          <div
                            style={{
                              position: 'absolute',
                              top: '100%',
                              left: '0',
                              backgroundColor: 'white',
                              boxShadow: '0 2px 8px rgba(0,0,0,0.2)',
                              zIndex: 1,
                              borderRadius: '4px',
                              marginTop: '8px',
                            }}
                          >
                            
                            <div
                              onClick={() => {
                                HandleCancelledOrder(item._id, 'CANCELLED');
                                setMenuOpen(null); // Close the menu
                              }}
                              style={{
                                padding: '8px 16px',
                                cursor: 'pointer',
                                '&:hover': { backgroundColor: '#f0f0f0' },
                              }}
                            >
                              Cancelled Order
                            </div>



                            <div
                              onClick={() => {
                                HandleShippedOrder(item._id, 'SHIPPED');
                                setMenuOpen(null); // Close the menu
                              }}
                              style={{
                                padding: '8px 16px',
                                cursor: 'pointer',
                                '&:hover': { backgroundColor: '#f0f0f0' },
                              }}
                            >
                              Shipped Order
                            </div>
                            <div
                              onClick={() => {
                                HandlePlacedOrder(item._id, 'PLACED');
                                setMenuOpen(null); // Close the menu
                              }}
                              style={{
                                padding: '8px 16px',
                                cursor: 'pointer',
                                '&:hover': { backgroundColor: '#f0f0f0' },
                              }}
                            >
                              Placed Order
                            </div>
                          </div>
                        )}
                      </div>
                    </TableCell>
                    <TableCell align="left">
                      <Button color='error' size='small' sx={{ minWidth: "30px !important", width: "30px !important", height: "30px !important", backgroundColor: "rgb(241,17,51,0.1)" }}>
                        <DeleteIcon sx={{ p: "3.5px" }}  onClick={()=>handleAdminDeleteOrder(item._id)}/>
                      </Button >

                    </TableCell>
                  </TableRow>
                )}



              </TableBody>


            </Table>
          </TableContainer>
        </div>
        <div className="pagination-component">
          <div>
            <p>showing <span>12</span> of <span>60</span> results</p>
          </div>
          <Stack>
            <Pagination shape="rounded" count={10} variant='outlined' />
          </Stack>
        </div>

      </Card>:<div style={{width:"85%",marginLeft:"auto",height:"95vh",display:'flex',alignItems:'center',justifyContent:'center'}}>
        <h1 style={{fontSize:"1.7rem",color:"#292929",fontWeight:"bold",opacity:"0.8"}}>No any Orders here</h1>
      </div>
      }

    </>

  );
};

export default AdminOrders;

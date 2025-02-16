import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AdminCanChangeUserRole, AdminCanDeleteUser, AllUsers } from '../../Store/Slice/userAuthSlice';
import { Badge, Button, Card, CardHeader, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField } from '@mui/material';
import LoadingComponent from '../../Customer/components/LoadingPage/LoadingComponent';
import { useState } from 'react';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';

const Customers = () => {
  const Dispatch = useDispatch();
  const { userProfile, isLoding } = useSelector(state => state.AuthUser);

  const [isOpen, setIsOpen] = useState(null);


  const HandleAdminChangeRole = (id, role) => {
    Dispatch(AdminCanChangeUserRole({ id, role }));
  }


  const styles = {
    container: {
      display: 'flex',
      alignItems: 'center',
    },
    text: {
      fontSize: '16px',
      marginRight: '8px',
    },
    activeDot: {
      color: 'green',
      fontSize: '12px', // Adjust the size as needed
    },
  };




  const HandleDeleteUserByAdmin=(id)=>{
    Dispatch(AdminCanDeleteUser({id}));
  }

  console.log(userProfile);

  useEffect(() => {
    Dispatch(AllUsers({}));

  }, [Dispatch, userProfile?.User?.role,userProfile?.msg,userProfile?.deleteUser]);
  

  return (
    <div className='w-[85%]' style={{ marginLeft: 'auto' }}>

      {
        isLoding&&isLoding ? <LoadingComponent /> :
          <Card>
            <CardHeader title="All Users" />
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 650,textAlign:'justify'}} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell align='left'>Name</TableCell>
                    <TableCell align='left'>Email</TableCell>
                    <TableCell align='left'>Phone </TableCell>
                    <TableCell align='left'>Address</TableCell>
                    <TableCell align='left'>User role</TableCell>
                    
                    <TableCell align='left'>Delete</TableCell>
                  </TableRow>
                </TableHead>

                <TableBody>

                  {
                    Array.isArray(userProfile) && userProfile.map((item, index) =>
                      <>
                        <TableRow key={index} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                          <TableCell component="th" scope="row" align='left'>{`${item.firstName} ${item.lastName}`}</TableCell>
                          <TableCell align='left'>{item.email}</TableCell>
                          <TableCell align='left'>{item.phone}</TableCell>
                          <TableCell align='left'>
                            {
                              item.address.map((itemAddress) => <p>{itemAddress.address}</p>)
                            }

                          </TableCell>

                          <TableCell align='center'>
                            <div style={{ position: 'relative', textAlign: 'left',width:'fit-content' }}>
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
                                onClick={() => setIsOpen(isOpen === index ? null : index)} // Toggle menu open
                              >
                               {
                                item.active? <Badge color="success" badgeContent=" " variant="dot" sx={{fontSize:'1rem'}}>
                                <Button sx={{p:0}} variant='outlined' color='secondary'>{item.role}</Button>
                                </Badge>:`${item.role}`
                               }
                              </button>
                              {isOpen === index && ( // Check if the current menu should be open
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
                                      HandleAdminChangeRole(item._id, 'ADMIN');
                                      setIsOpen(null); // Close the menu
                                    }}
                                    style={{
                                      padding: '8px 16px',
                                      cursor: 'pointer',
                                      '&:hover': { backgroundColor: '#f0f0f0' },
                                    }}
                                  >
                                    ADMIN
                                  </div>

                                  <div
                                    onClick={() => {
                                      HandleAdminChangeRole(item._id, 'CUSTOMER');
                                      setIsOpen(null); // Close the menu
                                    }}
                                    style={{
                                      padding: '8px 16px',
                                      cursor: 'pointer',
                                      '&:hover': { backgroundColor: '#f0f0f0' },
                                    }}
                                  >
                                    CUSTOMER
                                  </div>

                                </div>
                              )}
                            </div>

                          </TableCell>
                         
                          <TableCell>
                            <Button variant='outlined' onClick={()=>HandleDeleteUserByAdmin(item._id)}>Delete</Button>
                          </TableCell>
                        </TableRow>

                      </>
                    )
                  }

                </TableBody>

              </Table>

            </TableContainer>

          </Card>

      }



    </div>
  )
}

export default Customers



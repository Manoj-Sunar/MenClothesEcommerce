import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

import { useDispatch, useSelector } from 'react-redux';
import { DeleteProducts, getAllProducts } from '../../Store/Slice/ProductSlice';
import { Avatar, Button, Card, CardHeader, Pagination, Stack } from '@mui/material';
import LoadingComponent from '../../Customer/components/LoadingPage/LoadingComponent';

import { useNavigate } from 'react-router-dom';

import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';





const AdminProducts = ({ width }) => {

  

 const Navigate=useNavigate();
  const Dispatch = useDispatch();
  const { productData, isLoading, errorMessage } = useSelector(state => state.ProductDetails);





  const HandleDeleteProducts = (productId) => {

    Dispatch(DeleteProducts({ productId }))

  }

  React.useEffect(() => {

    const data = {
      category: '',
      color: [],
      sizes: 'M',
      minPrice: 0,
      maxPrice: 100000,
      minDiscount: 0,
      sort: 'low_to_high',
      stock: 'in_stock',
      pageNumber: 1,
      pageSize: 10

    }

    Dispatch(getAllProducts(data));


  }, [Dispatch, productData?.deleteProduct]);



  return (

    <>

      {
        isLoading && isLoading ? <LoadingComponent /> : <Card className={width ? `${width}` : 'w-[85%]'} sx={{ boxShadow: "0px 0px 3px #ccc)",marginLeft:"auto",mt:2,mr:1 }}>
          <CardHeader title="Product Lists" />
          <div className="table p-4 w-full">
                <TableContainer >
                    <Table >
                        <TableHead sx={{ backgroundColor: "#1866ee !important", color: "#fff8" }}>
                            <TableRow >
                                <TableCell sx={{ color: "#fff !important", fontSize: "14px !important", fontWeight: "bold" }}>UID</TableCell>
                                <TableCell sx={{ color: "#fff !important", fontSize: "14px !important", fontWeight: "bold" }}>Product</TableCell>
                                <TableCell sx={{ color: "#fff !important", fontSize: "14px !important", fontWeight: "bold" }}>Category</TableCell>
                                <TableCell sx={{ color: "#fff !important", fontSize: "14px !important", fontWeight: "bold" }}>Brand</TableCell>
                                <TableCell sx={{ color: "#fff !important", fontSize: "14px !important", fontWeight: "bold" }}>Price</TableCell>
                                <TableCell sx={{ color: "#fff !important", fontSize: "14px !important", fontWeight: "bold" }}>Stock</TableCell>
                               

                                <TableCell sx={{ color: "#fff !important", fontSize: "14px !important", fontWeight: "bold" }}>Action</TableCell>
                            </TableRow>
                        </TableHead>

                        <TableBody>
                            {
                                productData?.products?.map((item,index) => <TableRow className='table-row' sx={{color:"#292929",opacity:"0.9"}}>

                                    <TableCell># {index+1}</TableCell>
                                    <TableCell >
                                        <Avatar src={item?.imageUrl}/>
                                       
                                    </TableCell>
                                    <TableCell>{item?.category?.name}</TableCell>
                                    <TableCell>{item?.brand}</TableCell>
                                    <TableCell sx={{ display: 'flex', flexDirection: 'column', gap: "5px" }}>
                                        <del style={{ color: "#292929", opacity: "0.7", fontWeight: "500" }}>₹ {item?.price}</del>
                                        <span className='text-red-500' style={{ fontWeight: "600" }}>₹{item?.discountPrice}</span>
                                    </TableCell>
                                    <TableCell>{item?.quantity}</TableCell>
                                  
                                   
                                    <TableCell >
                                      
                                        <Button color='success' size='small' sx={{ minWidth: "30px !important", width: "30px !important", height: "30px !important", backgroundColor: "rgb(26,159,81,0.1)",marginRight:"5px" }}>
                                            <EditIcon sx={{ p: "3.5px" }} onClick={()=>Navigate(`/admin/admin-edit-products/${item?._id}`)} />
                                        </Button >
                                        <Button color='error' size='small' sx={{ minWidth: "30px !important", width: "30px !important", height: "30px !important", backgroundColor: "rgb(241,17,51,0.1)" }}>
                                            <DeleteIcon sx={{ p: "3.5px" }} onClick={()=>HandleDeleteProducts(item?._id)} />
                                        </Button >
                                    </TableCell>
                                </TableRow>)
                            }

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



        </Card>
      }


    

    </>
  );
}


export default AdminProducts;
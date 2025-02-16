import { Box, Button, FormControl, Grid, InputLabel, MenuItem, Select, TextField, Typography } from '@mui/material'
import React, {  useEffect, useState } from 'react'
import {useDispatch, useSelector} from 'react-redux';
import { AdminAddProducts } from '../../Store/Slice/ProductSlice';
import AlertMessage from '../../Customer/components/AlertMessage/AlertMessage';


const AddProducts = () => {






  const Dispatch=useDispatch();
  const {productData}=useSelector(state=>state.ProductDetails);

  const initialSizes = [
    { name: 'S', quantity: 0 },
    { name: 'M', quantity: 0 },
    { name: 'L', quantity: 0 },
  ]

  const [product, setProduct] = useState({
    title: '',
    color: '',
    imageUrl:'',
    description: '',
    price: '',
    discountPrice: '',
    discountPercent: '',
    quantity: '',
    brand: '',
    stock:'in_stock',
    sizes: initialSizes,
    topLevelCategory: '',
    secondLevelCategory: '',
    thirdLevelCategory: '',
  });


  const HandleFormInputChange=(e)=>{
     const name=e.target.name;
     const value=e.target.value;
     setProduct((prevState)=>({...prevState,[name]:value}))
  }

  const SizeInputChanges=(e,index)=>{
   let  name=e.target.name;
    let value=e.target.value;
    name==='size_quantity'?name='quantity':name=e.target.value;
    const sizes=[...product.sizes];
    sizes[index][name]=value;
    setProduct((prevState)=>({
      ...prevState,
      sizes:sizes,
    }));

   
  }

  const HandleFormSubmit=(e)=>{
    e.preventDefault();
    Dispatch(AdminAddProducts(product));
  }



   


  return (

    <>
      <Box sx={{ width: '85%', marginLeft: 'auto', p: 3 ,position:"static",zIndex:1}}>
        <Typography variant='h4' sx={{ textAlign: 'center' }} className='py-10 text-center'>Add New Product</Typography>

        <form onSubmit={HandleFormSubmit}>
          <Grid container spacing={2} sx={{position:"static",zIndex:1}}>

            <Grid item xs={12}>
              <TextField type='text' fullWidth label="Image URL" name='imageUrl' value={product.imageUrl}  onChange={HandleFormInputChange}/>
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField type='text' fullWidth label="Brand" name='brand' value={product.brand} onChange={HandleFormInputChange}/>
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField type='text' fullWidth label="Title" name='title' value={product.title} onChange={HandleFormInputChange}/>
            </Grid>


            <Grid item xs={12} sm={6}>
              <TextField type='text' fullWidth label="Color" name='color' value={product.color} onChange={HandleFormInputChange}/>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField type='number' fullWidth label="Quantity" name='quantity' value={product.quantity} onChange={HandleFormInputChange}/>
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField type='number' fullWidth label="Price" name='price' value={product.price} onChange={HandleFormInputChange}/>
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField type='number' fullWidth label="Discount Price" name='discountPrice' value={product.discountPrice} onChange={HandleFormInputChange}/>
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField type='number' fullWidth label="Discounte Percent" name='discountPercent' value={product.discountPercent} onChange={HandleFormInputChange}/>
            </Grid>

            <Grid item xs={12} sm={4}>
              <FormControl fullWidth>
                <InputLabel>Top Level Category</InputLabel>
                <Select name="topLevelCategory" label="Top Level Category" value={product.topLevelCategory}  onChange={HandleFormInputChange}>
                  <MenuItem value="men">Men</MenuItem>
                  <MenuItem value="women">Women</MenuItem>
                  <MenuItem value="kids">Kids</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12} sm={4}>
              <FormControl fullWidth>
                <InputLabel>Second Level Category</InputLabel>
                <Select name='secondLevelCategory' label="Second Level Category" value={product.secondLevelCategory} onChange={HandleFormInputChange}>
                  <MenuItem value='clothings'>Clothings</MenuItem>
                  <MenuItem value='accessories'>Accessories</MenuItem>
                  <MenuItem value='brands'>Brands</MenuItem>

                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12} sm={4}>
              <FormControl fullWidth>
                <InputLabel>Third Level Category</InputLabel>
                <Select name='thirdLevelCategory' label="Third Level Category" value={product.thirdLevelCategory} onChange={HandleFormInputChange}>
                  <MenuItem value='top'>Tops</MenuItem>
                  <MenuItem value='t-shirts'>T-Shirts</MenuItem>
                  <MenuItem value='saree'>Saree</MenuItem>
                  <MenuItem value='lengha_choli'>Lengha Choli</MenuItem>
                  <MenuItem value='mens_kurta'>Mens Kurta</MenuItem>

                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12} sm={12}>
              <TextField fullWidth multiline rows={3} type='text' label="Description" name='description' value={product.description} onChange={HandleFormInputChange}/>
            </Grid>

            {
              product.sizes.map((item,index) =>
                <Grid container item spacing={3}>
                  <Grid item xs={12} sm={6}>
                    <TextField type='text' fullWidth label="size name" name='name' value={item.name} required  onChange={(e)=>SizeInputChanges(e,index)}/>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField type='number' fullWidth label="Quantity" name='size_quantity' value={item.quantity} required  onChange={(e)=>SizeInputChanges(e,index)}/>
                  </Grid>

                </Grid>
              )
            }

            <Grid item xs={12} sm={4}>
              <FormControl fullWidth>
                <InputLabel>Stock</InputLabel>
                <Select name='stock' label="Stock" value={product.stock} onChange={HandleFormInputChange}>
                  <MenuItem value='in_stock'>In Stock</MenuItem>
                  <MenuItem value='out_of_stock'>Out of Stock</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12} sm={6}>
              <Button type='submit' size='large' sx={{p:1.7}} variant='contained'>Add New Product</Button>
            </Grid>

          </Grid>
        </form>

      </Box>

        {
          productData?.status===true?<AlertMessage status={productData?.status} msg={productData?.msg}/>:''
        }

    </>

  )
}

export default AddProducts
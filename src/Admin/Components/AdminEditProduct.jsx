
import React, { useEffect, useState } from 'react';
import { Box, Button, FormControl, Grid, InputLabel, MenuItem, Select, TextField, Typography } from '@mui/material'
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';




const AdminEditProduct = () => {
    const { id } = useParams();
    const Navigate=useNavigate();
    const initialSizes = [
        { name: 'S', quantity: 0 },
        { name: 'M', quantity: 0 },
        { name: 'L', quantity: 0 },
    ]

    const [product, setProduct] = useState({
        title: '',
        color: '',
        imageUrl: '',
        description: '',
        price: '',
        discountPrice: '',
        discountPercent: '',
        quantity: '',
        brand: '',
        stock: 'in_stock',
        sizes: initialSizes,
        topLevelCategory: '',
        secondLevelCategory: '',
        thirdLevelCategory: '',
    });


    const HandleFormInputChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setProduct((prevState) => ({ ...prevState, [name]: value }))
    }

    const SizeInputChanges = (e, index) => {
        let name = e.target.name;
        let value = e.target.value;
        name === 'size_quantity' ? name = 'quantity' : name = e.target.value;
        const sizes = [...product.sizes];
        sizes[index][name] = value;
        setProduct((prevState) => ({
            ...prevState,
            sizes: sizes,
        }));


    }

    //get products by id
    const getProductById = async () => {
        const res = await axios.get(`http://localhost:3001/products/get/product/${id}`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
        });


        if (res.data.status === true) {
            setProduct({
                title: res.data.Product.title,
                color:res.data.Product.color,
                imageUrl:res.data.Product.imageUrl,
                description:res.data.Product.description,
                price:res.data.Product.price,
                discountPrice:res.data.Product.discountPrice,
                discountPercent:res.data.Product.discountPercent,
                quantity:res.data.Product.quantity,
                brand:res.data.Product.brand,
                stock:res.data.Product.stock,
                sizes:res.data.Product.sizes,
                topLevelCategory:res.data.Product.topLevelCategory,
                secondLevelCategory:res.data.Product.secondLevelCategory,
                thirdLevelCategory: res.data.Product.thirdLevelCategory,

            })
        }
    }


    //update product by id
    const updateProductById=async()=>{
        const res=await axios.put(`http://localhost:3001/products/update/product/${id}`,product,{
            headers:{
                Authorization:`Bearer ${localStorage.getItem("token")}`,
            },
        });
        if(res.data.status===true){
            Navigate("/admin/products")
        }
        
    }

    const HandleFormSubmit = (e) => {
        e.preventDefault();
        updateProductById();
        

    }

    useEffect(() => {
        getProductById();
    }, [])


    return (

        <Box sx={{ width: '85%', marginLeft: 'auto', p: 3 ,position:"static",}}>
            <Typography variant='h4' sx={{ textAlign: 'center' }} className='py-10 text-center'>Edit Product</Typography>

            <form onSubmit={HandleFormSubmit}>
                <Grid container spacing={2}>

                    <Grid item xs={12}>
                        <TextField type='text' fullWidth label="Image URL" name='imageUrl' value={product.imageUrl} onChange={HandleFormInputChange} />
                    </Grid>

                    <Grid item xs={12} sm={6}>
                        <TextField type='text' fullWidth label="Brand" name='brand' value={product.brand} onChange={HandleFormInputChange} />
                    </Grid>

                    <Grid item xs={12} sm={6}>
                        <TextField type='text' fullWidth label="Title" name='title' value={product.title} onChange={HandleFormInputChange} />
                    </Grid>


                    <Grid item xs={12} sm={6}>
                        <TextField type='text' fullWidth label="Color" name='color' value={product.color} onChange={HandleFormInputChange} />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField type='number' fullWidth label="Quantity" name='quantity' value={product.quantity} onChange={HandleFormInputChange} />
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <TextField type='number' fullWidth label="Price" name='price' value={product.price} onChange={HandleFormInputChange} />
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <TextField type='number' fullWidth label="Discount Price" name='discountPrice' value={product.discountPrice} onChange={HandleFormInputChange} />
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <TextField type='number' fullWidth label="Discounte Percent" name='discountPercent' value={product.discountPercent} onChange={HandleFormInputChange} />
                    </Grid>

                    <Grid item xs={12} sm={4}>
                        <FormControl fullWidth>
                            <InputLabel>Top Level Category</InputLabel>
                            <Select name="topLevelCategory" label="Top Level Category" value={product.topLevelCategory} onChange={HandleFormInputChange}>
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
                        <TextField fullWidth multiline rows={3} type='text' label="Description" name='description' value={product.description} onChange={HandleFormInputChange} />
                    </Grid>

                    {
                        product.sizes.map((item, index) =>
                            <Grid container item spacing={3}>
                                <Grid item xs={12} sm={6}>
                                    <TextField type='text' fullWidth label="size name" name='name' value={item.name} required onChange={(e) => SizeInputChanges(e, index)} />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField type='number' fullWidth label="Quantity" name='size_quantity' value={item.quantity} required onChange={(e) => SizeInputChanges(e, index)} />
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
                        <Button type='submit' size='large' sx={{ p: 1.7 }} variant='contained'>Update Product</Button>
                    </Grid>

                </Grid>
            </form>

        </Box>


    )
}

export default AdminEditProduct
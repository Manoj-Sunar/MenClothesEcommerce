import { useEffect, useState } from 'react'

import { Radio, RadioGroup } from '@headlessui/react'
import Box from '@mui/material/Box';
import Rating from '@mui/material/Rating';

import ProductReview from './ProductReview';
import { mens_kurta } from '../../../Data/MenCurta';
import ProductCard from './ProductCard';
import { NavLink, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { AddToCartItems, GetUsersCart } from '../../../Store/Slice/CartSlice';
import axios from 'axios';


const product = {
    name: 'Basic Tee 6-Pack',
    price: '192',
    href: '#',
    breadcrumbs: [
        { id: 1, name: 'Men', href: '#' },
        { id: 2, name: 'Clothing', href: '#' },
    ],
    images: [
        {
            src: 'https://m.media-amazon.com/images/I/51pLm8xM8hL._SY879_.jpg',
            alt: 'Two each of gray, white, and black shirts laying flat.',
        },
        {
            src: 'https://media.istockphoto.com/id/483960103/photo/blank-black-t-shirt-front-with-clipping-path.jpg?s=612x612&w=0&k=20&c=d8qlXILMYhugXGw6zX7Jer2SLPrLPORfsDsfRDWc-50=',
            alt: 'Model wearing plain black basic tee.',
        },
        {
            src: 'https://img.freepik.com/premium-photo/black-tshirt_1314622-24709.jpg?size=626&ext=jpg&ga=GA1.1.1080066821.1728634308&semt=ais_hybrid',
            alt: 'Model wearing plain gray basic tee.',
        },
        {
            src: 'https://img.freepik.com/premium-photo/realistic-black-tshirt-mockup_947865-100539.jpg?size=626&ext=jpg&ga=GA1.1.1080066821.1728634308&semt=ais_hybrid',
            alt: 'Model wearing plain white basic tee.',
        },
    ],
    colors: [
        { name: 'White', class: 'bg-white', selectedClass: 'ring-gray-400' },
        { name: 'Gray', class: 'bg-gray-200', selectedClass: 'ring-gray-400' },
        { name: 'Black', class: 'bg-gray-900', selectedClass: 'ring-gray-900' },
    ],
    sizes: [


        { name: 'S', inStock: true },
        { name: 'M', inStock: true },
        { name: 'L', inStock: true },


    ],
    description:
        'The Basic Tee 6-Pack allows you to fully express your vibrant personality with three grayscale options. Feeling adventurous? Put on a heather gray tee. Want to be a trendsetter? Try our exclusive colorway: "Black". Need to add an extra pop of color to your outfit? Our white tee has you covered.',
    highlights: [
        'Hand cut and sewn locally',
        'Dyed with our proprietary colors',
        'Pre-washed & pre-shrunk',
        'Ultra-soft 100% cotton',
    ],
    details:
        'The 6-Pack includes two black, two white, and two heather gray Basic Tees. Sign up for our subscription service and be the first to get new, exciting colors, like our upcoming "Charcoal Gray" limited release.',
}


const reviews = { href: '#', average: 4, totalCount: 117 }

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}



const ProductDetails = () => {

    const [productData,setProductData]=useState(null);
    const [value, setValue] = useState(2);
    const [selectedSize, setSelectedSize] = useState(product.sizes[2])
    const [img, setImage] = useState({
        src: product.images[0].src,
        alt: product.images[0].alt,
    });

    const { id } = useParams();

    const Dispatch = useDispatch();



    useEffect(() => {
        const getProductsById = async () => {
            try {
                const res = await axios.get(`http://localhost:3001/products/get/product/${id}`, {
                    headers: {
                        Authorization: `${localStorage.getItem("token")}`,
                    }
                })

               if(res.data.status===true){
                 setProductData(res.data)
               }

            } catch (error) {
                console.log(error)
            }
        }

        getProductsById();

    }, [productData])



    const handleAddCart = () => {
        const data = {
            size: selectedSize.name,
            id: id,
        }
        Dispatch(AddToCartItems(data));
        Dispatch(GetUsersCart({}));
    }






    return (
        <>

            <div className="bg-white">
                <div className="pt-6">


                    <div className="lg:grid lg:grid-cols-2">
                        {/* Image gallery */}
                        <div className="flex mx-auto mt-6 max-w-2xl sm:px-6  lg:max-w-6xl h-[43rem]  lg:gap-x-5">
                           
                            <div className="w-full h-full ">
                                <img
                                    alt={img.alt}
                                    src={productData?.Product?.imageUrl}
                                    className="h-full w-full object-cover object-center"

                                />
                            </div>
                        </div>

                        {/* Product info */}
                        <div className="mx-auto max-w-2xl px-4 pb-16 pt-10 sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-1 lg:grid-rows-[auto,auto,1fr] lg:gap-x-8 lg:px-8 lg:pb-24 lg:pt-16">
                            <div className="lg:col-span-2 lg:border-r lg:border-gray-200 lg:pr-8">
                                <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">{productData?.Product?.brand}</h1>
                            </div>


                            <div className="py-10 lg:col-span-2 lg:col-start-1 lg:border-r lg:border-gray-200 lg:pb-16 lg:pr-8 lg:pt-6">
                                {/* Description and details */}
                                <div>
                                    <h3 className="sr-only">Description</h3>

                                    <div className="space-y-6">
                                        <p className="text-base text-gray-900">{productData?.Product?.title}</p>
                                    </div>
                                </div>

                                <div className="mt-10">
                                    <h3 className="text-sm font-medium text-gray-900">Highlights</h3>

                                    <div className="mt-4">
                                        <ul role="list" className="list-disc space-y-2 pl-4 text-sm">
                                            {product.highlights.map((highlight) => (
                                                <li key={highlight} className="text-gray-400">
                                                    <span className="text-gray-600">{highlight}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>

                                <div className="mt-10">
                                    <h2 className="text-sm font-medium text-gray-900">Details</h2>

                                    <div className="mt-4 space-y-6">
                                        <p className="text-sm text-gray-600">{productData?.Product?.description}</p>
                                    </div>
                                </div>
                            </div>

                            {/* Options */}
                            <div className="mt-4 lg:row-span-3 lg:mt-0">

                                <div className='flex'>
                                    <div className='flex items-end gap-x-3 border-2' style={{ width: 'fit-content' }}>
                                        <p className="text-3xl tracking-tight text-gray-900 flex items-end">
                                            <span className='text-base'>₹</span>
                                            <span className='text-4xl font-semibold'>{productData?.Product?.discountPrice}</span>
                                        </p>
                                        <p className=' text-gray-900 font-medium opacity-80'>M.R.P.: <span className='line-through'>₹{productData?.Product?.price}</span></p>
                                        <p className='text-gray-600 text-2xl font-medium'>{productData?.Product?.discountPercent}% <span className='text-2xl'>off</span></p>
                                    </div>

                                </div>

                               

                                <form className="mt-10">


                                    {/* Sizes */}
                                    <div className="mt-10">
                                        <div className="flex items-center justify-between">
                                            <h3 className="text-sm font-medium text-gray-900">Size</h3>
                                        </div>

                                        <fieldset aria-label="Choose a size" className="mt-4">
                                            <RadioGroup
                                                value={selectedSize}
                                                onChange={setSelectedSize}
                                                className="grid grid-cols-3 gap-4 sm:grid-cols-5 lg:grid-cols-3 w-[15rem]"
                                            >
                                                {product.sizes.map((size) => (
                                                    <Radio
                                                        key={size.name}
                                                        value={size}
                                                        disabled={!size.inStock}
                                                        className={classNames(
                                                            size.inStock
                                                                ? 'cursor-pointer bg-white text-gray-900 shadow-sm'
                                                                : 'cursor-not-allowed bg-gray-50 text-gray-200',
                                                            'group relative flex items-center justify-center rounded-md border px-4 py-3 text-sm font-medium uppercase hover:bg-gray-50 focus:outline-none data-[focus]:ring-2 data-[focus]:ring-indigo-500 sm:flex-1 sm:py-6',
                                                        )}
                                                    >
                                                        <span>{size.name}</span>
                                                        {size.inStock ? (
                                                            <span
                                                                aria-hidden="true"
                                                                className="pointer-events-none absolute -inset-px rounded-md border-2 border-transparent group-data-[focus]:border group-data-[checked]:border-indigo-500"
                                                            />
                                                        ) : (
                                                            <span
                                                                aria-hidden="true"
                                                                className="pointer-events-none absolute -inset-px rounded-md border-2 border-gray-200"
                                                            >
                                                                <svg
                                                                    stroke="currentColor"
                                                                    viewBox="0 0 100 100"
                                                                    preserveAspectRatio="none"
                                                                    className="absolute inset-0 h-full w-full stroke-2 text-gray-200"
                                                                >
                                                                    <line x1={0} x2={100} y1={100} y2={0} vectorEffect="non-scaling-stroke" />
                                                                </svg>
                                                            </span>
                                                        )}
                                                    </Radio>
                                                ))}
                                            </RadioGroup>
                                        </fieldset>
                                    </div>

                                    <NavLink to={`/cart`}>
                                        <button
                                            onClick={handleAddCart}

                                            className="mt-10 flex w-fit items-center justify-center rounded-md border border-transparent bg-purple-600 px-8 py-3 text-base font-medium text-white hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
                                        >
                                            Add to Cart
                                        </button>
                                    </NavLink>

                                </form>
                            </div>


                        </div>
                    </div>

                    

                    
                </div>
            </div>
        </>
    )
}

export default ProductDetails
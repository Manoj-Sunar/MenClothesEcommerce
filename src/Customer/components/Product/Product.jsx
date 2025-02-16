

import { useEffect, useState } from 'react'
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Menu,
} from '@headlessui/react'

import { XMarkIcon } from '@heroicons/react/24/outline'
import { ChevronDownIcon, FunnelIcon, MinusIcon, PlusIcon, Squares2X2Icon } from '@heroicons/react/20/solid'
import ProductCard from './ProductCard'
import { mens_kurta } from '../../../Data/MenCurta'
import { filters, singleFilter } from '../../../Data/Filters'
import { FormControl, FormControlLabel, FormLabel, Radio, RadioGroup } from '@mui/material'
import FilterListIcon from '@mui/icons-material/FilterList';
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import Stack from '@mui/material/Stack';
import Pagination from '@mui/material/Pagination';
import { getAllProducts } from '../../../Store/Slice/ProductSlice'




const sortOptions = [

  { value: 'low_to_high', name: 'Low to High', id: 'sort', current: false },
  { value: 'high_to_low', name: 'High to Low', id: 'sort', current: false },
]



function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function Product() {



  //navigate
  const navigate = useNavigate();

  //location
  const location = useLocation();

  //Dispatch
  const Dispatch = useDispatch();





  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [value, setValue] = useState('female');

  const handleChange = (event) => {
    setValue(event.target.value);
  };


  const decodedQuerySearchParams = decodeURIComponent(location.search);
  const searchQueryParams = new URLSearchParams(decodedQuerySearchParams);
  const colorValue = searchQueryParams.get('color');
  const sizeValue = searchQueryParams.get('size');
  const priceRange = searchQueryParams.get('price');
  const discountRange = searchQueryParams.get('discount');
  const sortValue = searchQueryParams.get('sort');
  const stock = searchQueryParams.get('stock');
  const pageNumber =searchQueryParams.get('page')|| 1;



  //handle checkbox changes
  const handleCheckboxChanges = (value, sectionId) => {

    const SearchParams = new URLSearchParams(location.search);
    let filterdata = SearchParams.getAll(sectionId);
    if (filterdata.length > 0 && filterdata[0].split(",").includes(value)) {
      filterdata = filterdata[0].split(",").filter((item) => item != value);

      if (filterdata.length === 0) {
        SearchParams.delete(sectionId);
      }



    } else {
      filterdata.push(value)
    }

    if (filterdata.length > 0) {
      SearchParams.set(sectionId, filterdata.join(","))
    }


    const query = SearchParams.toString();
    navigate({ search: `?${query}` });
  };

  //handle radio changes
  const handleRadioChange = (e, sectionId) => {

    const searchParams = new URLSearchParams(location.search);
    searchParams.set(sectionId, e.target.value);
    const query = searchParams.toString();
    navigate({ search: `${query}` });

  };


  const handlePaginationChanges=(e,value)=>{
    const searchParams=new URLSearchParams(location.search);
    searchParams.set('page',value);
    const query=searchParams.toString();
    navigate({search:`?${query}`})
  }


  const params = useParams();
  const { productData, errorMessage } = useSelector(state => state.ProductDetails);
  

  useEffect(() => {
    const [minPrice, maxPrice] = priceRange === null ? [0, 0] : priceRange.split("-").map(Number);
    const data = {
      category: params.levelThree,
      color: colorValue,
      sizes: sizeValue || 'M',
      minPrice,
      maxPrice,
      minDiscount: discountRange || 0,
      sort: sortValue || 'low_to_high',
      stock: stock || 'in_stock',
      pageNumber:pageNumber,
      pageSize: 10

    }

    Dispatch(getAllProducts(data));


  }, [Dispatch, params.levelThree, priceRange, colorValue, sizeValue, discountRange, sortValue, stock, pageNumber]);













  return (
    <>

      <div className="bg-white ">
        <div>
          {/* Mobile filter dialog */}
          <Dialog open={mobileFiltersOpen} onClose={setMobileFiltersOpen} className="relative z-40 lg:hidden">
            <DialogBackdrop
              transition
              className="fixed inset-0 bg-black bg-opacity-25 transition-opacity duration-300 ease-linear data-[closed]:opacity-0"
            />

            <div className="fixed inset-0 z-40 flex">
              <DialogPanel
                transition
                className="relative ml-auto flex h-full w-full max-w-xs transform flex-col overflow-y-auto bg-white py-4 pb-12 shadow-xl transition duration-300 ease-in-out data-[closed]:translate-x-full"
              >
                <div className="flex items-center justify-between px-4">
                  <h2 className="text-lg font-medium text-gray-900">Filters</h2>
                  <button
                    type="button"
                    onClick={() => setMobileFiltersOpen(false)}
                    className="-mr-2 flex h-10 w-10 items-center justify-center rounded-md bg-white p-2 text-gray-400"
                  >
                    <span className="sr-only">Close menu</span>
                    <XMarkIcon aria-hidden="true" className="h-6 w-6" />
                  </button>
                </div>

                {/* Filters */}
                <form className="mt-4 border-t border-gray-200">


                  {filters.map((section) => (
                    <Disclosure key={section.id} as="div" className="border-t border-gray-200 px-4 py-6">
                      <h3 className="-mx-2 -my-3 flow-root">
                        <DisclosureButton className="group flex w-full items-center justify-between bg-white px-2 py-3 text-gray-400 hover:text-gray-500">
                          <span className="font-medium text-gray-900">{section.name}</span>
                          <span className="ml-6 flex items-center">
                            <PlusIcon aria-hidden="true" className="h-5 w-5 group-data-[open]:hidden" />
                            <MinusIcon aria-hidden="true" className="h-5 w-5 [.group:not([data-open])_&]:hidden" />
                          </span>
                        </DisclosureButton>
                      </h3>
                      <DisclosurePanel className="pt-6">
                        <div className="space-y-6">
                          {section.options.map((option, optionIdx) => (
                            <div key={option.value} className="flex items-center">
                              <input
                                defaultValue={option.value}
                                defaultChecked={option.checked}
                                id={`filter-mobile-${section.id}-${optionIdx}`}
                                name={`${section.id}[]`}
                                type="checkbox"
                                className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                              />
                              <label
                                htmlFor={`filter-mobile-${section.id}-${optionIdx}`}
                                className="ml-3 min-w-0 flex-1 text-gray-500"
                              >
                                {option.label}
                              </label>
                            </div>
                          ))}
                        </div>
                      </DisclosurePanel>
                    </Disclosure>
                  ))}
                </form>
              </DialogPanel>
            </div>
          </Dialog>

          <main className="mx-auto  px-4 sm:px-6 lg:px-20">
            <div className="flex items-baseline justify-between border-b border-gray-200 pb-6 pt-24">
              <h1 className="text-4xl font-bold tracking-tight text-gray-900">New Arrivals</h1>

              <div className="flex items-center">
                <Menu as="div" className="relative inline-block text-left">
                  {/* Sort Dropdown */}
                  <select onChange={(e) => handleRadioChange(e, 'sort')} >
                    <option value="" >Sort</option>

                    {
                      sortOptions.map((value, key) => {
                        return (
                          <>
                            <option value={value.value} key={key}>Price: {value.name}</option>
                          </>
                        )
                      })
                    }
                  </select>


                </Menu>

                <button type="button" className="-m-2 ml-5 p-2 text-gray-400 hover:text-gray-500 sm:ml-7">
                  <span className="sr-only">View grid</span>
                  <Squares2X2Icon aria-hidden="true" className="h-5 w-5" />
                </button>
                <button
                  type="button"
                  onClick={() => setMobileFiltersOpen(true)}
                  className="-m-2 ml-4 p-2 text-gray-400 hover:text-gray-500 sm:ml-6 lg:hidden"
                >
                  <span className="sr-only">Filters</span>
                  <FunnelIcon aria-hidden="true" className="h-5 w-5" />
                </button>
              </div>
            </div>

            <section aria-labelledby="products-heading" className="pb-24 pt-6">
              <h2 id="products-heading" className="sr-only">
                Products
              </h2>

              <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-4">
                {/* Filters */}
                <div>
                  <div className="flex justify-between items-center py-10">
                    <h2 className="opacity-50 text-lg font-bold">Filters</h2>
                    <FilterListIcon />
                  </div>
                  <form className="hidden lg:block  mt-1">

                    {filters.map((section) => (
                      <Disclosure key={section.id} as="div" className="border-b border-gray-200 py-6">
                        <h3 className="-my-3 flow-root">
                          <DisclosureButton className="group flex w-full items-center justify-between bg-white py-3 text-sm text-gray-400 hover:text-gray-500">
                            <span className="font-medium text-gray-900">{section.name}</span>
                            <span className="ml-6 flex items-center">
                              <PlusIcon aria-hidden="true" className="h-5 w-5 group-data-[open]:hidden" />
                              <MinusIcon aria-hidden="true" className="h-5 w-5 [.group:not([data-open])_&]:hidden" />
                            </span>
                          </DisclosureButton>
                        </h3>
                        <DisclosurePanel className="pt-6">
                          <div className="space-y-4">
                            {section.options.map((option, optionIdx) => (
                              <div key={option.value} className="flex items-center">
                                <input
                                  onChange={() => handleCheckboxChanges(option.value, section.id)}
                                  defaultValue={option.value}
                                  defaultChecked={option.checked}
                                  id={`filter-${section.id}-${optionIdx}`}
                                  name={`${section.id}[]`}
                                  type="checkbox"
                                  className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                />
                                <label htmlFor={`filter-${section.id}-${optionIdx}`} className="ml-3 text-sm text-gray-600">
                                  {option.label}
                                </label>
                              </div>
                            ))}
                          </div>
                        </DisclosurePanel>
                      </Disclosure>
                    ))}

                    {singleFilter.map((section) => (
                      <Disclosure key={section.id} as="div" className="border-b border-gray-200 py-6">
                        <
                          h3 className="-my-3 flow-root">
                          <DisclosureButton className="group flex w-full items-center justify-between bg-white py-3 text-sm text-gray-400 hover:text-gray-500">

                            <span className="font-medium text-gray-900">{section.name}</span>
                            <span className="ml-6 flex items-center">
                              <PlusIcon aria-hidden="true" className="h-5 w-5 group-data-[open]:hidden" />
                              <MinusIcon aria-hidden="true" className="h-5 w-5 [.group:not([data-open])_&]:hidden" />
                            </span>
                          </DisclosureButton>
                        </h3>
                        <DisclosurePanel className="pt-6">
                          <div className="space-y-4">
                            <FormControl>
                              <RadioGroup
                                aria-labelledby="demo-controlled-radio-buttons-group"
                                name="controlled-radio-buttons-group"
                                value={value}
                                onChange={handleChange}
                              >
                                {section.options.map((option, optionIdx) => (

                                  <FormControlLabel onChange={(e) => handleRadioChange(e, section.id)} value={option.value} control={<Radio />} label={option.label} />
                                ))}
                              </RadioGroup>
                            </FormControl>
                          </div>
                        </DisclosurePanel>
                      </Disclosure>
                    ))}
                  </form>
                </div>
                {/* Product grid */}
                <div className="lg:col-span-3">

                  <div className="flex justify-start flex-wrap bg-white py-5 gap-x-2">
                    {
                      productData?.products?.length===0?<p className='text-center'>No products found</p>:productData?.products?.map((item,key) => <ProductCard items={item} key={key}/>)
                    }

                  </div>

                </div>
              </div>
            </section>
            <section>
              <div className='flex justify-end'>
                <Stack spacing={2} sx={{ width: 'fit-content' }}>

                  <Pagination count={productData?.totalPages} onChange={handlePaginationChanges} variant="outlined" shape="rounded" />
                </Stack>
              </div>
            </section>
          </main>
        </div>
      </div>

    </>
  )
}

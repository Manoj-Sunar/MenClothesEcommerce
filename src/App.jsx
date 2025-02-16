import { BrowserRouter, Route, Routes } from "react-router-dom"


import Footer from "./Customer/components/Footer/Footer"
import HomePages from "./Customer/Pages/HomePages";

import "./App.css"
import Product from "./Customer/components/Product/Product";
import ProductDetails from "./Customer/components/Product/ProductDetails";

import Checkout from "./Customer/components/Checkout/Checkout";
import Cart from "./Customer/components/Cart/Cart";
import OrderDetails from "./Customer/components/Order/OrderDetails";
import Order from "./Customer/components/Order/Order";
import Login from "./Authentication/Login";
import SignUp from "./Authentication/SignUp";
import Layout from "./Layout/Layout";
import Logout from "./Authentication/Logout";
import Admin from "./Admin/Admin";


// import AdminDashboard from "./Admin/Components/AdminDashboard";



import { createContext, useEffect, useState } from "react";
import AdminDashboard from "./Admin/Components/AdminDashboard";
import AdminOrders from "./Admin/Components/AdminOrders";
import AdminProducts from "./Admin/Components/AdminProducts";
import Customers from "./Admin/Components/Customers";
import AdminEditProduct from "./Admin/Components/AdminEditProduct";

import AddProducts from "./Admin/Components/AddProducts";
import AdminNotifications from "./Admin/Components/AdminNotifications";




export const MyContext = createContext();

function App() {
  const [isToggleAdminSidebar, setIsToggleAdminSidebar] = useState(false);


  const value = {
    isToggleAdminSidebar,
    setIsToggleAdminSidebar,
  }

 
  return (
    <>
      <div>
        <MyContext.Provider value={value}>
          <BrowserRouter>

            <Routes>


              <Route path="/" element={<Layout><HomePages /></Layout>} />
              <Route path="/cart" element={<Layout><Cart /></Layout>} />
              <Route path="/:levelOne/:levelTwo/:levelThree" element={<Layout><Product /></Layout>} />



              <Route path="/product/details/:id" element={<Layout><ProductDetails /></Layout>} />
              <Route path="/checkout" element={<Layout><Checkout /></Layout>} />
              <Route path="/account/order" element={<Layout><Order /></Layout>} />
              <Route path="/account/order/:orderId" element={<Layout><OrderDetails /></Layout>} />
              <Route path="/login" element={<Login />} />
              <Route path="/signUp" element={<SignUp />} />
              <Route path="/userLogout" element={<Logout />} />

              {/* Admin routes */}


              <Route path="/admin" element={<Admin />}>
               
               <Route index element={<AdminDashboard/>}/>
               <Route path="orders" element={<AdminOrders/>}/>
               <Route path="products" element={<AdminProducts/>}/>
               <Route path="customers" element={<Customers/>}/>
               <Route path="admin-edit-products/:id" element={<AdminEditProduct/>}/>
               <Route path="add-products" element={<AddProducts/>}/>
               <Route path="admin-notifications" element={<AdminNotifications/>}/>



              </Route>
            </Routes>

          </BrowserRouter>
        </MyContext.Provider>
      </div>
    </>
  )
}

export default App;

import { configureStore} from '@reduxjs/toolkit'
import AuthUserSlice from "../Slice/userAuthSlice";
import productSlice from "../Slice/ProductSlice";
import CartSlice from "../Slice/CartSlice";
import MakeOrderSlice from "../Slice/MakeOrderSlice";
import PaymentSlice from "../Slice/CreatePaymentSlice";
import createAdminNotificationSlice from "../Slice/AdminNotificationSlice";

export const store=configureStore({
  reducer:{
    AuthUser:AuthUserSlice,
    ProductDetails:productSlice,
    AddToCart:CartSlice,
    MakeOrders:MakeOrderSlice,
    EsewaPayment:PaymentSlice,
   
  }
});
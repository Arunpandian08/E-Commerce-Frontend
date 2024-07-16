import { configureStore } from "@reduxjs/toolkit";
import useReducer from "./UserSlice";
import productReducer from "./ProductSlice";
import cartReducer from "./cartSlice";


export const store = configureStore({
    reducer:{
        user: useReducer,
        products : productReducer,
        cart: cartReducer
    }
})
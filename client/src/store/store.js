//it holds all the application state
//global reducer
import { configureStore } from '@reduxjs/toolkit';
import authReducer from './auth-slice';
import adminProductsSlice  from './admin/products-slice';

const store = configureStore({
    reducer:{
        auth:authReducer,
        adminProducts : adminProductsSlice,
    },
});

export default store

// connecting this to react application => go to main.jsx for the connection
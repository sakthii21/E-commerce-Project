//it holds all the application state
//global reducer
import { configureStore } from '@reduxjs/toolkit';
import authReducer from './auth-slice';


const store = configureStore({
    reducer:{
        auth:authReducer,
    },
});

export default store

// connecting this to react application => go to main.jsx for the connection
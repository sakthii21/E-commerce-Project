import axios from "axios";
import { Flag } from "lucide-react";

import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';


const initialState ={
    isLoading :false,
    productList:[]
}

export const addNewProduct = createAsyncThunk(
    "/products/addnewproduct",
   async (formData)=>{
    const result = await axios.post("http://localhost:5000/api/admin/products/add",formData,{
        headers:{
            'Content-Type' :'application/json'
        }
    })
    return result?.data
    }
);
export const Getproducts = createAsyncThunk(
    "/products/getproduct",
   async ()=>{
    const result = await axios.get("http://localhost:5000/api/admin/products/get");
    return result?.data
    }
)
export const Updateproducts = createAsyncThunk(
    "/products/updateproduct",
   async ({id,formData})=>{
    const result = await axios.put(`http://localhost:5000/api/admin/products/update/${id}`,formData,{
        headers:{
            'Content-Type' :'application/json'
        }
    })
    return result?.data;
    }
)
export const Deleteproducts = createAsyncThunk(
    "/products/deleteproduct",
   async (id)=>{
    const result = await axios.delete(`http://localhost:5000/api/admin/products/delete/{id}`)
   
    return result?.data
   }
)

const AdminProductsSlice = createSlice({
    name:"adminProducts",
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder.addCase(Getproducts.pending,(state)=>{
            state.isLoading=true
        }).addCase(Getproducts.fulfilled,(state,action)=>{
            state.isLoading = false
            state.productList = action.payload.data
        }).addCase(Getproducts.rejected,(state,action)=>{
            state.isLoading = false
            state.productList = []
        })
    }
})

export default AdminProductsSlice.reducer
import { createSlice } from "@reduxjs/toolkit";

const initialState=localStorage.getItem("cart") ? JSON.parse
(localStorage.getItem("cart")):{cartItems:[]};

const cartSlice=createSlice({
name:"cart",
initialState,
reducers:{
addToCart:(state,action)=>{
const item=action.payload;
const existItem=state.cartItems.find((x)=>x._id===item._id);
if(existItem){
    state.cartItems=state.cartItems.map((x)=>x._id===existItem._id?item:x);
}else{
    state.cartItems=[...state.cartItems,item];
}
//Calculate items price
state.itemPrice=state.cartItems.reduce((acc,item)=>acc+item.price*item.qty,0);
//Calculate shipping price
//Calculate tax price
//Calculate total price
   },
  },
});

export default cartSlice.reducer;
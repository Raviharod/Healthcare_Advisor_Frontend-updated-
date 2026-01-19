import { createSlice } from "@reduxjs/toolkit";



const userActionsSlice = createSlice({
    name:"userAction",
    initialState:{
        sideBtnSelected:"consultations",
        cartQuantity:0,
    },
    reducers:{
        setSideBtnSelected(state, action){
            state.sideBtnSelected = action.payload;
        },
        setCartQuantity(state, action){
            state.cartQuantity = action.payload;
        }
    }
});


export const userActionSliceActions = userActionsSlice.actions;
export default userActionsSlice.reducer;
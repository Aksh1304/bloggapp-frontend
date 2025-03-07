import { createSlice } from '@reduxjs/toolkit'

const initialState={
    currentuser:null,
    loading:false,
    error:null
}

const userSlice=createSlice({
    name:'user',
    initialState,
    reducers:{
        signInStart:(state)=>{
            state.loading=true;
            state.error=null;
        },
        signInSuccess:(state,action)=>{
            state.loading=false;
            state.currentuser=action.payload;
            state.error=null;
        },
        signInFailure:(state,action)=>{
            state.loading=false;
            state.error=action.payload;
        },
        updateStart:(state,action)=>{
            state.loading=true;
            state.error=null;
        },
        updateSuccess:(state,action)=>{
            state.loading=false;
            state.currentuser=action.payload;
            state.error=null;
        },
        updateFailure:(state,action)=>{
            state.loading=false;
            state.error=action.payload;
        },
        deleteUserStart:(state,action)=>{
            state.loading=true;
            state.error=null;
        },
        deleteUserSuccess:(state,action)=>{
            state.loading=false;
            state.currentuser=null;
            state.error=null;
        },
        deleteUserFailure:(state,action)=>{
            state.loading=false;
            state.error=action.payload;
        },
        signoutSuccess:(state)=>{
            state.loading=false;
            state.currentuser=null;
            state.error=null;
        },
    },
    
});

export const {signInStart,signInSuccess,signInFailure,updateStart,updateSuccess,updateFailure,deleteUserStart,deleteUserSuccess,deleteUserFailure,signoutSuccess} = userSlice.actions;

export default userSlice.reducer;
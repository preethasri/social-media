import { createAsyncThunk,createSlice } from "@reduxjs/toolkit";
import { stringify } from "uuid";
import { loginService,signUpService } from "../../services/authService/authService";

export const loginHandler=createAsyncThunk("auth/loginHandler",
async(arg,{rejectWithValue})=>{
    const {login,setLogin}=arg;

    try {
        const {data,status}=await loginService(login.input);

        if(status===200){
            localStorage.setItem("Ornate_token",data.encodedToken);
            localStorage.setItem("Ornate_user",JSON.stringify(data.foundUser))

            return data;
        }
    }
    catch(err){
        setLogin({...login,error:err.response.statusText})
        return rejectWithValue([],false)
    }
}
)


export const signUpHandler=createAsyncThunk("auth/signUpHandler",

async(arg,{rejectWIthValue})=>{
    const {signup,setSignup}=arg;

    try{
        const {data,status}=await signUpService(signup.input)

        if(status===201){
            localStorage.setItem("Ornate_token",data.encodedToken);
            localStorage.setItem("Ornate_user",JSON.stringify(data.createdUser))
           return data
        }
    }
    catch(err){
        setSignup({...signup,error:err.response.statusText})
        return rejectWIthValue([],false)
    }
}
)

export const authSlice=createSlice({
    name:"auth",
    initialState:{
        token:localStorage.getItem("Ornate_token")||null,
        user:JSON.parse(localStorage.getItem("Ornate_user"))||null,
        isLoading:false,
    },
    reducers:{
        logOutHandler:(state)=>{
            state.token=null;
            localStorage.removeItem("Ornate_token")
            localStorage.removeItem("Ornate_user")
        }
    },
    extraReducers:{
        [loginHandler.pending]:(state)=>{
            state.isLoading=true
        },
        [loginHandler.fulfilled]:(state,{payload})=>{
            state.isLoading=false;
            state.token=payload.encodedToken;
            state.user=payload.foundUser;
        },
        [loginHandler.rejected]:(state,{payload})=>{
            state.isLoading=payload
        },

        [signUpHandler.pending]:(state)=>{
            state.isLoading=true
        },
        [signUpHandler.fulfilled]:(state,{payload})=>{
            state.isLoading=false;
            state.token=payload.encodedToken;
            state.user=payload.createdUser;
        },
        
        [signUpHandler.rejected]:(state,{payload})=>{
            state.isLoading=payload
        },
    }
})
      



export const {logOutHandler}=authSlice.actions;
export default authSlice.reducer;
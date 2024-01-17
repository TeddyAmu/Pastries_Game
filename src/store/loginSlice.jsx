import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
    pastriesLog: false,
    email: "",
    password: "",
  };


  export const requestLogin= createAsyncThunk(
    "get/login",
    async (email, password) => {
      try {
        const response = await fetch(
          `http://localhost:3001/login`, {
            email, password
        }, {withCredentials: true}
        );
        if (response.ok) {
            return true;
        }
      } catch (error) {
        console.error("Error:", error.message);
        return false
      }
    }
  );

  export const requestLogout= createAsyncThunk(
    "get/logout",
    async (email, password) => {
      try {
        const response = await fetch(
          `http://localhost:3001/logout`, {
            email, password
        }, {withCredentials: true}
        );
        if (response.ok) {
            return true;
        }
      } catch (error) {
        console.error("Error:", error.message);
        return false
      }
    }
  );

const loginSlice = createSlice({
    name: "pastriesLog",
    initialState,
    reducers: {
        setEmail :(state, action) => {
            state.email = action.payload;   
        },
        setPassword :(state, action) => {
            state.password = action.payload;   
        }
    },
    extraReducers: (builder) => {
        builder.addCase(requestLogin.fulfilled, (state, action) =>{
            state.pastriesLog = action.payload;
        } )
    },
  });
  
  export const {setEmail, setPassword} = loginSlice.actions;
  export default loginSlice.reducer;
  
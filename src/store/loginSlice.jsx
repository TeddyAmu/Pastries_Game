import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    isLogged: false,
    email: "",
    password: "",
  };


  export const requestLogin = createAsyncThunk(
    "login/requestLogin",
    async ({email, password}) => {
      try {
        const response = await axios.post(
          `http://localhost:3001/login`,
          {
            email,
            password,
          },
          { withCredentials: true }
        );
        if (response.status === 200) {
          return true;
        }
      } catch (error) {
        console.error("Error:", error.message);
        return false;
      }
    }
  );

  export const requestLogout = createAsyncThunk(
    "login/requestLogout",
    async () => {
        try {
          const response = await axios.get("http://localhost:3001/logout", {
            withCredentials: true,
          });
    
          return response.status;
        } catch (error) {
          console.error("Error:", error.message);
          throw error; 
        }
      }
    );

const loginSlice = createSlice({
    name: "isLogged",
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
            state.isLogged = action.payload;
        })
 
          builder.addCase(requestLogout.fulfilled, (state, action) => {
            state.isLogged = false;
        });
    },
  });
  
  export const {setEmail, setPassword} = loginSlice.actions;
  export default loginSlice.reducer;
  
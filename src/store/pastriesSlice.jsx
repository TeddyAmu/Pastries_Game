import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";


const initialState = {
  pastries: {},
};

export const requestPastries = createAsyncThunk("get/pastries", async () => {
  try {
    const response = await fetch("http://localhost:3001/game/pastries");
    if (!response.ok) {
      throw new Error("Le serveur n'a pas répondu");
    }
    const pastries = await response.json();
    return pastries;
  } catch (error) {
    console.error("L'erreur : ", error);
  }
});


export const deletePastry = createAsyncThunk("delete/pastrie", async (id) => {
  try {
    const response = await axios.delete(
      `http://localhost:3001/api/pastrie/${id}`,
      { withCredentials: true }
    );
    if (response.status === 200) {
      console.log(response.data);
      return response.data;
    } else {
      return false;
    }
  } catch (error) {
    console.error("Erreur : ", error);
    return false;
  }
});

export const addPastry = createAsyncThunk(
  "post/pastrie",
  async ({ name, quantity }) => {
    try {
      const response = await axios.post(
        "http://localhost:3001/api/pastrie/",
        {
          name,
          quantity,
        },
        { withCredentials: true }
      );
      if (response.status === 200) {
        return response.data;
      }
    } catch (error) {
      console.error("Erreur : ", error);
      return false;
    }
  }
);

export const modifyPastry = createAsyncThunk(
  "put/pastrie",
  async (putData) => {
    try {
      console.log(putData);
      const response = await axios.put(
        `http://localhost:3001/api/pastrie/${putData.id}`,
        { quantity: putData.newQuantity, name : putData.newName },
        { withCredentials: true }
      );
      if (response.status == 200) {
        console.log(response.data);

        return {
          pastrie: response.data,
        };
      }
      return false;
    } catch (error) {
      console.log(error);
      return false;
    }
  }
);


const pastriesSlice = createSlice({
  name: "pastries",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(requestPastries.pending, (state, action) => {
      //
    });
    builder.addCase(requestPastries.fulfilled, (state, action) => {
      state.pastries = action.payload;
    });
    builder.addCase(deletePastry.fulfilled, (state, action) => {
      if (action.payload !== false) {
        state.pastries = action.payload.response;
      }
    });
    builder.addCase(addPastry.fulfilled, (state, action) => {
      if (action.payload !== false) {
        state.needUpdate = !state.needUpdate;
      }
    });
    builder.addCase(modifyPastry.fulfilled, (state, action) => {
      if (action.payload !== false) {
        requestPastries();
      }
    });
  },
});

export default pastriesSlice.reducer;

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

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
  },
});

export default pastriesSlice.reducer;

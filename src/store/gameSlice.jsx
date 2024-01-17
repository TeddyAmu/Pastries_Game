import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  pastriesWon: {},
};

export const requestPastriesWon = createAsyncThunk(
  "get/pastriesWon",
  async (id) => {
    try {
      const response = await fetch(
        `http://localhost:3001/game/win-pastries/${id}`
      );
      if (!response.ok) {
        throw new Error("Le serveur n'a pas répondu");
      }
      const pastries = await response.json();
      return pastries;
    } catch (error) {
      console.error("Error:", error.message);
    }
  }
);

const gameSlice = createSlice({
  name: "pastriesWon",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(requestPastriesWon.pending, (state, action) => {
      //
    });
    builder.addCase(requestPastriesWon.fulfilled, (state, action) => {
      state.pastriesWon = action.payload;
    });
  },
});

export default gameSlice.reducer;

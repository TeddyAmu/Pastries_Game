import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import pastriesSlice from "./pastriesSlice";
import gameSlice from "./gameSlice";
import loginSlice from "./loginSlice";

const store = configureStore({
  reducer: {
    pastriesSliceReducer: pastriesSlice,
    gameSliceReducer: gameSlice,
    loginSliceReducer : loginSlice,
  },
});

export const GetProviderStore = ({ children }) => {
  return <Provider store={store}>{children}</Provider>;
};

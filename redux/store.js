import { configureStore } from "@reduxjs/toolkit";
import albumSlice from "./reducers/slice";

const store = configureStore({
  reducer: {
    album: albumSlice,
  },
});
export default store;
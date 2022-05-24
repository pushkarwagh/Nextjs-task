import { createSlice } from "@reduxjs/toolkit";

const albumSlice = createSlice({
  name: "album",
  initialState: {
    album: [],
  },
  reducers: {
    addAlbum: (state, action) => {
      state.album.push(action.payload);
    }    
  },
});

export const { addAlbum } = albumSlice.actions;

export default albumSlice.reducer;
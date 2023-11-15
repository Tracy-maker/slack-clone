import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  roomId: null,
};

export const appSlice = createSlice({
  name: "roomId",
});

export default appSlice.reducer;

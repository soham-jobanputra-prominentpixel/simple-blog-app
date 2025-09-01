import { createSlice } from "@reduxjs/toolkit";

const blogsSlice = createSlice({
  name: "posts",
  initialState: [],
  reducers: {},
});

export const blogsReducer = blogsSlice.reducer;

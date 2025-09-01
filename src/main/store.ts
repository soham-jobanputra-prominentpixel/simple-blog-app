import { configureStore } from "@reduxjs/toolkit";
import { blogsReducer } from "./features/blogsSlice.ts";

export const store = configureStore({
  reducer: {
    blogs: blogsReducer,
  },
});

export type AppStore = typeof store;
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

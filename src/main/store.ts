import { configureStore } from "@reduxjs/toolkit";
import { blogsReducer } from "./features/blogsSlice.ts";
import { authReducer } from "./features/authSlice.ts";
import { initialAppData } from "./initialAppData.ts";

function loadState(): unknown {
  const serializedState = localStorage.getItem("reduxStore");
  if (serializedState === null) {
    return initialAppData;
  }
  return JSON.parse(serializedState);
}

export const store = configureStore({
  reducer: {
    blogs: blogsReducer,
    auth: authReducer,
  },
  preloadedState: loadState(),
});

store.subscribe(() => {
  localStorage.setItem("reduxStore", JSON.stringify(store.getState()));
});

export type AppStore = typeof store;
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

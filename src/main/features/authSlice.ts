import { createSlice, nanoid, type PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../store.ts";

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  username: string;
  password: string;
}

const authSlice = createSlice({
  name: "auth",
  initialState: { users: [] as User[], loggedInUserId: "" },
  reducers: {
    userAdded: {
      reducer(state, action: PayloadAction<User>) {
        const existingUser = state.users.find((user) =>
          user.email === action.payload.email ||
          user.username === action.payload.username
        );
        if (existingUser === undefined) {
          state.users.push(action.payload);
        }
      },
      prepare(
        firstName: string,
        lastName: string,
        email: string,
        username: string,
        password: string,
      ) {
        return {
          payload: {
            id: nanoid(),
            firstName,
            lastName,
            email,
            username,
            password,
          },
        };
      },
    },

    userLoggedIn: (state, action: PayloadAction<string>) => {
      const existingUser = state.users.find((user) =>
        user.email === action.payload ||
        user.username === action.payload
      );
      if (existingUser) {
        state.loggedInUserId = existingUser.id;
      }
    },

    userLoggedOut: (state) => {
      state.loggedInUserId = "";
    },
  },
});

export const authReducer = authSlice.reducer;
export const { userAdded, userLoggedIn, userLoggedOut } = authSlice.actions;

export const selectUserByEmail = (email: string) => (state: RootState) =>
  state.auth.users.find((user) => user.email === email);

export const selectUserById = (id: string | undefined) => (state: RootState) =>
  state.auth.users.find((user) => user.id === id);

export const selectUserByUsername = (username: string) => (state: RootState) =>
  state.auth.users.find((user) => user.username === username);

export const selectLoggedInUser = (state: RootState) =>
  state.auth.users.find((user) => user.id === state.auth.loggedInUserId);

import { createSlice, nanoid, type PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../store.ts";

export interface Blog {
  id: string;
  date: string;
  title: string;
  content: string;
  author: string;
}

const blogsSlice = createSlice({
  name: "blogs",
  initialState: [] as Blog[],
  reducers: {
    blogAdded: {
      reducer(state, action: PayloadAction<Blog>) {
        state.push(action.payload);
      },
      prepare(title: string, content: string, author: string) {
        return {
          payload: {
            id: nanoid(),
            date: new Date().toISOString(),
            title,
            content,
            author,
          },
        };
      },
    },
  },
});

export const blogsReducer = blogsSlice.reducer;
export const { blogAdded } = blogsSlice.actions;

export const selectAllBlogs = (state: RootState) => state.blogs;
export const selectBlogById = (blogId: string | undefined) => (state: RootState) =>
  state.blogs.find((blog) => blog.id === blogId);

import { createSlice, nanoid, type PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../store.ts";

export interface Blog {
  id: string;
  date: string;
  title: string;
  content: string;
  author: string;
  lastEditedAt: string;
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
            lastEditedAt: new Date().toISOString(),
          },
        };
      },
    },
    blogDeleted: (state, action: PayloadAction<Pick<Blog, "id">>) => {
      const index = state.findIndex((blog) => blog.id === action.payload.id);
      if (index !== -1) {
        state.splice(index, 1);
      }
    },
    blogEdited: (
      state,
      action: PayloadAction<Pick<Blog, "id" | "content" | "title" | "author">>,
    ) => {
      const blog = state.find((blog) => blog.id === action.payload.id);
      if (blog !== undefined) {
        blog.title = action.payload.title;
        blog.content = action.payload.content;
        blog.author = action.payload.author;
        blog.lastEditedAt = new Date().toISOString();
      }
    },
  },
});

export const blogsReducer = blogsSlice.reducer;
export const { blogAdded, blogDeleted, blogEdited } = blogsSlice.actions;

export const selectAllBlogs = (state: RootState) => state.blogs;
export const selectBlogById =
  (blogId: string | undefined) => (state: RootState) =>
    state.blogs.find((blog) => blog.id === blogId);

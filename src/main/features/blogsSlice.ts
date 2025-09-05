import { createSlice, nanoid, type PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../store.ts";
import { selectLoggedInUser } from "./authSlice.ts";

export interface Blog {
  id: string;
  date: string;
  title: string;
  content: string;
  lastEditedAt: string;
  userId: string;
}

const blogsSlice = createSlice({
  name: "blogs",
  initialState: [] as Blog[],
  reducers: {
    blogAdded: {
      reducer(state, action: PayloadAction<Blog>) {
        state.push(action.payload);
      },
      prepare(title: string, content: string, userId: string) {
        return {
          payload: {
            id: nanoid(),
            date: new Date().toISOString(),
            title,
            content,
            userId,
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
      action: PayloadAction<Pick<Blog, "id" | "content" | "title">>,
    ) => {
      const blog = state.find((blog) => blog.id === action.payload.id);
      if (blog !== undefined) {
        blog.title = action.payload.title;
        blog.content = action.payload.content;
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
export const selectPreviousAndNextBlogId =
  (blogId: string | undefined, onlyMy: boolean) => (state: RootState) => {
    const blogs = onlyMy ? selectMyBlogs(state) : state.blogs;
    if (blogs.length > 1 && blogId !== undefined) {
      const blogIndex = blogs.findIndex((blog) => blog.id === blogId);
      const lastIndex = blogs.length - 1;

      if (blogIndex === lastIndex) {
        return [blogs[blogIndex - 1].id, undefined];
      } else if (blogIndex === 0) {
        return [undefined, blogs[blogIndex + 1].id];
      } else {
        return [blogs[blogIndex - 1].id, blogs[blogIndex + 1].id];
      }
    } else {
      return [undefined, undefined];
    }
  };
export const selectMyBlogs = (state: RootState) =>
  selectAllBlogs(state).filter(
    (blog) => blog.userId === selectLoggedInUser(state)?.id,
  );

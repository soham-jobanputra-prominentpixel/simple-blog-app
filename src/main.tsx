import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { store } from "./main/store.ts";
import { ThemeProvider } from "./components/theme-provider.tsx";
import Layout from "./Layout.tsx";
import "./index.css";
import { BrowserRouter, Routes, Route } from "react-router";
import Blogs from "./pages/Home.tsx";
import AddBlog from "./pages/AddBlog.tsx";
import BlogPage from "./pages/Blog.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
      <Provider store={store}>
          <BrowserRouter>
            <Routes>
              <Route element={<Layout />}>
                <Route index element={<Blogs />} />
                <Route path="create-blog" element={<AddBlog />} />
                <Route path="blog/:blogId" element={<BlogPage />} />
              </Route>
            </Routes>
          </BrowserRouter>
      </Provider>
    </ThemeProvider>
  </StrictMode>,
);

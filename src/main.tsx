import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { store } from "./main/store.ts";
import { ThemeProvider } from "./components/theme-provider.tsx";
import Layout from "./Layout.tsx";
import "./index.css";
import { BrowserRouter, Route, Routes, useLocation } from "react-router";
import Blogs from "./pages/Home.tsx";
import AddBlog from "./pages/AddBlog.tsx";
import BlogPage from "./pages/Blog.tsx";
import { AnimatePresence, easeInOut, motion } from "framer-motion";
import { Toaster } from "./components/ui/sonner.tsx";
import EditBlog from "./pages/EditBlog.tsx";
import SignUp from "./pages/SignUp.tsx";
import Login from "./pages/Login.tsx";
import Profile from "./pages/Profile.tsx";

const pageVariants = {
  initial: {
    opacity: 0,
  },
  in: {
    opacity: 1,
  },
  out: {
    opacity: 0,
  },
};

const pageTransition = {
  duration: 0.3,
  ease: easeInOut,
};

function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route
          path="sign-up"
          element={
            <motion.div
              initial="initial"
              animate="in"
              exit="out"
              variants={pageVariants}
              transition={pageTransition}
            >
              <SignUp />
            </motion.div>
          }
        />
        <Route
          path="login"
          element={
            <motion.div
              initial="initial"
              animate="in"
              exit="out"
              variants={pageVariants}
              transition={pageTransition}
            >
              <Login />
            </motion.div>
          }
        />
        <Route element={<Layout />}>
          <Route
            index
            element={
              <motion.div
                initial="initial"
                animate="in"
                exit="out"
                variants={pageVariants}
                transition={pageTransition}
              >
                <Blogs />
              </motion.div>
            }
          />
          <Route
            path="create-blog"
            element={
              <motion.div
                initial="initial"
                animate="in"
                exit="out"
                variants={pageVariants}
                transition={pageTransition}
              >
                <AddBlog />
              </motion.div>
            }
          />
          <Route
            path="blog/:blogId"
            element={
              <motion.div
                initial="initial"
                animate="in"
                exit="out"
                variants={pageVariants}
                transition={pageTransition}
              >
                <BlogPage />
              </motion.div>
            }
          />
          <Route
            path="my-blog/:blogId"
            element={
              <motion.div
                initial="initial"
                animate="in"
                exit="out"
                variants={pageVariants}
                transition={pageTransition}
              >
                <BlogPage onlyMy />
              </motion.div>
            }
          />
          <Route
            path="edit-blog/:blogId"
            element={
              <motion.div
                initial="initial"
                animate="in"
                exit="out"
                variants={pageVariants}
                transition={pageTransition}
              >
                <EditBlog />
              </motion.div>
            }
          />
          <Route
            path="profile"
            element={
              <motion.div
                initial="initial"
                animate="in"
                exit="out"
                variants={pageVariants}
                transition={pageTransition}
              >
                <Profile />
              </motion.div>
            }
          />
          <Route
            path="my-blogs"
            element={
              <motion.div
                initial="initial"
                animate="in"
                exit="out"
                variants={pageVariants}
                transition={pageTransition}
              >
                <Blogs onlyMy />
              </motion.div>
            }
          />
        </Route>
      </Routes>
    </AnimatePresence>
  );
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
      <Provider store={store}>
        <BrowserRouter>
          <AnimatedRoutes />
          <Toaster
            toastOptions={{
              style: {
                background: "black",
                borderRadius: 0,
              },
            }}
          />
        </BrowserRouter>
      </Provider>
    </ThemeProvider>
  </StrictMode>,
);

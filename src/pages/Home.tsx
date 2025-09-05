import { Link } from "react-router";
import { selectAllBlogs, selectMyBlogs } from "../main/features/blogsSlice.ts";
import { useAppSelector } from "../main/hooks/redux.ts";
import { useStore } from "react-redux";
import { selectUserById } from "../main/features/authSlice.ts";
import type { RootState } from "../main/store.ts";

type HomeProps = {
  onlyMy?: boolean;
};

function Home({ onlyMy = false }: HomeProps) {
  const allblogs = useAppSelector(selectAllBlogs);
  const myBlogs = useAppSelector(selectMyBlogs);
  const store = useStore<RootState>()
  const blogs = onlyMy ? myBlogs : allblogs;

   return (
    <>
      {blogs.length === 0 ? (
        <h1 className="text-xl font-bold text-center">
          Create New Blog to get started!
        </h1>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {blogs.map((blog) => (
            <Link
              key={blog.id}
              to={onlyMy ? `/my-blog/${blog.id}` : `/blog/${blog.id}`}
              className="block border-2 border-black bg-stone-200 hover:bg-stone-300 overflow-hidden"
            >
              <div className="w-full">
                <img
                  src={blog.thumbnail}
                  alt={blog.title}
                  className="w-full aspect-video object-cover"
                />
              </div>

              <div className="p-2">
                <h2 className="font-bold text-lg m-0">{blog.title}</h2>
                <span>By {selectUserById(blog.userId)(store.getState())?.username ?? ""}</span>
              </div>
            </Link>
          ))}
        </div>
      )}
    </>
  );
}

export default Home;

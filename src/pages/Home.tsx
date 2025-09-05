import { Link } from "react-router";
import { selectAllBlogs, selectMyBlogs } from "../main/features/blogsSlice.ts";
import { useAppSelector } from "../main/hooks/redux.ts";

type HomeProps = {
  onlyMy?: boolean;
};

function Home({ onlyMy = false }: HomeProps) {
  const allblogs = useAppSelector(selectAllBlogs);
  const myBlogs = useAppSelector(selectMyBlogs);

  const blogs = onlyMy ? myBlogs : allblogs;

  return (
    <ul>
      {blogs.length === 0
        ? <h1>Create New Blog to get started!</h1>
        : blogs.map(
          (blog) => (
            <li key={blog.id}>
              <Link
                className="underline text-blue-600"
                to={onlyMy ? `/my-blog/${blog.id}` : `/blog/${blog.id}`}
              >
                {blog.title}
              </Link>
            </li>
          ),
        )}
    </ul>
  );
}

export default Home;

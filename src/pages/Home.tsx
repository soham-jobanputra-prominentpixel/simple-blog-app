import { Link } from "react-router";
import { selectAllBlogs } from "../main/features/blogsSlice.ts";
import { useAppSelector } from "../main/hooks/redux.ts";

function Home() {
    const blogs = useAppSelector(selectAllBlogs);

    return (
        <ul>
            {blogs.length === 0
                ? <h1>Create New Blog to get started!</h1>
                : blogs.map(
                    (blog) => (
                        <li key={blog.id}>
                            <Link
                                className="underline text-blue-600"
                                to={`blog/${blog.id}`}
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

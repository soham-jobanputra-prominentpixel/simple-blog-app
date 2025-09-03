import { selectAllBlogs } from "../main/features/blogsSlice.ts";
import { useAppSelector } from "../main/hooks/redux.ts";

function Blogs() {
    const blogs = useAppSelector(selectAllBlogs)

    return (
        <ul>
            {blogs.map(
                blog => <li key={blog.id}>{blog.title}</li>
            )}
        </ul>
    );
}

export default Blogs;
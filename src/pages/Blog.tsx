import { useParams } from "react-router";
import { useAppSelector } from "../main/hooks/redux.ts";
import { selectBlogById, type Blog as BlogType } from "../main/features/blogsSlice.ts";

function BlogPage() {
    const { blogId } = useParams<{ blogId: string }>();
    const blog = useAppSelector(selectBlogById(blogId));

    return (
        blog === undefined
            ? <h2>Blog Not Found</h2>
            : <Blog blog={blog} />
    );
}

export default BlogPage;

type BlogProps = {
    blog: BlogType;
};

function Blog({ blog }: BlogProps) {
    return (
        <>
            <h1>{blog.title}</h1>
            <span>by {blog.author} published on {blog.date}</span>
            <hr className="mb-4 border-1 border-black" />
            <div dangerouslySetInnerHTML={{ __html: blog.content }} />
        </>
    );
}

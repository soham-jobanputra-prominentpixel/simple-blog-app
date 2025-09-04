import { useNavigate, useParams } from "react-router";
import { useAppDispatch, useAppSelector } from "../main/hooks/redux.ts";
import {
    type Blog as BlogType,
    blogDeleted,
    selectBlogById,
} from "../main/features/blogsSlice.ts";
import Button from "../components/Button.tsx";
import { formatToAmericanDate } from "../components/ui/lib/utils.ts";
import { useState } from "react";
import { DeleteConfirmationModal } from "../components/DeleteConfirmationModal.tsx";
import { errorToast } from "../components/ui/toast.tsx";

function BlogPage() {
    const { blogId } = useParams<{ blogId: string }>();
    const blog = useAppSelector(selectBlogById(blogId));

    return (
        blog === undefined ? <h2>Blog Not Found</h2> : <Blog blog={blog} />
    );
}

export default BlogPage;

type BlogProps = {
    blog: BlogType;
};

function Blog({ blog }: BlogProps) {
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    return (
        <>
            <DeleteConfirmationModal
                open={isDeleteModalOpen}
                onDelete={() => {
                    dispatch(blogDeleted({ id: blog.id }));
                    setIsDeleteModalOpen(false);
                    errorToast("Deleted the blog");
                    navigate("/");
                }}
                onOpenChange={() => setIsDeleteModalOpen(false)}
            />
            <h1 className="mb-0 text-4xl">{blog.title}</h1>
            <div className="text-lg">
                <span className="capitalize">by {blog.author}</span> <br />
                <span className="capitalize">
                    published on {formatToAmericanDate(blog.date)}
                </span>{" "}
                <br />
                <span className="capitalize">
                    Last Edited At {formatToAmericanDate(blog.lastEditedAt)}
                </span>
                <br />
            </div>
            <Button
                type="button"
                text="Edit"
                textStyle="text-lg"
                className="mr-3"
                onClick={() => navigate(`/edit-blog/${blog.id}`)}
            />
            <Button
                type="button"
                text="Delete"
                textStyle="text-lg"
                onClick={() => setIsDeleteModalOpen(true)}
            />
            <hr className="mt-3 mb-6 border-1 border-black" />
            <div
                className="text-xl"
                dangerouslySetInnerHTML={{ __html: blog.content }}
            />
        </>
    );
}

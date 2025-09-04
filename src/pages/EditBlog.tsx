import {
    useNavigate,
    useParams,
} from "react-router/internal/react-server-client";
import AddBlogForm from "../components/forms/AddBlogForm.tsx";
import { blogEdited, selectBlogById } from "../main/features/blogsSlice.ts";
import { useAppDispatch, useAppSelector } from "../main/hooks/redux.ts";
import { successToast } from "../components/ui/toast.tsx";

function EditBlog() {
    const { blogId } = useParams();
    const blog = useAppSelector(selectBlogById(blogId));
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    return (
        <>
            {blog === undefined
                ? <h1 className="my-0 mt-4">Add New Blog</h1>
                : (
                    <>
                        <h1 className="my-0 mt-4">Add New Blog</h1>
                        <hr className="mb-4 border-1 border-black" />
                        <AddBlogForm
                            existingBlog={blog}
                            onSubmit={(formData) => {
                                dispatch(
                                    blogEdited(
                                        {
                                            id: blog.id,
                                            title: formData.title,
                                            content: formData.textEditor,
                                            author: formData.author,
                                        },
                                    ),
                                );
                                successToast(
                                    "The blog has been edited successfully!",
                                );
                                navigate(`/blog/${blog.id}`);
                            }}
                        />
                    </>
                )}
        </>
    );
}

export default EditBlog;

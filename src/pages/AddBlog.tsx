import AddBlogForm from "../components/forms/AddBlogForm.tsx";
import { blogAdded } from "../main/features/blogsSlice.ts";
import { useAppDispatch } from "../main/hooks/redux.ts";

function AddBlog() {
    const dispatch = useAppDispatch();

    return (
        <>
            <h1 className="my-0 mt-4">Add New Blog</h1>
            <hr className="mb-4 border-1 border-black" />
            <AddBlogForm
                onSubmit={(formData) =>
                    dispatch(
                        blogAdded(
                            formData.title,
                            formData.textEditor,
                            formData.author,
                        ),
                    )}
            />
        </>
    );
}

export default AddBlog;

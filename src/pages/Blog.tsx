import { useNavigate, useParams } from "react-router";
import { useAppDispatch, useAppSelector } from "../main/hooks/redux.ts";
import {
  type Blog as BlogType,
  blogDeleted,
  selectBlogById,
  selectPreviousAndNextBlogId,
} from "../main/features/blogsSlice.ts";
import Button from "../components/Button.tsx";
import { formatToAmericanDate } from "../components/ui/lib/utils.ts";
import { useState } from "react";
import { DeleteConfirmationModal } from "../components/DeleteConfirmationModal.tsx";
import { errorToast } from "../components/ui/toast.tsx";
import {
  selectLoggedInUser,
  selectUserById,
} from "../main/features/authSlice.ts";

type BlogPageProps = {
  onlyMy?: boolean;
};

function BlogPage({ onlyMy = false }: BlogPageProps) {
  const { blogId } = useParams<{ blogId: string }>();
  const blog = useAppSelector(selectBlogById(blogId));

  return (
    blog === undefined
      ? <h2>Blog Not Found</h2>
      : <Blog blog={blog} onlyMy={onlyMy} />
  );
}

export default BlogPage;

type BlogProps = {
  blog: BlogType;
  onlyMy: boolean;
};

function Blog({ blog, onlyMy }: BlogProps) {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [previousBlogId, nextBlogId] = useAppSelector(
    selectPreviousAndNextBlogId(blog.id, onlyMy),
  );
  const blogAuthor = useAppSelector(selectUserById(blog.userId));
  const loggedInUser = useAppSelector(selectLoggedInUser);

  return (
    <>
      <DeleteConfirmationModal
        open={isDeleteModalOpen}
        onDelete={() => {
          if (blogAuthor?.id === loggedInUser?.id) {
            dispatch(blogDeleted({ id: blog.id }));
            setIsDeleteModalOpen(false);
            errorToast("Deleted the blog");
            navigate("/");
          }
        }}
        onOpenChange={() => setIsDeleteModalOpen(false)}
      />
      <img
        src={blog.thumbnail}
        alt="Blog Thumbnail"
        className="w-full aspect-video object-cover"
      />
      <h1 className="mb-0 text-4xl">{blog.title}</h1>
      <div className="text-lg">
        <span className="capitalize">by {blogAuthor!.username}</span> <br />
        <span className="capitalize">
          published on {formatToAmericanDate(blog.date)}
        </span>{" "}
        <br />
        <span className="capitalize">
          Last Edited At {formatToAmericanDate(blog.lastEditedAt)}
        </span>
        <br />
      </div>
      {blogAuthor?.id === loggedInUser?.id
        ? (
          <>
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
          </>
        )
        : ""}
      <hr className="mt-3 mb-6 border-1 border-black" />
      <div
        className="text-xl"
        dangerouslySetInnerHTML={{ __html: blog.content }}
      />
      <div className="flex justify-between my-3">
        <Button
          text="Previous"
          disabled={previousBlogId === undefined ? true : undefined}
          onClick={() => navigate(`/blog/${previousBlogId}`)}
        />
        <Button
          text="Next"
          disabled={nextBlogId === undefined ? true : undefined}
          onClick={() => navigate(`/blog/${nextBlogId}`)}
        />
      </div>
    </>
  );
}

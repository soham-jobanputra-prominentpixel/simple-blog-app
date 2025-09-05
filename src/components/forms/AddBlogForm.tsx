import { Form, Formik } from "formik";
import EditorField from "./fields/EditorField.tsx";
import InputField from "./fields/InputField.tsx";
import Button from "../Button.tsx";
import * as Yup from "yup";
import { useState } from "react";
import type { Blog } from "../../main/features/blogsSlice.ts";
import { useSelector } from "react-redux/alternate-renderers";
import { selectLoggedInUser } from "../../main/features/authSlice.ts";
import ImageInputField from "./fields/ImageInputField.tsx";

interface FormElements {
  title: string;
  textEditor: string;
  author: string;
  thumbnail: string;
}

const MAX_FILE_SIZE = 1 * 1024 * 1024; // 1MB
const SUPPORTED_FORMATS = ["image/jpeg", "image/png", "image/webp"];

const validationSchema = Yup.object().shape({
  title: Yup.string().required("Title is required"),
  textEditor: Yup.string().required("Text editor content is required"),
  author: Yup.string().required("Author is required"),
  thumbnail: Yup.string()
    .required("Thumbnail is required")
    .test("fileType", "Unsupported file type", (value) => {
      if (!value) return false;
      // Base64 looks like: data:image/png;base64,....
      const mimeType = value.substring(5, value.indexOf(";"));
      return SUPPORTED_FORMATS.includes(mimeType);
    })
    .test("fileSize", "File is too large (max 1MB)", (value) => {
      if (!value) return false;
      // Remove metadata ("data:image/...;base64,")
      const base64Str = value.split(",")[1];
      if (!base64Str) return false;
      // Approximate size in bytes
      const sizeInBytes = (base64Str.length * 3) / 4;
      return sizeInBytes <= MAX_FILE_SIZE;
    }),
});

type AddBlogFormProps = {
  onSubmit: (formData: FormElements) => void;
  existingBlog?: Blog;
};

function AddBlogForm({ onSubmit, existingBlog }: AddBlogFormProps) {
  const [hasError, setHasError] = useState(false);
  const user = useSelector(selectLoggedInUser);

  const initialValues: FormElements = {
    title: existingBlog?.title ?? "",
    textEditor: existingBlog?.content ?? "",
    author: user?.username ?? "",
    thumbnail: existingBlog?.thumbnail ?? "",
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={(values, { setSubmitting }) => {
        onSubmit(values);
        setSubmitting(false);
      }}
    >
      {({ validateForm }) => (
        <Form>
          <InputField
            label="Title"
            name="title"
            type="text"
            placeholder="Blog Title"
            className="mb-4 w-fit"
          />
          <ImageInputField
            name="thumbnail"
            label="Thumbnail"
            className="mb-4 w-fit"
          />
          <div className="mb-4">
            <EditorField
              name="textEditor"
              placeholder="Start writing your blog from here"
            />
          </div>
          <InputField
            label="Author"
            name="author"
            type="text"
            placeholder="Author Name"
            className="mb-4 w-fit"
            disabled
          />

          <Button
            type="submit"
            text="Submit"
            className="mb-6"
            hasError={hasError}
            onClick={async () => {
              const formErrors = await validateForm();
              if (Object.keys(formErrors).length > 0) {
                setHasError(true);
                setTimeout(() => setHasError(false), 600);
              }
            }}
          />
        </Form>
      )}
    </Formik>
  );
}

export default AddBlogForm;

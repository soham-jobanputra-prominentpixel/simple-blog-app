import { Form, Formik } from "formik";
import EditorField from "./components/forms/fields/EditorField.tsx";
import TextInputField from "./components/forms/fields/TextInputField.tsx";
import Button from "./components/Button.tsx";
import * as Yup from "yup";
import { useState } from "react";

interface FormElements {
  title: string;
  textEditor: string;
  author: string;
}

const initialValues: FormElements = {
  title: "",
  textEditor: "",
  author: "",
};

const validationSchema = Yup.object().shape({
  title: Yup.string().required("Title is required"),
  textEditor: Yup.string().required("Text editor content is required"),
  author: Yup.string().required("Author is required"),
});

function App() {
  const [hasError, setHasError] = useState(false);

  return (
    <div className="mx-auto max-w-200">
      <h1 className="my-0 mt-4">Add New Blog</h1>
      <hr className="mb-4 border-1 border-black" />
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values, { setSubmitting }) => {
          setTimeout(() => {
            alert(JSON.stringify(values, null, 2));
            setSubmitting(false);
          }, 400);
        }}
      >
        {({ validateForm, submitForm }) => (
          <Form>
            <TextInputField
              label="Title"
              name="title"
              type="text"
              placeholder="Blog Title"
              className="mb-4 w-fit"
            />
            <div className="mb-4">
              <EditorField
                name="textEditor"
                placeholder="Start writing your blog from here"
              />
            </div>
            <TextInputField
              label="Author"
              name="author"
              type="text"
              placeholder="Author Name"
              className="mb-4 w-fit"
            />

            <Button
              text="submit"
              className="mb-6"
              hasError={hasError}
              onClick={async () => {
                const formErrors = await validateForm();
                if (Object.keys(formErrors).length > 0) {
                  setHasError(true);
                  setTimeout(() => setHasError(false), 600);
                } else {
                  submitForm();
                }
              }}
            />
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default App;

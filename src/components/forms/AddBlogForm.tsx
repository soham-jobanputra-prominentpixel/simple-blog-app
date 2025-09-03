import { Form, Formik } from "formik";
import EditorField from "./fields/EditorField.tsx";
import InputField from "./fields/InputField.tsx";
import Button from "../Button.tsx";
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

type AddBlogFormProps = {
    onSubmit: (formData: FormElements) => void;
};

function AddBlogForm({ onSubmit }: AddBlogFormProps) {
    const [hasError, setHasError] = useState(false);

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
                            }
                        }}
                    />
                </Form>
            )}
        </Formik>
    );
}

export default AddBlogForm;

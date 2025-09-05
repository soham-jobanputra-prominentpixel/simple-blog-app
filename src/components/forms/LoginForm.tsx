import { Form, Formik } from "formik";
import InputField from "./fields/InputField.tsx";
import Button from "../Button.tsx";
import * as Yup from "yup";
import { useState } from "react";
import { useAppSelector } from "../../main/hooks/redux.ts";

interface FormElements {
    identifier: string; // username or email
    password: string;
}

const validationSchema = Yup.object().shape({
    identifier: Yup.string().required("Username or Email is required"),
    password: Yup.string().required("Password is required"),
});

type LoginFormProps = {
    onSubmit: (formData: FormElements) => void;
};

function LoginForm({ onSubmit }: LoginFormProps) {
    const [hasError, setHasError] = useState(false);
    const users = useAppSelector((state) => state.auth.users);

    const initialValues: FormElements = {
        identifier: "",
        password: "",
    };

    return (
        <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={(values, { setSubmitting, setErrors }) => {
                const userByEmail = users.find((user) =>
                    user.email === values.identifier
                );
                const userByUsername = users.find((user) =>
                    user.username === values.identifier
                );

                if (userByEmail === undefined && userByUsername === undefined) {
                    setErrors({
                        identifier: "Email or username does not exist",
                    });
                    setHasError(true);
                    setTimeout(() => setHasError(false), 600);
                    setSubmitting(false);
                    return;
                }

                if (
                    (userByEmail && userByEmail.password !== values.password) ||
                    (userByUsername &&
                        userByUsername.password !== values.password)
                ) {
                    setErrors({
                        password: "Wrong password",
                    });
                    setHasError(true);
                    setTimeout(() => setHasError(false), 600);
                    setSubmitting(false);
                    return;
                }

                onSubmit(values);
                setSubmitting(false);
            }}
        >
            {({ validateForm }) => (
                <Form>
                    <InputField
                        label="Username or Email"
                        name="identifier"
                        type="text"
                        placeholder="Enter your username or email"
                        className="mb-4 w-fit"
                    />
                    <InputField
                        label="Password"
                        name="password"
                        type="password"
                        placeholder="Enter your password"
                        className="mb-4 w-fit"
                    />

                    <Button
                        type="submit"
                        text="Submit"
                        className="mb-0"
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

export default LoginForm;

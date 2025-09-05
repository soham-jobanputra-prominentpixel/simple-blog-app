import { Form, Formik } from "formik";
import InputField from "./fields/InputField.tsx";
import Button from "../Button.tsx";
import * as Yup from "yup";
import { useState } from "react";
import { useAppSelector } from "../../main/hooks/redux.ts";

interface FormElements {
  firstName: string;
  lastName: string;
  email: string;
  username: string;
  password: string;
  confirmPassword: string;
}

const validationSchema = Yup.object().shape({
  firstName: Yup.string().required("First name is required"),
  lastName: Yup.string().required("Last name is required"),
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required")
    .test(
      "domain",
      "Email must end with @prominentpixel.com",
      (value) => (value ? value.endsWith("@prominentpixel.com") : false),
    ),
  username: Yup.string()
    .min(3, "Username must be at least 3 characters")
    .required("Username is required"),
  password: Yup.string()
    .min(8, "Password must be at least 8 characters")
    .matches(/[a-z]/, "Password must contain at least one lowercase letter")
    .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
    .matches(/[0-9]/, "Password must contain at least one number")
    .required("Password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password")], "Passwords must match")
    .required("Confirm password is required"),
});

type SignUpFormProps = {
  onSubmit: (formData: FormElements) => void;
};

function SignUpForm({ onSubmit }: SignUpFormProps) {
  const [hasError, setHasError] = useState(false);
  const users = useAppSelector((state) => state.auth.users);

  const initialValues: FormElements = {
    firstName: "",
    lastName: "",
    email: "",
    username: "",
    password: "",
    confirmPassword: "",
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={(values, { setSubmitting, setErrors }) => {
        const emailExists = users.some((u) => u.email === values.email);
        const usernameExists = users.some((u) =>
          u.username === values.username
        );

        if (emailExists || usernameExists) {
          setErrors({
            email: emailExists ? "Email already exists" : undefined,
            username: usernameExists ? "Username already exists" : undefined,
          });
          setSubmitting(false);
          return;
        }
        onSubmit(values);
        setSubmitting(false);
      }}
    >
      {({ validateForm }) => (
        <Form>
          <div className="flex gap-5 justify-between">
            <InputField
              label="First Name"
              name="firstName"
              type="text"
              placeholder="Enter your first name"
              className="mb-4 w-fit"
            />
            <InputField
              label="Last Name"
              name="lastName"
              type="text"
              placeholder="Enter your last name"
              className="mb-4 w-fit"
            />
          </div>
          <InputField
            label="Email"
            name="email"
            type="email"
            placeholder="Enter your email"
            className="mb-4 w-full"
          />
          <InputField
            label="Username"
            name="username"
            type="text"
            placeholder="Choose a username"
            className="mb-4 w-full"
          />
          <div className="flex gap-5 justify-between">
            <InputField
              label="Password"
              name="password"
              type="password"
              placeholder="Enter your password"
              className="mb-4 w-fit"
            />
            <InputField
              label="Confirm Password"
              name="confirmPassword"
              type="password"
              placeholder="Confirm your password"
              className="mb-4 w-fit"
            />
          </div>

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

export default SignUpForm;

import { Link, useNavigate } from "react-router";
import SignUpForm from "../components/forms/SignUpForm.tsx";
import { useAppDispatch } from "../main/hooks/redux.ts";
import { userAdded } from "../main/features/authSlice.ts";
import { successToast } from "../components/ui/toast.tsx";

function SignUp() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  return (
    <div className="p-4 w-full md:w-fit m-auto">
      <h1 className="mb-2 ml-3">Sign Up</h1>
      <div className="p-4 border-2 border-black bg-stone-200 pb-0">
        <div className="flex flex-col justify-center">
          <SignUpForm
            onSubmit={(formData) => {
              dispatch(userAdded(
                formData.firstName,
                formData.lastName,
                formData.email,
                formData.username,
                formData.password,
              ));
              successToast("User registered successfully!");
              navigate("/login");
            }}
          />
        </div>
        <p className="mb-2 mt-1">
          Already have an account?{" "}
          <Link to="/login" className="underline text-blue-700">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}

export default SignUp;

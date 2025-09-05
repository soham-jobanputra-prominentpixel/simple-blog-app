import { Link, useNavigate } from "react-router";
import LoginForm from "../components/forms/LoginForm.tsx";
import { userLoggedIn } from "../main/features/authSlice.ts";
import { useAppDispatch } from "../main/hooks/redux.ts";
import { successToast } from "../components/ui/toast.tsx";

function Login() {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    return (
        <div className="p-4 w-full md:w-fit m-auto">
            <h1 className="mb-2 ml-3">Login</h1>
            <div className="p-4 border-2 border-black bg-stone-200 pb-0">
                <div className="flex flex-col justify-center">
                    <LoginForm
                        onSubmit={(formData) => {
                            dispatch(
                                userLoggedIn(formData.identifier),
                            );
                            successToast("Login successful!");
                            navigate("/");
                        }}
                    />
                </div>
                <p className="mb-2 mt-1">
                    Don't have an account yet?{" "}
                    <Link to="/sign-up" className="underline text-blue-700">
                        Sign up
                    </Link>
                </p>
            </div>
        </div>
    );
}

export default Login;

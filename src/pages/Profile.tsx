import { useNavigate } from "react-router/internal/react-server-client";
import { successToast } from "../components/ui/toast.tsx";
import {
  selectLoggedInUser,
  userLoggedOut,
} from "../main/features/authSlice.ts";
import { useAppDispatch, useAppSelector } from "../main/hooks/redux.ts";
import Button from "../components/Button.tsx";

function Profile() {
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectLoggedInUser);
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(userLoggedOut());
    successToast("Logged out.");
    navigate("/");
  };

  if (!user) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-gray-600 text-lg">No user logged in.</p>
      </div>
    );
  }

  return (
    <div className="max-w-lg mx-auto mt-10 bg-white p-6 border-2 border-black text-xl">
      <h1 className="font-semibold mb-4 text-gray-800">
        Profile
      </h1>
      <div className="space-y-2">
        <p>
          <span className="font-medium text-gray-700">
            First Name:
          </span>{" "}
          {user.firstName}
        </p>
        <p>
          <span className="font-medium text-gray-700">
            Last Name:
          </span>{" "}
          {user.lastName}
        </p>
        <p>
          <span className="font-medium text-gray-700">Email:</span> {user.email}
        </p>
        <p>
          <span className="font-medium text-gray-700">Username:</span>{" "}
          {user.username}
        </p>
      </div>

      <Button
        text="Logout"
        onClick={handleLogout}
        className="font-bold mt-6 w-full bg-red-500 hover:bg-red-700 text-white py-2 px-4"
      />
    </div>
  );
}

export default Profile;

import { Link, Outlet } from "react-router";
import { SquareUserRound } from "lucide-react";
import { useAppSelector } from "./main/hooks/redux.ts";
import { selectLoggedInUser } from "./main/features/authSlice.ts";

function Layout() {
  const user = useAppSelector(selectLoggedInUser);

  return (
    <>
      <header className="bg-black text-white px-4 py-2 mb-6">
        <div className="flex justify-between gap-3">
          <h1 className="hover:cursor-pointer flex items-baseline">
            <Link to="/">Simple Blog</Link>
          </h1>

          <div className="flex lg:gap-18 md:gap-12 sm:gap-6 gap-3 mt-2 w-1/2">
            <h2 className="hover:cursor-pointer text-white hover:text-blue-400">
              <Link to="/create-blog">Create Blog</Link>
            </h2>
            <h2 className="hover:cursor-pointer text-white hover:text-blue-400">
              My Blogs
            </h2>
          </div>

          {user === undefined
            ? (
              <h2 className="text-white hover:cursor-pointer hover:text-blue-200">
                <Link to="/sign-up">Login/Sign up</Link>
              </h2>
            )
            : (
              <div className="hover:cursor-pointer text-white hover:text-blue-400 mt-4 mr-3">
                <Link to="/profile">
                  <SquareUserRound height={35} width={35} />
                </Link>
              </div>
            )}
        </div>
      </header>
      <div className="mx-auto lg:max-w-200 p-4">
        <Outlet />
      </div>
    </>
  );
}

export default Layout;

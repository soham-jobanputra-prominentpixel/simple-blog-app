import { Link, Outlet } from "react-router";

function Layout() {

  return (
    <>
      <header className="bg-black text-white px-4 py-2">
        <div className="flex justify-between items-baseline">
          <h1 className="hover:cursor-pointer">
            <Link to="/">Simple Blog</Link>
          </h1>

          <h2 className="underline text-blue-400 hover:cursor-pointer hover:text-blue-200"><Link to="/create-blog">Create New Blog</Link></h2>
        </div>
      </header>
      <div className="mx-auto lg:max-w-200 p-4">
        <Outlet />
      </div>
    </>
  );
}

export default Layout;

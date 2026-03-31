import { useAuth } from "../context/AuthContext";
import { NavLink } from "react-router-dom";
import { FaCircleUser } from "react-icons/fa6";

const Navbar = () => {
  const { user, logout } = useAuth();

  return (
    <header className="border-b border-blue-100 bg-white/95 backdrop-blur-sm">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4">
        <div>
          <h1 className="text-xl font-bold tracking-tight text-blue-950">
            Buyer Portal
          </h1>
        </div>

        <div className="flex items-center gap-8">
          <nav className="flex items-center gap-2">
            <NavLink
              to="/dashboard"
              className={({ isActive }) =>
                `rounded-lg px-3 py-1.5 text-sm font-medium transition ${
                  isActive ? "text-blue-800" : "hover:text-blue-600"
                }`
              }
            >
              Dashboard
            </NavLink>
            {user?.role === "admin" && (
              <NavLink
                to="/users"
                className={({ isActive }) =>
                  `rounded-lg px-3 py-1.5 text-sm font-medium transition ${
                    isActive ? "text-blue-800" : "hover:text-blue-600"
                  }`
                }
              >
                Users
              </NavLink>
            )}
            {["admin", "agent"].includes(user?.role) && (
              <NavLink
                to="/properties"
                className={({ isActive }) =>
                  `rounded-lg px-3 py-1.5 text-sm font-medium transition ${
                    isActive ? "text-blue-800" : "hover:text-blue-600"
                  }`
                }
              >
                Properties
              </NavLink>
            )}
          </nav>

          <div className="text-black">|</div>

          <div className="flex gap-2 items-center">
            <div>
              <FaCircleUser size={25} />
            </div>
            <div className="text-right">
              <p className="text-sm font-medium text-blue-900">{user?.name}</p>
              {/* <p className="text-xs uppercase tracking-wide text-gray-700/70">
                {user?.role}
              </p> */}
            </div>
          </div>

          <button
            onClick={logout}
            className="rounded-lg bg-blue-700 px-4 py-2 text-sm font-medium text-white transition hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-300"
          >
            Logout
          </button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;

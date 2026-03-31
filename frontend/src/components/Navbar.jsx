import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const { user, logout } = useAuth();

  return (
    <header className="border-b border-blue-100 bg-white/95 backdrop-blur-sm">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4">
        <div>
          <h1 className="text-xl font-bold tracking-tight text-blue-950">Buyer Portal</h1>
        </div>

        <div className="flex items-center gap-4">
          <div className="text-right">
            <p className="text-sm font-medium text-blue-900">{user?.name}</p>
            <p className="text-xs uppercase tracking-wide text-gray-700/70">{user?.role}</p>
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
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const { user, logout } = useAuth();

  return (
    <header className="border-b border-slate-200 bg-white">
      <div className="mx-auto max-w-7xl px-4 py-4 flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-slate-900">Buyer Portal</h1>
          <p className="text-sm text-slate-500">Simple real-estate favourites dashboard</p>
        </div>

        <div className="flex items-center gap-4">
          <div className="text-right">
            <p className="text-sm font-medium text-slate-800">{user?.name}</p>
            <p className="text-xs uppercase tracking-wide text-slate-500">{user?.role}</p>
          </div>

          <button
            onClick={logout}
            className="rounded-lg bg-slate-900 px-4 py-2 text-sm font-medium text-white hover:bg-slate-800 transition"
          >
            Logout
          </button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
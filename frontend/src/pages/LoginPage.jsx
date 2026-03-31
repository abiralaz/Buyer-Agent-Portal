import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AuthLayout from '../components/AuthLayout';
import { useAuth } from '../context/AuthContext';

const LoginPage = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [form, setForm] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (event) => {
    setForm((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');
    setLoading(true);

    try {
      await login(form);
      navigate('/dashboard');
    } catch (err) {
      setError(err?.response?.data?.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout
      title="Login"
      subtitle="Access your buyer portal and manage favourite properties."
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="mb-1 block text-sm font-medium text-slate-700">Email</label>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            className="w-full rounded-xl border border-slate-300 px-4 py-2.5 outline-none focus:border-slate-500"
            placeholder="Enter your email"
          />
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium text-slate-700">Password</label>
          <input
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            className="w-full rounded-xl border border-slate-300 px-4 py-2.5 outline-none focus:border-slate-500"
            placeholder="Enter your password"
          />
        </div>

        {error ? (
          <div className="rounded-xl bg-rose-50 px-4 py-3 text-sm text-rose-700">
            {error}
          </div>
        ) : null}

        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-xl bg-slate-900 px-4 py-2.5 text-sm font-medium text-white hover:bg-slate-800 disabled:opacity-60"
        >
          {loading ? 'Logging in...' : 'Login'}
        </button>

        <div className="rounded-xl bg-slate-50 px-4 py-3 text-sm text-slate-600">
          Demo user: <span className="font-medium">buyer@example.com</span> /{' '}
          <span className="font-medium">Password123</span>
        </div>

        <p className="text-sm text-slate-600">
          Don’t have an account?{' '}
          <Link to="/signup" className="font-medium text-slate-900 hover:underline">
            Sign up
          </Link>
        </p>
      </form>
    </AuthLayout>
  );
};

export default LoginPage;
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import AuthLayout from '../components/AuthLayout';
import { useAuth } from '../context/AuthContext';

const LoginPage = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [form, setForm] = useState({
    email: '',
    password: '',
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (event) => {
    setForm((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    try {
      await login(form);
      toast.success('Login successful');
      navigate('/dashboard');
    } catch (err) {
      toast.error(err?.response?.data?.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout
      title="Login"
      subtitle="Access your buyer portal and manage favourite properties."
    >
      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="mb-1.5 block text-sm font-medium text-blue-900">Email</label>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            className="w-full rounded-xl border border-blue-200 bg-blue-50/40 px-4 py-2.5 text-blue-950 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
            placeholder="Enter your email"
          />
        </div>

        <div>
          <label className="mb-1.5 block text-sm font-medium text-blue-900">Password</label>
          <input
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            className="w-full rounded-xl border border-blue-200 bg-blue-50/40 px-4 py-2.5 text-blue-950 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
            placeholder="Enter your password"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-xl bg-blue-700 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-300 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {loading ? 'Logging in...' : 'Login'}
        </button>

        <div className="text-center rounded-xl border border-blue-100 bg-blue-50/80 px-4 py-3 text-sm text-blue-800">
          Demo user: <span className="font-medium">buyer@example.com</span> /{' '}
          <span className="font-medium">Password123</span>
          <br />
          Admin user: <span className="font-medium">admin@admin.com</span> /{' '}
          <span className="font-medium">adminUser</span>
        </div>

        <p className="text-center text-sm text-black-800/80">
          Don’t have an account?{' '}
          <Link to="/signup" className="font-semibold text-gray-700 hover:text-blue-800 hover:underline">
            Sign up
          </Link>
        </p>
      </form>
    </AuthLayout>
  );
};

export default LoginPage;
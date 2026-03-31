import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import AuthLayout from '../components/AuthLayout';
import { useAuth } from '../context/AuthContext';

const SignupPage = () => {
  const navigate = useNavigate();
  const { signup } = useAuth();

  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    role: 'buyer',
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

    if (form.password.length < 8) {
      toast.error('Password must be at least 8 characters long');
      return;
    }

    setLoading(true);

    try {
      await signup(form);
      toast.success('Signup successful. Please login.');
      navigate('/login');
    } catch (err) {
      toast.error(err?.response?.data?.message || 'Signup failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout
      title="Create account"
      subtitle="Register to save and manage your favourite properties."
    >
      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="mb-1.5 block text-sm font-medium text-blue-900">Name</label>
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            className="w-full rounded-xl border border-blue-200 bg-blue-50/40 px-4 py-2.5 text-blue-950 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
            placeholder="Enter your full name"
          />
        </div>

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
            placeholder="Create a password"
          />
        </div>

        <div>
          <label className="mb-1.5 block text-sm font-medium text-blue-900">Role</label>
          <select
            name="role"
            value={form.role}
            onChange={handleChange}
            className="w-full rounded-xl border border-blue-200 bg-blue-50/40 px-4 py-2.5 text-blue-950 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
          >
            <option value="buyer">Buyer</option>
            <option value="agent">Agent</option>
            <option value="admin">Admin</option>
          </select>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-xl bg-blue-700 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-300 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {loading ? 'Creating account...' : 'Sign up'}
        </button>

        <p className="text-sm text-center text-black-800/80">
          Already have an account?{' '}
          <Link to="/login" className="font-semibold text-gray-700 hover:text-blue-800 hover:underline">
            Login
          </Link>
        </p>
      </form>
    </AuthLayout>
  );
};

export default SignupPage;
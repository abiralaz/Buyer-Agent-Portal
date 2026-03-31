import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
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

    if (form.password.length < 8) {
      setError('Password must be at least 8 characters long');
      return;
    }

    setLoading(true);

    try {
      await signup(form);
      navigate('/dashboard');
    } catch (err) {
      setError(err?.response?.data?.message || 'Signup failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout
      title="Create account"
      subtitle="Register to save and manage your favourite properties."
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="mb-1 block text-sm font-medium text-slate-700">Name</label>
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            className="w-full rounded-xl border border-slate-300 px-4 py-2.5 outline-none focus:border-slate-500"
            placeholder="Enter your full name"
          />
        </div>

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
            placeholder="Create a password"
          />
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium text-slate-700">Role</label>
          <select
            name="role"
            value={form.role}
            onChange={handleChange}
            className="w-full rounded-xl border border-slate-300 px-4 py-2.5 outline-none focus:border-slate-500"
          >
            <option value="buyer">Buyer</option>
            <option value="agent">Agent</option>
            <option value="admin">Admin</option>
          </select>
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
          {loading ? 'Creating account...' : 'Sign up'}
        </button>

        <p className="text-sm text-slate-600">
          Already have an account?{' '}
          <Link to="/login" className="font-medium text-slate-900 hover:underline">
            Login
          </Link>
        </p>
      </form>
    </AuthLayout>
  );
};

export default SignupPage;
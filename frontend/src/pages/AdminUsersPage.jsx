import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import Navbar from '../components/Navbar';
import { getUsers } from '../api/userApi';

const AdminUsersPage = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        const response = await getUsers();
        setUsers(response.data.users);
      } catch (err) {
        toast.error(err?.response?.data?.message || 'Failed to fetch users');
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  return (
    <div className="min-h-screen bg-linear-to-br from-blue-50 via-sky-50 to-blue-100">
      <Navbar />

      <main className="mx-auto max-w-7xl px-4 py-8">
        <section className="mb-6 rounded-2xl border border-blue-100 bg-white p-6 shadow-sm">
          <h2 className="text-2xl font-bold tracking-tight text-blue-950">Users</h2>
          <p className="mt-1 text-sm text-gray-700/80">
            List of users who have signed up in the portal.
          </p>
        </section>

        <section className="overflow-hidden rounded-2xl border border-blue-100 bg-white shadow-sm">
          {loading ? (
            <div className="p-6 text-gray-700/80">Loading users...</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full text-left">
                <thead className="bg-blue-50/80">
                  <tr>
                    <th className="px-4 py-3 text-sm font-semibold text-blue-950">Name</th>
                    <th className="px-4 py-3 text-sm font-semibold text-blue-950">Email</th>
                    <th className="px-4 py-3 text-sm font-semibold text-blue-950">Role</th>
                    <th className="px-4 py-3 text-sm font-semibold text-blue-950">Joined</th>
                  </tr>
                </thead>
                <tbody>
                  {users.length === 0 ? (
                    <tr>
                      <td colSpan={4} className="px-4 py-6 text-center text-sm text-gray-700/80">
                        No users found.
                      </td>
                    </tr>
                  ) : (
                    users.map((user) => (
                      <tr key={user._id} className="border-t border-blue-100">
                        <td className="px-4 py-3 text-sm text-gray-900">{user.name}</td>
                        <td className="px-4 py-3 text-sm text-gray-900">{user.email}</td>
                        <td className="px-4 py-3 text-sm capitalize text-gray-900">{user.role}</td>
                        <td className="px-4 py-3 text-sm text-gray-700">
                          {new Date(user.createdAt).toLocaleDateString()}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          )}
        </section>
      </main>
    </div>
  );
};

export default AdminUsersPage;

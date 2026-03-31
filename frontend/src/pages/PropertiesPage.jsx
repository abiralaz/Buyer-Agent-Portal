import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Navbar from '../components/Navbar';
import { getProperties } from '../api/propertyApi';

const PropertiesPage = () => {
  const navigate = useNavigate();
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchProperties = async () => {
    try {
      setLoading(true);
      const response = await getProperties();
      setProperties(response.data.properties);
    } catch (err) {
      toast.error(err?.response?.data?.message || 'Failed to load properties');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProperties();
  }, []);

  return (
    <div className="min-h-screen bg-linear-to-br from-blue-50 via-sky-50 to-blue-100">
      <Navbar />

      <main className="mx-auto max-w-7xl px-4 py-8">
        <section className="mb-6 flex items-center justify-between rounded-2xl border border-blue-100 bg-white p-6 shadow-sm">
          <div>
            <h2 className="text-2xl font-bold tracking-tight text-blue-950">Properties</h2>
            <p className="mt-1 text-sm text-gray-700/80">Manage properties and add new listings.</p>
          </div>
          <button
            onClick={() => navigate('/properties/new')}
            className="rounded-lg bg-blue-700 px-4 py-2 text-sm font-semibold text-white transition hover:bg-blue-800"
          >
            Add Property
          </button>
        </section>

        <section className="overflow-hidden rounded-2xl border border-blue-100 bg-white shadow-sm">
          {loading ? (
            <div className="p-6 text-gray-700/80">Loading properties...</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full text-left">
                <thead className="bg-blue-50/80">
                  <tr>
                    <th className="px-4 py-3 text-sm font-semibold text-blue-950">Title</th>
                    <th className="px-4 py-3 text-sm font-semibold text-blue-950">Location</th>
                    <th className="px-4 py-3 text-sm font-semibold text-blue-950">Price</th>
                    <th className="px-4 py-3 text-sm font-semibold text-blue-950">Description</th>
                  </tr>
                </thead>
                <tbody>
                  {properties.length === 0 ? (
                    <tr>
                      <td colSpan={4} className="px-4 py-6 text-center text-sm text-gray-700/80">
                        No properties found.
                      </td>
                    </tr>
                  ) : (
                    properties.map((property) => (
                      <tr key={property._id} className="border-t border-blue-100">
                        <td className="px-4 py-3 text-sm text-gray-900">{property.title}</td>
                        <td className="px-4 py-3 text-sm text-gray-900">{property.location}</td>
                        <td className="px-4 py-3 text-sm text-gray-900">
                          {Number(property.price).toLocaleString()}
                        </td>
                        <td className="px-4 py-3 text-sm text-gray-700">{property.description}</td>
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

export default PropertiesPage;

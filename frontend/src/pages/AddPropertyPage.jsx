import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Navbar from '../components/Navbar';
import { createProperty } from '../api/propertyApi';

const initialForm = {
  title: '',
  location: '',
  price: '',
  image: '',
  description: '',
};

const AddPropertyPage = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState(initialForm);
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (event) => {
    setForm((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      setSubmitting(true);
      await createProperty({
        ...form,
        price: Number(form.price),
      });
      toast.success('Property added successfully');
      navigate('/properties');
    } catch (err) {
      toast.error(err?.response?.data?.message || 'Failed to add property');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-blue-50 via-sky-50 to-blue-100">
      <Navbar />

      <main className="mx-auto max-w-4xl px-4 py-8">
        <section className="mb-6 rounded-2xl border border-blue-100 bg-white p-6 shadow-sm">
          <h2 className="text-2xl font-bold tracking-tight text-blue-950">Add Property</h2>
          <p className="mt-1 text-sm text-gray-700/80">
            Fill in the property details to create a new listing.
          </p>
        </section>

        <section className="rounded-2xl border border-blue-100 bg-white p-6 shadow-sm">
          <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <input
              type="text"
              name="title"
              value={form.title}
              onChange={handleChange}
              placeholder="Property title"
              className="rounded-xl border border-blue-200 bg-blue-50/40 px-4 py-2.5 text-blue-950 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
            />
            <input
              type="text"
              name="location"
              value={form.location}
              onChange={handleChange}
              placeholder="Location"
              className="rounded-xl border border-blue-200 bg-blue-50/40 px-4 py-2.5 text-blue-950 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
            />
            <input
              type="number"
              name="price"
              value={form.price}
              onChange={handleChange}
              placeholder="Price"
              className="rounded-xl border border-blue-200 bg-blue-50/40 px-4 py-2.5 text-blue-950 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
            />
            <input
              type="text"
              name="image"
              value={form.image}
              onChange={handleChange}
              placeholder="Image URL"
              className="rounded-xl border border-blue-200 bg-blue-50/40 px-4 py-2.5 text-blue-950 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
            />
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              placeholder="Description"
              rows={4}
              className="md:col-span-2 rounded-xl border border-blue-200 bg-blue-50/40 px-4 py-2.5 text-blue-950 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
            />
            <div className="md:col-span-2 flex items-center gap-3">
              <button
                type="submit"
                disabled={submitting}
                className="rounded-lg bg-blue-700 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-800 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {submitting ? 'Adding Property...' : 'Save Property'}
              </button>
              <button
                type="button"
                onClick={() => navigate('/properties')}
                className="rounded-lg border border-blue-200 px-4 py-2.5 text-sm font-semibold text-blue-900 transition hover:bg-blue-50"
              >
                Cancel
              </button>
            </div>
          </form>
        </section>
      </main>
    </div>
  );
};

export default AddPropertyPage;

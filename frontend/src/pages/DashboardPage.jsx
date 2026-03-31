import { useEffect, useMemo, useState } from 'react';
import Navbar from '../components/Navbar';
import FavouriteList from '../components/FavouriteList';
import PropertyCard from '../components/PropertyCard';
import { getProperties } from '../api/propertyApi';
import { addFavourite, getFavourites, removeFavourite } from '../api/favouriteApi';
import { useAuth } from '../context/AuthContext';

const DashboardPage = () => {
  const { user } = useAuth();

  const [properties, setProperties] = useState([]);
  const [favourites, setFavourites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [actionPropertyId, setActionPropertyId] = useState(null);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const favouritePropertyIds = useMemo(() => {
    return new Set(
      favourites
        .filter((item) => item?.property?._id)
        .map((item) => item.property._id)
    );
  }, [favourites]);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      setError('');
  
      const [propertyResponse, favouriteResponse] = await Promise.all([
        getProperties(),
        getFavourites(),
      ]);
  
      console.log('properties response:', propertyResponse.data);
      console.log('favourites response:', favouriteResponse.data);
  
      setProperties(propertyResponse.data.properties);
      setFavourites(favouriteResponse.data.favourites);
    } catch (err) {
      setError(err?.response?.data?.message || 'Failed to load dashboard data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const handleToggleFavourite = async (propertyId, isFavourite) => {
    try {
      setActionPropertyId(propertyId);
      setError('');
      setSuccess('');

      if (isFavourite) {
        await removeFavourite(propertyId);
        setSuccess('Property removed from favourites');
      } else {
        await addFavourite(propertyId);
        setSuccess('Property added to favourites');
      }

      const favouriteResponse = await getFavourites();
      setFavourites(favouriteResponse.data.favourites);
    } catch (err) {
      setError(err?.response?.data?.message || 'Failed to update favourite');
    } finally {
      setActionPropertyId(null);
    }
  };

  return (
    <div className="min-h-screen bg-slate-100">
      <Navbar />

      <main className="mx-auto max-w-7xl px-4 py-8">
        <section className="mb-8 rounded-2xl bg-white border border-slate-200 shadow-sm p-6">
          <h2 className="text-2xl font-bold text-slate-900">
            Welcome, {user?.name}
          </h2>
          <p className="mt-2 text-slate-600">
            Role: <span className="font-medium capitalize">{user?.role}</span>
          </p>
          <p className="mt-1 text-sm text-slate-500">
            Browse available properties and manage your favourites.
          </p>
        </section>

        {error ? (
          <div className="mb-6 rounded-xl bg-rose-50 px-4 py-3 text-sm text-rose-700">
            {error}
          </div>
        ) : null}

        {success ? (
          <div className="mb-6 rounded-xl bg-emerald-50 px-4 py-3 text-sm text-emerald-700">
            {success}
          </div>
        ) : null}

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          <div className="lg:col-span-1">
            <FavouriteList favourites={favourites} />
          </div>

          <div className="lg:col-span-2">
            <div className="mb-4">
              <h2 className="text-lg font-semibold text-slate-900">Available Properties</h2>
              <p className="text-sm text-slate-500">
                Click to add or remove a property from your favourites.
              </p>
            </div>

            {loading ? (
              <div className="rounded-2xl border border-slate-200 bg-white p-6 text-slate-500">
                Loading properties...
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                {properties.map((property) => (
                  <PropertyCard
                    key={property._id}
                    property={property}
                    isFavourite={favouritePropertyIds.has(property._id)}
                    onToggleFavourite={handleToggleFavourite}
                    isUpdating={actionPropertyId === property._id}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default DashboardPage;
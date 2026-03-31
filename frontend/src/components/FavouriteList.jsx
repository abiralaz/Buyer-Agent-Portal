const FavouriteList = ({ favourites }) => {
    const safeFavourites = favourites.filter((item) => item?.property);
  
    return (
      <div className="rounded-2xl border border-slate-200 bg-white shadow-sm p-5">
        <div className="mb-4">
          <h2 className="text-lg font-semibold text-slate-900">My Favourites</h2>
          <p className="text-sm text-slate-500">
            Properties you have saved to your personal list.
          </p>
        </div>
  
        {safeFavourites.length === 0 ? (
          <div className="rounded-xl border border-dashed border-slate-300 bg-slate-50 p-6 text-sm text-slate-500">
            No favourites yet. Add a property from the list below.
          </div>
        ) : (
          <div className="space-y-4">
            {safeFavourites.map((item) => (
              <div
                key={item._id}
                className="flex items-start gap-4 rounded-xl border border-slate-200 p-4"
              >
                <img
                  src={item.property.image}
                  alt={item.property.title}
                  className="h-20 w-24 rounded-lg object-cover"
                />
  
                <div className="min-w-0">
                  <h3 className="text-sm font-semibold text-slate-900">
                    {item.property.title}
                  </h3>
                  <p className="text-sm text-slate-500">{item.property.location}</p>
                  <p className="mt-1 text-sm font-medium text-slate-700">
                    ${item.property.price.toLocaleString()}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  };
  
  export default FavouriteList;
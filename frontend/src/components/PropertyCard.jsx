const PropertyCard = ({ property, isFavourite, onToggleFavourite, isUpdating }) => {
    return (
      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm hover:shadow-md transition">
        <img
          src={property.image}
          alt={property.title}
          className="h-52 w-full object-cover"
        />
  
        <div className="p-5">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h3 className="text-lg font-semibold text-slate-900">{property.title}</h3>
              <p className="mt-1 text-sm text-slate-500">{property.location}</p>
            </div>
  
            <span className="rounded-full bg-slate-100 px-3 py-1 text-sm font-medium text-slate-700">
              ${property.price.toLocaleString()}
            </span>
          </div>
  
          <p className="mt-4 text-sm leading-6 text-slate-600">{property.description}</p>
  
          <button
            onClick={() => onToggleFavourite(property._id, isFavourite)}
            disabled={isUpdating}
            className={`mt-5 w-full rounded-xl px-4 py-2.5 text-sm font-medium transition ${
              isFavourite
                ? 'bg-rose-100 text-rose-700 hover:bg-rose-200'
                : 'bg-slate-900 text-white hover:bg-slate-800'
            } disabled:opacity-60 disabled:cursor-not-allowed`}
          >
            {isUpdating ? 'Updating...' : isFavourite ? 'Remove from favourites' : 'Add to favourites'}
          </button>
        </div>
      </div>
    );
  };
  
  export default PropertyCard;
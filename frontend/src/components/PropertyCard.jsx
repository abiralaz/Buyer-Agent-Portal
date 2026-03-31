const PropertyCard = ({ property, isFavourite, onToggleFavourite, isUpdating }) => {
    return (
      <div className="overflow-hidden rounded-2xl border border-blue-100 bg-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
        <img
          src={property.image}
          alt={property.title}
          className="h-52 w-full object-cover"
        />
  
        <div className="p-5">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h3 className="text-lg font-semibold text-blue-950">{property.title}</h3>
              <p className="mt-1 text-sm text-gray-700/80">{property.location}</p>
            </div>
  
            <span className="rounded-full bg-blue-50 px-3 py-1 text-sm font-semibold text-gray-700">
              NRs.{property.price.toLocaleString()}
            </span>
          </div>
  
          <p className="mt-4 text-sm leading-6 text-blue-900/80">{property.description}</p>
  
          <button
            onClick={() => onToggleFavourite(property._id, isFavourite)}
            disabled={isUpdating}
            className={`mt-5 w-full rounded-xl px-4 py-2.5 text-sm font-medium transition ${
              isFavourite
                ? 'border border-blue-200 bg-blue-100 text-blue-800 hover:bg-blue-200'
                : 'bg-blue-700 text-white hover:bg-blue-800'
            } disabled:opacity-60 disabled:cursor-not-allowed`}
          >
            {isUpdating ? 'Updating...' : isFavourite ? 'Remove from favourites' : 'Add to favourites'}
          </button>
        </div>
      </div>
    );
  };
  
  export default PropertyCard;
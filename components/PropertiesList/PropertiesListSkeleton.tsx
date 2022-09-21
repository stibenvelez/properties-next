import React from 'react'
import PropertyCardSkeleton from '../PropertyCard/PropertyCardSkeleton';

const PropertiesListSkeleton = () => {
  return (
      <div className="grid grid-cols-1 gap-6 md:gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 w-full">
          <PropertyCardSkeleton />
          <PropertyCardSkeleton />
          <PropertyCardSkeleton />
          <PropertyCardSkeleton />
          <PropertyCardSkeleton />
          <PropertyCardSkeleton />
      </div>
  );
}

export default PropertiesListSkeleton
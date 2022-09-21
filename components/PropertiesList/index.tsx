//import PropertyCard from "../PropertyCard";
import PropertyCardSkeleton from "../../components/PropertyCard/PropertyCardSkeleton";
import { useSelector } from "react-redux";
import Pagination from "../../shared/Pagination/Pagination";
import { useQuery } from "@apollo/client";
import { GET_PROPERTIES } from "../../graphql/queries/properties";
import useDebounce from "../../hooks/useDebounce";
import PropertiesListSkeleton from "./PropertiesListSkeleton";
import dynamic from "next/dynamic";
import { Suspense } from "react";

const PropertyCard = dynamic(() => import("../PropertyCard"), {
    suspense: true,
});

const PropertyList = () => {
    const filters: any = useSelector(
        ({ properties }: any) => properties.filters
    );
    const debouncedFilters = useDebounce<string>(filters, 500);

    const {
        data: properties,
        loading,
        error,
    }: any = useQuery(GET_PROPERTIES, {
        variables: filters,
    });

    if (error) {
        return (
            <div className="p-3 text-sm text-red-900 bg-red-100 rounded-md shadow-sm">
                <p>Ha ocurrido un error</p>
            </div>
        );
    }

    if (loading) {
        return <PropertiesListSkeleton />;
    }

    if (!properties || properties.getProperties.length === 0) {
        return (
            <div className="p-3 text-sm text-yellow-900 bg-yellow-100 rounded-md shadow-sm">
                <p>No se encontraron resultado para mostrar</p>
            </div>
        );
    }

    return (
        <div>
            <Suspense fallback={<PropertiesListSkeleton />}>
                <div className="grid grid-cols-1 gap-6 md:gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 ">
                    {properties.getProperties.map((property: any) => (
                        <PropertyCard
                            key={property.idProperty}
                            property={property}
                        />
                    ))}
                </div>
            </Suspense>
            <div className="flex items-center justify-center mt-16">
                {/* <Pagination /> */}
            </div>
        </div>
    );
};

export default PropertyList;

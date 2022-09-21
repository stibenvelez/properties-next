export const filterAdapter = ({
    minPrice,
    maxPrice,
    bedrooms,
    bathrooms,
    ...rest
}: any) => {
    const formatedFilter = {
        ...rest,
    };

    if (minPrice) {
        formatedFilter.minPrice = parseInt(minPrice, 0);
    }
    if (maxPrice) {
        formatedFilter.maxPrice = parseInt(maxPrice, 0);
    }
    if (bedrooms) {
        formatedFilter.bedrooms = parseInt(bedrooms, 0);
    }
    if (bathrooms) {
        formatedFilter.bathrooms = parseInt(bathrooms, 0);
    }

    return formatedFilter;
};



interface PropertyAdapterType {
    title: string;
    description: string;
    price: number;
    address: string;
    city: number;
    departament: number;
    building: number;
    contactName: string;
    contactPhone: string;
    contactEmail: string;
    contactCellphone: string;
    antiquityYears: number;
    lastAdminprice: number;
    neighborhood: string;
    propertyType: string;
    offerId: number;
    area: number;
    stratum: number;
    bedrooms: number;
    elevators: number;
    floor: number;
    bathrooms: number;
    garage: number;
    parking: number;
    remodelation: number;
    latitude: number;
    longitude: number;
    saleOff: number;
    createBy: number;
    stateId: number;
    images: any
}

export const createPropertyAdapter = (property: PropertyAdapterType) => {
    
    const newProperty = {
        propertyTypeId: property.propertyType,
        offerId: property.offerId,
        title: property.title,
        description: property.description,
        price: property.price,
        saleOff: property.saleOff,
        area: property.area,
        address: property.address,
        building: property.building,
        cityId: property.city * 1,
        neighborhood: property.neighborhood,
        stratum: property.stratum,
        bedrooms: property.bedrooms,
        antiquityYears: property.antiquityYears,
        elevators: property.elevators,
        floor: property.floor,
        bathrooms: property.bathrooms,
        garage: property.garage,
        parking: property.parking,
        remodelation: property.remodelation,
        latitude: property.latitude,
        longitude: property.longitude,
        lastAdminprice: property.lastAdminprice,
        contactName: property.contactName,
        contactEmail: property.contactEmail,
        contactPhone: property.contactPhone,
        contactCellphone: property.contactCellphone,
        stateId: property.stateId,
        createdById: 1,
    };

    return newProperty

}

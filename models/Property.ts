export interface Property {
    __typename: string;
    reference: string;
    idProperty: number;
    offerId: number;
    title: string;
    description: string;
    cityId: number;
    neighborhood: string;
    stratum: number;
    bedrooms: number;
    antiquityYears: number;
    elevators: number;
    floor: number;
    bathrooms: number;
    garage: number;
    parking: number;
    remodelation: number;
    latitude: number;
    longitude: number;
    lastAdminprice: number;
    contactName: string;
    contactEmail: string;
    contactPhone: string;
    contactCellphone: string;
    image1: string;
    image2: string;
    image3: string;
    image4: string;
    image5: string;
    image6: string;
    image7: string;
    createdBy: number;
    createdAt: string;
    updateAt: string;
    stateId: number;
    propertyType: {
        __typename: string;
        propertyTypeId: number;
        propertyType: string;
    };
    offer: Offer;
    city: City;
    state: State;
}

interface Offer {
        __typename: string;
        offerId: number;
        offer: string;
        description: string; 
}

interface City {
    __typename: string;
    cityId: number;
    city: string;
    departament: string;
    idDepartament: null;
    region: string;
}

interface State {
    stateId: number
    state: string
    description: string
}
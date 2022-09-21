import {gql} from '@apollo/client';

export const GET_PROPERTIES = gql`
    query GetProperties(
        $bedrooms: Int
        $offer: String
        $city: String
        $maxPrice: Int
        $minPrice: Int
        $bathrooms: Int
        $propertyType: String
        $neighborhood: String
    ) {
        getProperties(
            bedrooms: $bedrooms
            offer: $offer
            city: $city
            maxPrice: $maxPrice
            minPrice: $minPrice
            bathrooms: $bathrooms
            propertyType: $propertyType
            neighborhood: $neighborhood
        ) {
            idProperty
            offerId
            title
            description
            price
            saleOff
            area
            address
            building
            cityId
            neighborhood
            stratum
            bedrooms
            antiquityYears
            elevators
            floor
            bathrooms
            garage
            parking
            remodelation
            latitude
            longitude
            lastAdminprice
            contactName
            contactEmail
            contactPhone
            contactCellphone
            createdById
            createdAt
            updateAt
            stateId
            image1
            image2
            image3
            image4
            image5
            image6
            image7
            offer {
                offerId
                offer
                description
                createdAt
                updateAt
                state
            }
            city {
                cityId
                city
                departament
                idDepartament
                region
            }
            propertyType {
                propertyType
            }
            galleryImages {
                id
                name
                url
            }
        }
    }
`;


export const GET_PROPERTIES_TITLE = gql`
    query GetProperties(
        $bedrooms: Int
        $offer: String
        $city: String
        $maxPrice: Int
        $minPrice: Int
        $bathrooms: Int
        $propertyType: String
    ) {
        getProperties(
            bedrooms: $bedrooms
            offer: $offer
            city: $city
            maxPrice: $maxPrice
            minPrice: $minPrice
            bathrooms: $bathrooms
            propertyType: $propertyType
        ) {
            idProperty
            title

        }
    }
`;


export const GET_PROPERTY = gql`
    query GetProperty($id: Int!) {
        getProperty(id: $id) {
            offerId
            title
            description
            price
            saleOff
            area
            address
            building
            cityId
            neighborhood
            stratum
            bedrooms
            antiquityYears
            elevators
            floor
            bathrooms
            garage
            parking
            remodelation
            latitude
            longitude
            lastAdminprice
            contactName
            contactEmail
            contactPhone
            contactCellphone
            image1
            image2
            image3
            image4
            image5
            image6
            image7
            createdById
            createdAt
            updateAt
            stateId
            idProperty
            propertyType {
                propertyTypeId
                propertyType
                stateId
                createdAt
            }
            state {
                stateId
                state
                description
            }
            city {
                _empty
                cityId
                city
                departament
                idDepartament
                region
            }
            createdBy {
                idUser
                firstName
                lastName
                email
                idRole
            }
            offer {
                offerId
                offer
                description
                createdAt
                updateAt
                state
            }
            agent {
                idUser
                firstName
                lastName
                email
                idRole
                confirmed
                state
            }
            galleryImages {
                id
                name
                url
            }
        }
    }
`;

export const CREATE_PROPERTY = gql`
    mutation CreateProperty($input: CreatePropertyInput, $file: Upload) {
        createProperty(input: $input, file: $file) {
            success
            message
        }
    }
`;
import { gql, useQuery } from "@apollo/client";
import { Property } from "models";
import Spinner from "shared/Spinner";
import PropertyItem from "./PropertyItem";


const GET_PROPERTIES = gql`
    query Query {
        getProperties {
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
            propertyType {
                propertyTypeId
                propertyType
                stateId
                createdAt
            }
            createdBy {
                idUser
                firstName
                lastName
                email
                idRole
                confirmed
            }
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
            state {
                stateId
                state
                description
            }
        }
    }
`;

const PropertiesList = () => {

    const { data, loading } = useQuery(GET_PROPERTIES);
    const { getProperties: properties } = data || []

    if (loading) return (
        <div className="py-4">
            <Spinner />
        </div>
    );
    

    return (
        <div className="overflow-x-auto shadow-md sm:rounded-lg">
            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-white uppercase bg-slate-800 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        <th scope="col" className="px-6 py-3">
                            Id
                        </th>
                        <th scope="col" className="px-6 py-3">
                            titulo
                        </th>
                        <th scope="col" className="px-6 py-3">
                            ciudad
                        </th>
                        <th scope="col" className="px-6 py-3">
                            tipo de inmueble
                        </th>
                        <th scope="col" className="px-6 py-3">
                            tipo de oferta
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Estado
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Acciones
                        </th>
                    </tr>
                </thead>
                <tbody className="bg-white dark:bg-gray-800">
                    {properties &&
                        properties.map((property:Property, index:number) => (
                            <PropertyItem key={index} property={property} />
                        ))}
                </tbody>
            </table>
        </div>
    );
};

export default PropertiesList;

import { gql } from "@apollo/client";

export const GET_CITIES_NAMES = gql`
    query GetCities {
        getCities {
            cityId
            city
        }
    }
`;
export const GET_CITIES = gql`
    query GetCities {
        getCities {
            cityId
            city
            departament
            idDepartament
            region
        }
    }
`;
export const GET_DEPARTAMENTS= gql`
    query GetDepartaments {
        getDepartaments {
            idDepartament
            departament
        }
    }
`;
